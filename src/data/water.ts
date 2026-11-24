import { site } from "@/data/site";

// Cloud whole-house water filtration (/trade/water-filtration/), from the supplier deck and poster in
// Design-Docs/Water Filters/. The page sells the product first, in terms of what it does for the people who live with
// it, then shows how it works and what it takes out, then the models, questions and trade pricing. Supply and trade
// pricing never appear on the page. Removal claims are the supplier's until a test report arrives.

export const waterHero = {
  title: "Filtered water for the whole home",
  lead: "One system where the water comes in, and every tap, shower and appliance in the house runs on cleaner, better-tasting water.",
};

export const waterSpotlight = {
  label: "The system",
  title: "Fitted once, working every day",
  body: "All three stages sit in one compact unit, fitted out of sight where the water comes into the home. A gauge on each housing shows how it is running, and changing a cartridge takes nothing more than the wrench in the box. Choose the open steel frame or the lockable stainless steel cover.",
};

export const waterActions = {
  pricing: { label: "Get trade pricing", href: "#get-pricing" },
  specSheet: { label: "Download Spec Sheet" },
};

/** What it does for the household, the reasons people buy it, each with its lifestyle image. */
export const waterBenefits = [
  {
    title: "Water you want to drink",
    image: "/trade/water/drink.webp",
    body: "Every tap pours fresh, clean-tasting water without the chlorine taste and smell of the mains. Fill a glass from any tap in the house.",
  },
  {
    title: "Kinder on skin and hair",
    image: "/trade/water/skin.webp",
    body: "Your shower runs through the same filters as the kitchen tap, so the water you wash in has up to 99% less chlorine in it too.",
  },
  {
    title: "Looks after the house",
    image: "/trade/water/house.webp",
    body: "Sand, silt and rust are stopped where the water comes in, before they can wear on the hot water system, the washing machine or your tapware.",
  },
  {
    title: "Made to last",
    image: "/trade/water/made-to-last.webp",
    body: "The housings are food-grade polypropylene, rated to a working pressure of 689 kPa, and the stainless steel model locks them behind a 1.5 mm steel cover.",
  },
];

/** How it works: the steps of the sequence. `stage` lights up that part of the schematic (0 inlet, 1 to 3 the
 * housings, 4 outlet). */
export const waterSequence = [
  {
    stage: 0,
    label: "In",
    title: "Mains water comes in",
    body: "The system goes in where the mains enters the home, before the hot water system, so every tap gets filtered water. Water arrives through a stainless steel union and runs through all three housings in turn. A gauge on each one shows the pressure at a glance.",
    facts: [
      { value: "55 L/min", label: "Flow through the system" },
      { value: "1 inch", label: "Stainless steel connections" },
    ],
  },
  {
    stage: 1,
    label: "Stage 1 · PP20BB-CC",
    title: "Sediment out, chlorine down",
    body: "The first cartridge does two jobs. Layers of polypropylene trap sand, silt, rust and pipe debris, and coconut shell carbon inside them starts taking out chlorine, taste and odour. Catching the grit first keeps the carbon blocks behind it working for longer.",
    facts: [
      { value: "3 to 6 months", label: "Between changes, depending on the water" },
      { value: "2 in 1", label: "Sediment and carbon in one cartridge" },
    ],
  },
  {
    stage: 2,
    label: "Stage 2 · CTO20BB",
    title: "A coconut carbon block",
    body: "The second cartridge is a solid block of compressed coconut carbon. Water passes through it from the outside in, and it takes out up to 99% of the chlorine along with chloramines and organic compounds. It also filters out particles down to 5 microns, far finer than a human hair.",
    facts: [
      { value: "5 microns", label: "The finest particles it filters" },
      { value: "6 months", label: "Between changes" },
    ],
  },
  {
    stage: 3,
    label: "Stage 3 · CTO20BB",
    title: "A second carbon block",
    body: "The third cartridge is another carbon block of the same kind. It catches whatever chlorine, taste and fine particles the second stage leaves behind, so the water stays at its best as the first block ages.",
    facts: [
      { value: "5 microns", label: "The finest particles it filters" },
      { value: "6 months", label: "Between changes" },
    ],
  },
  {
    stage: 4,
    label: "Out",
    title: "Filtered water to the whole home",
    body: "Filtered water goes on to every tap, shower and appliance in the home, from the kitchen to the laundry and the garden. Hot water systems, kettles and washing machines see far less sediment and chlorine, which is easier on them over the years.",
    facts: [
      { value: "Every tap", label: "Kitchen, bathrooms, laundry and garden" },
      { value: "1 year", label: "Warranty on the system" },
    ],
  },
] as const;

/** What it takes out: the three cartridges, each contaminant with what it means at home and the stages that act on
 * it (from the supplier deck). */
