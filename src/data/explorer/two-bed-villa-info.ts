/**
 * Seashells Jurien Bay, Short Stay 2 Bed Villa (rev C05): labels, verified facts and explorer presentation
 * settings. Geometry lives in ./two-bed-villa.ts.
 */

import type { ComponentInfo } from "./hasting-street-info";
import type { GroupId } from "./two-bed-villa";
import type { Level } from "./house";

// Every fact cites its sheet in the C05 set; nothing here is a performance or construction claim.

export const components: Record<GroupId, ComponentInfo> = {
  "gf-bed": {
    name: "Bedrooms and bathrooms",
    summary: "Two bedrooms, the bathroom and laundry, and a powder room along the hall.",
    facts: [
      { label: "Bed 1", value: "2.78 × 3.52 m, raking ceiling", source: "Sheet 5" },
      { label: "Bed 2", value: "2.71 × 3.03 m, raking ceiling", source: "Sheet 5" },
      { label: "Bath and laundry", value: "2.27 × 3.03 m", source: "Sheet 5" },
      { label: "Powder room", value: "1.20 × 1.74 m", source: "Sheet 5" },
    ],
  },
  "gf-living": {
    name: "Living",
    summary: "Living, dining and kitchen under a raking ceiling, sliding onto the deck.",
    facts: [
      { label: "Living, dining and kitchen", value: "5.41 × 4.12 m", source: "Sheet 5" },
      { label: "Sliding door", value: "2.92 m wide", source: "Sheet 12" },
      { label: "House area", value: "65.03 m²", source: "Sheet 5" },
    ],
  },
  vergola: {
    name: "Vergola",
    summary: "Steel louvred vergola over the front deck, on feature posts angled at 70°.",
    facts: [
      { label: "Vergola area", value: "9.72 m²", source: "Sheet 5" },
      { label: "Posts", value: "Feature angled steel posts at 70°", source: "Sheet 7" },
    ],
  },
  roof: {
    name: "Roof",
    summary: "Low metal roof hidden behind the walls, falling to a gutter at the rear.",
    facts: [{ label: "Pitch", value: "Klip-lok roof at 2°", source: "Sheets 6–7" }],
  },
};

/** Display order for the component list (back to front, then the roof). */
export const componentOrder: GroupId[] = ["gf-bed", "gf-living", "vergola", "roof"];

export const levelRank: Record<Level, number> = { gf: 0, uf: 1, roof: 2, pergola: 3 };

export const views = [
  { id: "exterior", label: "Exterior", maxRank: 3 },
  { id: "plan", label: "Floor plan", maxRank: 0 },
] as const;

/** Modelling assumptions. Keep in sync with Design-Docs/08 - 3D Home Explorer.md. */
export const assumptions = [
  "Assembly groups are presentation groups chosen for clarity. The drawings predate the modular shop drawings and document no module boundaries.",
  "Raking ceilings are not modelled; internal walls stop at the 2.4 m wall height.",
  "Louvre spacing, door positions along the hall and furniture are scaled or indicative.",
  "Site works (fencing, parking bays, landscaping and services) are omitted apart from the deck and boardwalk.",
];
