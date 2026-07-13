"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AlertTriangle, Bike, Loader2, Mail, PhoneCall, RefreshCw, Truck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ShopVideoHero from "@/components/shop-video-hero"
import { bikes, bikeInquiryUrl, formatPrice } from "@/data/bikes"
import { trackConversion } from "@/lib/track-conversion"
import "./shop-embed.css"

const DEBUG = process.env.NODE_ENV !== "production"
const ECWID_SCRIPT_SRC = "https://app.business.shop/script.js?115212795&data_platform=code&data_date=2025-04-30"
let ecwidScriptLoadPromise: Promise<void> | null = null
const pendingPriceUpdates = bikes.filter(
  (bike) => bike.checkoutPrice !== undefined && bike.checkoutPrice !== bike.price,
)

const debugLog = (...args: any[]) => {
  if (DEBUG) console.log(`[Shop Debug ${new Date().toISOString()}]`, ...args)
}

const isEcwidApiReady = () =>
  typeof window.xCategoriesV2 === "function" && typeof window.xProductBrowser === "function"

/**
 * Reuse the global navigation's Ecwid loader when it exists. This prevents the
 * shop timeout fallback and Next Script from racing to download script.js more
 * than once.
 */
const ensureEcwidScriptLoaded = () => {
  if (isEcwidApiReady()) {
    return Promise.resolve()
  }

  if (ecwidScriptLoadPromise) {
    return ecwidScriptLoadPromise
  }

  ecwidScriptLoadPromise = new Promise<void>((resolve, reject) => {
    let settled = false
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="app.business.shop/script.js"]',
    )
    const script = existingScript ?? document.createElement("script")

    const cleanup = () => {
      window.clearInterval(readinessInterval)
      window.clearTimeout(loadTimeout)
      script.removeEventListener("error", handleError)
    }
    const finish = (error?: Error) => {
      if (settled) return
      settled = true
      cleanup()
      if (error) {
        ecwidScriptLoadPromise = null
        reject(error)
      } else {
        resolve()
      }
    }
    const handleError = () => finish(new Error("Unable to load the Ecwid store script"))
    const checkReadiness = () => {
      if (isEcwidApiReady()) finish()
    }
    const readinessInterval = window.setInterval(checkReadiness, 100)
    const loadTimeout = window.setTimeout(
      () => finish(new Error("Timed out waiting for the Ecwid store API")),
      15000,
    )

    script.addEventListener("error", handleError, { once: true })

    if (!existingScript) {
      script.src = ECWID_SCRIPT_SRC
      script.async = true
      script.setAttribute("data-cfasync", "false")
      document.head.appendChild(script)
    }

    checkReadiness()
  })

  return ecwidScriptLoadPromise
}

const configureShopInventoryDisplay = () => {
  window.ec = window.ec || {}
  window.ec.storefront = window.ec.storefront || {}
  window.ec.storefront.product_details_show_in_stock_label = true
  window.ec.storefront.product_details_show_number_of_items_in_stock = false
}

const stripVisibleStockCounts = (root: Node) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const stockCountPattern = /\bIn stock:\s*\d+\s+available\b/gi
  const nodes: Text[] = []

  while (walker.nextNode()) {
    const node = walker.currentNode
    if (node.textContent && stockCountPattern.test(node.textContent)) {
      nodes.push(node as Text)
    }
    stockCountPattern.lastIndex = 0
  }

  nodes.forEach((node) => {
    node.textContent = node.textContent?.replace(stockCountPattern, "In stock") ?? ""
  })
}

