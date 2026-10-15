/**
 * 3D models for project building types, keyed by the `model` id a BuildingType carries (src/data/projects.ts).
 * Each entry is what ModelExplorer needs to mount the model in the BuildingTypes stage.
 */

import type { ExplorerPart } from "@/lib/explorer/parts";
import { componentOrder, components, views } from "./jurien-type-b-info";
import * as hasting from "./hasting-street-info";
import * as threeBed from "./three-bed-villa-info";
import * as twoBed from "./two-bed-villa-info";
import * as rowland from "./rowland-info";

export interface TypeModel {
  scene: "jurien" | "hasting" | "three-bed" | "two-bed" | "rowland" | "module";
  subject: string;
  parts: ExplorerPart[];
  views?: readonly { id: string; label: string }[];
  partKind: string;
  explodeNote: string;
  fallback?: { src: string; alt: string; width: number; height: number };
}

export const typeModels = {
  // Seashells Jurien Bay, Bay View Villa: the Type B residence at 1 Casuarina Crescent (as on the home page)
  "jurien-type-b": {
    scene: "jurien",
    subject: "the villa",
    parts: componentOrder.map((id) => ({ id, ...components[id] })),
    views,
    partKind: "Assembly group (illustrative)",
    explodeNote: "The separated parts are illustrative, not the actual modules.",
    fallback: {
      src: "/explorer/jurien-type-b.webp",
      alt: "Rendered three-quarter view of the Bay View Villa model, showing the white-framed balcony, roof terrace pergola and spiral stair at the front",
      width: 1600,
      height: 892,
    },
  },
  // Seashells Jurien Bay, Hasting Street Villa: the Type B lot in the building permit set (rev B15)
  "hasting-street": {
    scene: "hasting",
    subject: "the villa",
    parts: hasting.componentOrder.map((id) => ({ id, ...hasting.components[id] })),
    views: hasting.views,
    partKind: "Assembly group (illustrative)",
    explodeNote: "The separated parts are illustrative, not the actual modules.",
    fallback: {
      src: "/explorer/hasting-street.webp",
      alt: "Rendered three-quarter view of the Hasting Street Villa model, showing the double garage, the white-framed balcony and the roof terrace with its spiral stair",
      width: 1600,
      height: 892,
    },
  },
  // Seashells Jurien Bay, Short Stay 3 Bed Villa (rev C16)
  "three-bed-villa": {
    scene: "three-bed",
    subject: "the villa",
    parts: threeBed.componentOrder.map((id) => ({ id, ...threeBed.components[id] })),
    views: threeBed.views,
    partKind: "Assembly group (illustrative)",
    explodeNote: "The separated parts are illustrative, not the actual modules.",
    fallback: {
      src: "/explorer/three-bed-villa.webp",
      alt: "Rendered three-quarter view of the 3 Bed Villa model, showing the tall narrow villa, the framed front window and the louvred vergola on angled posts",
      width: 1600,
      height: 892,
    },
  },
  // Seashells Jurien Bay, Short Stay 2 Bed Villa (rev C05)
  "two-bed-villa": {
    scene: "two-bed",
    subject: "the villa",
    parts: twoBed.componentOrder.map((id) => ({ id, ...twoBed.components[id] })),
    views: twoBed.views,
    partKind: "Assembly group (illustrative)",
    explodeNote: "The separated parts are illustrative, not the actual modules.",
    fallback: {
      src: "/explorer/two-bed-villa.webp",
      alt: "Rendered three-quarter view of the 2 Bed Villa model, a long single-storey villa with a louvred vergola on angled posts over the front deck",
      width: 1600,
      height: 892,
    },
  },
  // 25 On Rowland and Forrest: the whole building, shared by its apartment types (Doepel Marsh DA set, rev A)
  rowland: {
    scene: "rowland",
    subject: "the building",
    parts: rowland.parts,
    views: rowland.views,
    partKind: "Apartment or building part",
    explodeNote: "The modules shown are illustrative; the drawings do not yet show where the modules divide.",
    fallback: {
      src: "/explorer/rowland.webp",
      alt: "Rendered view of the 25 On Rowland and Forrest model from the street corner, showing the stacked apartment modules in timber-look cladding above the concrete ground floor",
      width: 1600,
      height: 892,
    },
  },
} satisfies Record<string, TypeModel>;

export type TypeModelId = keyof typeof typeModels;
