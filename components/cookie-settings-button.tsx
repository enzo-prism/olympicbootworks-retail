"use client"

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/tracking-consent"

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      Cookie preferences
    </button>
  )
}
