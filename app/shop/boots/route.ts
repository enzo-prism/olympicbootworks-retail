// The legacy boot storefront URL now lands on the ski boots and fitting page,
// which leads with the in-stock section.
const BOOTS_URL = "https://www.olympicbootworks.com/boot-fitting"

const redirectToBoots = () =>
  new Response(null, {
    status: 308,
    headers: { Location: BOOTS_URL },
  })

// Keep the destination independent of request and forwarded-host values so a
// deployment proxy cannot leak its internal origin into the public redirect.
export const GET = redirectToBoots
export const HEAD = redirectToBoots
