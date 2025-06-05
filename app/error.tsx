"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error)
  }, [error])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        textAlign: "center",
        padding: "0 1rem",
      }}
    >
      <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Something went wrong!</h1>
      <p style={{ color: "#6b7280", maxWidth: "28rem", marginBottom: "2rem" }}>
        We're sorry, but something went wrong. Please try again or return to the home page.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            height: "2.75rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            backgroundColor: "hsl(201, 100%, 36%)",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            height: "2.75rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            border: "1px solid #e2e8f0",
            backgroundColor: "transparent",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
