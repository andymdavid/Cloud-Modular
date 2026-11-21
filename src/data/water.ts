import { site } from "@/data/site";

// Cloud whole-house water filtration (/trade/water-filtration/), from the supplier deck and poster in
// Design-Docs/Water Filters/ and the public sources in `waterSources`. Written for plumbers and builders, who sell it
// on to homeowners, so it leads with what changes in the home. Supply and trade pricing never appear on the page.
// The chlorine reduction figure is the supplier's until a test report arrives, and the particle sizes are general
// reference values still to be referenced. Images are placeholders until the 3D model and renders are made.

export const waterHero = {
  byline: "Cloud by MVP",
  title: "Filtered water from every tap",
  lead: "A three-stage whole-house filtration system for the mains supply. Offer it to the homeowners you already work for, and fit it with everything in the box.",
  image: { src: "/trade/generated/kitchen-island.webp", width: 1600, height: 1600, position: "60% 45%" },
};

export const waterActions = {
  pricing: { label: "Get trade pricing", href: "#get-pricing" },
  specSheet: { label: "Spec sheet" },
};

/** Key facts under the hero. */
export const waterFacts = [
  { value: "3", label: "Filtration stages" },
  { value: "5 µm", label: "Carbon block filtration rating" },
  { value: "100%", label: "Coconut shell carbon" },
  { value: "2", label: "Models, on a steel frame or in a 304 stainless steel cover" },
];

/** The problem: what comes through the mains, from Water Corporation and WA Health (see waterSources). */
export const waterProblem = {
  title: "What comes through the mains",
  intro:
    "Western Australia's scheme water is safe to drink, and chlorine is what keeps it that way. Water Corporation adds it to every water supply source. At the levels it is usually found in the tap, most people can smell it.",
  // WA Health: normal levels 0.5 to 1.5 mg/L; most people smell chlorine from about 0.6 mg/L, sensitive people from 0.2
  chlorine: { min: 0.5, max: 1.5, smell: 0.6, sensitive: 0.2, axisMax: 2 },
  points: [
    {
      title: "Taste and smell at the tap",
      body: "Chlorine gives tap water the taste and smell many people buy bottled water to avoid. Water from Mundaring Reservoir to the Goldfields and wheatbelt is treated with chloramine, which stays in the water for longer.",
    },
    {
      title: "Chlorine in the shower",
      body: "A filter on the kitchen tap only treats the water you drink. The water for showers and baths comes through the same mains supply.",
    },
    {
      title: "Sediment in the water",
      body: "Sand, rust and pipe debris can travel with the water into the home, where they reach tapware, appliances and the hot water system.",
    },
  ],
};

/** What changes at home: the story a plumber tells the homeowner. Images to come. */
export const waterBenefits = [
  {
    title: "Better water at every tap",
    body: "The kitchen, the bathrooms, the laundry and the garden all run on filtered water, with chlorine taste and odour reduced.",
  },
  {
    title: "Showers without the chlorine",
    body: "The system sits where the mains enters the home, ahead of the water heater, so the water for showers and baths is filtered too.",
  },
  {
    title: "Less sediment in the home",
    body: "The first stage holds back sand, rust and pipe debris before they reach tapware, appliances and the hot water system.",
  },
];

/** Follow the water: the steps of the sequence. `stage` lights up that part of the schematic (0 inlet, 1 to 3 the
 * housings, 4 outlet). */
export const waterSequence = [
  {
    stage: 0,
    label: "In",
    title: "Mains water comes in",
    body: "Water from the mains enters the first housing through a 1 inch brass port. Each housing has its own pressure gauge, so the pressure can be checked at every stage.",
  },
  {
    stage: 1,
    label: "Stage 1 · PP20BB-CC",
    title: "Sediment out, chlorine down",
    body: "The first cartridge is a composite. An outer layer of melt-blown polypropylene traps sediment, sand, rust and pipe debris. A middle layer of granular coconut shell carbon reduces chlorine, taste and odour, and an inner layer keeps the carbon in.",
  },
  {
    stage: 2,
    label: "Stage 2 · CTO20BB",
    title: "A coconut carbon block",
    body: "The second cartridge is a block of compressed coconut carbon. It reduces chlorine, taste and odour, along with chloramines and volatile organic compounds, and filters out particles down to 5 microns.",
  },
  {
    stage: 3,
    label: "Stage 3 · CTO20BB",
    title: "A second carbon block",
    body: "The third cartridge is a second carbon block of the same kind. It takes out the chlorine, organic compounds and fine particles that are left after the second stage.",
  },
  {
    stage: 4,
    label: "Out",
    title: "Filtered water to the whole home",
    body: "The water leaves the third housing through another 1 inch brass port and goes on to every tap, shower and appliance in the home.",
  },
] as const;

