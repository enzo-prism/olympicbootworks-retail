// Type definitions for the e-commerce platform
interface Window {
  xProductBrowser?: (...args: string[]) => void
  xCategoriesV2?: (...args: string[]) => void
  xProductBrowserCallback?: () => void
  ResizeObserver: typeof ResizeObserver
}
