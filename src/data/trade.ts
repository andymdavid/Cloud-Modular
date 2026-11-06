// Cloud Trade (formerly Buildsource) at /trade/. Facts come from the old Buildsource site and the Trade briefing.
// The trade network is China; Cloud Trade is the supplier and delivers nationally. Claims still to confirm
// (exclusive licences, the five-year warranty, stock on hand, factory-direct pricing) stay off the page.

/** Client logos as gold masks, from the old Buildsource site; sized like the partner logos (see utils/logos). */
export const tradeClients = [
  { slug: "hanssen", name: "Hanssen", width: 1000, height: 432, ink: 0.279 },
  { slug: "roy-hill", name: "Roy Hill", width: 487, height: 600, ink: 0.399 },
  { slug: "probuild", name: "Probuild", width: 1000, height: 115, ink: 0.732 },
  { slug: "cimc", name: "CIMC", width: 375, height: 100, ink: 0.583 },
  { slug: "ausco", name: "Ausco Modular", width: 699, height: 573, ink: 0.324 },
  { slug: "ams", name: "AMS", width: 881, height: 221, ink: 0.279 },
] as const;

export const tradeHero = {
  title: "End-to-end procurement for the built environment.",
  lead: "A trade network built on 30 years of business in China, supplying builders and developers across Australia.",
};

export const tradeIntro =
  "Cloud Trade gives builders and developers access to products that are hard to find in Australia, or too expensive to buy here. Our trade network is built on more than 30 years of doing business in China, and we have a long record of supplying product that meets Australian Standards. You buy from us, so the risk of buying overseas is ours. We manage manufacture, inspection, freight and customs, and deliver to your site when your programme needs it.";

/** Two ways to work: the team runs it, or the builder runs it in their account. The same network and checks behind both. */
export const tradeWays = {
  intro: "Every order goes through the same network, the same team and the same checks.",
  team: {
    label: "Our team",
    title: "We manage it",
    body: "Send us your schedule and our team manages the procurement through to delivery.",
    offices: ["Perth", "Foshan"],
  },
  account: {
    label: "Your account",
    title: "You manage it",
    body: "Run your own orders, with quotes, approvals and tracking in one place.",
  },
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
    body: "We price every line through our trade network and send you one quote, with the lead time and compliance for each product.",
    doc: "quote",
  },
  {
    kind: "step",
    title: "Approval",
    body: "You check the quote, and your client signs off where they need to. Nothing is ordered until you approve it.",
    doc: "order",
  },
  { kind: "milestone", title: "Order placed" },
  {
    kind: "step",
    title: "Manufacture",
    body: "Your order is made to your specification and to Australian Standards. Our Foshan office follows it through production.",
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
    body: "Packed, loaded and on its way to Australia, with the shipping documents in your account.",
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
    body: "If anything isn't right, you deal with us. We look after warranty and support with our after-sales partners.",
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
  "For more than 30 years our team has supplied builders, developers, architects and modular manufacturers. Since 2014 we have supplied air conditioning diffusion and accessories, including for 200 St Georges Terrace and the Central Park building in Perth.";

/** The request form on /trade/start/ (EnquiryForm variant "trade"). */
export const tradeEnquiry = {
  roles: ["Builder", "Developer", "Architect", "Modular manufacturer", "Other"],
  categories: [...tradeRange.map((category) => category.title), "Something else", "Not sure yet"],
  timing: ["Within 3 months", "3 to 6 months", "More than 6 months", "Not sure yet"],
};