export const waterRemoval = {
  title: "What it takes out",
  intro:
    "Each cartridge has its own job, and most of what comes through the mains is caught more than once on the way through. Choose one to see where it is taken out.",
  stages: [
    { number: 1, code: "PP20BB-CC", name: "Polypropylene and carbon", kind: "pp", body: "Layers of polypropylene around granular coconut shell carbon." },
    { number: 2, code: "CTO20BB", name: "Carbon block", kind: "carbon", body: "Sintered coconut carbon, filtering down to 5 microns." },
    { number: 3, code: "CTO20BB", name: "Carbon block", kind: "carbon", body: "A second block to catch what the first leaves behind." },
  ],
  contaminants: [
    {
      name: "Chlorine",
      body: "Chlorine is added to the mains to keep water safe on its way to you, and it gives tap water that swimming pool taste and smell. The carbon blocks take out up to 99% of it.",
      stages: [1, 2, 3],
    },
    {
      name: "Taste and odour",
      body: "Mains water can taste flat, chemical or earthy, which puts many people off drinking from the tap. All three stages work on it.",
      stages: [1, 2, 3],
    },
    {
      name: "Sediment, sand and silt",
      body: "Fine grit clouds the water and wears out tapware and appliance valves. The carbon blocks catch particles down to 5 microns.",
      stages: [1, 2, 3],
    },
    {
      name: "Rust and pipe debris",
      body: "Older pipes and mains works shed flakes of rust that discolour the water and block tap aerators. The first stage holds them back.",
      stages: [1],
    },
    {
      name: "Chloramines",
      body: "Some supplies use chloramines, a longer-lasting form of chlorine. The first carbon block takes them out.",
      stages: [2],
    },
    {
      name: "Organic compounds",
      body: "Both carbon blocks take out volatile organic compounds and the by-products chlorine leaves when it reacts in the water.",
      stages: [2, 3],
    },
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
      { label: "Connections", value: "1 inch BSP stainless steel unions and nipples" },
      { label: "Gauges", value: "Three 60 mm oil-filled gauges, 0 to 150 PSI" },
      { label: "Flow rate", value: "55 L/min" },
      { label: "Working pressure", value: "689 kPa" },
      { label: "Operating temperature", value: "4 to 38 °C" },
      { label: "In the box", value: "Support frame and housing wrench" },
      { label: "Warranty", value: "1 year" },
    ],
  },
  {
    model: "FH20BB3-SSS",
    name: "Stainless steel cover",
    summary: "The same system inside a lockable 304 stainless steel cover, made for long-term durability.",
    specs: [
      { label: "Dimensions", value: "58 × 21 × 74 cm" },
      { label: "Weight", value: "38 kg" },
      { label: "Housings", value: "Three 20 inch jumbo housings, food-grade polypropylene" },
      { label: "Frame", value: "Steel support frame in a 1.5 mm, 304 stainless steel cover with a door lock" },
      { label: "Connections", value: "1 inch BSP stainless steel unions and nipples" },
      { label: "Gauges", value: "Three 60 mm oil-filled gauges, 0 to 150 PSI" },
      { label: "Flow rate", value: "55 L/min" },
      { label: "Working pressure", value: "689 kPa" },
      { label: "Operating temperature", value: "4 to 38 °C" },
      { label: "In the box", value: "Housing wrench" },
      { label: "Warranty", value: "1 year" },
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
    body: "The first cartridge usually lasts three to six months, and the two carbon blocks about six months. How long they last depends on the water where you live and how much the household uses. If the flow drops or the chlorine taste comes back sooner, it is time for new cartridges.",
  },
  {
    title: "How are the cartridges changed?",
    body: "Turn off the water, release the pressure with the red pressure-release valve, then undo the housing with the wrench that comes with the system. Swap the cartridge, refit the housing and turn the water back on.",
  },
  {
    title: "What is the difference between the two models?",
    body: "Both have the same three housings and cartridges. The FH20BB3 sits on an open steel frame and weighs 29 kg. The FH20BB3-SSS adds a lockable 304 stainless steel cover over the housings and weighs 38 kg.",
  },
  {
    title: "Where is it installed, and who can install it?",
    body: "It goes on the cold mains where the water enters the home, before the hot water system. It is rated for water between 4 and 38 °C, so it should be kept out of frost and hot spots. As it connects to the mains, it has to be fitted by a licensed plumber.",
  },
  {
    title: "What warranty does it come with?",
    body: "The system comes with a one-year warranty. The cartridges are consumables and are replaced as part of normal servicing.",
  },
  {
    title: "Can I buy one for my own home?",
    body: `The system is sold through plumbers and builders. If you would like one fitted at home, email us at ${site.email} and we will come back to you.`,
  },
];

/** Looking after it: how long the cartridges last, from the supplier's service-life figures, in the stat split used
 * on Why Cloud Modular and Quality. */
export const waterCare = {
  label: "Looking after it",
  intro: "Clean water comes down to fresh cartridges, and they are easy to stay on top of. Most homes need new ones about twice a year.",
  stats: [
    { value: "6 months", label: "The two carbon blocks" },
    { value: "3 to 6 months", label: "The first cartridge, depending on the water" },
  ],
  body: "How long each cartridge lasts depends on the water where you live and how much the household uses. Your plumber can change all three in one visit, and the system is WaterMark certified and covered by a one-year warranty.",
};

/** Trade pricing: the page's one form, with a short word for the trade above it. */
export const waterPricing = {
  title: "Get trade pricing",
  intro:
    "Give your customers better water from every tap. Each system needs new cartridges about twice a year, so every one you fit brings you back for service. Tell us about your business and how many systems you expect to fit, and we will come back to you with trade pricing for the systems and their replacement cartridges.",
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
