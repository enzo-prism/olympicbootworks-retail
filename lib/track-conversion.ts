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

function waitForGtag(callback: () => void, maxRetries = 20, delay = 100) {
  if (typeof window === 'undefined') {
    return
  }

  let retries = 0
  const checkGtag = () => {
    if (window.gtag) {
      callback()
    } else if (retries < maxRetries) {
      retries++
      setTimeout(checkGtag, delay)
    } else {
      console.warn('Google Ads tracking: gtag not available after waiting')
    }
  }
  checkGtag()
}

export function trackConversion(type: ConversionType, options: ConversionOptions = {}) {
  if (typeof window === 'undefined') {
    return
  }

  const { value = 1.0, currency = 'USD', location } = options

  const sendConversion = () => {
    if (!window.gtag) {
      console.warn('Google Ads tracking: gtag not available')
      return
    }

    window.gtag('event', 'conversion', {
      send_to: 'AW-17608821238/ZWXjCI_f_aUbEPaTxcxB',
      value,
      currency,
      event_category: 'engagement',
      event_label: location ? `${type}_${location}` : type,
    })
  }

  if (window.gtag) {
    sendConversion()
  } else {
    waitForGtag(sendConversion)
  }
}
