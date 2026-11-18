"use client"

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react"
import { shopSchedule, tahoeDate, type LocationData } from "@/data/locations"

const ShopDate = createContext<string | null>(null)
const currentShopDate = () => tahoeDate(new Date())

// Also refresh tabs left open overnight, including tabs reopened after device sleep.
function subscribe(listener: () => void) {
  let timer: number
  function tick() {
    listener()
    timer = window.setTimeout(tick, 60_000 - Date.now() % 60_000)
  }
  timer = window.setTimeout(tick, 60_000 - Date.now() % 60_000)
  document.addEventListener("visibilitychange", listener)
  return () => {
    window.clearTimeout(timer)
    document.removeEventListener("visibilitychange", listener)
  }
}

export function ShopDateProvider({ date, children }: { date: string; children: ReactNode }) {
  const localDate = useSyncExternalStore(subscribe, currentShopDate, () => date)
  return <ShopDate.Provider value={localDate}>{children}</ShopDate.Provider>
}

export function useShopHours(location: LocationData) {
  const date = useContext(ShopDate)
  if (!date) throw new Error("Shop hours require a local shop date")
  return shopSchedule(location, date)
}

export function ShopHours({ location, details = false }: { location: LocationData; details?: boolean }) {
  const { summary, notice } = useShopHours(location)
  return <>{summary}.{details && <span className="mt-2 block">{notice}</span>}</>
}
