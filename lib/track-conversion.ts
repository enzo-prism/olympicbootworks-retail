declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void
  }
}

export type ConversionType = 'email_click' | 'phone_click' | 'shop_visit' | 'contact_page_view'

interface ConversionOptions {
  value?: number
  currency?: string
  location?: string
}

export function trackConversion(type: ConversionType, options: ConversionOptions = {}) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  const { value = 1.0, currency = 'USD', location } = options

  window.gtag('event', 'conversion', {
    send_to: 'AW-17608821238/ZWXjCI_f_aUbEPaTxcxB',
    value,
    currency,
    event_category: 'engagement',
    event_label: location ? `${type}_${location}` : type,
  })
}
