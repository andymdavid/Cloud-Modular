/**
 * Cloud Homes: the homes and choices in the "Design yours" tool (/cloud-homes/design/). One place for every home,
 * option and price, so changing the range is an edit here. The 3D models are in ./explorer/cloud-homes.ts.
 *
 * DRAFT (26 Oct 2026). Home sizes and rooms come from the Casuarina Crescent drawings. The from prices are
 * placeholders taken from published Perth granny flat and home cost guides, and the finishes and extras are a
 * starting list. All of them are to be replaced with Cloud Modular's own figures and range (`confirm: true`).
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
  confirmPrice: boolean;
}

export const cloudHomes: readonly CloudHome[] = [
  { id: "one-bed", name: "1 Bed", rooms: "1 bedroom, 1 bathroom", houseArea: 49.45, deckArea: 6.52, storeys: 1, fromPrice: 150_000, confirmPrice: true },
  { id: "two-bed", name: "2 Bed", rooms: "2 bedrooms, 1 bathroom and a powder room", houseArea: 64.07, deckArea: 5.38, storeys: 1, fromPrice: 190_000, confirmPrice: true },
  { id: "four-bed", name: "4 Bed", rooms: "4 bedrooms, 2 bathrooms, two storeys", houseArea: 117.49, deckArea: 6.52, storeys: 2, fromPrice: 350_000, confirmPrice: true },
];

/** How the 3D model shows a finish: the material it recolours and the colours to use. */
export interface Finish {
  id: string;
  name: string;
  /** Swatch shown in the panel. */
  swatch: string;
  /** Material colours in the model, by material key. */
  paint: Record<string, string>;
}

/** Where the camera turns for a section: degrees around the home and down from overhead. "inside" lifts the roof. */
export interface CameraView {
  azimuth: number;
  polar: number;
  inside?: boolean;
}

export interface FinishSection {
  id: string;
  title: string;
  label: string;
  body: string;
  camera: CameraView;
  finishes: readonly Finish[];
}

export const homeCamera: CameraView = { azimuth: 35, polar: 62 };

export const finishSections: readonly FinishSection[] = [
  {
    id: "exterior",
    label: "Exterior",
    title: "Choose your exterior",
    body: "The colour of the walls and the frame around the front.",
    camera: { azimuth: 30, polar: 66 },
    finishes: [
      { id: "coastal-white", name: "Coastal white", swatch: "#efede8", paint: { cladding: "#efede8", render: "#efede8" } },
      { id: "pale-grey", name: "Pale grey", swatch: "#cfcdc8", paint: { cladding: "#cfcdc8", render: "#cfcdc8" } },
      { id: "sandstone", name: "Sandstone", swatch: "#d6c8ae", paint: { cladding: "#d6c8ae", render: "#d6c8ae" } },
      { id: "charcoal", name: "Charcoal", swatch: "#4b4c4d", paint: { cladding: "#4b4c4d", render: "#4b4c4d" } },
    ],
  },
  {
    id: "frames",
    label: "Frames and vergola",
    title: "Choose your frames",
    body: "Window and door frames, the vergola and its posts.",
    camera: { azimuth: 65, polar: 64 },
    finishes: [
      { id: "black", name: "Black", swatch: "#232323", paint: { frameDark: "#232323", fascia: "#2b2b2b", steel: "#3a3a3a" } },
      { id: "dark-grey", name: "Dark grey", swatch: "#55595c", paint: { frameDark: "#4a4d50", fascia: "#55595c", steel: "#6a6e71" } },
      { id: "white", name: "White", swatch: "#f2f2ef", paint: { frameDark: "#e9e9e6", fascia: "#f2f2ef", steel: "#f6f6f3" } },
    ],
  },
  {
    id: "deck",
    label: "Deck",
    title: "Choose your deck",
    body: "The deck under the vergola, off the living room.",
    camera: { azimuth: 80, polar: 55 },
    finishes: [
      { id: "timber", name: "Timber", swatch: "#a5896e", paint: { deck: "#a5896e" } },
      { id: "grey-composite", name: "Grey composite", swatch: "#8d8a85", paint: { deck: "#8d8a85" } },
    ],
  },
  {
    id: "floors",
    label: "Floors",
    title: "Choose your floors",
    body: "One floor finish through the living areas and bedrooms.",
    camera: { azimuth: 25, polar: 30, inside: true },
    finishes: [
      { id: "light-oak", name: "Light oak", swatch: "#d6c6ac", paint: { floor: "#d6c6ac" } },
      { id: "natural-oak", name: "Natural oak", swatch: "#b8946a", paint: { floor: "#b8946a" } },
      { id: "stone-grey", name: "Stone grey", swatch: "#b9b6b0", paint: { floor: "#b9b6b0" } },
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen and robes",
    title: "Choose your kitchen",
    body: "The kitchen cabinets and the built-in robes.",
    camera: { azimuth: 20, polar: 38, inside: true },
    finishes: [
      { id: "white", name: "White", swatch: "#eeebe5", paint: { joinery: "#eeebe5" } },
      { id: "natural-timber", name: "Natural timber", swatch: "#b98c5f", paint: { joinery: "#b98c5f" } },
      { id: "charcoal", name: "Charcoal", swatch: "#3f4042", paint: { joinery: "#3f4042" } },
    ],
  },
];

/** Upgrades the buyer can ask for. Not modelled or priced here; the proposal prices them. */
export const extras = {
  id: "extras",
  label: "Extras",
  title: "Add extras",
  body: "Tell us what you would like, and we will price it in your proposal.",
  camera: { azimuth: 35, polar: 62 } as CameraView,
  items: [
    { id: "stone-benchtops", name: "Stone benchtops" },
    { id: "ceiling-fans", name: "Ceiling fans" },
    { id: "plantation-shutters", name: "Plantation shutters" },
    { id: "accessible-bathroom", name: "Accessible bathroom fittings" },
  ],
} as const;

/** Shown on the drawings for every home. To confirm as the standard inclusions. */
export const included = [
  "Double-glazed aluminium windows and doors",
  "Steel vergola over the deck",
  "Solar panels with a battery",
  "Heat pump hot water",
  "Air conditioning",
  "Electric vehicle charger point",
];

/** From order to keys, following the stages on /our-approach/. */
export const homeSteps = [
  { title: "Design yours", body: "Choose your home and finishes here, then send us your design." },
  { title: "Site review and proposal", body: "We review your site and send a proposal with the scope, the price and the programme." },
  { title: "Approvals and manufacture", body: "Once approvals are in place, your home is built in our manufacturing facility in Foshan while your site is prepared." },
  { title: "Delivery and handover", body: "Your home is shipped, craned onto its footings and connected, then the keys are handed over." },
] as const;

export const formatPrice = (n: number) => `$${n.toLocaleString("en-AU")}`;
