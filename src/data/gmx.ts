import { site } from "@/data/site";

// GMX magnetic water conditioners (/trade/gmx/), supplied in Australia through Cloud Trade. Facts are from GMX
// International's own site and placement guide, and our Australia pack and pricing workbook (Design-Docs/GMX, local
// only). There is no independent test evidence for GMX units, so the copy says what GMX is designed to do and leads on
// what is certain (no salt, no power, no plumbing cut, no change to pressure or flow, made in the USA since 1992).
// Never add numbers to the scale claims, or say it softens, eliminates or prevents scale, and never use GMX's health,
// fuel, energy or water flow claims. The warranty is a manufacturer's limited warranty with Australian terms confirmed
// at quotation: never "lifetime" or a satisfaction guarantee until GMX confirms them in writing. Pipe sizes are GMX's
// inch ranges given as Australian DN sizes, and sizes and weights are converted from GMX's inch and pound figures.
// Trade pricing never appears on the page.

export const gmxHero = {
  title: "Hard water and scale protection for the whole home",
  lead: "Hard water leaves white marks on glass and tapware and builds up as scale inside your hot water system. GMX clamps onto the pipe where water comes into the home and conditions every litre, with no salt, no power and no pipe to cut.",
};

export const gmxActions = {
  pricing: { label: "Get trade pricing", href: "#get-pricing" },
  specSheet: { label: "Download Spec Sheet" },
};

/** What it does at home: each title is a benefit, so the four read as the list (less scale, protects plumbing and
 * appliances, longer equipment life), and the intro adds nothing to run. */
export const gmxAtHome = {
  title: "Easier on everything water touches",
  intro: "GMX helps keep scale off the hot water system, the pipes, the appliances and the glass in your home, with nothing to run and nothing to top up.",
};

export const gmxBenefits = [
  {
    title: "A hot water system that lasts",
    image: "/trade/gmx/hot-water.webp",
    body: "GMX conditions the water before it reaches the hot water system and pipes, so the minerals are designed to carry on through instead of setting hard, putting off costly repairs.",
  },
  {
    title: "Clear glasses and shower screens",
    image: "/trade/gmx/glass.webp",
    body: "Less white film on glasses from the dishwasher and on shower screens, mixers and basins. The marks that do form are softer, so they wipe away without a weekend of scrubbing.",
  },
  {
    title: "Appliances that keep working",
    image: "/trade/gmx/coffee.webp",
    body: "The whole-house set looks after the kettle, dishwasher and washing machine, and a coffee machine or ice maker can have its own Model 400 on the line that feeds it.",
  },
  {
    title: "Pools and spas with less scale",
    image: "/trade/gmx/pool.webp",
    body: "Pool water is heated and topped up over and over, so its minerals build up. A set of Model 848s on the return line conditions it on every pass, helping to keep scale off the heater and tiles.",
  },
];

/** The product: the facts that hold for every model. */
export const gmxSpotlight = {
  label: "The product",
  title: "Clamps on in minutes, works for life",
  body: "Each GMX unit holds permanent ceramic magnets against the outside of the pipe, so the water never touches it and nothing goes into your supply. It is silent and makes no change to pressure or flow. There are no moving parts, no cartridges and no power, and if you move house it comes with you.",
  facts: [
    { value: "No salt", label: "Nothing to top up, no regeneration and no salty waste water down the drain" },
    { value: "No power", label: "Permanent ceramic magnets do the work, so there is nothing to plug in or wire up" },
    { value: "No cutting", label: "Clamps onto the outside of the pipe, with no shutdown or bypass while it is fitted" },
    { value: "Since 1992", label: "Made in the USA by GMX International, with a manufacturer's warranty" },
  ],
};

/** How it works: the steps beside the live scene (src/lib/gmx/scene.ts); `stage` sets its view. Perth's hardness is
 * from Water Corporation's 2024–25 drinking water quality tables (Dwellingup 29 mg/L, Two Rocks 228 mg/L). */
