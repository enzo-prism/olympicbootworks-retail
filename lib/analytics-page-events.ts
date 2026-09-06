import type { Bike } from "@/data/bikes"

/** Passive context events belong to a consented page view, never component mount. */
export function analyticsPageEvent(pathname: string, bikes: Pick<Bike, "slug" | "name" | "price" | "family">[]) {
  if (pathname === "/contact") {
    return { name: "contact_funnel", params: { funnel_step: "contact_page", surface: "contact_page" } }
  }
  if (pathname === "/e-bikes") {
    return { name: "view_item_list", params: { item_list_id: "fantic_ebikes", item_list_name: "Fantic E-Bikes", surface: "ebikes_hub" } }
  }
  const bike = bikes.find((item) => pathname === `/e-bikes/${item.slug}`)
  if (!bike) return null
  return {
    name: "view_item",
    params: {
      currency: "USD",
      value: bike.price,
      items: [{ item_id: bike.slug, item_name: `Fantic ${bike.name}`, item_brand: "Fantic", item_category: bike.family, price: bike.price, quantity: 1 }],
    },
  }
}
