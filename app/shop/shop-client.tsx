"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import { Loader2, Mail, Truck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ShopVideoHero from "@/components/shop-video-hero"
import "./shop-embed.css"

const DEBUG = true
const debugLog = (...args: any[]) => {
  if (DEBUG) console.log(`[Shop Debug ${new Date().toISOString()}]`, ...args)
}

export default function ShopClient() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isScriptError, setIsScriptError] = useState(false)
  const [isShopVisible, setIsShopVisible] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState("Initializing...")

  const scriptLoadedRef = useRef(false)
  const shopContainerRef = useRef<HTMLDivElement>(null)
  const categoriesContainerRef = useRef<HTMLDivElement>(null)
  const initTimeoutRef = useRef<number | null>(null)
  const loadStartTimeRef = useRef<number>(Date.now())

  // Patch querySelector errors from third-party script
  const patchQuerySelectors = () => {
    debugLog("Patching query selectors")
    const originalQuerySelector = Document.prototype.querySelector
    const originalQuerySelectorAll = Document.prototype.querySelectorAll

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

    const originalElementQuerySelector = Element.prototype.querySelector
    const originalElementQuerySelectorAll = Element.prototype.querySelectorAll

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
  }

  // Make ResizeObserver callback failures non-fatal
  const handleResizeObserverErrors = () => {
    debugLog("Setting up ResizeObserver error handling")
    const OriginalResizeObserver = window.ResizeObserver

    // @ts-expect-error - we are intentionally monkey-patching for resiliency
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

  // Fallback: manually inject the Lightspeed script
  const injectScript = () =>
    new Promise<void>((resolve, reject) => {
      debugLog("Manually injecting Lightspeed script")
      const script = document.createElement("script")
      script.src = "https://app.business.shop/script.js?115212795&data_platform=code&data_date=2025-04-30"
      script.async = true
      script.onload = () => {
        debugLog("Manual script injection completed")
        resolve()
      }
      script.onerror = (err) => {
        debugLog("Manual script injection failed", err)
        reject(err)
      }
      document.head.appendChild(script)
    })

  // Initialize the embedded store
  const initializeShopComponents = () => {
    debugLog("Attempting to initialize shop components")
    setLoadingStatus("Initializing shop components...")

    if (initTimeoutRef.current) {
      window.clearTimeout(initTimeoutRef.current)
      initTimeoutRef.current = null
    }

    const w = window as any
    if (!w.xCategoriesV2 || !w.xProductBrowser) {
      debugLog("Shop functions not available yet, will retry")
      setLoadingStatus("Waiting for shop functions to load...")
      initTimeoutRef.current = window.setTimeout(() => {
        debugLog("Retrying initialization")
        initializeShopComponents()
      }, 1000)
      return
    }

    try {
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
        "id=my-store-115212795",
      )

      debugLog("Shop components initialized, making visible")
      setLoadingStatus("Displaying shop...")
      setIsShopVisible(true)

      const loadTime = Date.now() - loadStartTimeRef.current
      debugLog(`Total shop load time: ${loadTime}ms`)
    } catch (error) {
      debugLog("Error initializing shop components:", error)
      setIsScriptError(true)
    }
  }

  // Setup page and fallbacks
  useEffect(() => {
    debugLog("Shop client mounted")
    loadStartTimeRef.current = Date.now()
    patchQuerySelectors()
    const cleanupResizeObserver = handleResizeObserverErrors()

    const originalOnError = window.onerror
    window.onerror = function (message, source, lineno, colno, error) {
      debugLog("Caught error:", message, source, lineno)
      const msg = String(message ?? "")
      if (msg.includes("ResizeObserver") || msg.includes("querySelector")) {
        console.warn("Caught non-critical error:", message)
        return true
      }
      return typeof originalOnError === "function" ? originalOnError.apply(this, arguments as any) : false
    }

    const timeoutId = window.setTimeout(() => {
      if (!isScriptLoaded && !isScriptError) {
        debugLog("Script loading timeout reached, trying direct injection")
        setLoadingStatus("Script loading timeout, trying alternative method...")
        injectScript()
          .then(() => {
            debugLog("Direct script injection successful")
            setIsScriptLoaded(true)
          })
          .catch((err) => {
            debugLog("Direct script injection failed", err)
            setIsScriptError(true)
          })
      }
    }, 5000)

    return () => {
      debugLog("Shop client unmounting, cleaning up")
      window.onerror = originalOnError as any
      cleanupResizeObserver()
      window.clearTimeout(timeoutId)
      if (initTimeoutRef.current) {
        window.clearTimeout(initTimeoutRef.current)
        initTimeoutRef.current = null
      }
    }
  }, [isScriptError, isScriptLoaded])

  // Initialize store when the script is present
  useEffect(() => {
    if (!isScriptLoaded || scriptLoadedRef.current) return
    debugLog("Script loaded, preparing to initialize shop")
    scriptLoadedRef.current = true
    window.setTimeout(() => {
      initializeShopComponents()
    }, 100)
  }, [isScriptLoaded])

  const handleScriptLoad = () => {
    const loadTime = Date.now() - loadStartTimeRef.current
    debugLog(`Script loaded after ${loadTime}ms`)
    setLoadingStatus("Script loaded, initializing shop...")
    setIsScriptLoaded(true)
  }

  const handleScriptError = () => {
    debugLog("Script loading failed")
    setIsScriptError(true)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Shop</h1>
        <p className="mt-3 text-muted-foreground">
          Browse our selection of premium Fantic bikes and products.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-md p-4">Product placeholder</div>
        <div className="border rounded-md p-4">Product placeholder</div>
        <div className="border rounded-md p-4">Product placeholder</div>
      </section>

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
              Authorized Fantic dealer! Largest inventory in the USA
            </p>
            <p className="text-muted-foreground mb-4">
              Email us any questions about these very special bikes, as we have been Fantic dealers for 8 years!
            </p>
            <Button asChild className="mb-4">
              <a href="mailto:buck@olympicbootworks.com">
                <Mail className="mr-2 h-4 w-4" /> Email Us About Fantic Bikes
              </a>
            </Button>
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-lg font-medium text-foreground flex items-center justify-center">
                <Truck className="mr-2 h-5 w-5 text-primary" />
                Nationwide shipping $299 (add to checkout)
              </p>
            </div>
          </div>

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
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Refresh Page
              </button>
            </div>
          )}

          {/* Shop Content - initially hidden until script initializes */}
          <div className={`shop-content ${isShopVisible ? "shop-visible" : "shop-hidden"}`}>
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
                className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 mr-4"
              >
                Call North Lake: (530) 581-0747
              </a>
              <a
                href="tel:+15306004056"
                className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Call South Lake: (530) 600-4056
              </a>
            </div>
          )}

          {/* Third-party e-commerce script */}
          <Script
            src="https://app.business.shop/script.js?115212795&data_platform=code&data_date=2025-04-30"
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
            onError={handleScriptError}
          />
        </div>
      </div>
    </div>
  )
}
