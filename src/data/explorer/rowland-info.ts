/**
 * 25 On Rowland and Forrest: labels, verified facts and explorer settings for the whole-building model.
 * Geometry lives in ./rowland.ts. Facts cite the Doepel Marsh DA set (rev A) by drawing number.
 */

import type { ExplorerPart } from "@/lib/explorer/parts";
import { apartments, type ApartmentType } from "./rowland";

const storeyName = (storey: number) => `Level ${storey}`;

export const typeNames: Record<ApartmentType, string> = {
  A: "Type A",
  B: "Type B",
  C: "Type C",
  D: "Type D",
  E: "Type E",
};

const sheet = (storey: number) => `A10${storey + 1}`;

export const parts: ExplorerPart[] = [
  ...apartments.map(
    (apartment): ExplorerPart => ({
      id: `apt-${apartment.number}`,
      name: `Apartment ${apartment.number}, ${typeNames[apartment.type]}`,
      summary:
        apartment.type === "E"
          ? `A two-bedroom loft apartment on levels 5 and 6, shown as ${apartment.modules.length + 2} modules.`
          : `A one-bedroom apartment on ${storeyName(apartment.storey).toLowerCase()}, shown as two modules.`,
      facts: [
        { label: "Level", value: apartment.type === "E" ? "Levels 5 and 6" : storeyName(apartment.storey), source: sheet(apartment.storey) },
        { label: "Floor area", value: apartment.area, source: apartment.type === "E" ? "A106–A107" : sheet(apartment.storey) },
        { label: "Bedrooms", value: apartment.type === "E" ? "2" : "1", source: sheet(apartment.storey) },
      ],
    }),
  ),
  {
    id: "core",
    name: "Lift and stair core",
    summary: "Stretcher lift and fire stair, built on site, rising to the lift overrun beside the services deck.",
    facts: [{ label: "Lift", value: "Stretcher lift to every level", source: "A101–A106" }],
  },
  {
    id: "walkways",
    name: "Walkways",
    summary: "Access walkways along the north side, enclosed on levels 1 and 2 and open air above, with trellis wires.",
    facts: [{ label: "Width", value: "About 1.4 m", source: "A200" }],
  },
  {
    id: "terraces",
    name: "Level 5 gardens and decks",
    summary: "Deep soil gardens and the loft apartments' decks on the roof of level 4, with a courtyard between the two lofts.",
    facts: [{ label: "Level", value: "Level 5, RL 39.600", source: "A106" }],
  },
  {
    id: "services",
    name: "Services deck",
    summary: "Air-conditioning condensers and hot water units behind louvred screens, reached by a ladder.",
    facts: [
      { label: "Equipment", value: "19 condensers, three 400 L hot water units", source: "A107" },
      { label: "Level", value: "RL 42.200", source: "A107" },
    ],
  },
  {
    id: "roof",
    name: "Loft roofs",
    summary: "Metal deck roofs at 3° over the two loft apartments, covered in solar panels.",
    facts: [
      { label: "Pitch", value: "3°", source: "A108" },
      { label: "Top of roof", value: "RL 46.100", source: "A200" },
    ],
  },
  {
    id: "ground",
    name: "Ground floor",
    summary: "Lobby, garage, commercial tenancy and serviced apartments, built on site under the level 1 slab.",
    facts: [
      { label: "Floor to floor", value: "4.5 m", source: "A200" },
      { label: "Commercial", value: "88 m² net lettable area", source: "A101" },
    ],
  },
  {
    id: "basement",
    name: "Basement",
    summary: "Lobby, stores and the fire pumpset and water tank, built on site.",
    facts: [{ label: "Level", value: "RL 20.100, 3.0 m below ground floor", source: "A200" }],
  },
];

/** Apartment groups for each type, for highlighting from the type chips. */
export const typeGroups: Record<ApartmentType, string[]> = { A: [], B: [], C: [], D: [], E: [] };
for (const apartment of apartments) typeGroups[apartment.type].push(`apt-${apartment.number}`);

export const levelRank: Record<string, number> = { b1: 0, gf: 1, l1: 2, l2: 3, l3: 4, l4: 5, l5: 6, l6: 7, roof: 8 };

export const views = [
  { id: "exterior", label: "Exterior", maxRank: 8 },
  { id: "l5", label: "Level 5", maxRank: 6 },
  { id: "l4", label: "Level 4", maxRank: 5 },
  { id: "l3", label: "Level 3", maxRank: 4 },
  { id: "l2", label: "Level 2", maxRank: 3 },
  { id: "l1", label: "Level 1", maxRank: 2 },
  { id: "gf", label: "Ground", maxRank: 1 },
  { id: "b1", label: "Basement", maxRank: 0 },
] as const;

/** Modelling assumptions. Keep in sync with Design-Docs/08 - 3D Home Explorer.md. */
export const assumptions = [
  "The DA set shows no module boundaries; each apartment is split into two modules (four for the lofts) along its party walls and the bedroom and living line. The split is indicative.",
  "Apartment interiors are left as empty rooms; the typical module on the Manufacturing and quality page shows a fitted-out module.",
  "Window positions and sizes, the box frames, the façade finishes and the ground floor openings follow the cover perspective and plans but are not dimensioned in this set.",
  "The basement is simplified to its outline under the west end; the ground floor is shown as its outer walls and core.",
  "Neighbouring buildings, streets and landscaping beyond the site are omitted.",
];
