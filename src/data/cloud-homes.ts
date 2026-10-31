/**
 * Cloud Homes: the homes and choices in the "Design yours" tool (/cloud-homes/design/). One place for every home,
 * section, choice and price, so changing the range is an edit here. The 3D models are in ./explorer/cloud-homes.ts.
 *
 * DRAFT (26 Oct 2026). Home sizes and rooms come from the Casuarina Crescent drawings, which leave the cladding,
 * roof colour and finishes "as selected" or "to client selection". The from prices are placeholders taken from
 * published Perth granny flat and home cost guides, and the choices are a starting list modelled on Samara's
 * sections. All of them are to be replaced with Cloud Modular's own figures and range.
 */

import type { CloudHomeId } from "./explorer/cloud-homes";

export interface CloudHome {
  id: CloudHomeId;
  name: string;
  /** Short line under the name: bedrooms, bathrooms and storeys. */
  rooms: string;
  /** Internal house area and the vergola deck, from the drawings' area schedules. */
  houseArea: number;
  deckArea: number;
  storeys: 1 | 2;
  fromPrice: number;
}

export const cloudHomes: readonly CloudHome[] = [
  { id: "one-bed", name: "1 Bed", rooms: "1 bedroom, 1 bathroom", houseArea: 49.45, deckArea: 6.52, storeys: 1, fromPrice: 150_000 },
  { id: "two-bed", name: "2 Bed", rooms: "2 bedrooms, 1 bathroom and a powder room", houseArea: 64.07, deckArea: 5.38, storeys: 1, fromPrice: 190_000 },
  { id: "four-bed", name: "4 Bed", rooms: "4 bedrooms, 2 bathrooms, two storeys", houseArea: 117.49, deckArea: 6.52, storeys: 2, fromPrice: 350_000 },
];

export const defaultHome: CloudHomeId = "two-bed";

/** Where the camera turns for a section: degrees around the home and down from overhead. "inside" lifts the roof. */
export interface CameraView {
  azimuth: number;
  polar: number;
  inside?: boolean;
  /** Close in on part of the home: the kitchen at the front, or the services on the rear wall. */
  focus?: "kitchen" | "services" | "bathroom";
}

/** What a choice changes in the 3D home. */
export interface ModelChange {
  /** Material colours, by material key. */
  paint?: Record<string, string>;
  /** Wall cladding pattern: fibre cement sheets with vertical joints, or vertical timber-look boards. */
  cladding?: "panels" | "boards";
  /** Model groups to show or hide (solar panels, the battery). */
  show?: Record<string, boolean>;
  /** Materials drawn with timber grain (oak joinery or benchtops). */
  grain?: string[];
}

export interface Choice extends ModelChange {
  id: string;
  name: string;
  /** Line under the name on card choices. */
  detail?: string;
  /** Colour chip for swatch choices. */
  swatch?: string;
}

export interface Section {
  id: string;
  /** Short name in the summary. */
  label: string;
  title: string;
  body?: string;
  kind: "swatch" | "card";
  camera: CameraView;
  choices: readonly Choice[];
  /** Only shown while another section has one of these choices. */
  when?: { section: string; is: readonly string[] };
}

export const homeCamera: CameraView = { azimuth: 40, polar: 74 };

const wall = (id: string, name: string, colour: string): Choice => ({ id, name, swatch: colour, paint: { cladding: colour, render: colour } });

