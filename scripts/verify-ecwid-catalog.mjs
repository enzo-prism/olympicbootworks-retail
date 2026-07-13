import { readFile } from "node:fs/promises"
import ts from "typescript"

const STORE_ID = 115212795
const STOREFRONT_API = `https://us-vir5-storefront-api.ecwid.com/storefront/api/v1/${STORE_ID}/catalog`

async function loadLocalCatalog() {
  const source = await readFile(new URL("../data/bikes.ts", import.meta.url), "utf8")
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  })
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  return (await import(moduleUrl)).bikes
}

async function loadEcwidCatalog() {
  const response = await fetch(STOREFRONT_API, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      referer: "https://www.olympicbootworks.com/",
    },
    body: JSON.stringify({
      categoryViewMode: "COLLAPSED",
      parentCategoryId: 0,
      pagination: { offset: 0, limit: 100 },
      urlParams: {
        urlType: "HASH_BASED",
        baseUrl: "",
        canonicalBaseUrl: "",
        isCleanUrls: false,
        isCanonicalUrlsEnabled: false,
        isSlugsWithoutIds: false,
        isTrailingSlash: false,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Ecwid catalog request failed: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  return (payload.expandedCategories ?? []).flatMap((category) => category.products ?? [])
}

function normalizeEcwidProduct(product) {
  const prices = product.defaultOptionsOverrides?.pricesOverrides
  const variation = product.defaultOptionsOverrides?.variationOverrides
  const mainImage = variation?.mediaItems?.find((item) => item.isMain)

  return {
    id: product.identifier?.productId,
    name: product.name,
    price: prices?.basePrice,
    compareAtPrice: prices?.strikethroughPrice?.price,
    inStock: !product.flags?.isAllVariationsSoldOut,
    image: mainImage?.image800pxUrl,
  }
}

const localProducts = await loadLocalCatalog()
const ecwidProducts = (await loadEcwidCatalog()).map(normalizeEcwidProduct)
const ecwidById = new Map(ecwidProducts.map((product) => [product.id, product]))
const localIds = new Set(localProducts.map((product) => product.id))
const errors = []

for (const local of localProducts) {
  const live = ecwidById.get(local.id)
  if (!live) {
    errors.push(`${local.id} ${local.name}: missing from live Ecwid catalog`)
    continue
  }

  for (const key of ["name", "price", "compareAtPrice", "inStock", "image"]) {
    if (local[key] !== live[key]) {
      errors.push(`${local.id} ${local.name}: ${key} is ${JSON.stringify(local[key])} locally, ${JSON.stringify(live[key])} in Ecwid`)
    }
  }

  if (!local.shopUrl.endsWith(`/p/${local.id}`)) {
    errors.push(`${local.id} ${local.name}: shopUrl does not end with its Ecwid product ID`)
  }
}

for (const live of ecwidProducts) {
  if (!localIds.has(live.id)) {
    errors.push(`${live.id} ${live.name}: live Ecwid product is missing from data/bikes.ts`)
  }
}

if (errors.length > 0) {
  console.error("Ecwid catalog is out of sync:\n")
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`Ecwid catalog verified: ${localProducts.length} products match live prices, stock, names, images, and IDs.`)
}
