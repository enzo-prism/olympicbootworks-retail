import "./pros.css"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VimeoVideoHero from "@/components/vimeo-video-hero"
import { Instagram, Twitter, Globe, ArrowRight, Calendar, Users, Award } from 'lucide-react'
import AthleteProfileCard from "@/components/athlete-profile-card"
import VimeoApiScript from "@/components/vimeo-api-script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pros",
  description: "Pro services and partnerships at Olympic Bootworks.",
  alternates: { canonical: "/pros" },
}

export default function ProsPage() {
  return (
    <div className="flex flex-col">
      {/* Load Vimeo API */}
      <VimeoApiScript />

      {/* Hero Section with Vimeo Background */}
      <VimeoVideoHero
        title="Our Pro Athletes"
        subtitle="World-class athletes who trust Olympic Bootworks for peak performance"
        videoId="1096995547"
        height="small"
      />
      <noscript>
        <section className="container mx-auto px-4 py-6 text-sm">
          <p>
            Our pro athletes rely on custom boot fitting, Heel-Loc technology, and ZipFit liners for podium-level performance. Explore featured athletes and the tech behind their setups.
          </p>
        </section>
      </noscript>

      {/* Enhanced Intro Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/pro-team.jpg"
                alt="Professional athletes with Olympic Bootworks"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-2">
                Elite Performance
              </div>
              <h2 className="text-3xl font-bold mb-4">Performance Driven by Precision</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Olympic Bootworks, we're proud to support some of the world's top athletes in their pursuit of
                excellence. Our custom boot fitting and equipment expertise give these professionals the edge they need
                to perform at the highest level.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <Award className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Olympic Athletes</h3>
                    <p className="text-sm text-muted-foreground">
                      Trust our precision fitting for medal-winning performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">World Champions</h3>
                    <p className="text-sm text-muted-foreground">Rely on our expertise for competitive advantage</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild className="shadow-sm">
                  <Link href="/contact">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book a Pro-Level Fitting
                  </Link>
                </Button>
                <Button asChild variant="outline" className="shadow-sm bg-transparent">
                  <Link href="#alpine">View Our Athletes</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Athlete Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/travis-ganong.jpeg"
                alt="Travis Ganong, Professional Ski Racer"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-6">
              <Badge className="px-3 py-1 text-sm bg-primary text-primary-foreground">Featured Athlete</Badge>
              <h2 className="text-4xl font-bold">Travis Ganong</h2>
              <p className="text-xl font-medium text-muted-foreground">World Cup Alpine Ski Racer</p>

              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="px-3 py-1">
                  Olympic Athlete
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  World Cup Podiums
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  US National Champion
                </Badge>
              </div>

              <p className="text-muted-foreground">
                Travis Ganong is one of America's premier downhill skiers, competing at the highest level of alpine
                racing. With multiple World Cup podiums and Olympic appearances, Travis relies on Olympic Bootworks to
                give him the precision and performance he needs on race day.
              </p>

              <blockquote className="border-l-4 border-primary pl-4 italic">
                "The team at Olympic Bootworks understands what it takes to make a boot perform at the highest level.
                Their attention to detail and expertise have been crucial to my success on the World Cup circuit."
              </blockquote>

              <div className="flex items-center gap-4">
                <Button asChild className="gap-2 shadow-sm">
                  <Link href="/contact">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book a Pro Fitting
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" asChild className="shadow-sm">
                    <Link href="https://www.instagram.com/travisganong/" target="_blank">
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="shadow-sm">
                    <Link href="https://twitter.com/travisganong" target="_blank">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="shadow-sm">
                    <Link href="https://www.travisganong.com/" target="_blank">
                      <Globe className="h-5 w-5" />
                      <span className="sr-only">Website</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Athlete Categories - Enhanced with more details */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Elite Athletes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Olympic Bootworks proudly supports athletes across multiple disciplines, providing custom solutions that
              enhance performance in the most demanding conditions.
            </p>
          </div>

          <Tabs defaultValue="alpine" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="alpine" id="alpine">
                  Alpine
                </TabsTrigger>
                <TabsTrigger value="freeride" id="freeride">
                  Freeride
                </TabsTrigger>
                <TabsTrigger value="expedition" id="expedition">
                  Expedition
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Alpine Athletes */}
            <TabsContent value="alpine" className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bryce Bennett */}
                <AthleteProfileCard
                  name="Bryce Bennett"
                  title="World Cup Downhill Specialist"
                  description="Standing at 6'7&quot;, Bryce Bennett is one of the tallest athletes on the World Cup circuit. His unique physique requires specialized boot fitting to maximize power transfer and control. Olympic Bootworks has been instrumental in creating a custom setup that accommodates his height while maintaining precision."
                  achievements={[{ label: "World Cup Top 5" }, { label: "Olympian" }]}
                  shopLink="/contact"
                  shopLabel="Book a Fitting"
                  gradientColors="linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)"
                />

                {/* KC Oakley */}
                <AthleteProfileCard
                  name="KC Oakley"
                  title="Freestyle & Mogul Specialist"
                  description="KC Oakley's dynamic skiing style in moguls and freestyle events demands boots that provide both flexibility and support. Olympic Bootworks has developed a custom fitting process that allows for the precise flex pattern needed for mogul competition while maintaining lateral stability for landings."
                  achievements={[{ label: "World Cup Competitor" }, { label: "US Team" }]}
                  shopLink="/contact"
                  shopLabel="Book a Fitting"
                  gradientColors="linear-gradient(135deg, #075985 0%, #0ea5e9 100%)"
                />
              </div>

              <div className="text-center">
                <Button variant="outline" className="gap-2 shadow-sm bg-transparent">
                  View All Alpine Athletes
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Freeride Athletes */}
            <TabsContent value="freeride" className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Ralph Backstrom */}
                <AthleteProfileCard
                  name="Ralph Backstrom"
                  title="Professional Snowboarder"
                  description="Ralph Backstrom is a legendary big mountain snowboarder with multiple Freeride World Tour podiums. Olympic Bootworks provides Ralph with custom boot fitting and board setup that gives him the response and control needed for high-consequence lines in Alaska and beyond."
                  achievements={[{ label: "Freeride World Tour" }, { label: "X-Games Medalist" }]}
                  shopLink="/contact"
                  shopLabel="Book a Fitting"
                  gradientColors="linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)"
                />

                {/* Shelley Robertson */}
                <AthleteProfileCard
                  name="Shelley Robertson"
                  title="Professional Freeskier"
                  description="Shelley Robertson pushes the boundaries of women's big mountain skiing. Her aggressive style requires boots that can handle high-speed, technical terrain. Olympic Bootworks has developed a custom boot setup that provides the stiffness and precision needed for her demanding skiing."
                  achievements={[{ label: "Film Athlete" }, { label: "Expedition Skier" }]}
                  shopLink="/contact"
                  shopLabel="Book a Fitting"
                  gradientColors="linear-gradient(135deg, #6d28d9 0%, #a78bfa 100%)"
                />
              </div>

              <div className="text-center">
                <Button variant="outline" className="gap-2 shadow-sm bg-transparent">
                  View All Freeride Athletes
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Expedition Athletes */}
            <TabsContent value="expedition" className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Adrian Ballinger */}
                <AthleteProfileCard
                  name="Adrian Ballinger"
                  title="Professional Mountaineer"
                  description="Adrian Ballinger is an IFMGA mountain guide and eight-time Everest summiter who has climbed the world's highest peaks. Olympic Bootworks provides Adrian with custom mountaineering boot modifications that balance warmth, weight, and performance for high-altitude expeditions."
                  achievements={[{ label: "Everest Summits" }, { label: "K2 Without Oxygen" }]}
                  shopLink="/contact"
                  shopLabel="Book a Fitting"
                  gradientColors="linear-gradient(135deg, #064e3b 0%, #10b981 100%)"
                />

                {/* Doug Stoup */}
                <AthleteProfileCard
                  name="Doug Stoup"
                  title="Polar Explorer"
                  description="Doug Stoup is a renowned polar explorer who has led expeditions to both the North and South Poles. Olympic Bootworks has developed specialized boot modifications for Doug that provide insulation and moisture management for the extreme conditions he faces in polar environments."
                  achievements={[{ label: "North Pole" }, { label: "South Pole" }, { label: "Antarctica Guide" }]}
                  shopLink="/contact"
                  shopLabel="Book a Fitting"
                  gradientColors="linear-gradient(135deg, #065f46 0%, #34d399 100%)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Tom Day */}
                <AthleteProfileCard
                  name="Tom Day"
                  title="Ski Filmmaker"
                  description="Tom Day is a legendary ski filmmaker whose work with Warren Miller Entertainment has defined the genre. As both a filmmaker and expert skier, Tom relies on Olympic Bootworks to provide boots that allow him to ski challenging terrain while carrying camera equipment."
                  achievements={[{ label: "Warren Miller" }, { label: "Award-Winning Filmmaker" }]}
                  shopLink="/contact"
                  shopLabel="Book a Fitting"
                  gradientColors="linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)"
                />

                {/* Andrew Draper */}
                <AthleteProfileCard
                  name="Andrew Draper"
                  title="Professional Mountain Guide"
                  description="Andrew Draper is an AMGA-certified ski mountaineering guide who leads clients in the most challenging terrain. Olympic Bootworks provides Andrew with boots that balance uphill efficiency with downhill performance, crucial for long days guiding in the backcountry."
                  achievements={[{ label: "AMGA Certified" }, { label: "Expedition Leader" }]}
                  shopLink="/contact"
                  shopLabel="Book a Fitting"
                  gradientColors="linear-gradient(135deg, #115e59 0%, #5eead4 100%)"
                />
              </div>

              <div className="text-center">
                <Button variant="outline" className="gap-2 shadow-sm bg-transparent">
                  View All Expedition Athletes
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* New Pro Technology Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
              Pro-Level Technology
            </div>
            <h2 className="text-3xl font-bold mb-4">The Competitive Edge</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the advanced technologies and techniques that give our professional athletes the edge in
              competition and extreme environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="h-48 relative rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/fitting-process-2.jpg"
                  alt="Custom Boot Fitting Process"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Heel-Loc Technology</h3>
              <p className="text-muted-foreground mb-4">
                Our proprietary Heel-Loc technology provides unmatched heel hold and alignment, creating a solid
                foundation for power transfer and control in demanding conditions.
              </p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="h-48 relative rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/buck-with-boot.jpg"
                  alt="ZipFit Liner Customization"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">ZipFit Liner Customization</h3>
              <p className="text-muted-foreground mb-4">
                As the #1 worldwide dealer for ZipFit liners, we provide professional athletes with cork-composite
                liners that offer superior performance and adaptability.
              </p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="h-48 relative rounded-lg overflow-hidden mb-6">
                <Image src="/images/fitting-process.jpg" alt="Pro Shell Modification" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pro Shell Modification</h3>
              <p className="text-muted-foreground mb-4">
                Our advanced shell modification techniques allow us to create the perfect fit for each athlete's unique
                foot shape and performance requirements.
              </p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Pro-Level Service</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Whether you're a competitive athlete or a passionate enthusiast, our team can help you achieve your
            performance goals with the same expertise we provide to the pros.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="gap-2 shadow-sm">
              <Link href="/contact">
                <Calendar className="h-5 w-5 mr-2" />
                Book a Pro Fitting
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-sm bg-transparent">
              <Link href="/gallery">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
