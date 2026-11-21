import { site } from "@/data/site";

// Cloud whole-house water filtration (/trade/water-filtration/), from the supplier deck and poster in
// Design-Docs/Water Filters/. The page sells the product first, in terms of what it does for the people who live with
// it, then shows how it works and what it takes out, then the models, questions and trade pricing. Supply and trade
// pricing never appear on the page. Removal claims are the supplier's until a test report arrives. Images are
// placeholders until the 3D model and renders are made.

export const waterHero = {
  byline: "Cloud by MVP",
  title: "Filtered water for the whole home",
  lead: "A three-stage filter that sits where the mains comes into the house, so the kitchen, the bathrooms and the laundry all run on cleaner, better-tasting water.",
};

export const waterActions = {
  pricing: { label: "Get trade pricing", href: "#get-pricing" },
  specSheet: { label: "Download Spec Sheet" },
};

/** What it does for the household, the reasons people buy it. Portraits to come. */
export const waterBenefits = [
  {
    title: "Better water to drink",
    body: "Water from every tap tastes and smells cleaner, with the chlorine taste and odour taken down.",
  },
  {
    title: "Kinder on skin and hair",
    body: "Showers and baths run through the same three filters, so the water you wash in has less chlorine in it too.",
  },
  {
    title: "Protects the home",
    body: "Sand, silt and rust are caught before they reach the hot water system, the washing machine and the tapware.",
  },
  {
    title: "Built to last",
    body: "Food-grade housings on a steel frame, with a 304 stainless steel cover on the FH20BB3-SSS. Cartridges are changed with the wrench that comes in the box.",
  },
];

/** How it works: the steps of the sequence. `stage` lights up that part of the schematic (0 inlet, 1 to 3 the
 * housings, 4 outlet). */
export const waterSequence = [
  {
    stage: 0,
    label: "In",
    title: "Mains water comes in",
    body: "Water from the mains enters the first housing through a 1 inch brass port. A pressure gauge on each housing shows how the system is running.",
  },
  {
    stage: 1,
    label: "Stage 1 · PP20BB-CC",
    title: "Sediment out, chlorine down",
    body: "The first cartridge does two jobs. An outer layer of polypropylene traps sand, silt, rust and pipe debris, and a layer of coconut shell carbon inside it starts taking out chlorine, taste and odour.",
  },
  {
    stage: 2,
    label: "Stage 2 · CTO20BB",
    title: "A coconut carbon block",
    body: "The second cartridge is a solid block of compressed coconut carbon. It takes out most of the chlorine, along with chloramines and organic compounds, and filters out particles down to 5 microns.",
  },
  {
    stage: 3,
    label: "Stage 3 · CTO20BB",
    title: "A second carbon block",
    body: "The third cartridge is another carbon block of the same kind. It catches whatever chlorine, taste and fine particles are left after the second stage.",
  },
  {
    stage: 4,
    label: "Out",
    title: "Filtered water to the whole home",
    body: "The water leaves the third housing and goes on to every tap, shower and appliance in the house.",
  },
] as const;

/** What it takes out: each contaminant, what it means at home, and the stages that act on it (from the supplier
 * deck). The chlorine figure is the supplier's. */
export const waterRemoval = {
  title: "What it takes out",
  intro:
    "Each of the three cartridges has its own job, and most things are caught more than once. Here is what the system reduces and where.",
  stat: { value: "Up to 99%", label: "of chlorine taken out by the carbon block cartridges" },
  contaminants: [
    {
      name: "Chlorine",
      body: "Added to mains water to keep it safe on the way to the tap. It is what gives tap water a swimming pool taste and smell.",
      stages: [1, 2, 3],
    },
    {
      name: "Taste and odour",
      body: "The flat, chemical or earthy taste that puts people off drinking from the tap.",
      stages: [1, 2, 3],
    },
    {
      name: "Sediment, sand and silt",
      body: "Fine grit that clouds the water and wears tapware and appliance valves.",
      stages: [1, 2, 3],
    },
    {
      name: "Rust and pipe debris",
      body: "Flakes from older pipes and mains works that discolour water and block aerators.",
      stages: [1],
    },
    {
      name: "Chloramines",
      body: "A longer-lasting form of chlorine used on some supplies.",
      stages: [2],
    },
    {
      name: "Organic compounds",
      body: "Volatile organic compounds and the by-products left when chlorine reacts in the water.",
      stages: [2, 3],
    },
  ],
  note: "The carbon block cartridges filter down to 5 microns, about a fourteenth of the width of a human hair.",
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

/** Questions, after the ones Puretec answers, answered from the supplier sheet. */
export const waterFaqs = [
  {
    title: "What is a whole-house water filter?",
    body: "It is a filter fitted where the mains water comes into the property, so all the water in the home passes through it. A filter under the kitchen sink only treats the water from that one tap.",
  },
  {
    title: "What water is it designed for?",
    body: "It is designed for mains water, also called town or scheme water.",
  },
  {
    title: "Does it filter the water for the shower?",
    body: "Yes. The system is installed ahead of the water heater, so showers, baths, the laundry and the garden all get filtered water as well as the kitchen.",
  },
  {
    title: "Will it soften my water?",
    body: "No. The system takes out sediment, chlorine, taste and odour. It is not a water softener and does not remove the minerals that cause hardness.",
  },
  {
    title: "How do I know when to change the cartridges?",
    body: "How long a cartridge lasts depends on how much water the household uses and what is in it. When the water flow drops, the pressure gauges show a difference between stages, or the taste and smell of chlorine come back, it is time for new cartridges.",
  },
  {
    title: "How are the cartridges changed?",
    body: "Turn off the water, release the pressure with the red pressure-release valve, then undo the housing with the wrench that comes with the system. Swap the cartridge, refit the housing and turn the water back on.",
  },
  {
    title: "What is the difference between the two models?",
    body: "Both have the same three housings and cartridges. The FH20BB3 sits on an open steel frame and weighs 29 kg. The FH20BB3-SSS adds a 304 stainless steel cover over the housings and weighs 38 kg.",
  },
  {
    title: "Where is it installed, and who can install it?",
    body: "It is installed where the mains water supply enters the home, and as it connects to the mains it has to be fitted by a licensed plumber.",
  },
  {
    title: "Can I buy one for my own home?",
    body: `The system is sold through plumbers and builders. If you would like one fitted at home, email us at ${site.email} and we will come back to you.`,
  },
];

/** Trade pricing: the page's one form, with a short word for the trade above it. */
export const waterPricing = {
  title: "Get trade pricing",
  intro:
    "Cloud sells the system through plumbers and builders. Tell us about your business and how many systems you expect to fit, and our team will come back to you with trade pricing for the systems and their replacement cartridges.",
};

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
