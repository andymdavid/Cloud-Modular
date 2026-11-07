import type { GalleryRow } from "@/data/projects";

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
      href: "/trade/contact/",
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
  {
    slug: "benchtops",
    image: "/trade/products/benchtop.webp",
    width: 1024,
    height: 1024,
    imagePosition: "center",
    title: "Benchtops",
    description: "Granite benchtops, supplied for projects such as The Esplanade.",
  },
  {
    slug: "furniture",
    image: "/trade/products/furniture.webp",
    width: 1024,
    height: 1024,
    imagePosition: "center",
    title: "Furniture",
    description: "Furniture and fittings, including the fully furnished villas at Seashells Jurien Bay.",
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
  intro: "We supply builders and developers across Australia, including these.",
  items: [
    { logo: "hanssen", client: "Hanssen", supplied: "Plumbing and benchtops", body: "Tapware and sanitary ware across many projects, and granite benchtops for The Esplanade." },
    { logo: "griffin", client: "Griffin Group", href: "/trade/projects/griffin-group/", supplied: "Plumbing", body: "Tapware and sanitary ware for Reside on Money, Loft Haus and two Edgecombe Street projects." },
    { logo: "probuild", client: "Probuild", supplied: "Plumbing", body: "Tapware and sanitary ware for Saffron Apartments on Adelaide Terrace." },
    { logo: "hancock", client: "Roy Hill, now Hancock Iron Ore", href: "/trade/projects/hancock-iron-ore/", supplied: "Bathrooms", body: "Bathroom cabinets, taps and toilets for 980 bathrooms, supplied through AMS." },
    { logo: "seashells", client: "Seashells Jurien Bay", href: "/trade/projects/seashells-jurien-bay/", supplied: "Furnishing", body: "Furniture and fittings for the resort's tourism villas, which are sold fully furnished." },
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

/** Quality and compliance (/trade/quality/), from what the site already states. The certification, inspection and
 * warranty specifics are in the fact review (src/data/review.ts, section "trade-quality") for the team to confirm. */
export const tradeQuality = {
  network:
    "Our trade network is built on 30 years of business in China. We work with established manufacturers who make to Australian Standards, and our office in Foshan follows every order through production.",
  standards: {
    intro:
      "Every product comes with the compliance it needs in Australia. It is listed against each line of your quote and kept in your account with the rest of your order.",
    items: [
      {
        title: "Tapware and sanitary ware",
        body: "Tapware and toilets are WaterMark certified for use in Australia and carry WELS water efficiency ratings, with 5-star ratings across the range.",
      },
      {
        title: "Windows and doors",
        body: "Windows and doors are made to AS 2047, with glazing to AS 1288, and come with their energy performance ratings.",
      },
      {
        title: "Kitchen and bathroom cabinetry",
        body: "Cabinetry is made to your drawings and specification, with the board, hardware and finishes listed on your quote.",
      },
      {
        title: "Benchtops",
        body: "Granite benchtops are made to your drawings, in a stone and finish you approve from samples.",
      },
      {
        title: "Flooring",
        body: "Stone and timber flooring is supplied with its specification and test reports for each product.",
      },
      {
        title: "Furniture",
        body: "Furniture and fittings are made to your specification, with the materials and finishes listed on your quote.",
      },
    ],
  },
  samples:
    "You approve the samples and the quote before anything goes into production, and your client signs off where they need to. Production starts once you have.",
  inspection: {
    intro:
      "Every order is checked against its specification before it leaves the factory. The inspection report, with photographs, comes to you and is kept in your account.",
    items: [
      { title: "Dimensions", body: "Each product is measured against the drawings and the specification on your order." },
      { title: "Finish", body: "Surfaces, colours and finishes are checked against the samples you approved." },
      { title: "Function", body: "Taps, doors, drawers and fittings are tested to make sure they work as they should." },
      { title: "Markings and certification", body: "Certification marks and labels are checked against the compliance listed on your quote." },
      { title: "Packing", body: "Packing is checked so everything arrives on site in the condition it left the factory." },
    ],
  },
  delivery: {
    intro: "Your whole order is packed and shipped together, so it arrives on site as one delivery.",
    items: [
      { title: "Shipping", body: "Your order is at sea for about three weeks, with the shipping documents in your account." },
      { title: "Customs", body: "We clear your order through customs, so you have nothing to arrange at the port." },
      { title: "Delivery", body: "We deliver to your site, anywhere in Australia, in the week your programme needs it." },
      { title: "Warranty and after-sales", body: "Every order comes with warranty and after-sales support from our team and our after-sales partners." },
    ],
  },
} as const;

/** Case studies (/trade/projects/<slug>/): a client and the projects we supplied, from the client's own project pages.
 * Photographs are the client's, credited on the page. */
export interface TradeProject {
  name: string;
  body: string;
  details: { label: string; value: string }[];
  gallery?: GalleryRow[];
  /** The project's own page, for a project another Cloud brand built. */
  link?: { label: string; href: string };
}

export const tradeProjects = [
  {
    slug: "griffin-group",
    client: "Griffin Group",
    location: "Perth",
    sector: "Residential",
    supplied: "Tapware and sanitary ware",
    credit: "Photographs courtesy of Griffin Group.",
    description: "The tapware and sanitary ware Cloud Trade supplied for Griffin Group's Reside on Money, Loft Haus and Como projects in Perth.",
    hero: {
      src: "/trade/projects/griffin/reside-street.webp",
      alt: "Reside on Money, a six-storey apartment building on Money Street in Northbridge, behind a row of plane trees",
      width: 1920,
      height: 1280,
    },
    intro:
      "Griffin Group is a property developer with apartment and townhouse projects across Australia. We supplied the tapware and sanitary ware for four of its Perth projects: Reside on Money in Northbridge, Loft Haus in Leederville and two projects on Edgecombe Street in Como.",
    stats: [
      { value: "4", label: "Griffin projects supplied" },
      { value: "37", label: "Apartments across Reside on Money and Loft Haus" },
    ],
    projects: [
      {
        name: "Reside on Money",
        body: "A boutique building of 22 one and two bedroom apartments in Northbridge, a short walk from the Perth CBD. The six-storey building uses renewable energy to lower the cost of electricity, heating, cooling and hot water.",
        details: [
          { label: "Location", value: "Money Street, Northbridge" },
          { label: "Apartments", value: "22" },
          { label: "Architect", value: "Fratelle Group" },
          { label: "Builder", value: "JCM Construction" },
          { label: "We supplied", value: "Tapware and sanitary ware" },
        ],
        gallery: [
          {
            kind: "pair",
            images: [
              { src: "/trade/projects/griffin/reside-bathroom.webp", alt: "An apartment bathroom with a navy vanity, a round vessel basin, a wall-mounted mixer and a frameless shower", width: 1920, height: 1280, caption: "A bathroom at Reside on Money" },
              { src: "/trade/projects/griffin/reside-basin.webp", alt: "A round white vessel basin on a stone vanity top under a wall-mounted chrome mixer", width: 1920, height: 1280, caption: "Basin and wall mixer" },
            ],
          },
          {
            kind: "full",
            image: { src: "/trade/projects/griffin/reside-rooftop.webp", alt: "The rooftop deck at Reside on Money, with shade sails, tables and the Perth skyline", width: 1920, height: 1280, caption: "The rooftop deck, looking to the city" },
          },
        ],
      },
      {
        name: "Loft Haus",
        body: "Fifteen apartments, including two penthouses, on an elevated site in Leederville with views to the city. The three-storey building is set around a landscaped central courtyard and was completed in March 2023.",
        details: [
          { label: "Location", value: "Loftus Street, Leederville" },
          { label: "Apartments", value: "15" },
          { label: "Architect", value: "Carrier and Postmus Architects" },
          { label: "Builder", value: "The ABN Group" },
          { label: "Completed", value: "March 2023" },
          { label: "We supplied", value: "Tapware and sanitary ware" },
        ],
        gallery: [
          {
            kind: "pair",
            images: [
              { src: "/trade/projects/griffin/lofthaus-street.webp", alt: "Loft Haus, a three-storey pale brick apartment building on Loftus Street at dusk", width: 1200, height: 780, caption: "Loft Haus from Loftus Street" },
              { src: "/trade/projects/griffin/lofthaus-bathroom.webp", alt: "A bathroom with a timber vanity, a matt black mixer, green feature tiles and a black-framed shower screen", width: 1200, height: 780, caption: "A bathroom with matt black tapware" },
            ],
          },
        ],
      },
    ] satisfies TradeProject[],
  },
  {
    slug: "seashells-jurien-bay",
    client: "Seashells Jurien Bay",
    location: "Jurien Bay, WA",
    sector: "Tourism",
    supplied: "Furniture and fittings",
    credit: "Images are artist's impressions.",
    description: "The furniture and fittings Cloud Trade supplies for the tourism villas at Seashells Jurien Bay, which are sold fully furnished.",
    hero: {
      src: "/projects/seashells-jurien-bay/twilight.webp",
      alt: "The residences at twilight, lit from inside, with garden lighting along the front path",
      width: 1672,
      height: 941,
    },
    intro:
      "Seashells Jurien Bay is a beachfront resort community of 108 residences on Western Australia's Turquoise Coast, about two hours north of Perth. Its 77 three-bedroom tourism villas are sold fully furnished and let through the resort's on-site management, and we supply the furniture and fittings for them.",
    stats: [
      { value: "77", label: "Tourism villas, sold fully furnished" },
      { value: "108", label: "Residences across the estate" },
    ],
    projects: [
      {
        name: "The tourism villas",
        body: "Each villa is a two-storey detached home with two bedrooms downstairs and the master suite upstairs, over a living room open to the roof. The villas are built as modules by Cloud Modular and arrive with their kitchens, bathrooms and finishes in place. We supply the furniture and fittings that make them ready for guests.",
        details: [
          { label: "Location", value: "Jurien Bay, WA" },
          { label: "Villas", value: "77, with three bedrooms" },
          { label: "Developer", value: "MVP Group" },
          { label: "Modules", value: "Cloud Modular" },
          { label: "We supply", value: "Furniture and fittings" },
        ],
        link: { label: "The project on Cloud Modular", href: "/our-work/seashells-jurien-bay/" },
        gallery: [
          {
            kind: "pair",
            images: [
              { src: "/projects/seashells-jurien-bay/path.webp", alt: "A garden path running past the residences, lined with lavender and olive trees", width: 1672, height: 941, caption: "Gardens between the villas" },
              { src: "/projects/seashells-jurien-bay/terraces.webp", alt: "A row of two-storey villas with glass balustrades and roof terraces beside a lawn", width: 1054, height: 1492, caption: "Balconies and roof terraces" },
            ],
          },
        ],
      },
    ] satisfies TradeProject[],
  },
  {
    slug: "hancock-iron-ore",
    client: "Hancock Iron Ore",
    location: "Pilbara, WA",
    sector: "Resources",
    supplied: "Bathrooms",
    description: "The bathroom cabinets, taps and toilets Cloud Trade supplied for 980 bathrooms at Roy Hill, now Hancock Iron Ore, through AMS.",
    credit: "Photographs courtesy of Brookfield Multiplex.",
    hero: {
      src: "/trade/projects/hancock/village-aerial.webp",
      alt: "An aerial view of the Roy Hill accommodation village on red Pilbara earth, with rows of accommodation blocks",
      width: 2400,
      height: 1026,
    },
    intro:
      "Hancock Iron Ore runs the Roy Hill iron ore mine in Western Australia's Pilbara. Its workforce lives on site in an accommodation village of about 2,000 rooms, each with its own ensuite, built for $200 million by Brookfield Multiplex. We supplied the bathroom cabinets, taps and toilets for 980 bathrooms at Roy Hill, through AMS.",
    stats: [
      { value: "980", label: "Bathrooms supplied" },
      { value: "2,000", label: "Rooms in the Roy Hill accommodation village" },
    ],
    projects: [
      {
        name: "Roy Hill",
        body: "We supplied a cabinet, taps and a toilet for each of the 980 bathrooms, through AMS.",
        details: [
          { label: "Client", value: "Roy Hill, now Hancock Iron Ore" },
          { label: "Supplied through", value: "AMS" },
          { label: "Bathrooms", value: "980" },
          { label: "We supplied", value: "Bathroom cabinets, taps and toilets" },
        ],
        gallery: [
          {
            kind: "pair",
            images: [
              { src: "/trade/projects/hancock/village-blocks.webp", alt: "The village from the air, with rows of accommodation blocks beside the access road", width: 650, height: 433, caption: "Accommodation blocks from the air" },
              { src: "/trade/projects/hancock/village-wide.webp", alt: "The village set in a curve of accommodation blocks in the green Pilbara landscape", width: 650, height: 433, caption: "The village in the Pilbara landscape" },
            ],
          },
        ],
      },
    ] satisfies TradeProject[],
  },
] as const;