export const sections: readonly Section[] = [
  {
    id: "cladding",
    label: "Cladding",
    title: "Choose your cladding",
    kind: "card",
    camera: { azimuth: 30, polar: 77 },
    choices: [
      { id: "fibre-cement", name: "Fibre cement panels", detail: "Smooth painted panels with fine vertical joints", cladding: "panels" },
      { id: "timber-look", name: "Timber-look cladding", detail: "Vertical boards in a warm timber tone", cladding: "boards" },
    ],
  },
  {
    id: "colour",
    label: "Cladding colour",
    title: "Choose your cladding colour",
    body: "Painted to a calm, coastal palette.",
    kind: "swatch",
    camera: { azimuth: 30, polar: 77 },
    when: { section: "cladding", is: ["fibre-cement"] },
    choices: [
      wall("natural-white", "Natural white", "#ebe9e2"),
      wall("warm-grey", "Warm grey", "#cbc7bd"),
      wall("stone", "Stone", "#aaa497"),
      wall("graphite", "Graphite", "#5b5c5c"),
      wall("black", "Black", "#2c2c2d"),
    ],
  },
  {
    id: "roof",
    label: "Roof",
    title: "Choose your roof colour",
    body: "Klip-Lok steel roofing, set low behind the walls, shown in Colorbond colours.",
    kind: "swatch",
    camera: { azimuth: 35, polar: 42 },
    choices: [
      { id: "shale-grey", name: "Shale Grey", swatch: "#bdbfba", paint: { roof: "#bdbfba" } },
      { id: "surfmist", name: "Surfmist", swatch: "#e4e2d5", paint: { roof: "#e4e2d5" } },
      { id: "basalt", name: "Basalt", swatch: "#6d6c6e", paint: { roof: "#6d6c6e" } },
      { id: "woodland-grey", name: "Woodland Grey", swatch: "#4b4c46", paint: { roof: "#4b4c46" } },
      { id: "monument", name: "Monument", swatch: "#323233", paint: { roof: "#323233" } },
    ],
  },
  {
    id: "frames",
    label: "Frames and vergola",
    title: "Choose your frames",
    body: "Window and door frames, the vergola and its posts.",
    kind: "swatch",
    camera: { azimuth: 65, polar: 76 },
    choices: [
      { id: "black", name: "Black", swatch: "#232323", paint: { frameDark: "#232323", fascia: "#2a2a2a", steel: "#343434" } },
      { id: "charcoal", name: "Charcoal", swatch: "#45474a", paint: { frameDark: "#424447", fascia: "#45474a", steel: "#55585b" } },
      { id: "white", name: "White", swatch: "#efeee9", paint: { frameDark: "#e8e7e2", fascia: "#efeee9", steel: "#f3f2ee" } },
    ],
  },
  {
    id: "solar",
    label: "Solar",
    title: "Add solar panels",
    kind: "card",
    camera: { azimuth: 30, polar: 40 },
    choices: [
      { id: "solar", name: "Solar array", detail: "Panels across the roof", show: { solar: true } },
      { id: "no-solar", name: "No solar", detail: "Power from the grid", show: { solar: false } },
    ],
  },
  {
    id: "battery",
    label: "Battery",
    title: "Add a home battery",
    kind: "card",
    camera: { azimuth: 200, polar: 76, focus: "services" },
    when: { section: "solar", is: ["solar"] },
    choices: [
      { id: "battery", name: "Home battery", detail: "Store your solar power to use at night", show: { battery: true } },
      { id: "no-battery", name: "No battery", detail: "Solar without storage", show: { battery: false } },
    ],
  },
  {
    id: "deck",
    label: "Deck",
    title: "Choose your deck",
    body: "The deck under the vergola, off the living room.",
    kind: "swatch",
    camera: { azimuth: 80, polar: 64 },
    choices: [
      { id: "spotted-gum", name: "Spotted gum", swatch: "#9c7a5b", paint: { deck: "#9c7a5b" } },
      { id: "silver-grey", name: "Weathered grey", swatch: "#9a958c", paint: { deck: "#9a958c" } },
      { id: "charcoal-composite", name: "Charcoal composite", swatch: "#4f4d4a", paint: { deck: "#4f4d4a" } },
    ],
  },
  {
    id: "floors",
    label: "Floors",
    title: "Choose your floors",
    body: "One floor finish through the living areas and bedrooms.",
    kind: "swatch",
    camera: { azimuth: 25, polar: 30, inside: true },
    choices: [
      { id: "light-oak", name: "Light oak", swatch: "#d3bf9f", paint: { floor: "#d3bf9f" } },
      { id: "natural-oak", name: "Natural oak", swatch: "#b48e64", paint: { floor: "#b48e64" } },
      { id: "smoked-oak", name: "Smoked oak", swatch: "#7c644d", paint: { floor: "#7c644d" } },
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen and robes",
    title: "Choose your kitchen",
    body: "Cabinets and benchtops together. The robes and vanity match the cabinets. Stone benchtops are an extra.",
    kind: "swatch",
    camera: { azimuth: 240, polar: 48, inside: true, focus: "kitchen" },
    choices: [
      { id: "white-grey", name: "White with pale grey benchtops", swatch: "linear-gradient(135deg, #ecebe6 50%, #d8d4cb 50%)", paint: { joinery: "#ecebe6", benchtop: "#d8d4cb" } },
      { id: "oak-white", name: "Oak with white benchtops", swatch: "linear-gradient(135deg, #b39a7a 50%, #efeee9 50%)", paint: { joinery: "#b39a7a", benchtop: "#efeee9" }, grain: ["joinery"] },
      { id: "greige-white", name: "Warm grey with white benchtops", swatch: "linear-gradient(135deg, #b5afa4 50%, #efede8 50%)", paint: { joinery: "#b5afa4", benchtop: "#efede8" } },
      { id: "charcoal-oak", name: "Charcoal with oak benchtops", swatch: "linear-gradient(135deg, #3d3e40 50%, #b39a7a 50%)", paint: { joinery: "#3d3e40", benchtop: "#b39a7a" }, grain: ["benchtop"] },
    ],
  },
];

/** Upgrades the buyer can ask for. Not modelled or priced here; the proposal prices them. */
export const extras = {
  id: "extras",
  label: "Extras",
  title: "Add extras",
  body: "Tell us what you would like, and we will price it in your proposal.",
  // Most extras are inside, and stone benchtops show best up close
  camera: { azimuth: 205, polar: 42, inside: true, focus: "kitchen" } as CameraView,
  items: [
    { id: "stone-benchtops", name: "Stone benchtops", detail: "Polished engineered stone with a thicker edge", camera: { azimuth: 205, polar: 42, inside: true, focus: "kitchen" } as CameraView },
    { id: "roller-blinds", name: "Roller blinds", detail: "Privacy without losing the light" },
    { id: "plantation-shutters", name: "Plantation shutters", detail: "Adjustable shutters to the bedrooms" },
    { id: "ceiling-fans", name: "Ceiling fans", detail: "In the living room and bedrooms" },
    { id: "accessible-bathroom", name: "Accessible bathroom fittings", detail: "Grab rails and easier access", camera: { azimuth: 300, polar: 30, inside: true, focus: "bathroom" } as CameraView },
  ],
} as const;

/** Shown on the drawings for all three homes. The standard inclusions. (The 1 and 2 Bed drawings
 *  also show solar panels, a battery and an air conditioning unit; the 4 Bed drawings do not.) */
export const included = [
  "Double-glazed aluminium windows and doors",
  "Steel louvred vergola over the deck",
  "Heat pump hot water",
  "Electric vehicle charger point",
];

/** From order to keys, following the stages on /our-approach/. */
export const homeSteps = [
  {
    title: "Design yours",
    body: "Choose your home and finishes, then send us your design and your site address.",
    image: { src: "/cloud-homes/two-bed.webp", alt: "A Cloud Home 2 Bed in the default finish, rendered from its 3D model", width: 1000, height: 1250, position: "center" },
  },
  {
    title: "Site review and proposal",
    body: "We review your site and send a proposal with the scope, the price and the programme.",
    image: { src: "/cloud-homes/generated/backyard.webp", alt: "A Cloud Home 2 Bed in a suburban backyard, with a paved path to its deck and native planting", width: 2560, height: 1429, position: "47% center" },
  },
  {
    title: "Approvals and manufacture",
    body: "Once approvals are in place, your home is built in our factory while your site is prepared.",
    image: { src: "/Factory-1.webp", alt: "Modules being built along a bright factory floor", width: 1672, height: 941, position: "30% center" },
  },
  {
    title: "Delivery and handover",
    body: "Your home is shipped, craned onto its footings and connected, then the keys are handed over.",
    image: { src: "/cloud-homes/generated/deck.webp", alt: "A father on the deck of a Cloud Home 2 Bed at dusk as his daughter shows him a gum leaf", width: 2560, height: 1429, position: "64% center" },
  },
] as const;

// /cloud-homes/how-it-works/: the whole journey, in the buyer's terms. Every step restates the published process
// (homeSteps above and approachStages in site.ts); no durations until real ones are confirmed.
// kind "step" has a title, text and an optional image; "milestone" is a pill on the line; "moment" is the crane day,
// set as one giant word. A step with demo shows the 2 Bed live in 3D with the cladding colours to try, its image
// standing in until the 3D loads.
type JourneyImage = { src: string; alt: string; width: number; height: number };
export type JourneyItem =
  | { kind: "step"; title: string; body: string; eyebrow?: string; image?: JourneyImage; demo?: boolean }
  | { kind: "milestone"; title: string }
  | { kind: "moment"; title: string; body: string };

export const homeJourney: JourneyItem[] = [
  {
    kind: "step",
    title: "Design yours",
    body: "Choose your home, then its cladding, colours, solar and finishes in 3D. When you are happy with it, send us your design and your site address.",
    image: { src: "/cloud-homes/two-bed-wide.webp", alt: "Render of the 2 Bed Cloud Home in white fibre cement panels, with solar panels and a covered deck at the entry", width: 2400, height: 1350 },
    demo: true,
  },
  {
    kind: "step",
    title: "Site review",
    body: "We review your site to check that your home suits it, including access for delivery and the crane.",
    image: { src: "/cloud-homes/generated/backyard.webp", alt: "A Cloud Home 2 Bed in a suburban backyard, with a paved path to its deck and native planting", width: 2560, height: 1429 },
  },
  {
    kind: "step",
    title: "Your proposal",
    body: "We send you a proposal with the scope, the price and the programme. Once you accept it, we get started.",
    image: { src: "/cloud-homes/plan-two-bed.webp", alt: "The 2 Bed from above with its roof lifted off, showing the living room, two bedrooms, bathroom and deck", width: 1000, height: 1250 },
  },
  { kind: "milestone", title: "Proposal accepted" },
  {
    kind: "step",
    title: "Approvals",
    body: "We prepare the documents for planning and building approval, and the registered builder lodges the building permit. Production starts once the approvals are in place.",
  },
  { kind: "milestone", title: "Approved to build" },
  {
    kind: "step",
    title: "Manufacture",
    body: "Your home is built in our manufacturing facility, with the structure, services and fit-out built in. Independent inspections at key stages check accuracy, workmanship and compliance.",
    image: { src: "/Factory.webp", alt: "Modules on a bright factory floor", width: 928, height: 1232 },
  },
  {
    kind: "step",
    eyebrow: "At the same time",
    title: "Site preparation",
    body: "While your home is built, your site is prepared, with the footings and services made ready for its arrival.",
  },
  {
    kind: "step",
    title: "Shipping",
    body: "Your home is shipped to the nearest suitable port and cleared through customs and biosecurity. It then travels by road to your site, including to regional and remote locations.",
    image: { src: "/approach/hero.webp", alt: "A wrapped module carrying the Cloud Modular mark against a clear sky", width: 1672, height: 941 },
  },
  { kind: "milestone", title: "Ready for delivery" },
  { kind: "moment", title: "Craned in", body: "Your home arrives at your site and is craned onto its footings. It is then sealed and connected to services." },
  {
    kind: "step",
    title: "Final touches",
    body: "The builder completes the finishing works, and the building surveyor carries out the final inspection.",
    image: { src: "/Card4.webp", alt: "Light falling across a timber floor and a stone wall", width: 928, height: 1232 },
  },
  { kind: "milestone", title: "Keys in hand" },
];

export const australianStates =["WA", "NSW", "VIC", "QLD", "SA", "TAS", "ACT", "NT"] as const;

export const formatPrice = (n: number) => `$${n.toLocaleString("en-AU")}`;

// ---------------------------------------------------------------------------------------------------
// A design: the chosen home, a choice per visible section and any extras. Kept in the URL so it can be shared and
// carried from the design page to the availability page.

export interface Design {
  home: CloudHome;
  picks: { section: Section; choice: Choice }[];
  extras: { id: string; name: string }[];
}

export const sectionVisible = (section: Section, chosen: Record<string, string>) =>
  !section.when || section.when.is.includes(chosen[section.when.section] ?? sections.find((s) => s.id === section.when!.section)!.choices[0].id);

export function readDesign(params: URLSearchParams): Design {
  const home = cloudHomes.find((h) => h.id === params.get("home")) ?? cloudHomes.find((h) => h.id === defaultHome)!;
  const chosen: Record<string, string> = {};
  const picks: Design["picks"] = [];
  for (const section of sections) {
    const choice = section.choices.find((c) => c.id === params.get(section.id)) ?? section.choices[0];
    chosen[section.id] = choice.id;
    if (sectionVisible(section, chosen)) picks.push({ section, choice });
  }
  const wanted = (params.get("extras") ?? "").split(",");
  return { home, picks, extras: extras.items.filter((item) => wanted.includes(item.id)) };
}

export function designQuery(design: Design): string {
  const params = new URLSearchParams();
  if (design.home.id !== defaultHome) params.set("home", design.home.id);
  for (const { section, choice } of design.picks) if (choice.id !== section.choices[0].id) params.set(section.id, choice.id);
  if (design.extras.length) params.set("extras", design.extras.map((e) => e.id).join(","));
  return params.toString();
}

/** Everything the 3D home needs for a design: colours, cladding pattern and groups to show. */
export function modelState(design: Design) {
  const state = {
    paint: {} as Record<string, string>,
    cladding: "panels" as "panels" | "boards",
    show: { solar: false, battery: false } as Record<string, boolean>,
    grain: [] as string[],
    stone: design.extras.some((e) => e.id === "stone-benchtops"),
  };
  for (const { choice } of design.picks) {
    Object.assign(state.paint, choice.paint);
    Object.assign(state.show, choice.show);
    state.grain.push(...(choice.grain ?? []));
    if (choice.cladding) state.cladding = choice.cladding;
  }
  state.show.stone = state.stone;
  state.show.access = design.extras.some((e) => e.id === "accessible-bathroom");
  // Hidden sections leave their groups off (no battery without solar)
  return state;
}

/** Summary rows: label and chosen name. */
export const summaryRows = (design: Design): [string, string][] => [
  ["Home", design.home.name],
  ...design.picks.map(({ section, choice }): [string, string] => [section.label, choice.name]),
  ["Extras", design.extras.length ? design.extras.map((e) => e.name).join(", ") : "None"],
];