export const gmxSequence = [
  {
    stage: 0,
    label: "In",
    title: "Hard water comes in",
    body: "Water picks up calcium and magnesium on its way through the ground. When it is heated or loses pressure, those minerals come out of the water and set hard as the white scale on shower glass, inside the kettle and around the element of the hot water system.",
    facts: [
      { value: "29 to 228 mg/L", label: "Hardness across Perth's supply areas" },
      { value: "228 mg/L", label: "Two Rocks, the hardest in Perth" },
    ],
  },
  {
    stage: 1,
    label: "The field",
    title: "Through the magnetic field",
    body: "Inside each GMX unit, permanent ceramic magnets sit against the pipe with opposing poles across it, and the water flows through the field between them. Three or four units in a row give it a longer run through the field on its way into the house.",
    facts: [
      { value: "3 to 4", label: "Units on a home's main" },
      { value: "25 mm", label: "Between units" },
    ],
  },
  {
    stage: 2,
    label: "The change",
    title: "Minerals change form",
    body: "GMX is designed to change the way the calcium in the water crystallises. Instead of building into a hard crust on the first warm surface it meets, it forms fine particles that stay suspended in the water.",
  },
  {
    stage: 3,
    label: "Out",
    title: "Carried away",
    body: "The particles are carried along with the water instead of bonding to pipes and elements, and the deposits that do form are softer and easier to wipe off glass and tapware. Nothing is added to the water and nothing is taken out.",
    facts: [
      { value: "Nothing added", label: "No salt or chemicals in the water" },
      { value: "Every tap", label: "Hot and cold, kitchen to garden" },
    ],
  },
] as const;

/** The four models, smallest to largest. `image` (front) and `inside` (opened up) are GMX's product photographs on
 * the site's stone. Sizes and weights are GMX's, converted from inches and pounds. */
export const gmxModels = [
  {
    model: "Model 400",
    name: "Appliance lines",
    image: "/trade/gmx/model-400.webp",
    inside: "/trade/gmx/model-400-inside.webp",
    summary: "A two-piece set for small lines, such as the feed to a coffee machine, fridge, ice maker or evaporative cooler.",
    specs: {
      pipe: "3 to 12 mm (⅛ to ½ inch)",
      units: "One set, or two on lines over 10 mm",
      fixing: "Two-piece set with nylon bolts and wing nuts",
      size: "64 × 70 × 44 mm, 340 g",
      finish: "Black",
    },
  },
  {
    model: "Model 800",
    name: "The whole house",
    image: "/trade/gmx/model-800.webp",
    inside: "/trade/gmx/model-800-inside.webp",
    summary: "The home model. Three or four on the main where it comes into the house, and two on the hot water outlet, storage or continuous flow.",
    specs: {
      pipe: "DN15 to DN25 (⅝ to 1 inch)",
      units: "Three or four on the main, plus two on the hot water outlet",
      fixing: "Magnet unit and backing plate, bolts and wing nuts",
      size: "133 × 121 × 44 mm, 0.9 kg",
      finish: "Black",
    },
  },
  {
    model: "Model 848",
    name: "Pools, spas and larger mains",
    image: "/trade/gmx/model-848.webp",
    inside: "/trade/gmx/model-848-inside.webp",
    summary: "For pool and spa plumbing, apartments, laundries and larger mains, fitted on a pool's return line after the heater.",
    specs: {
      pipe: "DN32 to DN40 (1¼ to 1¾ inch), and DN50 on pool and spa circuits",
      units: "Two on DN32, four on DN40 and DN50",
      fixing: "Magnet unit and backing plate, bolts and wing nuts",
      size: "133 × 121 × 44 mm, 0.9 kg",
      finish: "Blue",
    },
  },
  {
    model: "Model 8000",
    name: "Sites, farms and commercial",
    image: "/trade/gmx/model-8000.webp",
    inside: "/trade/gmx/model-8000-inside.webp",
    summary: "Heavy sets on stainless steel banding, for site mains, resorts, irrigation, bores and commercial plant.",
    specs: {
      pipe: "DN50 to DN350 (2 to 14 inch)",
      units: "Four sets up to DN100, seven on DN125 and DN150, seven to fifteen on larger pipe",
      fixing: "Heavy two-piece sets on stainless steel banding",
      size: "127 × 127 × 121 mm, 3.6 kg",
      finish: "Black",
    },
  },
] as const;

