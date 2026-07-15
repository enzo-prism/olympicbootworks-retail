"use client"

import { useRef, useState } from "react"
import { Copy, Check } from "lucide-react"
import { trackConversion } from "@/lib/track-conversion"
import { cn } from "@/lib/utils"

type CopyEmailButtonProps = {
  email: string
  className?: string
  emailClassName?: string
  buttonClassName?: string
  trackingLocation?: string
  contentId?: string
  contentName?: string
}

export default function CopyEmailButton({
  email,
  className,
  emailClassName,
  buttonClassName,
  trackingLocation,
  contentId,
  contentName,
}: CopyEmailButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle")
  const emailRef = useRef<HTMLInputElement>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setStatus("copied")
      if (trackingLocation) {
        trackConversion("email_copy", { location: trackingLocation, contentId, contentName })
      }
      window.setTimeout(() => setStatus("idle"), 2500)
    } catch {
      setStatus("manual")
      emailRef.current?.focus()
      emailRef.current?.select()
      if (trackingLocation) {
        trackConversion("email_copy", { location: trackingLocation, contentId, contentName })
      }
    }
  }

  return (
    <span className={cn("inline-flex flex-wrap items-center justify-center gap-x-1", className)}>
      <span>Email app not opening?</span>
      <input
        ref={emailRef}
        readOnly
        value={email}
        size={email.length}
        onFocus={(event) => event.currentTarget.select()}
        className={cn(
          "max-w-full cursor-text bg-transparent p-0 font-medium text-current outline-none",
          emailClassName,
        )}
        aria-label="Buck's email address"
      />
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-semibold underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current",
          buttonClassName,
        )}
        aria-label={`Copy ${email}`}
      >
        {status === "copied" ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        {status === "copied" ? "Copied" : status === "manual" ? "Email selected" : "Copy email"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "copied"
          ? "Email address copied."
          : status === "manual"
            ? "Email address selected. Choose Copy from your browser or device."
            : ""}
      </span>
    </span>
  )
}
