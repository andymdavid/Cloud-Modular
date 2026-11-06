// Cloud Trade (formerly Buildsource) at /trade/. Facts come from the old Buildsource site and the Trade briefing.
// The trade network is China; Cloud Trade is the supplier and delivers nationally. Claims still to confirm
// (exclusive licences, the five-year warranty, stock on hand, factory-direct pricing) stay off the page.

/** Client logos as gold masks, from the old Buildsource site; sized like the partner logos (see utils/logos). */
export const tradeClients = [
  { slug: "hanssen", name: "Hanssen", width: 1000, height: 432, ink: 0.279 },
  { slug: "griffin", name: "Griffin Group", width: 1000, height: 175, ink: 0.221 },
  { slug: "roy-hill", name: "Roy Hill", width: 487, height: 600, ink: 0.399 },
  { slug: "probuild", name: "Probuild", width: 1000, height: 115, ink: 0.732 },
  { slug: "cimc", name: "CIMC", width: 375, height: 100, ink: 0.583 },
  { slug: "ausco", name: "Ausco Modular", width: 699, height: 573, ink: 0.324 },
  { slug: "ams", name: "AMS", width: 881, height: 221, ink: 0.279 },
] as const;

export const tradeHero = {
  title: "End-to-end procurement for the built environment.",
  lead: "A trade network built on 30 years of business in China, saving builders and developers at least 45%.",
};

export const tradeIntro =
  "Cloud Trade is a specialist procurement services provider to the building and construction industry, delivering cost savings, project management and risk mitigation across the products every project needs. Our trade network is built on more than 30 years of doing business in China, with OEM factories that also supply hotel brands. You buy from us, so the risk of buying overseas is ours, and our clients save at least 45% on buying locally.";

/** Two ways to work: the team runs it, or the builder runs it in their account. Tiles as the home page's FeatureTiles. */
export const tradeWays = {
  intro: "Send us your schedule and our team manages the procurement through to delivery, or run your own orders in your account. Every order goes through the same network and the same checks.",
  tiles: [
    {
      label: "Our team",
      title: "We manage it",
      href: "/trade/start/",
      cta: "Talk to our team",
      image: "/trade/projects/apartments.webp",
      width: 1920,
      height: 1280,
      imagePosition: "center",
    },
    {
      label: "Your account",
      title: "You manage it",
      href: "/trade/start/",
      cta: "Open an account",
      image: "/trade/projects/freestanding-bath.webp",
      width: 1280,
      height: 957,
      imagePosition: "center",
    },
  ],
};

/** How it works (/trade/how-it-works/): the order from schedule to site, each step with the document it produces. */
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
  {
    kind: "step",
    title: "After-sales",
    body: "Every order comes with warranty and after-sales support, provided by us and our after-sales partners.",
  },
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

/** Range: categories until the product catalogue supplies them. Cards have no images yet. */
export const tradeRange = [
  {
    slug: "tapware-sanitary",
    image: "/trade/projects/bathroom-basin.webp",
    width: 1920,
    height: 1280,
    imagePosition: "30% center",
    title: "Tapware and sanitary ware",
    description: "Tapware and sanitary ware with 5-star ratings, including rimless toilets with whirlpool flushing.",
  },
  {
    slug: "windows-doors",
    image: "/trade/projects/pivot-door.webp",
    width: 1440,
    height: 550,
    imagePosition: "42% center",
    title: "Windows and doors",
    description: "Double-glazed windows and doors in thermally broken aluminium frames.",
  },
  {
    slug: "cabinetry",
    image: "/trade/projects/kitchen-timber.webp",
    width: 1920,
    height: 1280,
    imagePosition: "60% center",
    title: "Kitchen and bathroom cabinetry",
    description: "Kitchen and bathroom cabinetry for residential and mixed-use developments.",
  },
  {
    slug: "flooring",
    image: "/trade/projects/stair-timber.webp",
    width: 1920,
    height: 1340,
    imagePosition: "45% center",
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
  intro: "Our factories are OEM manufacturers that also supply hotel brands. In Australia we supply builders, developers and modular manufacturers, including these.",
  items: [
    { logo: "hanssen", client: "Hanssen", supplied: "Plumbing", body: "Tapware and sanitary ware across a number of Hanssen projects." },
    { logo: "griffin", client: "Griffin Group", supplied: "Plumbing", body: "Tapware and sanitary ware for Griffin Group projects." },
    { logo: "probuild", client: "Probuild", supplied: "Plumbing", body: "Tapware and sanitary ware for Probuild projects." },
    {
      image: { src: "/trade/projects/ductwork.webp", width: 1600, height: 1200 },
      client: "200 St Georges Terrace and Central Park",
      supplied: "Air conditioning",
      body: "Air conditioning diffusion and accessories, which we have supplied since 2014.",
    },
  ],
} as const;

/** The request form on /trade/start/ (EnquiryForm variant "trade"). */
export const tradeEnquiry = {
  roles: ["Builder", "Developer", "Architect", "Modular manufacturer", "Other"],
  categories: [...tradeRange.map((category) => category.title), "Something else", "Not sure yet"],
  timing: ["Within 3 months", "3 to 6 months", "More than 6 months", "Not sure yet"],
};
