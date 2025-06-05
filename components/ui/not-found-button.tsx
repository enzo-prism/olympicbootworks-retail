"use client"

import Link from "next/link"

export default function NotFoundButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-6 py-2 bg-[hsl(201,100%,36%)] text-white hover:bg-[hsl(201,100%,30%)] transition-colors"
    >
      Return Home
    </Link>
  )
}
