import Link from "next/link"
import { notFound } from "next/navigation"
import SiteImage from "@/components/site-image"
import { fittingServices, fittingServiceUrl } from "@/data/fitting-services"
import { locations, locationUrl } from "@/data/locations"
import { breadcrumbJsonLd, ORGANIZATION_ID, pageMetadata, serializeJsonLd, SITE_URL } from "@/lib/seo"

type Props = { params: Promise<{ service: string }> }
export const dynamicParams = false
export function generateStaticParams() {
  return fittingServices.map(({ slug }) => ({ service: slug }))
}

function getService(slug: string) {
  return fittingServices.find((item) => item.slug === slug) ?? notFound()
}

export async function generateMetadata({ params }: Props) {
  const service = getService((await params).service)
  return pageMetadata({ ...service, path: fittingServiceUrl(service.slug) })
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).service)
  const path = fittingServiceUrl(service.slug)
  const schema = [
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Boot fitting", path: "/boot-fitting" }, { name: service.name, path }]),
    {
      "@context": "https://schema.org", "@type": "Service", "@id": `${SITE_URL}${path}#service`,
      name: service.name, url: SITE_URL + path, description: service.description,
      provider: { "@id": ORGANIZATION_ID }, areaServed: locations.map((shop) => shop.address.city),
      availableChannel: locations.map((shop) => ({
        "@type": "ServiceChannel", serviceUrl: SITE_URL + locationUrl(shop),
        serviceLocation: { "@id": `${SITE_URL}/#${shop.id}` },
      })),
    },
  ]
  return (
    <article className="container mx-auto max-w-6xl px-4 py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link className="text-primary hover:underline" href="/boot-fitting">Boot fitting</Link> / {service.name}
      </nav>
      <div className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <header>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{service.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{service.intro}</p>
          <a href="#choose-shop" className="mt-5 inline-block font-semibold text-primary underline underline-offset-4">Choose a fitting location</a>
        </header>
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
            <SiteImage src={service.image} alt={service.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground">{service.caption}</figcaption>
        </figure>
      </div>
      <div className="my-12 grid gap-8 border-y py-10 md:grid-cols-3">
        {service.sections.map(({ title, text }) => (
          <section key={title}>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
          </section>
        ))}
      </div>
      <section id="choose-shop" className="scroll-mt-36">
        <h2 className="text-3xl font-semibold">Arrange your fitting</h2>
        <p className="mt-3 text-muted-foreground">Choose your shop for hours, directions and a fitting request by email or phone.</p>
        <div className="mt-5 flex flex-wrap gap-4">
          {locations.map((shop) => <Link key={shop.id} href={locationUrl(shop)} className="rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90">{shop.address.city} fitting appointments</Link>)}
        </div>
      </section>
    </article>
  )
}
