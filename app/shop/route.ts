const EBIKES_URL = "https://www.olympicbootworks.com/e-bikes"

const redirectToEbikes = () =>
  new Response(null, {
    status: 308,
    headers: { Location: EBIKES_URL },
  })

// Legacy storefront route. The canonical bike journey lives at /e-bikes; keep
// the destination independent of request values (see app/shop/boots/route.ts).
export const GET = redirectToEbikes
export const HEAD = redirectToEbikes