/** Why fit Cloud: the case for the plumber. */
export const waterTrade = {
  title: "Why plumbers fit Cloud",
  intro:
    "When you install a product, your name goes on it. The Cloud system is built to be easy to recommend, quick to fit and simple to look after for years.",
  points: [
    {
      title: "WaterMark certified",
      body: "The system is WaterMark certified, so it meets the Plumbing Code of Australia for installation on the mains supply.",
    },
    {
      title: "Everything in the box",
      body: "Both models arrive with the support frame, a housing wrench, three pressure gauges and 1 inch brass ports. There is nothing else to source before the job.",
    },
    {
      title: "Standard cartridges",
      body: "All three housings take standard 20 inch jumbo cartridges, and changing one takes the wrench alone. Release the pressure with the red valve, undo the housing and swap the cartridge.",
    },
    {
      title: "Work that comes back",
      body: "Every system needs new cartridges over its life. With a Cloud Trade account you reorder them at your trade price, and the homeowner calls you to fit them.",
    },
    {
      title: "Priced for the trade",
      body: "Trade pricing leaves room for your installation and your margin, and still gives the homeowner a whole-house system at a fair installed price.",
    },
    {
      title: "A team behind you",
      body: "The Cloud Trade team handles your orders, stock and questions, so you can quote a job knowing the system will be there when you need it.",
    },
  ],
};

/** What it takes out: the headline figure (the supplier's) and the particle sizes for the scale chart. */
export const waterRemoval = {
  stat: { value: "Up to 99%", label: "Chlorine reduction by the coconut carbon block cartridges" },
  intro:
    "The carbon block cartridges are rated at 5 microns. Anything larger, including sand and most silt, is held back before the water reaches the home.",
  rating: 5,
  // Sizes in microns. General reference values; references to be added.
  particles: [
    { name: "Silt", min: 4, max: 63 },
    { name: "Human hair", min: 50, max: 100 },
    { name: "Very fine sand", min: 63, max: 125 },
    { name: "Fine sand", min: 125, max: 250 },
  ],
};

/** The two models. Dimensions are as given in the supplier sheet, which lists the same size for both. */
export const waterModels = [
  {
    model: "FH20BB3",
    name: "Steel frame",
    summary: "The three housings on an open steel support frame, with every part in easy reach.",
    specs: [
      { label: "Dimensions", value: "58 × 21 × 74 cm" },
      { label: "Weight", value: "29 kg" },
      { label: "Housings", value: "Three 20 inch jumbo housings, food-grade polypropylene" },
      { label: "Frame", value: "Steel support frame" },
      { label: "In the box", value: "Housing wrench, three pressure gauges, 1 inch brass ports" },
    ],
  },
  {
    model: "FH20BB3-SSS",
    name: "Stainless steel cover",
    summary: "The same system inside a 304 stainless steel cover, made for long-term durability.",
    specs: [
      { label: "Dimensions", value: "58 × 21 × 74 cm" },
      { label: "Weight", value: "38 kg" },
      { label: "Housings", value: "Three 20 inch jumbo housings, food-grade polypropylene" },
      { label: "Frame", value: "Steel support frame and 304 stainless steel cover" },
      { label: "In the box", value: "Housing wrench, three pressure gauges, 1 inch brass ports" },
    ],
  },
];

/** Questions, answered from the supplier sheet and the sources. */
export const waterFaqs = [
  {
    title: "What is the difference between the two models?",
    body: "Both have the same three housings and cartridges. The FH20BB3 sits on an open steel frame and weighs 29 kg. The FH20BB3-SSS adds a 304 stainless steel cover over the housings and weighs 38 kg.",
  },
  {
    title: "Which cartridges does it use?",
    body: "The standard set is a PP20BB-CC polypropylene and carbon composite, then two CTO20BB coconut carbon blocks. There is also an alternative set with a PP20BB sediment cartridge, a GAC20BB granular activated carbon cartridge and a CTO20BB carbon block. All are standard 20 inch jumbo size.",
  },
  {
    title: "Does it filter the hot water too?",
    body: "Yes. The system is installed where the mains enters the home, ahead of the water heater, so the water for showers, baths and appliances is filtered as well as the water from the kitchen tap.",
  },
  {
    title: "Who can install it?",
    body: "The system connects to the mains water supply, so it has to be installed by a licensed plumber.",
  },
  {
    title: "Can I buy one for my own home?",
    body: `The system is sold through plumbers and the trade. If you would like one fitted at home, email us at ${site.email} and we will come back to you.`,
  },
];

/** The trade pricing form (the page's one form) and the spec sheet modal, which captures the lead. */
export const waterEnquiry = {
  roles: ["Plumber", "Plumbing contractor", "Builder", "Developer", "Other"],
  models: ["FH20BB3 (steel frame)", "FH20BB3-SSS (stainless steel cover)", "Not sure yet"],
  quantities: ["1", "2 to 5", "6 to 20", "More than 20"],
};

/** The spec sheet PDF, made once the full specifications are in. */
export const waterSpecSheet = {
  href: "/trade/water-filtration/cloud-water-filtration-spec-sheet.pdf",
  title: "Download the spec sheet",
  intro: "The specifications, dimensions and cartridge details for both models in one PDF. Tell us who you are and the download is yours.",
};

/** Public sources for the facts on the page, listed at the foot of the page. */
export const waterSources = [
  { label: "Water Corporation, Taste and smell", href: "https://www.watercorporation.com.au/faults/water-quality/taste-and-smell" },
  { label: "WA Health, Chlorinated drinking water", href: "https://health.wa.gov.au/Articles/A_E/Chlorinated-drinking-water" },
  { label: "Australian Building Codes Board, Buying plumbing products (WaterMark)", href: "https://watermark.abcb.gov.au/consumers/buying-plumbing-products" },
];
