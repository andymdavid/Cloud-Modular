// Cloud Trade (formerly Buildsource) at /trade/. Facts come from the old Buildsource site and the Trade briefing.
// The trade network is China; Cloud Trade is the supplier and delivers nationally. Claims still to confirm
// (exclusive licences, the five-year warranty, stock on hand, factory-direct pricing) stay off the page.

/** Client logos as gold masks, from the old Buildsource site; sized like the partner logos (see utils/logos). */
export const tradeClients = [
  { slug: "hanssen", name: "Hanssen", width: 1000, height: 432, ink: 0.279 },
  { slug: "griffin", name: "Griffin Group", width: 1000, height: 175, ink: 0.221 },
  { slug: "hancock", name: "Hancock Iron Ore", width: 1000, height: 364, ink: 0.617 },
  { slug: "probuild", name: "Probuild", width: 1000, height: 115, ink: 0.732 },
  { slug: "cimc", name: "CIMC", width: 375, height: 100, ink: 0.583 },
  { slug: "ausco", name: "Ausco Modular", width: 699, height: 573, ink: 0.324 },
  { slug: "ams", name: "AMS", width: 881, height: 221, ink: 0.279 },
  { slug: "seashells", name: "Seashells Jurien Bay", width: 344, height: 222, ink: 0.106 },
] as const;

export const tradeHero = {
  title: "End-to-end procurement for the built environment.",
  lead: "A trade network built on 30 years of business in China, with prices at least 45% below local suppliers.",
};

export const tradeIntro =
  "Cloud Trade is a specialist procurement services provider to the building and construction industry, providing cost savings, project management and risk mitigation across the products every project needs. Through trade relationships built over 30 years in China, we give builders and developers access to products made to Australian Standards at least 45% below local prices. Our concierge service covers manufacture, quality control and testing, freight and delivery to site.";

/** How we work: one service with two halves. Every client is onboarded to an account on the platform, where their
 * documents live, and our team runs the procurement. Tiles as the home page's FeatureTiles. */
export const tradeWays = {
  title: "Full control without the legwork",
  intro: "Every quote, approval, certificate and delivery date sits in your account, and nothing is ordered until you sign off. Our team takes care of everything else, from pricing your schedule to getting it onto your site.",
  tiles: [
    {
      label: "Your account",
      title: "Full oversight and control",
      href: "/trade/start/",
      cta: "Open an account",
      image: "/trade/generated/kitchen-island.webp",
      width: 1600,
      height: 1600,
      imagePosition: "center",
    },
    {
      label: "Concierge support",
      title: "End-to-end procurement management",
      href: "/trade/start/",
      cta: "Talk to our team",
      image: "/trade/projects/freestanding-bath.webp",
      width: 1280,
      height: 957,
      imagePosition: "center",
    },
  ],
};

/** How it works (/trade/how-it-works/): the order from schedule to site, each step with the document it produces.
 * The page closes on a full-bleed image with the after-sales offer (tradeDelivered). */
export const tradeJourney = [
  {
    kind: "step",
    title: "Your schedule",
    body: "Send us your schedule, bill of quantities, drawings or a product list, and tell us when you need it on site.",
    doc: "schedule",
  },
  {
    kind: "step",
    title: "Your quote",
    body: "We price every line through our trade network and send you one quote, with the compliance for each product and one lead time for the whole order, because it all ships together.",
    doc: "quote",
  },
  {
    kind: "step",
    title: "Approval",
    body: "You approve the samples and the quote, and your client signs off where they need to. Nothing is ordered until you do.",
    doc: "order",
  },
  { kind: "milestone", title: "Order placed" },
  {
    kind: "step",
    title: "Manufacture",
    body: "Your order is made to your specification and to Australian Standards, which takes 45 to 50 days. Our Foshan office follows it through production.",
    doc: "production",
  },
  {
    kind: "step",
    title: "Inspection",
    body: "Every order is checked against its specification before it leaves the factory, and the report comes to you.",
    doc: "inspection",
  },
  { kind: "milestone", title: "Passed inspection" },
  {
    kind: "moment",
    title: "Shipped",
    body: "Packed, loaded and at sea for about three weeks, with the shipping documents in your account.",
  },
  {
    kind: "step",
    title: "Customs and delivery",
    body: "We clear your order through customs and deliver it to your site, anywhere in Australia, in the week your programme needs it.",
    doc: "delivery",
  },
  { kind: "milestone", title: "On site" },
] as const;

/** How it works. Each stage becomes a step in the platform sequence, with an interface vignette beside it. */
export const tradeSteps = [
  {
    title: "Select",
    screen: "select",
    body: "Add your project and upload your schedule or bill of quantities, or build your selections from our range. Quantities sit against each unit, floor or room.",
  },
  {
    title: "Quote",
    screen: "quote",
    body: "We price your schedule through our trade network and send you one Cloud Trade quote. Where there is a choice of product, you can compare the options side by side.",
  },
  {
    title: "Approve",
    screen: "approve",
    body: "You, your client and anyone else who needs to sign off can review the selections and approve the spend before anything is ordered.",
  },
  {
    title: "Order",
    screen: "order",
    body: "Approved items are ordered on your trade account and invoiced on your trade terms.",
  },
  {
    title: "Track",
    screen: "track",
    body: "Each order moves through manufacture, inspection, shipping and customs to delivery on site, and you can see every milestone against your build programme.",
  },
] as const;

