/**
 * Seashells Jurien Bay, Short Stay 3 Bed Villa (rev C16): labels, verified facts and explorer presentation
 * settings. Geometry lives in ./three-bed-villa.ts.
 */

import type { ComponentInfo } from "./hasting-street-info";
import type { GroupId } from "./three-bed-villa";
import type { Level } from "./house";

// Every fact cites its sheet in the C16 set; nothing here is a performance or construction claim.

export const components: Record<GroupId, ComponentInfo> = {
  "gf-bed": {
    name: "Ground floor: bedrooms",
    summary: "Two bedrooms, the bathroom and laundry, and the stair to the master suite.",
    facts: [
      { label: "Bed 1", value: "2.80 × 3.52 m", source: "Sheet 6" },
      { label: "Bed 2", value: "2.71 × 3.03 m", source: "Sheet 6" },
      { label: "Bath and laundry", value: "1.75 × 3.03 m", source: "Sheet 6" },
      { label: "Ground floor house area", value: "65.03 m² (whole level)", source: "Sheet 6" },
    ],
  },
  "gf-living": {
    name: "Ground floor: living",
    summary: "Living, dining and kitchen under a raked ceiling open to the upper floor, sliding onto the deck.",
    facts: [
      { label: "Living, dining and kitchen", value: "6.10 × 4.12 m", source: "Sheet 6" },
      { label: "Ceiling", value: "Raked, open to the roof", source: "Sheets 7, 11" },
      { label: "Sliding door", value: "2.92 m wide", source: "Sheet 15" },
    ],
  },
  "gf-roof": {
    name: "Rear roof",
    summary: "Single-pitch metal roof over bed 1, beyond the upper floor.",
    facts: [
      { label: "Pitch", value: "Klip-lok roof at 6°", source: "Sheet 9" },
      { label: "Ground floor roof area", value: "11.90 m²", source: "Sheet 6" },
    ],
  },
  uf: {
    name: "Upper floor",
    summary: "Master suite with ensuite and robes, looking over the living room through internal glazing.",
    facts: [
      { label: "Master", value: "3.41 × 4.12 m", source: "Sheet 7" },
      { label: "Ensuite", value: "1.75 × 3.03 m", source: "Sheet 7" },
      { label: "Floor level", value: "2.7 m above ground floor", source: "Sheet 9" },
      { label: "Upper floor house area", value: "28.47 m² (whole level)", source: "Sheet 7" },
    ],
  },
  shroud: {
    name: "Window shroud",
    summary: "Feature shroud framing the front window, with plantation shutters.",
    facts: [{ label: "Window", value: "2.92 m wide, fixed", source: "Sheets 7, 15" }],
  },
  vergola: {
    name: "Vergola",
    summary: "Steel louvred vergola over the front deck, on feature posts angled at 70°.",
    facts: [
      { label: "Vergola area", value: "9.72 m²", source: "Sheet 6" },
      { label: "Posts", value: "Feature angled steel posts at 70°", source: "Sheet 9" },
    ],
  },
  roof: {
    name: "Main roof",
    summary: "Low metal roof hidden behind the upper walls, falling to the rear.",
    facts: [
      { label: "Pitch", value: "Klip-lok roof at 3°", source: "Sheet 9" },
      { label: "Upper floor roof area", value: "51.07 m²", source: "Sheet 6" },
    ],
  },
};

/** Display order for the component list (bottom up, back to front). */
export const componentOrder: GroupId[] = ["gf-bed", "gf-living", "gf-roof", "uf", "shroud", "vergola", "roof"];

export const levelRank: Record<Level, number> = { gf: 0, uf: 1, roof: 2, pergola: 3 };

export const views = [
  { id: "exterior", label: "Exterior", maxRank: 3 },
  { id: "upper", label: "Upper floor", maxRank: 1 },
  { id: "ground", label: "Ground floor", maxRank: 0 },
] as const;

/** Modelling assumptions. Keep in sync with Design-Docs/08 - 3D Home Explorer.md. */
export const assumptions = [
  "Assembly groups are presentation groups chosen for clarity. The drawings predate the modular shop drawings and document no module boundaries.",
  "The upper floor is placed from the section, starting over the bed 1 / bath wall; sheet 7 dimensions are measured from there.",
  "Shroud depth and height, louvre spacing, stair winders and the internal windows' sill height are scaled or indicative.",
  "Furniture and joinery are simplified blocks placed from the plan symbols.",
  "Site works (fencing, parking bays, landscaping and services) are omitted apart from the deck and boardwalk.",
];
