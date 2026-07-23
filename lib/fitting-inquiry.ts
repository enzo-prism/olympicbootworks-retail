/**
 * Prefilled boot-fitting inquiry mailto, mirroring bikeInquiryUrl in data/bikes.ts.
 * In an inquiry-first model the mailto template is the intake form — this makes
 * fitting requests arrive as pre-qualified as bike inquiries do.
 */
export type FittingInquiryOptions = {
  email?: string
  locationName?: string
}

/**
 * Raw parts of the fitting-inquiry template so copy-to-clipboard fallbacks
 * (CopyEmailButton) can reuse the exact same text as the mailto link.
 */
export const fittingInquiryParts = (options?: FittingInquiryOptions) => {
  const email = options?.email ?? "buck@olympicbootworks.com"
  const subject = "Boot fitting appointment request"
  const locationLine = options?.locationName
    ? `Preferred location: ${options.locationName}`
    : "Preferred location (Olympic Valley / South Lake Tahoe):"
  const body = `Hi Buck,\n\nI'd like to request a custom boot fitting.\n\n${locationLine}\nPreferred dates and times:\nSport and discipline:\nCurrent boots (brand and model, if any):\nMain fit issues or goals:\n\nThank you.`
  return { email, subject, body }
}

export const fittingInquiryUrl = (options?: FittingInquiryOptions) => {
  const { email, subject, body } = fittingInquiryParts(options)
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
