import { NextResponse } from "next/server"

// Use HTTP 308 redirect with no HTML body, avoiding meta refresh for crawlers.
export async function GET(request: Request) {
  const url = new URL("/shop#boots", new URL(request.url).origin)
  return NextResponse.redirect(url, 308)
}

export async function HEAD(request: Request) {
  const url = new URL("/shop#boots", new URL(request.url).origin)
  return NextResponse.redirect(url, 308)
}
