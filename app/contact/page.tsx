import type { Metadata } from "next"
import ContactClient from "./contact-client"

export const metadata: Metadata = {
title: "Contact",
description: "Schedule an appointment or ask our team a question.",
alternates: { canonical: "/contact" },
openGraph: {
  title: "Contact | Olympic Bootworks",
  description: "Schedule an appointment or ask our team a question.",
  url: "https://www.olympicbootworks.com/contact",
  type: "website",
},
}

export default function ContactPage() {
// Server Component: only handles metadata and composes the client UI
return <ContactClient />
}
