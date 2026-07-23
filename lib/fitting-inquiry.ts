/**
 * Prefilled boot-fitting inquiry mailto, mirroring bikeInquiryUrl in data/bikes.ts.
 * In an inquiry-first model the mailto template is the intake form — this makes
 * fitting requests arrive as pre-qualified as bike inquiries do.
 */
export const fittingInquiryUrl = () => {
  const subject = "Boot fitting appointment request"
  const body = `Hi Buck,\n\nI'd like to request a custom boot fitting.\n\nPreferred location (Olympic Valley / South Lake Tahoe):\nPreferred dates and times:\nSport and discipline:\nCurrent boots (brand and model, if any):\nMain fit issues or goals:\n\nThank you.`
  return `mailto:buck@olympicbootworks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