export default function ShopClient() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isScriptError, setIsScriptError] = useState(false)
  const [isShopVisible, setIsShopVisible] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState("Initializing...")

  const scriptLoadedRef = useRef(false)
  const shopContainerRef = useRef<HTMLDivElement>(null)
  const categoriesContainerRef = useRef<HTMLDivElement>(null)
  const stockScrubFrameRef = useRef<number | null>(null)
  const loadStartTimeRef = useRef<number>(Date.now())
  const shopVisitTrackedRef = useRef(false)

  // Patch querySelector errors from third-party script; returns a restore function
  const patchQuerySelectors = () => {
    debugLog("Patching query selectors")
    const originalQuerySelector = Document.prototype.querySelector
    const originalQuerySelectorAll = Document.prototype.querySelectorAll
    const originalElementQuerySelector = Element.prototype.querySelector
    const originalElementQuerySelectorAll = Element.prototype.querySelectorAll

    Document.prototype.querySelector = function (selector: string) {
      try {
        return originalQuerySelector.call(this, selector)
      } catch {
        console.warn(`Invalid selector: ${selector}. Returning null instead.`)
        return null
      }
    }

    Document.prototype.querySelectorAll = function (selector: string) {
      try {
        return originalQuerySelectorAll.call(this, selector)
      } catch {
        console.warn(`Invalid selector: ${selector}. Returning empty NodeList instead.`)
        return document.createDocumentFragment().childNodes as unknown as NodeListOf<Element>
      }
    }

    Element.prototype.querySelector = function (selector: string) {
      try {
        return originalElementQuerySelector.call(this, selector)
      } catch {
        console.warn(`Invalid selector: ${selector}. Returning null instead.`)
        return null
      }
    }

    Element.prototype.querySelectorAll = function (selector: string) {
      try {
        return originalElementQuerySelectorAll.call(this, selector)
      } catch {
        console.warn(`Invalid selector: ${selector}. Returning empty NodeList instead.`)
        return document.createDocumentFragment().childNodes as unknown as NodeListOf<Element>
      }
    }

    return () => {
      Document.prototype.querySelector = originalQuerySelector
      Document.prototype.querySelectorAll = originalQuerySelectorAll
      Element.prototype.querySelector = originalElementQuerySelector
      Element.prototype.querySelectorAll = originalElementQuerySelectorAll
    }
  }

  // Make ResizeObserver callback failures non-fatal
  const handleResizeObserverErrors = () => {
    debugLog("Setting up ResizeObserver error handling")
    const OriginalResizeObserver = window.ResizeObserver

    window.ResizeObserver = class PatchedResizeObserver extends OriginalResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        const patchedCallback: ResizeObserverCallback = (entries, observer) => {
          window.requestAnimationFrame(() => {
            try {
              callback(entries, observer)
            } catch (e) {
              console.warn("ResizeObserver callback error:", e)
            }
          })
        }
        super(patchedCallback)
      }
    }

    return () => {
      window.ResizeObserver = OriginalResizeObserver
    }
  }

  // Initialize the embedded store
  const initializeShopComponents = useCallback(() => {
    debugLog("Attempting to initialize shop components")
    setLoadingStatus("Initializing shop components...")

    const w = window as any
    if (!w.xCategoriesV2 || !w.xProductBrowser) {
      debugLog("Shop functions unavailable after the loader reported ready")
      setIsScriptError(true)
      return
    }

    try {
      configureShopInventoryDisplay()
      stripVisibleStockCounts(shopContainerRef.current ?? document.body)

      debugLog("Initializing categories")
      setLoadingStatus("Loading categories...")
      w.xCategoriesV2("id=my-categories-115212795")

      debugLog("Initializing product browser")
      setLoadingStatus("Loading products...")
      w.xProductBrowser(
        "categoriesPerRow=3",
        "views=grid(20,3) list(60) table(60)",
        "categoryView=grid",
        "searchView=list",
        "defaultCategoryId=180049534",
        "id=my-store-115212795",
      )

      debugLog("Shop components initialized, making visible")
      stripVisibleStockCounts(shopContainerRef.current ?? document.body)
      setLoadingStatus("Displaying shop...")
      setIsShopVisible(true)

      const loadTime = Date.now() - loadStartTimeRef.current
      debugLog(`Total shop load time: ${loadTime}ms`)
    } catch (error) {
      debugLog("Error initializing shop components:", error)
      setIsScriptError(true)
    }
  }, [])

  // Setup page and fallbacks
  useEffect(() => {
    debugLog("Shop client mounted")
    loadStartTimeRef.current = Date.now()
    configureShopInventoryDisplay()
    const cleanupQuerySelectors = patchQuerySelectors()
    const cleanupResizeObserver = handleResizeObserverErrors()
    let cancelled = false

    const originalOnError = window.onerror
    window.onerror = function (message, source, lineno) {
      debugLog("Caught error:", message, source, lineno)
      const msg = String(message ?? "")
      if (msg.includes("ResizeObserver") || msg.includes("querySelector")) {
        console.warn("Caught non-critical error:", message)
        return true
      }
      return typeof originalOnError === "function" ? originalOnError.apply(this, arguments as any) : false
    }

    setLoadingStatus("Loading secure shop components...")
    ensureEcwidScriptLoaded()
      .then(() => {
        if (cancelled) return
        const loadTime = Date.now() - loadStartTimeRef.current
        debugLog(`Script loaded after ${loadTime}ms`)
        setLoadingStatus("Script loaded, initializing shop...")
        setIsScriptLoaded(true)
      })
      .catch((err) => {
        if (cancelled) return
        debugLog("Shop script loading failed", err)
        setIsScriptError(true)
      })

    return () => {
      debugLog("Shop client unmounting, cleaning up")
      cancelled = true
      window.onerror = originalOnError as any
      cleanupQuerySelectors()
      cleanupResizeObserver()
    }
  }, [])

  // Count a shop visit only after the real storefront is visible, once per mount.
  useEffect(() => {
    if (!isShopVisible || shopVisitTrackedRef.current) return
    shopVisitTrackedRef.current = true
    trackConversion('shop_visit')
  }, [isShopVisible])

  // Ecwid can re-render product details after option/hash changes, so keep exact stock counts scrubbed.
  useEffect(() => {
    const root = shopContainerRef.current
    if (!root) return

    const scrub = () => stripVisibleStockCounts(root)
    const scheduleScrub = () => {
      if (stockScrubFrameRef.current !== null) return
      stockScrubFrameRef.current = window.requestAnimationFrame(() => {
        stockScrubFrameRef.current = null
        scrub()
      })
    }

    scrub()
    const observer = new MutationObserver(scheduleScrub)
    observer.observe(root, {
      childList: true,
      characterData: true,
      subtree: true,
    })

    const scrubTimeouts = [250, 1000, 2500, 5000].map((delay) => window.setTimeout(scrub, delay))

    return () => {
      observer.disconnect()
      scrubTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId))
      if (stockScrubFrameRef.current !== null) {
        window.cancelAnimationFrame(stockScrubFrameRef.current)
        stockScrubFrameRef.current = null
      }
    }
  }, [])

  // Initialize store when the script is present
  useEffect(() => {
    if (!isScriptLoaded || scriptLoadedRef.current) return
    debugLog("Script loaded, preparing to initialize shop")
    scriptLoadedRef.current = true
    window.setTimeout(() => {
      initializeShopComponents()
    }, 100)
  }, [initializeShopComponents, isScriptLoaded])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <ShopVideoHero
        videoId="1098348289"
        title="Our Shop"
        subtitle="Browse our selection of premium Fantic bikes and products"
      />

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Fantic Dealer & Shipping Announcement */}
          <div className="mb-6 text-center p-6 bg-secondary/50 rounded-lg shadow">
            <p className="text-xl font-semibold text-primary mb-3">
              Authorized Fantic dealer with bikes in stock
            </p>
            <p className="text-muted-foreground mb-4">
              Email us for current model availability, sizing, service, and test-ride questions.
            </p>
            <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/e-bikes">
                  <Bike className="mr-2 h-4 w-4" aria-hidden="true" /> Models, Pricing &amp; Test Rides
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="mailto:buck@olympicbootworks.com"
                  onClick={() => trackConversion('email_click', { location: 'shop_page' })}
                >
                  <Mail className="mr-2 h-4 w-4" /> Email Us About Fantic Bikes
                </a>
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-lg font-medium text-foreground flex items-center justify-center">
                <Truck className="mr-2 h-5 w-5 text-primary" />
                Shipping and pickup options available — email us for current details
              </p>
            </div>
          </div>

          {pendingPriceUpdates.map((bike) => (
            <div
              key={bike.id}
              role="alert"
              className="fantic-theme mb-6 rounded-lg border-2 border-primary bg-primary/5 p-5 text-center shadow-sm"
            >
              <p className="flex items-center justify-center gap-2 font-bold text-primary">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                {bike.name} online checkout is being updated
              </p>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-foreground">
                Buck&apos;s current price is {formatPrice(bike.price)}. Please do not use the
                {" "}{formatPrice(bike.checkoutPrice!)} online checkout for this model.
              </p>
              <Button asChild className="mt-4">
                <a
                  href={bikeInquiryUrl(bike)}
                  onClick={() => trackConversion("email_click", { location: `shop_price_update_${bike.slug}` })}
                >
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Email Buck for the {formatPrice(bike.price)} price
                </a>
              </Button>
            </div>
          ))}

          {/* Loading state */}
          {!isShopVisible && !isScriptError && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground mb-2">Loading shop...</p>
              <p className="text-sm text-muted-foreground">{loadingStatus}</p>
            </div>
          )}

          {/* Error state */}
          {isScriptError && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-destructive mb-4">Unable to load shop</h2>
              <p className="text-muted-foreground mb-6">
                We're having trouble loading our online store. Please try refreshing the page or visit again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Refresh Page
              </button>
            </div>
          )}

          {/* Shop Content - initially hidden until script initializes.
              The extra anchor ids keep older /shop#boots links scrolling here. */}
          <div
            id="store"
            className={`shop-content scroll-mt-24 ${isShopVisible ? "shop-visible" : "shop-hidden"}`}
          >
            <span id="boots" aria-hidden="true" />
            <span id="bikes" aria-hidden="true" />
            {/* Categories */}
            <div className="shop-categories-wrapper mb-8 rounded-lg border p-4 bg-card">
              <h2 className="text-xl font-semibold mb-4">Shop Categories</h2>
              <div id="my-categories-115212795" ref={categoriesContainerRef} className="shop-categories-container" />
            </div>

            {/* Product Browser */}
            <div id="my-store-115212795" ref={shopContainerRef} className="shop-embed-container" />
          </div>

          {/* Very slow connection fallback */}
          {!isShopVisible && !isScriptError && (
            <div className="mt-16 text-center opacity-0 animate-fadeIn" style={{ animationDelay: "15s" }}>
              <h3 className="text-xl font-semibold mb-4">Taking longer than expected?</h3>
              <p className="text-muted-foreground mb-4">
                Our shop is still loading. You can also contact us directly to inquire about products.
              </p>
              <a
                href="tel:+15305810747"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 mr-4"
                onClick={() => trackConversion('phone_click', { location: 'north_lake_tahoe' })}
              >
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                Call North Lake: (530) 581-0747
              </a>
              <a
                href="tel:+15306004056"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                onClick={() => trackConversion('phone_click', { location: 'south_lake_tahoe' })}
              >
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                Call South Lake: (530) 600-4056
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
