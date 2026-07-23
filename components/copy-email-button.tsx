"use client"

import { useRef, useState } from "react"
import { Copy, Check } from "lucide-react"
import { trackConversion } from "@/lib/track-conversion"
import { cn } from "@/lib/utils"

type CopyEmailButtonProps = {
  email: string
  /** With `body`, the button copies the full composed inquiry instead of just the address. */
  subject?: string
  /** With `subject`, the button copies the full composed inquiry instead of just the address. */
  body?: string
  className?: string
  emailClassName?: string
  buttonClassName?: string
  trackingLocation?: string
  contentId?: string
  contentName?: string
}

export default function CopyEmailButton({
  email,
  subject,
  body,
  className,
  emailClassName,
  buttonClassName,
  trackingLocation,
  contentId,
  contentName,
}: CopyEmailButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle")
  const emailRef = useRef<HTMLInputElement>(null)

  const isFullInquiry = subject !== undefined && body !== undefined
  const copyText = isFullInquiry ? `To: ${email}\nSubject: ${subject}\n\n${body}` : email

  const track = () => {
    if (trackingLocation) {
      trackConversion("email_copy", {
        location: isFullInquiry ? `${trackingLocation}_full_inquiry` : trackingLocation,
        contentId,
        contentName,
      })
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
      setStatus("copied")
      track()
      window.setTimeout(() => setStatus("idle"), 2500)
    } catch {
      setStatus("manual")
      emailRef.current?.focus()
      emailRef.current?.select()
      track()
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
        aria-label={isFullInquiry ? `Copy full inquiry for ${email}` : `Copy ${email}`}
      >
        {status === "copied" ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        {status === "copied"
          ? "Copied"
          : status === "manual"
            ? "Email selected"
            : isFullInquiry
              ? "Copy full inquiry"
              : "Copy email"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "copied"
          ? isFullInquiry
            ? "Full inquiry copied."
            : "Email address copied."
          : status === "manual"
            ? "Email address selected. Choose Copy from your browser or device."
            : ""}
      </span>
    </span>
  )
}
