/**
 * Jurien Bay Type B residence: labels, verified facts and explorer presentation settings.
 * Geometry lives in ./jurien-type-b.ts. Edit copy here without touching the model or renderer.
 */

import type { GroupId, Level } from "./jurien-type-b";

// ---------------------------------------------------------------------------------------------------
// Labels and verified facts. Every fact cites its sheet; nothing here is a performance or construction claim.

export interface Fact {
  label: string;
  value: string;
  source: string;
}

export interface ComponentInfo {
  name: string;
  summary: string;
  facts: Fact[];
}

export const components: Record<GroupId, ComponentInfo> = {
  "gf-front": {
    name: "Ground floor: living wing",
    summary: "Sitting room and office opening onto the front verandah beneath the balcony.",
    facts: [
      { label: "Sitting / theatre", value: "4.92 × 4.70 m", source: "Sheet 3" },
      { label: "Office / rumpus", value: "2.94 × 3.60 m", source: "Sheet 3" },
      { label: "Verandah", value: "34.56 m²", source: "Sheet 3" },
      { label: "Ceiling height", value: "2.70 m", source: "Sheet 3" },
    ],
  },
  "gf-bed": {
    name: "Ground floor: bedroom wing",
    summary: "Three bedrooms, bathroom and laundry along a central hall.",
    facts: [
      { label: "Bed 2", value: "3.14 × 3.71 m, walk-in robe", source: "Sheet 3" },
      { label: "Bed 3", value: "3.30 × 3.34 m", source: "Sheet 3" },
      { label: "Bed 4", value: "3.30 × 3.33 m", source: "Sheet 3" },
      { label: "Ground floor house area", value: "120.87 m² (whole level)", source: "Sheet 3" },
    ],
  },
  tower: {
    name: "Stair tower",
    summary: "Internal stair between floors, clad in feature vertical cladding with a tall front window.",
    facts: [
      { label: "Stair", value: "16 risers, ground to upper floor", source: "Sheets 3–4" },
      { label: "Cladding", value: "Feature vertical cladding", source: "Sheets 6–7" },
    ],
  },
  garage: {
    name: "Garage",
    summary: "Double garage at the rear, opening to Bay View road.",
    facts: [
      { label: "Internal size", value: "6.02 × 6.66 m (optional)", source: "Sheet 3" },
      { label: "Garage area", value: "41.85 m²", source: "Sheet 3" },
      { label: "Door", value: "Auto sectional door", source: "Sheet 7" },
      { label: "Floor", value: "Grano, 80 mm below house floor", source: "Sheets 3, 7" },
    ],
  },
  "garage-roof": {
    name: "Garage roof",
    summary: "Single-pitch metal roof over the garage.",
    facts: [
      { label: "Pitch", value: "Colorbond roof at 9°", source: "Sheet 6" },
      { label: "Ground floor roof area", value: "41.97 m²", source: "Sheet 3" },
    ],
  },
  "uf-living": {
    name: "Upper floor: living wing",
    summary: "Open-plan kitchen, dining and living opening onto the balcony.",
    facts: [
      { label: "Dining", value: "4.87 × 5.96 m", source: "Sheet 4" },
      { label: "Kitchen", value: "2.75 × 5.96 m", source: "Sheet 4" },
      { label: "Living", value: "4.59 × 4.54 m", source: "Sheet 4" },
      { label: "Floor level", value: "3.022 m above ground floor", source: "Sheet 6" },
    ],
  },
  "uf-master": {
    name: "Upper floor: master wing",
    summary: "Master suite with dresser and ensuite, plus a powder room.",
    facts: [
      { label: "Master suite", value: "4.75 × 3.65 m", source: "Sheet 4" },
      { label: "Dresser", value: "4.75 × 1.80 m", source: "Sheet 4" },
      { label: "Upper floor house area", value: "128.02 m² (whole level)", source: "Sheet 4" },
    ],
  },
  frame: {
    name: "Balcony and frame",
    summary: "The white rendered frame enclosing the upper-floor balcony, carried on slender verandah posts.",
    facts: [
      { label: "Balcony", value: "7.83 × 3.50 m (27.41 m²)", source: "Sheet 4" },
      { label: "Frame finish", value: "Rendered blueboard", source: "Sheet 6" },
      { label: "Privacy screening", value: "1.6 m high at the balcony ends", source: "Sheets 6–7" },
    ],
  },
  spiral: {
    name: "Spiral stair",
    summary: "External spiral stair from the balcony to the roof terrace.",
    facts: [
      { label: "Rises", value: "Balcony (3.022 m) to roof terrace (6.044 m)", source: "Sheets 6, 8" },
    ],
  },
  terrace: {
    name: "Roof terrace",
    summary: "Optional roof terrace above the balcony, reached by the spiral stair.",
    facts: [
      { label: "Roof terrace", value: "7.83 × 3.50 m (27.41 m², optional)", source: "Sheet 5" },
      { label: "Floor level", value: "6.044 m above ground floor", source: "Sheet 6" },
      { label: "Privacy screening", value: "1.6 m high at the terrace ends", source: "Sheets 6–7" },
    ],
  },
  pergola: {
    name: "Pergola",
    summary: "Open pergola over the roof terrace.",
    facts: [{ label: "Height", value: "8.264–8.444 m above ground floor", source: "Sheets 6–7" }],
  },
  roof: {
    name: "Main roof",
    summary: "Metal roof over the upper floor with solar panels on the northern plane.",
    facts: [
      { label: "Pitches", value: "Colorbond roof at 15° and 9°", source: "Sheets 6–7" },
      { label: "Upper floor roof area", value: "134.89 m²", source: "Sheet 3" },
      { label: "Solar panels", value: "Shown on roof", source: "Sheets 6, 10" },
    ],
  },
};

/** Display order for the component list (bottom up, back to front). */
export const componentOrder: GroupId[] = [
  "gf-front",
  "gf-bed",
  "tower",
  "garage",
  "garage-roof",
  "uf-living",
  "uf-master",
  "frame",
  "spiral",
  "terrace",
  "pergola",
  "roof",
];

export const levelRank: Record<Level, number> = { gf: 0, uf: 1, roof: 2, pergola: 3 };

export const views = [
  { id: "exterior", label: "Exterior", maxRank: 3 },
  { id: "rooftop", label: "Rooftop", maxRank: 2 },
  { id: "upper", label: "Upper floor", maxRank: 1 },
  { id: "ground", label: "Ground floor", maxRank: 0 },
] as const;

export type ViewId = (typeof views)[number]["id"];

/**
 * Modelling assumptions, surfaced in the docs. Keep in sync with Design-Docs/08 - 3D Home Explorer.md.
 */
export const assumptions = [
  "Assembly groups are presentation groups chosen for clarity. The DA set documents no module boundaries.",
  "Balustrades (frameless glass, warm rail) and pergola (timber) follow the reference render; plans show slat balustrades and a white pergola.",
  "Ground floor front wall follows the plans (white horizontal cladding, two sliding door sets) rather than the render.",
  "Roof modelled as a single ridge along the house (RL 16.759) at 15° south / 9° north, continuing over the stair tower; gutters and downpipes shown, parapets and flashings omitted.",
  "Courtyard-facing walls are not drawn in elevation; modelled solid except the ground-floor slider shown on elevation 2.",
  "Spiral stair diameter, internal stair position, post spacing, rafter spacing and balustrade height are scaled or indicative.",
  "Furniture and joinery are simplified blocks placed from the plan symbols.",
  "Site works (fencing, retaining walls, landscaping, driveway) are omitted apart from the courtyard tree.",
];
