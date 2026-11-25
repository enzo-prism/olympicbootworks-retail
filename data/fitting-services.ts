export const fittingServices = [
  {
    slug: "custom-footbeds",
    name: "Heel-Loc custom footbeds",
    title: "Custom Ski Boot Footbeds in Lake Tahoe",
    description: "See how Buck Brown’s Heel-Loc ski boot footbeds are cast and fitted. Bring new or existing boots to Olympic Valley or South Lake Tahoe for an assessment.",
    intro: "A footbed sits under your foot inside the liner. If your heel moves or you keep tightening the buckles to feel secure, bring the whole boot in. We check the shell, liner and support underfoot before recommending a change.",
    image: "/images/fitting-process-2.jpg",
    imageAlt: "A skier on the Heel-Loc casting stand at Olympic Bootworks",
    caption: "On the casting stand, the fitter takes the shape of your foot with your weight off it.",
    sections: [
      { title: "Stock or custom?", text: "A stock insole comes in the boot and has a standard shape. A Heel-Loc footbed is made from a cast of your own foot. We look at how your heel sits, how much room the boot has and what you feel when you flex before deciding whether a custom footbed makes sense." },
      { title: "How Heel-Loc is made", text: "Buck Brown developed Heel-Loc around an unweighted cast. The fitter takes an impression of your foot, shapes the footbed to sit inside your liner, then checks the fit with you standing and flexing in the boot. Tell us what feels different on each side." },
      { title: "Bring the pair you already ski", text: "Bring both shells, liners, current insoles and your usual ski socks, even if you bought the boots elsewhere. If a pressure point only appears after a few runs, tell the fitter where it is and when it starts. That helps distinguish a support issue from a shell or liner issue." },
    ],
  },
  {
    slug: "zipfit-liners",
    name: "ZipFit liner fitting",
    title: "ZipFit Ski Boot Liner Fitting in Lake Tahoe",
    description: "Ask Olympic Bootworks about ZipFit ski boot liners. Get your shells checked for compatibility and arrange a fitting in Olympic Valley or South Lake Tahoe.",
    intro: "If your boots felt secure when they were new but your heel now lifts through a turn, bring them in. We’ll check whether the liner has packed out and whether your existing shells are a good match for a ZipFit liner.",
    image: "/ski-boot-fitting-station.jpg",
    imageAlt: "Boot wall and fitting benches at Olympic Bootworks",
    caption: "Bring both shells, liners and footbeds so the fitter can check them together.",
    sections: [
      { title: "What a ZipFit liner changes", text: "The liner is the removable inner boot around your foot and ankle. ZipFit uses a cork-composite fill that adapts to your shape. The fitter checks heel hold and how the tongue sits across the instep as you flex." },
      { title: "Will it work in your shells?", text: "Bring the boots you use now, your footbeds and ski socks. We check the space around your foot in the empty shell, then assess the liner and footbed together. A new liner takes up space, so a shell that already pinches needs particular attention." },
      { title: "Choosing a liner and arranging a fitting", text: "Tell the shop your shell brand, model and size, where you feel movement, and the dates you’ll be in Tahoe. Ask which ZipFit models are available for your shell and how much time to set aside. The fitter will confirm the options and price for your visit." },
    ],
  },
] as const

export const fittingServiceUrl = (slug: string) => `/boot-fitting/${slug}`
