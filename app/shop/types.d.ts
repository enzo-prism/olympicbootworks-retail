// Type definitions for the e-commerce platform
interface Window {
  xProductBrowser?: (...args: string[]) => void
  xCategoriesV2?: (...args: string[]) => void
  xProductBrowserCallback?: () => void
  _xnext_initialization_scripts_loaded?: boolean
  ec?: {
    storefront?: {
      product_details_show_in_stock_label?: boolean
      product_details_show_number_of_items_in_stock?: boolean
    }
  }
  Ecwid?: {
    init: () => void
    refreshConfig?: () => void
  }
  ResizeObserver: typeof ResizeObserver
}
