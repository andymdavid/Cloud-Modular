/**
 * Seashells Jurien Bay, 4 Bed Hasting Street Villa (Type B lot, rev B15): labels, verified facts and explorer
 * presentation settings. Geometry lives in ./hasting-street.ts.
 */

import type { Fact } from "./jurien-type-b-info";
import type { GroupId } from "./hasting-street";
import type { Level } from "./house";

// Every fact cites its sheet in the B15 set; nothing here is a performance or construction claim.

export interface ComponentInfo {
  name: string;
  summary: string;
  facts: Fact[];
}

export const components: Record<GroupId, ComponentInfo> = {
  "gf-bed": {
    name: "Ground floor: bedroom wing",
    summary: "Three bedrooms, bathroom and laundry along a central hall at the rear.",
    facts: [
      { label: "Bed 2", value: "3.30 × 3.41 m", source: "Sheet 7" },
      { label: "Bed 3", value: "3.30 × 3.42 m, walk-in robe", source: "Sheet 7" },
      { label: "Bed 4", value: "3.37 × 3.30 m, walk-in robe", source: "Sheet 7" },
      { label: "Ground floor house area", value: "115.15 m² (whole level)", source: "Sheet 7" },
    ],
  },
  "gf-living": {
    name: "Ground floor: living",
    summary: "Activity area and sitting room opening onto the front verandah, with the stair to the upper floor.",
    facts: [
      { label: "Sitting", value: "5.69 m wide", source: "Sheet 7" },
      { label: "Activity", value: "4.39 × 2.85 m", source: "Sheet 7" },
      { label: "Verandah", value: "15.59 m²", source: "Sheet 7" },
      { label: "Ceiling height", value: "2.70 m", source: "Sheet 7" },
    ],
  },
  garage: {
    name: "Garage",
    summary: "Double garage at the front, with a second door to the rear yard.",
    facts: [
      { label: "Internal size", value: "5.80 × 5.80 m", source: "Sheet 7" },
      { label: "Garage area", value: "35.53 m²", source: "Sheet 7" },
      { label: "Doors", value: "Auto sectional doors, front and rear", source: "Sheets 7, 10" },
      { label: "Floor", value: "Grano, 80 mm below house floor", source: "Sheets 7, 10" },
    ],
  },
  "garage-roof": {
    name: "Garage roof",
    summary: "Single-pitch metal roof over the garage, falling to the boundary wall.",
    facts: [{ label: "Pitch", value: "Klip-lok roof at 4°", source: "Sheet 10" }],
  },
  "gf-roof": {
    name: "Rear roof",
    summary: "Single-pitch metal roof over the rear bedrooms, beyond the upper floor.",
    facts: [
      { label: "Pitch", value: "Klip-lok roof at 8°", source: "Sheet 10" },
      { label: "Ground floor roof area", value: "44.28 m²", source: "Sheet 7" },
    ],
  },
  "uf-master": {
    name: "Upper floor: master wing",
    summary: "Master suite with walk-in robe and ensuite at the rear of the upper floor.",
    facts: [
      { label: "Master suite", value: "4.39 × 4.28 m", source: "Sheet 8" },
      { label: "Ensuite", value: "3.37 × 3.06 m", source: "Sheet 8" },
      { label: "Upper floor house area", value: "107.85 m² (whole level)", source: "Sheet 8" },
    ],
  },
  "uf-living": {
    name: "Upper floor: living",
    summary: "Kitchen, dining and living opening onto the balcony, with a powder room by the stair.",
    facts: [
      { label: "Dining and living", value: "7.85 m wide", source: "Sheet 8" },
      { label: "Kitchen", value: "4.39 m wide", source: "Sheet 8" },
      { label: "Floor level", value: "3.0 m above ground floor", source: "Sheet 10" },
    ],
  },
  frame: {
    name: "Balcony and frame",
    summary: "The white frame around the upper-floor balcony, over the verandah.",
    facts: [
      { label: "Balcony", value: "20.80 m², tiled", source: "Sheet 8" },
      { label: "Depth", value: "2.80 m", source: "Sheet 8" },
      { label: "Frame finish", value: "Fibre cement cladding", source: "Sheet 10" },
    ],
  },
  spiral: {
    name: "Spiral stair",
    summary: "Steel spiral stair from the balcony to the roof terrace.",
    facts: [{ label: "Rises", value: "Balcony (2.95 m) to roof terrace (6.0 m)", source: "Sheets 10, 14" }],
  },
  terrace: {
    name: "Roof terrace",
    summary: "Tiled roof terrace on top of the frame, reached by the spiral stair.",
    facts: [
      { label: "Roof terrace", value: "20.10 m²", source: "Sheet 9" },
      { label: "Floor level", value: "6.0 m above ground floor", source: "Sheet 10" },
      { label: "Privacy screening", value: "1.6 m high", source: "Sheets 9–10" },
    ],
  },
  roof: {
    name: "Main roof",
    summary: "Low metal roof over the upper floor, falling each way from a ridge along the house.",
    facts: [
      { label: "Pitch", value: "Klip-lok roof at 3°", source: "Sheet 10" },
      { label: "Upper floor roof area", value: "138.32 m²", source: "Sheet 7" },
    ],
  },
};

/** Display order for the component list (bottom up, back to front). */
export const componentOrder: GroupId[] = [
  "gf-bed",
  "gf-living",
  "garage",
  "garage-roof",
  "gf-roof",
  "uf-master",
  "uf-living",
  "frame",
  "spiral",
  "terrace",
  "roof",
];

export const levelRank: Record<Level, number> = { gf: 0, uf: 1, roof: 2, pergola: 3 };

export const views = [
  { id: "exterior", label: "Exterior", maxRank: 3 },
  { id: "upper", label: "Upper floor", maxRank: 1 },
  { id: "ground", label: "Ground floor", maxRank: 0 },
] as const;

/** Modelling assumptions. Keep in sync with Design-Docs/08 - 3D Home Explorer.md. */
export const assumptions = [
  "Assembly groups are presentation groups chosen for clarity. The drawings predate the modular shop drawings and document no module boundaries.",
  "Sheet 8 is drawn 0.38 m out of register with sheet 7; upper-floor positions are shifted to match the setbacks on both sheets.",
  "The balcony frame's leg widths and the closed east side follow sheet 8 and the elevations; the frame's exact outline is scaled.",
  "Balustrades are frameless glass with a warm rail, as on the Bay View Villa; screens are dark vertical battens.",
  "Spiral stair diameter, stair flight positions, balustrade height and the garage roof's junction with the upper floor are scaled or indicative.",
  "Furniture and joinery are simplified blocks placed from the plan symbols.",
  "Site works (fencing, paving, landscaping, bin store and services) are omitted.",
];
