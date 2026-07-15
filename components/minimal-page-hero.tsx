"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import ButtonIcon from "@/components/button-icon"
import CopyEmailButton from "@/components/copy-email-button"
import { cn } from "@/lib/utils"
import { sendGa4Event } from "@/lib/gtag"
import { trackConversion } from "@/lib/track-conversion"

type HeroAction = {
  href: string
  label: string
  variant?: "primary" | "secondary"
  /** Opens in a new tab (e.g. external review link) */
  external?: boolean
  /** When set, replaces automatic ButtonIcon */
  leadingIcon?: ReactNode
}

type MinimalPageHeroProps = {
  eyebrow?: string
  title: string
  description: string
  actions?: HeroAction[]
  className?: string
}

export default function MinimalPageHero({
  eyebrow,
  title,
  description,
  actions = [],
  className,
}: MinimalPageHeroProps) {
  const emailAction = actions.find((action) => action.href.startsWith("mailto:"))
  const contactEmail = emailAction
    ? decodeURIComponent(emailAction.href.slice("mailto:".length).split("?")[0])
    : null

  const trackAction = (action: HeroAction) => {
    const location = `page_hero_${window.location.pathname.replace(/^\/|\/$/g, "").replaceAll("/", "_") || "home"}`
    if (action.href.startsWith("mailto:")) {
      trackConversion("email_click", { location })
      return
    }
    if (action.href.startsWith("tel:")) {
      trackConversion("phone_click", { location })
      return
    }
    sendGa4Event("select_content", {
      content_type: "page_hero_cta",
      item_id: action.label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "_").replaceAll(/^_|_$/g, ""),
      destination: action.href,
    })
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b bg-gradient-to-b from-sky-50/80 via-white to-white",
        "dark:from-slate-950 dark:via-background dark:to-background",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            {description}
          </p>

          {actions.length > 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {actions.map((action) => {
                const content = (
                  <>
                    {action.leadingIcon ?? <ButtonIcon label={action.label} href={action.href} />}
                    {action.label}
                  </>
                )
                const linkProps = {
                  onClick: () => trackAction(action),
                  ...(action.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {}),
                }
                const usesNativeNavigation =
                  action.href.startsWith("mailto:") ||
                  action.href.startsWith("tel:") ||
                  /^https?:\/\//.test(action.href)

                return (
                  <Button
                    key={`${action.href}-${action.label}`}
                    asChild
                    size="lg"
                    variant={action.variant === "secondary" ? "outline" : "default"}
                    className="min-w-40 shadow-sm"
                  >
                    {usesNativeNavigation ? (
                      <a href={action.href} {...linkProps}>{content}</a>
                    ) : (
                      <Link href={action.href} {...linkProps}>{content}</Link>
                    )}
                  </Button>
                )
              })}
            </div>
          ) : null}

          {contactEmail ? (
            <CopyEmailButton
              email={contactEmail}
              className="mt-4 text-sm text-muted-foreground"
              emailClassName="text-foreground"
              buttonClassName="text-primary"
              trackingLocation="page_hero_email_copy"
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}
