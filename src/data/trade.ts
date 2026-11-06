// Cloud Trade (formerly Buildsource) at /trade/. Facts come from the old Buildsource site and the Trade briefing;
// claims still to confirm (exclusive WA and NT licences, the five-year warranty, stock on hand, factory-direct
// pricing) stay off the page until they are confirmed.

/** Client logos as gold masks, from the old Buildsource site; sized like the partner logos (see utils/logos). */
export const tradeClients = [
  { slug: "hanssen", name: "Hanssen", width: 1000, height: 432, ink: 0.279 },
  { slug: "roy-hill", name: "Roy Hill", width: 487, height: 600, ink: 0.399 },
  { slug: "probuild", name: "Probuild", width: 1000, height: 115, ink: 0.732 },
  { slug: "cimc", name: "CIMC", width: 375, height: 100, ink: 0.583 },
  { slug: "ausco", name: "Ausco Modular", width: 699, height: 573, ink: 0.324 },
  { slug: "ams", name: "AMS", width: 881, height: 221, ink: 0.279 },
] as const;

export const tradeIntro =
  "Cloud Trade supplies the products your projects need. You send us your schedule, we quote it from manufacturers we have worked with for years, and you approve, order and track everything in one place. Behind it is a team in Perth and Foshan with more than 30 years of experience in international sourcing, quality control and freight.";

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
    body: "We price your schedule from our supplier panel and send you one Cloud Trade quote. Where there is a choice of product, you can compare the options side by side.",
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
    "Our assistant does the repetitive work behind every order, and our sourcing, quality and freight team in Perth and Foshan handles the rest.",
  jobs: [
    {
      title: "Prices from our supplier panel",
      body: "It asks our supplier panel for prices and chases anyone who hasn't replied, so your quote comes back quickly. You never deal with the suppliers yourself.",
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
    { kind: "Quote", text: "Asked the supplier panel to price 48 basin mixers.", time: "Mon 9:02" },
    { kind: "Chase", text: "Followed up the one supplier who hadn't replied.", time: "Tue 8:30" },
    { kind: "Flag", text: "Option B arrives two weeks after your programme needs it.", time: "Tue 14:15", flag: true },
    { kind: "Quote", text: "Quote ready, with two options to compare.", time: "Tue 16:40" },
    { kind: "Update", text: "Inspection passed. The report is attached to your order.", time: "Week 9" },
    { kind: "Update", text: "Shipped. Arrives in week 13, a week before it's needed on site.", time: "Week 10" },
  ],
} as const;

/** How we source: the route from the supplier panel to site, by where each stage happens. Suppliers are never named. */
export const tradeRoute = {
  intro:
    "Every order follows the same route, managed by our team from the first price to after-sales. Our office in Foshan follows each order through production and inspection.",
  zones: [
    { id: "asia", label: "China, India and South East Asia" },
    { id: "sea", label: "At sea" },
    { id: "australia", label: "Australia" },
  ],
  stages: [
    {
      zone: "asia",
      title: "Sourcing",
      body: "We find the right manufacturer for each product from our panel in China, India and South East Asia, and agree the specification, price and lead time.",
    },
    {
      zone: "asia",
      title: "Manufacture",
      body: "Your order is made to your schedule and to Australian Standards, and our Foshan office follows it through production.",
    },
    {
      zone: "asia",
      title: "Inspection",
      body: "Products are checked and tested against the specification by our quality control partners before they leave the factory.",
    },
    {
      zone: "sea",
      title: "Freight and customs",
      body: "We book sea freight to Australia and clear customs, timed to your build programme.",
    },
    {
      zone: "australia",
      title: "Delivery",
      body: "Products are delivered to your site when your programme needs them.",
    },
    {
      zone: "australia",
      title: "After-sales",
      body: "If something isn't right after delivery, we deal with it, with support from our after-sales partners.",
    },
  ],
} as const;

/** Range: categories until the product catalogue supplies them. Cards have no images yet. */
export const tradeRange = [
  {
    slug: "tapware-sanitary",
    title: "Tapware and sanitary ware",
    description: "Tapware and sanitary ware with 5-star ratings, including rimless toilets with whirlpool flushing.",
  },
  {
    slug: "windows-doors",
    title: "Windows and doors",
    description: "Double-glazed windows and doors in thermally broken aluminium frames.",
  },
  {
    slug: "cabinetry",
    title: "Kitchen and bathroom cabinetry",
    description: "Kitchen and bathroom cabinetry for residential and mixed-use developments.",
  },
  {
    slug: "flooring",
    title: "Flooring",
    description: "Stone and timber flooring.",
  },
] as const;

/** Proof: the Hanssen testimonial (cleared to use), quoted as published on the Buildsource site. */
export const tradeTestimonial = {
  quote:
    "I have had the privilege of working with the team at BuildSource for a number of years. Together we have successfully completed a number of projects. A significant part of their success is in their ability to provide quality products, competitive prices and on-time delivery. I look forward to working with the team at BuildSource for many years to come.",
  name: "Gerry Hanssen",
  role: "Executive Director, Hanssen",
  logo: "hanssen",
} as const;

export const tradeTrackRecord =
  "For more than 30 years our team has sourced products for builders, developers, architects and modular manufacturers in Western Australia and the Northern Territory. Since 2014 we have supplied air conditioning diffusion and accessories, including for 200 St Georges Terrace and the Central Park building in Perth.";
