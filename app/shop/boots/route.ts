const CONTACT_URL = "https://www.olympicbootworks.com/contact"

const redirectToContact = () =>
  new Response(null, {
    status: 308,
    headers: { Location: CONTACT_URL },
  })

// Keep the destination independent of request and forwarded-host values so a
// deployment proxy cannot leak its internal origin into the public redirect.
export const GET = redirectToContact
export const HEAD = redirectToContact
