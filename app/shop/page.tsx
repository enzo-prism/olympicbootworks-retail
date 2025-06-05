"use client"

import { useEffect, useState, useRef } from "react"
import Script from "next/script"
import { Loader2, Mail, Truck } from "lucide-react" // Added Truck icon
import { Button } from "@/components/ui/button"
import "./shop-embed.css"

// Debug utility to help identify loading issues
const DEBUG = true
const debugLog = (...args: any[]) => {
  if (DEBUG) console.log(`[Shop Debug ${new Date().toISOString()}]`, ...args)
}

export default function ShopPage() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isScriptError, setIsScriptError] = useState(false)
  const [isShopVisible, setIsShopVisible] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState("Initializing...")
  const scriptLoadedRef = useRef(false)
  const shopContainerRef = useRef<HTMLDivElement>(null)
  const categoriesContainerRef = useRef<HTMLDivElement>(null)
  const initTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const loadStartTimeRef = useRef<number>(Date.now())

  // This function patches querySelector and querySelectorAll to handle invalid selectors
  const patchQuerySelectors = () => {
    debugLog("Patching query selectors")
    // Store original methods
    const originalQuerySelector = Document.prototype.querySelector
    const originalQuerySelectorAll = Document.prototype.querySelectorAll

    // Patch querySelector
    Document.prototype.querySelector = function (selector) {
      try {
        return originalQuerySelector.call(this, selector)
      } catch (error) {
        console.warn(`Invalid selector: ${selector}. Returning null instead.`)
        return null
      }
    }

    // Patch querySelectorAll
    Document.prototype.querySelectorAll = function (selector) {
      try {
        return originalQuerySelectorAll.call(this, selector)
      } catch (error) {
        console.warn(`Invalid selector: ${selector}. Returning empty NodeList instead.`)
        return document.createDocumentFragment().childNodes // Empty NodeList
      }
    }

    // Also patch Element.prototype methods for completeness
    const originalElementQuerySelector = Element.prototype.querySelector
    const originalElementQuerySelectorAll = Element.prototype.querySelectorAll

    Element.prototype.querySelector = function (selector) {
      try {
        return originalElementQuerySelector.call(this, selector)
      } catch (error) {
        console.warn(`Invalid selector: ${selector}. Returning null instead.`)
        return null
      }
    }

    Element.prototype.querySelectorAll = function (selector) {
      try {
        return originalElementQuerySelectorAll.call(this, selector)
      } catch (error) {
        console.warn(`Invalid selector: ${selector}. Returning empty NodeList instead.`)
        return document.createDocumentFragment().childNodes // Empty NodeList
      }
    }
  }

  // Handle ResizeObserver errors
  const handleResizeObserverErrors = () => {
    debugLog("Setting up ResizeObserver error handling")
    // Store the original ResizeObserver
    const OriginalResizeObserver = window.ResizeObserver

    // Create a patched version that catches errors
    window.ResizeObserver = class PatchedResizeObserver extends OriginalResizeObserver {
      constructor(callback) {
        const patchedCallback = (entries, observer) => {
          // Wrap the callback in a requestAnimationFrame to prevent loop errors
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
      // Restore original ResizeObserver on cleanup
      window.ResizeObserver = OriginalResizeObserver
    }
  }

  // Direct script injection approach
  const injectScript = () => {
    debugLog("Manually injecting Lightspeed script")
    return new Promise<void>((resolve, reject) => {
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
  }

  // Initialize shop components directly
  const initializeShopComponents = () => {
    debugLog("Attempting to initialize shop components")
    setLoadingStatus("Initializing shop components...")

    // Clear any existing timeout
    if (initTimeoutRef.current) {
      clearTimeout(initTimeoutRef.current)
    }

    // Check if the required functions exist
    if (!window.xCategoriesV2 || !window.xProductBrowser) {
      debugLog("Shop functions not available yet, will retry")
      setLoadingStatus("Waiting for shop functions to load...")

      // Set a timeout to retry initialization
      initTimeoutRef.current = setTimeout(() => {
        debugLog("Retrying initialization")
        initializeShopComponents()
      }, 1000)
      return
    }

    try {
      debugLog("Initializing categories")
      setLoadingStatus("Loading categories...")
      window.xCategoriesV2("id=my-categories-115212795")

      debugLog("Initializing product browser")
      setLoadingStatus("Loading products...")
      window.xProductBrowser(
        "categoriesPerRow=3",
        "views=grid(20,3) list(60) table(60)",
        "categoryView=grid",
        "searchView=list",
        "id=my-store-115212795",
      )

      // Set shop as visible
      debugLog("Shop components initialized, making visible")
      setLoadingStatus("Displaying shop...")
      setIsShopVisible(true)

      // Log total load time
      const loadTime = Date.now() - loadStartTimeRef.current
      debugLog(`Total shop load time: ${loadTime}ms`)
    } catch (error) {
      debugLog("Error initializing shop components:", error)
      setIsScriptError(true)
    }
  }

  // Setup initial page state
  useEffect(() => {
    debugLog("Shop page mounted")
    loadStartTimeRef.current = Date.now()

    // Patch querySelector methods to handle invalid selectors
    patchQuerySelectors()

    // Handle ResizeObserver errors
    const cleanupResizeObserver = handleResizeObserverErrors()

    // Set up global error handler for additional script errors
    const originalOnError = window.onerror
    window.onerror = function (message, source, lineno, colno, error) {
      // Log all errors in debug mode
      debugLog("Caught error:", message, source, lineno)

      // Ignore ResizeObserver errors as they're generally non-critical
      if (message && message.toString().includes("ResizeObserver")) {
        console.warn("Caught ResizeObserver error:", message)
        return true // Prevents the error from breaking execution
      }

      // Ignore querySelector errors
      if (message && message.toString().includes("querySelector")) {
        console.warn("Caught querySelector error:", message)
        return true // Prevents the error from breaking execution
      }

      // Call original handler if it exists
      if (typeof originalOnError === "function") {
        return originalOnError.apply(this, arguments)
      }

      return false // Let other errors propagate normally
    }

    // Try direct script injection as a fallback
    const timeoutId = setTimeout(() => {
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
    }, 5000) // Wait 5 seconds before trying direct injection

    // Cleanup function
    return () => {
      debugLog("Shop page unmounting, cleaning up")
      window.onerror = originalOnError
      cleanupResizeObserver()
      clearTimeout(timeoutId)

      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current)
      }
    }
  }, [])

  // Initialize shop when script is loaded
  useEffect(() => {
    if (!isScriptLoaded || scriptLoadedRef.current) return

    debugLog("Script loaded, preparing to initialize shop")
    scriptLoadedRef.current = true

    // Small delay to ensure script is fully initialized
    setTimeout(() => {
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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Shop Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Our Shop</h1>
          <p className="text-muted-foreground">Browse our selection of premium ski and mountain bike equipment</p>
        </div>

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

        {/* Shop Content - Initially hidden until loaded */}
        <div className={`shop-content ${isShopVisible ? "shop-visible" : "shop-hidden"}`}>
          {/* Categories Navigation */}
          <div className="shop-categories-wrapper mb-8 rounded-lg border p-4 bg-card">
            <h2 className="text-xl font-semibold mb-4">Shop Categories</h2>
            <div id="my-categories-115212795" ref={categoriesContainerRef} className="shop-categories-container"></div>
          </div>

          {/* E-commerce container */}
          <div id="my-store-115212795" ref={shopContainerRef} className="shop-embed-container"></div>
        </div>

        {/* Fallback static content for very slow connections */}
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

        {/* E-commerce script - Try multiple loading strategies */}
        <Script
          src="https://app.business.shop/script.js?115212795&data_platform=code&data_date=2025-04-30"
          strategy="afterInteractive"
          onLoad={handleScriptLoad}
          onError={handleScriptError}
        />
      </div>
    </div>
  )
}