/** Rows of the spec table: per-model rows from `specs`, then the rows every model shares. */
export const gmxSpecRows = {
  perModel: [
    { key: "pipe", label: "Pipe size" },
    { key: "units", label: "Units per line" },
    { key: "fixing", label: "Fixing" },
    { key: "size", label: "Size and weight" },
    { key: "finish", label: "Finish" },
  ],
  shared: [
    { label: "Magnets", value: "Permanent ceramic magnets, with opposing poles across the pipe" },
    { label: "Suitable pipe", value: "Copper, PVC, PE, HDPE, PEX and stainless steel. Not steel or galvanised pipe." },
    { label: "Pressure and flow", value: "No change, and silent in use" },
    { label: "Power", value: "None" },
    { label: "Maintenance", value: "None, with no moving parts or consumables" },
    { label: "Made in", value: "Chino, California, by GMX International since 1992" },
    { label: "Warranty", value: "Manufacturer's limited warranty, with the Australian terms confirmed in writing at quotation" },
  ],
} as const;

/** Where it goes: GMX's placement rules, in millimetres. */
export const gmxPlacement = [
  {
    label: "01",
    title: "On the main, after the meter",
    body: "Three or four Model 800s clamp onto the main where it comes into the home, 25 mm apart with their labels facing the same way. Every tap after them gets conditioned water.",
  },
  {
    label: "02",
    title: "On the hot water outlet",
    body: "Two more Model 800s go on the line leaving the hot water system, whether it is a storage tank, a continuous flow unit or solar, to look after every hot tap in the house.",
  },
  {
    label: "03",
    title: "At the appliances",
    body: "A Model 400 goes 200 to 300 mm before the appliance it looks after, such as a coffee machine, an ice maker or an evaporative cooler, on lines up to 12 mm.",
  },
  {
    label: "04",
    title: "Clear of pumps and motors",
    body: "Fit units 450 to 600 mm after a pump and clear of welders, large motors and power cables. On steel pipe, a short section is replaced with copper or PVC first.",
  },
];

/** Which model and how many: for each use, the pipe sizes it comes in and what GMX recommends on each. */
export const gmxSizing = [
  {
    use: "The whole house",
    pipes: [
      { pipe: "DN15 (15 mm copper)", model: "Model 800", units: "3 on the main + 2 per hot water system" },
      { pipe: "DN20 (20 mm copper)", model: "Model 800", units: "3 to 4 on the main + 2 per hot water system" },
      { pipe: "DN25 (25 mm copper)", model: "Model 800", units: "4 on the main + 2 per hot water system" },
      { pipe: "DN32", model: "Model 848", units: "2 on the main + 2 Model 800s per hot water system" },
      { pipe: "DN40", model: "Model 848", units: "4 on the main + 2 Model 800s per hot water system" },
      { pipe: "DN50 or larger", model: "Model 8000", units: "4 sets on the main + 2 Model 800s per hot water system" },
    ],
  },
  {
    use: "A hot water system",
    pipes: [{ pipe: "DN15 to DN25", model: "Model 800", units: "2 on the outlet" }],
  },
  {
    use: "An appliance line",
    pipes: [
      { pipe: "Up to 10 mm", model: "Model 400", units: "1 set" },
      { pipe: "11 to 12 mm", model: "Model 400", units: "2 sets" },
    ],
  },
  {
    use: "A pool or spa",
    pipes: [
      { pipe: "40 mm PVC", model: "Model 848", units: "4 on the return line, after the heater" },
      { pipe: "50 mm PVC", model: "Model 848", units: "4 on the return line, after the heater" },
    ],
  },
  {
    use: "A site, farm or commercial main",
    pipes: [
      { pipe: "DN50 to DN100", model: "Model 8000", units: "4 sets, plus 3 Model 800s on the supply to each building" },
      { pipe: "DN125 to DN150", model: "Model 8000", units: "7 sets" },
      { pipe: "DN150 to DN350", model: "Model 8000", units: "7 to 15 sets, sized with GMX for your site" },
    ],
  },
] as const;

/** Pairs with the Cloud filter: filtration can't take out hardness, and GMX doesn't filter. */
export const gmxPairing = {
  label: "Better together",
  title: "Pair it with whole-house filtration",
  body: "GMX isn't a filter, so it leaves chlorine, sediment and taste as they are. A filter takes those out, but the minerals that cause scale pass straight through it. Fit GMX alongside the Cloud whole-house filter and the home gets water that tastes better and is easier on everything it touches.",
  link: { label: "Whole-house water filtration", href: "/trade/water-filtration/", image: "/trade/water/system.webp" },
};

