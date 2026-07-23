"use client"

import { useEffect } from "react"
import { RotateCcw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            padding: "0 1rem",
            color: "hsl(215, 45%, 12%)",
          }}
        >
          <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Something went wrong!</h1>
          <p style={{ color: "hsl(215, 16%, 47%)", maxWidth: "28rem", marginBottom: "2rem" }}>
            We're sorry, but something went wrong. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              gap: "0.5rem",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              height: "2.75rem",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              backgroundColor: "hsl(205, 70%, 31%)",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            <RotateCcw style={{ width: "1rem", height: "1rem" }} aria-hidden="true" />
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