/** The assistant: what it handles, and its activity on one order (the same order the platform screens show). */
export const tradeAssistant = {
  intro:
    "Our assistant does the repetitive work behind every order, and our team in Perth and Foshan handles the rest.",
  jobs: [
    {
      title: "Prices from our trade network",
      body: "It asks our trade network for prices and chases anyone who hasn't replied, so your quote comes back quickly.",
    },
    {
      title: "Products to suit your specification",
      body: "It matches your specification to suitable products, and suggests alternatives when something is unavailable or slow.",
    },
    {
      title: "Problems before they cost money",
      body: "It flags a lead time that misses your programme, a missing certificate, a price well off the others, or a gap or quantity error in your schedule.",
    },
    {
      title: "Updates without asking",
      body: "It tells you when each order reaches a new milestone, so nobody has to chase where things are.",
    },
  ],
  feed: [
    { kind: "Quote", text: "Asked our trade network to price 48 basin mixers.", time: "Mon 9:02" },
    { kind: "Chase", text: "Followed up the one factory that hadn't replied.", time: "Tue 8:30" },
    { kind: "Flag", text: "Option B arrives two weeks after your programme needs it.", time: "Tue 14:15", flag: true },
    { kind: "Quote", text: "Quote ready, with two options to compare.", time: "Tue 16:40" },
    { kind: "Update", text: "Inspection passed. The report is attached to your order.", time: "Week 9" },
    { kind: "Update", text: "Shipped. Arrives in week 13, a week before it's needed on site.", time: "Week 10" },
  ],
} as const;

export const tradeDelivered = {
  title: "Delivered",
  body: "Every order comes with warranty and after-sales support from our team and our after-sales partners.",
};

/** Range: categories until the product catalogue supplies them. Cards have no images yet. */
export const tradeRange = [
  {
    slug: "tapware-sanitary",
    image: "/trade/products/basin-mixer.webp",
    width: 1024,
    height: 1024,
    imagePosition: "center",
    title: "Tapware and sanitary ware",
    description: "Tapware and sanitary ware with 5-star ratings, including rimless toilets with whirlpool flushing.",
  },
  {
    slug: "windows-doors",
    image: "/trade/products/sliding-door.webp",
    width: 1024,
    height: 1024,
    imagePosition: "center",
    title: "Windows and doors",
    description: "Double-glazed windows and doors in thermally broken aluminium frames.",
  },
  {
    slug: "cabinetry",
    image: "/trade/products/kitchen-cabinetry.webp",
    width: 1024,
    height: 1024,
    imagePosition: "center",
    title: "Kitchen and bathroom cabinetry",
    description: "Kitchen and bathroom cabinetry for residential and mixed-use developments.",
  },
  {
    slug: "flooring",
    image: "/trade/products/flooring.webp",
    width: 1024,
    height: 1024,
    imagePosition: "center",
    title: "Flooring",
    description: "Stone and timber flooring.",
  },
] as const;

/** Proof: the Hanssen testimonial (cleared to use). The business is referred to as "the team", not by name. */
export const tradeTestimonial = {
  quote:
    "I have had the privilege of working with the team for a number of years. Together we have successfully completed a number of projects. A significant part of their success is in their ability to provide quality products, competitive prices and on-time delivery. I look forward to working with them for many years to come.",
  name: "Gerry Hanssen",
  role: "Executive Director, Hanssen",
  logo: "hanssen",
} as const;

/** Clients and what we supplied them. No project names or savings figures until they are confirmed. */
export const tradeCaseStudies = {
  intro: "We supply builders, developers and modular manufacturers across Australia, including these.",
  items: [
    { logo: "hanssen", client: "Hanssen", supplied: "Plumbing and benchtops", body: "Tapware and sanitary ware across many projects, and granite benchtops for The Esplanade." },
    { logo: "griffin", client: "Griffin Group", supplied: "Plumbing", body: "Tapware and sanitary ware for Money Street, Loftus Street and two Edgecombe Street projects." },
    { logo: "probuild", client: "Probuild", supplied: "Plumbing", body: "Tapware and sanitary ware for Saffron Apartments on Adelaide Terrace." },
    { logo: "hancock", client: "Roy Hill, now Hancock Iron Ore", supplied: "Bathrooms", body: "Bathroom cabinets, taps and toilets for 980 bathrooms, supplied through AMS." },
    { logo: "seashells", client: "Seashells Jurien Bay", supplied: "Furnishing", body: "Furniture and fittings for the resort's tourism villas, which are sold fully furnished." },
    {
      text: ["200 St Georges Terrace", "Central Park"],
      client: "200 St Georges Terrace and Central Park",
      supplied: "Air conditioning",
      body: "Air conditioning diffusion and accessories, supplied since 2014.",
    },
  ],
} as const;

/** The request form on /trade/start/ (EnquiryForm variant "trade"). */
export const tradeEnquiry = {
  roles: ["Builder", "Developer", "Architect", "Other"],
  categories: [...tradeRange.map((category) => category.title), "Something else", "Not sure yet"],
  timing: ["Within 3 months", "3 to 6 months", "More than 6 months", "Not sure yet"],
};