export const gmxFaqs = [
  {
    title: "How does GMX work?",
    body: "Each unit holds permanent ceramic magnets against the pipe, with opposing poles across it. As the water flows through their field, GMX says the dissolved minerals form tiny particles that stay suspended in the flow, so they are far less likely to bond to pipes, elements and appliances as hard scale.",
  },
  {
    title: "Does it soften the water?",
    body: "No. A softener uses salt to take the calcium and magnesium out, so the water is still technically hard with GMX. It changes how those minerals behave so they are less likely to stick as scale, which is why it needs no salt and makes no waste water.",
  },
  {
    title: "Does magnetic water treatment really work?",
    body: "Laboratory work, including a blind trial at Trinity College Dublin, has shown that a magnetic field changes the way calcium carbonate crystallises, towards a softer deposit. Results in the field depend on the water, the flow and how carefully the units are fitted, and some trials of other brands found no benefit. That is why we size every job to GMX's installation rules. Ask us for our science and technical sheet, which sets out the research on both sides.",
  },
  {
    title: "What pipe does it fit?",
    body: "GMX fits copper, PVC, PE, HDPE, PEX and stainless steel pipe. It doesn't work on steel or galvanised pipe, so on older steel mains a 450 to 600 mm section is replaced with copper or PVC first. If a magnet sticks to the pipe, it is steel.",
  },
  {
    title: "Does it work on bore water?",
    body: "Iron, manganese and silica reduce how well magnetic treatment works, and bore water often carries them. On a bore or other untested supply, we ask for a water test before we recommend a set.",
  },
  {
    title: "Who can fit it?",
    body: "GMX clamps onto the outside of the pipe with the hardware in the box, so nothing is cut and there is no shutdown or bypass. Snug the wing nuts without over-tightening them. Our trade accounts are for licensed plumbers, gasfitters and water treatment specialists, who often add GMX to a hot water or filtration job.",
  },
  {
    title: "How soon will I notice a difference?",
    body: "The water is treated from the day the units are fitted, and GMX reports visible results within about two months. As old scale loosens, the water can look a little cloudy for a few weeks, so check any filters weekly during that time.",
  },
  {
    title: "Does it change the water pressure?",
    body: "No. GMX sits on the outside of the pipe, so the pressure and flow stay exactly as they were, and it is silent.",
  },
  {
    title: "Does it need any servicing?",
    body: "No. There are no moving parts, cartridges or power, and nothing to top up. If you move house, take the units with you.",
  },
  {
    title: "Does the direction of flow matter?",
    body: "No. GMX works the same whichever way the water runs. Fit the units 25 mm apart, with their labels on the same side and facing the same way.",
  },
  {
    title: "What warranty does it come with?",
    body: "Every GMX unit carries a manufacturer's limited warranty. We confirm the Australian warranty terms in writing with every quote.",
  },
  {
    title: "Where is it made?",
    body: "GMX International has made its conditioners in Chino, California, since 1992. They are used in homes, pools, farms and factories around the world, and Cloud Trade is the exclusive Australian agent.",
  },
  {
    title: "Can I buy GMX for my own home?",
    body: `GMX is fitted by licensed plumbers, so ask yours about it. If they don't stock it yet, email us at ${site.email} and we will come back to you.`,
  },
];

/** Trade pricing: the page's one form, with a short word for the trade above it. */
export const gmxPricing = {
  title: "Get trade pricing",
  intro:
    "Cloud Trade is the exclusive Australian agent for GMX. Licensed plumbers, gasfitters and water treatment specialists buy at trade, fit it for their own customers and set their own installation price. We supply the technical pack, tech support and co-branded customer flyers, with volume pricing from 50 Model 800s or 20 Model 8000s. Tell us about your business and we will set up your trade account.",
};

export const gmxEnquiry = {
  roles: ["Plumber", "Plumbing contractor", "Gasfitter", "Water treatment specialist", "Pool and spa builder", "Builder or developer", "Irrigation or farm supplier", "Other"],
  models: ["Model 400", "Model 800", "Model 848", "Model 8000", "A mix of models", "Not sure yet"],
  quantities: ["Fewer than 10", "10 to 25", "25 to 50", "50 to 100", "More than 100"],
};

/** The spec sheet PDF, made once the dimensions are measured. */
export const gmxSpecSheet = {
  href: "/trade/gmx/gmx-spec-sheet.pdf",
  title: "Download the spec sheet",
  intro: "Pipe sizes, placement and sizing for all four GMX models in one PDF. Tell us who you are and the download is yours.",
};
