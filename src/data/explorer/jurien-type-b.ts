/**
 * Jurien Bay Type B residence: source geometry for the 3D home explorer.
 *
 * Source: Kellett Design Group, "1 Casuarina Crescent, Jurien Bay", Type A lot, Bay View Villa,
 * building permit set rev A17, printed 6/03/2026. Sheets: 7 GF plan, 8 UF plan, 9 roof terrace plan,
 * 10–11 elevations, 15 section, 19 window and door schedule, 20–21 3D perspectives. Plan lines were first
 * taken from the DA set (rev B08) and checked against A17; they agree to within about 0.15 m.
 * Figured dimensions are used throughout; anything scaled or assumed is
 * listed in `assumptions` (./jurien-type-b-info.ts) and in Design-Docs/08 - 3D Home Explorer.md.
 * Labels, facts and view settings live in ./jurien-type-b-info.ts.
 *
 * Coordinates are plan metres:
 *   x  across the lot, 0 = the side boundary on sheets 7–9 (south side), increasing towards the garage boundary
 *   z  front to back, 0 = the verandah/balcony front edge, increasing towards Bay View road
 *   y  height above ground floor level (GF FL 0)
 *
 * The renderer (src/lib/explorer) turns these records into meshes; labels and facts live in the info module
 * so copy can change without touching geometry.
 */

import type {
  Block as HouseBlock,
  Downpipe as HouseDownpipe,
  HouseData,
  Level,
  MaterialKey,
  Opening,
  RoofPrism as HouseRoof,
  Slab as HouseSlab,
  Vec2,
  Vec3,
  Wall as HouseWall,
} from "./house";
import { balustrade as glassBalustrade, pot as plantPot, slatScreen as battenScreen } from "./house";

export type { Level, MaterialKey, Opening, Vec2, Vec3 } from "./house";

export type GroupId =
  | "gf-front"
  | "gf-bed"
  | "tower"
  | "garage"
  | "garage-roof"
  | "uf-living"
  | "uf-master"
  | "frame"
  | "spiral"
  | "terrace"
  | "pergola"
  | "roof";

export type Wall = HouseWall<GroupId>;
export type Slab = HouseSlab<GroupId>;
export type Block = HouseBlock<GroupId>;
export type RoofPrism = HouseRoof<GroupId>;
export type Downpipe = HouseDownpipe<GroupId>;

/** Eave and gable overhang, measured from the wall centreline: half the 200 mm wall plus a 50 mm lip. */
export const EAVE_OVERHANG = 0.15;

// ---------------------------------------------------------------------------------------------------
// Levels (sheets 10, 11 and 15)

export const LEVELS = {
  gf: 0,
  gfCeiling: 2.7,
  ufSlab: 2.7,
  uf: 3.0,
  ufCeiling: 5.7,
  terrace: 6.0,
  /** Top of the frame band around the roof terrace */
  terraceEdge: 6.25,
  pergolaBeam: 8.22,
  pergolaTop: 8.4,
} as const;

const L = LEVELS;
const tan = (deg: number) => Math.tan((deg * Math.PI) / 180);

/** Main roof: ridge along the house, 15° to the south and 9° to the north. Ridge RL 10.049, 6.749 above GF (elevations 3–4). */
const ufRidge = { x: 4.53, y: 6.749, pitchLeft: tan(15), pitchRight: tan(9) };
/** Roof height on the main 15° plane at a given x (south of the ridge). */
const southPlane = (x: number) => ufRidge.y - (ufRidge.x - x) * ufRidge.pitchLeft;
/** The stair tower sits under the main 15° roof plane (elevation 3), so its walls stop at that plane's low edge. */
const TOWER_TOP = southPlane(0.15);

// ---------------------------------------------------------------------------------------------------
// Walls. Exterior walls sit on the plan footprint lines (200 mm); partitions are 90 mm.

const gfExt = { level: "gf", base: L.gf, top: L.ufSlab, finish: "cladding" } as const;
const gfInt = { level: "gf", base: L.gf, top: L.gfCeiling, finish: "interior", thickness: 0.09 } as const;
const ufExt = { level: "uf", base: L.uf, top: L.ufCeiling, finish: "cladding" } as const;
const ufInt = { level: "uf", base: L.uf, top: L.ufCeiling, finish: "interior", thickness: 0.09 } as const;
const ufDoor = { sill: L.uf, head: L.uf + 2.1 } as const;

/** Stair tower walls run through both floors; split so the floor controls can peel the upper half away. */
const towerWall = (a: Vec2, b: Vec2, openings?: Opening[], finish: MaterialKey = "feature"): Wall[] => [
  { group: "tower", level: "gf", a, b, base: L.gf, top: L.ufSlab, finish, openings },
  { group: "tower", level: "uf", a, b, base: L.ufSlab, top: TOWER_TOP, finish, openings },
];

export const walls: Wall[] = [
  // Ground floor, front wing: sitting / theatre and office / rumpus (sheet 7; openings from sheet 19 and elevations 1–2).
  // The sitting room's front window has an 850 mm sill on elevation 1 (Ch-05), the latest sheet.
  { group: "gf-front", ...gfExt, a: [1.47, 3.5], b: [6.27, 3.5], openings: [{ span: [2.3, 5.3], sill: 0.85, head: 2.4, kind: "window" }] },
  { group: "gf-front", ...gfExt, a: [6.27, 3.5], b: [6.27, 5.86], openings: [{ span: [3.84, 4.86], head: 2.4, kind: "door" }] },
  { group: "gf-front", ...gfExt, a: [6.27, 5.86], b: [9.4, 5.86], openings: [{ span: [6.59, 8.99], head: 2.4, kind: "slider" }] },
  { group: "gf-front", ...gfExt, a: [9.4, 5.86], b: [9.4, 9.64] },
  // Office window onto the courtyard (W-03, 1550 × 2400)
  { group: "gf-front", ...gfExt, a: [9.4, 9.64], b: [6.27, 9.64], openings: [{ span: [6.63, 9.03], sill: 0.85, head: 2.4, kind: "window" }] },
  { group: "gf-front", ...gfInt, a: [6.27, 5.86], b: [6.27, 9.64], openings: [{ span: [8.7, 9.5] }] },

  // Ground floor, bedroom wing: beds 2–4, laundry, bath, hall (sheet 7; elevations 2 and 4; sheet 19)
  {
    group: "gf-bed",
    ...gfExt,
    a: [1.47, 9.64],
    b: [1.47, 18.26],
    openings: [
      { span: [9.93, 11.73], sill: 0.85, head: 2.4, kind: "slider" },
      { span: [12.88, 15.88], sill: 0.85, head: 2.4, kind: "slider" },
      { span: [17.6, 18.4], head: 2.4, kind: "door" },
    ],
  },
  { group: "gf-bed", ...gfExt, a: [1.47, 18.26], b: [4.57, 18.26] },
  { group: "gf-bed", ...gfExt, a: [4.57, 18.26], b: [4.57, 20.62], openings: [{ span: [18.95, 20.5], head: 2.4, kind: "slider" }] },
  { group: "gf-bed", ...gfExt, a: [4.57, 20.62], b: [9.4, 20.62], openings: [{ span: [5.15, 5.95], kind: "door" }] },
  { group: "gf-bed", ...gfExt, a: [9.4, 20.62], b: [9.4, 13.0], openings: [{ span: [19.0, 20.45], sill: 1.0, head: 2.4, kind: "window" }] },
  // Bed 2 window onto the courtyard (W-05, 1550 × 1800)
  { group: "gf-bed", ...gfExt, a: [9.4, 13.0], b: [6.27, 13.0], openings: [{ span: [7.03, 8.83], sill: 0.85, head: 2.4, kind: "window" }] },
  { group: "gf-bed", ...gfExt, a: [6.27, 13.0], b: [6.27, 9.64], openings: [{ span: [10.09, 12.89], sill: 0.85, head: 2.4, kind: "slider" }] },
  { group: "gf-bed", ...gfInt, a: [1.47, 8.44], b: [4.98, 8.44] },
  { group: "gf-bed", ...gfInt, a: [4.98, 8.44], b: [4.98, 18.26], openings: [{ span: [10.9, 11.7] }, { span: [12.6, 13.4] }, { span: [16.5, 17.3] }] },
  { group: "gf-bed", ...gfInt, a: [1.47, 11.8], b: [4.98, 11.8] },
  { group: "gf-bed", ...gfInt, a: [1.47, 15.9], b: [4.98, 15.9] },
  { group: "gf-bed", ...gfInt, a: [6.27, 13.0], b: [6.27, 20.62], openings: [{ span: [15.0, 15.8] }, { span: [18.5, 19.3] }] },
  { group: "gf-bed", ...gfInt, a: [6.27, 16.75], b: [9.4, 16.75], openings: [{ span: [7.4, 8.2] }] },
  { group: "gf-bed", ...gfInt, a: [7.3, 16.75], b: [7.3, 18.0] },
  { group: "gf-bed", ...gfInt, a: [6.27, 18.0], b: [9.4, 18.0], openings: [{ span: [6.4, 7.2] }] },

  // Stair tower: mid-grey cladding (sheets 10–11, 20–21), tall front window W-01 (elevation 1), internal stair (sheets 7–8)
  ...towerWall([0.15, 3.0], [1.47, 3.0], [{ span: [0.36, 1.16], sill: 0.8, head: 4.2, kind: "window" }]),
  ...towerWall([0.15, 3.0], [0.15, 9.64]),
  ...towerWall([0.15, 9.64], [1.47, 9.64]),
  ...towerWall([1.47, 3.0], [1.47, 3.5]),
  { group: "tower", ...gfInt, a: [1.47, 3.5], b: [1.47, 9.64], openings: [{ span: [3.6, 4.9] }, { span: [8.75, 9.5] }] },
  { group: "tower", ...ufInt, a: [1.47, 3.5], b: [1.47, 9.685], openings: [{ span: [8.3, 9.6], ...ufDoor }] },

  // Upper floor, living wing: dining, kitchen, living (sheet 8; sliders SD-03 and SD-04 onto the balcony, sheet 19)
  {
    group: "uf-living",
    ...ufExt,
    a: [1.47, 3.5],
    b: [9.3, 3.5],
    openings: [
      { span: [1.95, 4.3], sill: L.uf, head: L.uf + 2.4, kind: "slider" },
      { span: [4.74, 8.01], sill: L.uf, head: L.uf + 2.4, kind: "slider" },
    ],
  },
  { group: "uf-living", ...ufExt, a: [9.3, 3.5], b: [9.3, 9.685] },
  // Kitchen window onto the courtyard (W-09, 1550 × 1600)
  { group: "uf-living", ...ufExt, a: [9.3, 9.685], b: [6.27, 9.685], openings: [{ span: [6.58, 8.18], sill: L.uf + 0.85, head: L.uf + 2.4, kind: "window" }] },
  { group: "uf-living", ...ufExt, a: [6.27, 9.685], b: [6.27, 13.045] },
  { group: "uf-living", ...ufExt, a: [1.47, 9.685], b: [1.47, 14.0] },
  { group: "uf-living", ...ufInt, a: [6.27, 13.045], b: [6.27, 14.0], openings: [{ span: [13.15, 13.95], ...ufDoor }] },

  // Upper floor, master wing: master suite, dresser, ensuite, powder room (sheet 8; elevations 2 and 4; sheet 19)
  {
    group: "uf-master",
    ...ufExt,
    a: [1.47, 14.0],
    b: [1.47, 18.3],
    openings: [
      { span: [14.39, 15.09], sill: 4.2, head: 5.4, kind: "window" },
      { span: [16.68, 17.68], sill: 3.8, head: 5.4, kind: "window" },
    ],
  },
  { group: "uf-master", ...ufExt, a: [1.47, 18.3], b: [4.6, 18.3] },
  { group: "uf-master", ...ufExt, a: [4.6, 18.3], b: [4.6, 20.755], openings: [{ span: [19.34, 20.24], sill: 4.7, head: 5.4, kind: "window" }] },
  { group: "uf-master", ...ufExt, a: [4.6, 20.755], b: [9.45, 20.755] },
  { group: "uf-master", ...ufExt, a: [9.45, 20.755], b: [9.45, 13.045], openings: [{ span: [14.5, 17.5], sill: 4.6, head: 5.4, kind: "window" }] },
  // Master suite window onto the courtyard (W-10, 1550 × 1800)
  { group: "uf-master", ...ufExt, a: [9.45, 13.045], b: [6.27, 13.045], openings: [{ span: [6.99, 8.79], sill: L.uf + 0.85, head: L.uf + 2.4, kind: "window" }] },
  { group: "uf-master", ...ufInt, a: [1.47, 14.0], b: [6.27, 14.0], openings: [{ span: [3.9, 4.5], ...ufDoor }] },
  { group: "uf-master", ...ufInt, a: [1.47, 15.2], b: [4.6, 15.2] },
  { group: "uf-master", ...ufInt, a: [4.6, 14.0], b: [4.6, 18.3], openings: [{ span: [15.6, 16.4], ...ufDoor }] },

  // Garage (sheet 7; elevations 3–4). Grano floor at -80 mm. Marked optional on sheet 7.
  { group: "garage", level: "gf", base: -0.08, top: 2.78, finish: "cladding", a: [4.57, 20.62], b: [4.57, 27.46], openings: [{ span: [22.89, 25.59], sill: -0.08, head: 2.4, kind: "opening" }] },
  { group: "garage", level: "gf", base: -0.08, top: 2.78, finish: "cladding", a: [4.57, 27.46], b: [10.77, 27.46], openings: [{ span: [5.0, 10.34], sill: -0.08, head: 2.4, kind: "garage-door" }] },
  { group: "garage", level: "gf", base: -0.08, top: 2.78, finish: "cladding", a: [10.77, 27.46], b: [10.77, 20.62] },
  // Side door to the path, beside the bath (sheet 7 door swing; sheet 21 lower perspective)
  { group: "garage", level: "gf", base: -0.08, top: 2.78, finish: "cladding", a: [10.77, 20.62], b: [9.4, 20.62], openings: [{ span: [9.55, 10.43], sill: -0.08, head: 2.04, kind: "door" }] },
];

// ---------------------------------------------------------------------------------------------------
// Floors and slabs

const rect = (x0: number, z0: number, x1: number, z1: number): Vec2[] => [
  [x0, z0],
  [x1, z0],
  [x1, z1],
  [x0, z1],
];

const gfFrontFootprint: Vec2[] = [[1.47, 3.5], [6.27, 3.5], [6.27, 5.86], [9.4, 5.86], [9.4, 9.64], [6.27, 9.64], [6.27, 8.44], [1.47, 8.44]];
const gfBedFootprint: Vec2[] = [[1.47, 8.44], [6.27, 8.44], [6.27, 13.0], [9.4, 13.0], [9.4, 20.62], [4.57, 20.62], [4.57, 18.26], [1.47, 18.26]];
const ufLivingFootprint: Vec2[] = [[1.47, 3.5], [9.3, 3.5], [9.3, 9.685], [6.27, 9.685], [6.27, 14.0], [1.47, 14.0]];
const ufMasterFootprint: Vec2[] = [[1.47, 14.0], [6.27, 14.0], [6.27, 13.045], [9.45, 13.045], [9.45, 20.755], [4.6, 20.755], [4.6, 18.3], [1.47, 18.3]];

/** Spiral stair, balcony to roof terrace. Position and diameter scaled from the sheet 8 drawing (not dimensioned). */
export const SPIRAL = { centre: [8.22, 2.47] as Vec2, radius: 0.87, from: L.uf, to: L.terrace, risers: 16 } as const;

/** Internal stair, GF to UF: 16 risers numbered on sheets 7–8. Flight position scaled from the plans. */
export const INTERNAL_STAIR = { x: [0.2, 1.24] as [number, number], zStart: 5.1, going: 0.25, risers: 16, to: L.uf } as const;

export const slabs: Slab[] = [
  // Ground floor
  { group: "gf-front", level: "gf", polygon: [[1.47, 0], [9.3, 0], [9.3, 5.86], [6.27, 5.86], [6.27, 3.5], [1.47, 3.5]], bottom: -0.15, top: 0, material: "deck" },
  { group: "gf-front", level: "gf", polygon: gfFrontFootprint, bottom: -0.2, top: 0, material: "floor" },
  { group: "gf-bed", level: "gf", polygon: gfBedFootprint, bottom: -0.2, top: 0, material: "floor" },
  { group: "tower", level: "gf", polygon: rect(0.15, 3.0, 1.47, 9.64), bottom: -0.2, top: 0, material: "floor" },
  { group: "garage", level: "gf", polygon: rect(4.57, 20.62, 10.77, 27.46), bottom: -0.2, top: -0.08, material: "concrete" },

  // Upper floor: structural slab (white band on the façade) with a floor finish on top
  { group: "uf-living", level: "uf", polygon: ufLivingFootprint, bottom: L.ufSlab, top: L.uf - 0.022, material: "render" },
  { group: "uf-living", level: "uf", polygon: ufLivingFootprint, bottom: L.uf - 0.022, top: L.uf, material: "floor" },
  { group: "uf-master", level: "uf", polygon: ufMasterFootprint, bottom: L.ufSlab, top: L.uf - 0.022, material: "render" },
  { group: "uf-master", level: "uf", polygon: ufMasterFootprint, bottom: L.uf - 0.022, top: L.uf, material: "floor" },
  { group: "tower", level: "uf", polygon: rect(0.15, 8.65, 1.47, 9.64), bottom: L.ufSlab, top: L.uf, material: "floor" },

  // Balcony (sheet 8) and roof terrace (sheet 9) inside the white frame
  { group: "frame", level: "uf", polygon: rect(1.47, 0, 9.3, 3.5), bottom: L.ufSlab, top: L.uf - 0.03, material: "render" },
  { group: "frame", level: "uf", polygon: rect(1.47, 0.3, 9.3, 3.5), bottom: L.uf - 0.03, top: L.uf, material: "deck" },
  { group: "terrace", level: "roof", polygon: rect(1.47, 0, 9.3, 3.5), bottom: L.ufCeiling, top: L.terrace - 0.03, material: "render", hole: { centre: SPIRAL.centre, radius: SPIRAL.radius + 0.08 } },
  { group: "terrace", level: "roof", polygon: rect(1.47, 0.3, 9.3, 3.5), bottom: L.terrace - 0.03, top: L.terrace, material: "deck", hole: { centre: SPIRAL.centre, radius: SPIRAL.radius + 0.08 } },
];

// ---------------------------------------------------------------------------------------------------
// Roofs (elevations 3–4: ridge along the house, 15° to the south, 9° to the north; garage skillion at 9°)

export const roofs: RoofPrism[] = [
  // Front wing: its south eave runs on over the stair tower, so the gutter is on the tower roof instead
  { group: "roof", level: "roof", x: [1.47, 9.3], z: [3.5, 9.685], base: L.ufCeiling, ridge: ufRidge, gutters: ["x1"] },
  { group: "roof", level: "roof", x: [1.47, 6.27], z: [9.685, 13.045], base: L.ufCeiling, ridge: ufRidge },
  { group: "roof", level: "roof", x: [1.47, 9.45], z: [13.045, 18.3], base: L.ufCeiling, ridge: ufRidge },
  // Rear of the master wing: its south side rises almost to the ridge (elevation 4), so only the north eave is guttered
  { group: "roof", level: "roof", x: [4.6, 9.45], z: [18.3, 20.755], base: L.ufCeiling, ridge: ufRidge, gutters: ["x1"], extend: ["z1"] },
  { group: "garage-roof", level: "roof", x: [4.57, 10.77], z: [20.62, 27.46], base: 2.78, skillion: [3.64, 2.78], extend: ["z1"] },
  // Stair tower: continues the main 15° plane down to a gutter on the south side (elevations 1 and 3)
  { group: "tower", level: "roof", x: [0.15, 1.47], z: [3.0, 9.64], base: TOWER_TOP, ridge: ufRidge, capFinish: "feature", gutters: ["x0"], extend: ["z0", "z1"] },
];

/** Downpipes at the DP and RWH marks on sheet 7. Faces are wall centrelines ± 0.1 m (walls are 200 mm). */
export const downpipes: Downpipe[] = [
  { z: 12.0, side: -1, gfFace: 1.37, gf: "gf-bed", uf: "uf-living" },
  { z: 7.5, side: 1, gfFace: 9.5, ufFace: 9.4, gf: "gf-front", uf: "uf-living" },
  { z: 12.7, side: 1, gfFace: 6.37, gf: "gf-bed", uf: "uf-living" },
  { z: 17.75, side: 1, gfFace: 9.5, ufFace: 9.55, gf: "gf-bed", uf: "uf-master" },
  { z: 9.45, side: -1, gfFace: 0.05, gf: "tower", uf: "tower" },
  { z: 20.85, side: 1, gfFace: 10.87, gf: "garage" },
  { z: 27.25, side: 1, gfFace: 10.87, gf: "garage" },
];

export const ROOF_RIDGE = ufRidge;

/** Solar arrays on the 9° roof plane (elevations 2 and 4). Panel count is indicative. */
export const solarArrays = [
  { x: [5.36, 8.7] as [number, number], z: [4.2, 9.2] as [number, number], cols: 2, rows: 5 },
  { x: [5.36, 8.7] as [number, number], z: [13.5, 20.3] as [number, number], cols: 2, rows: 7 },
];

// ---------------------------------------------------------------------------------------------------
// Blocks: frame members, balustrades, screens, joinery and furniture

const FRAME_DEPTH = 0.3;
const BAL_H = 1.0; // balustrade height above finished floor (indicative; not dimensioned)

const balustrade = (group: GroupId, level: Level, min: Vec3, max: Vec3): Block[] => glassBalustrade(group, level, min, max);
const slatScreen = (group: GroupId, level: Level, x: number, floor: number, z0: number, z1: number): Block[] =>
  battenScreen(group, level, x, floor, z0, z1);

/** Balcony and terrace edges: glass front and sides, 1.6 m privacy screens towards the back (elevations 2 and 4). */
const deckEdges = (group: GroupId, level: Level, floor: number, frontTop: number): Block[] => [
  ...balustrade(group, level, [1.97, frontTop, FRAME_DEPTH + 0.02], [8.91, floor + BAL_H, FRAME_DEPTH + 0.05]),
  ...balustrade(group, level, [1.54, floor, FRAME_DEPTH], [1.57, floor + BAL_H, 1.4]),
  ...balustrade(group, level, [9.2, floor, FRAME_DEPTH], [9.23, floor + BAL_H, 1.4]),
  ...slatScreen(group, level, 1.555, floor, 1.4, 3.0),
  ...slatScreen(group, level, 9.215, floor, 1.4, 3.0),
];

const pot = (group: GroupId, level: Level, x: number, y: number, z: number, size = 1): Block[] => plantPot(group, level, x, y, z, size);

export const blocks: Block[] = [
  // White frame around the balcony (elevation 1: fibre cement cladding). Legs 550 wide (sheet 8).
  { group: "frame", level: "uf", min: [1.47, L.ufSlab, 0], max: [9.3, 3.3, FRAME_DEPTH], material: "render" },
  { group: "frame", level: "uf", min: [1.47, 3.3, 0], max: [1.97, L.ufCeiling, FRAME_DEPTH], material: "render" },
  { group: "frame", level: "uf", min: [8.91, 3.3, 0], max: [9.3, L.ufCeiling, FRAME_DEPTH], material: "render" },
  ...deckEdges("frame", "uf", L.uf, 3.3),
  ...pot("frame", "uf", 2.4, L.uf, 0.8),
  ...pot("frame", "uf", 6.9, L.uf, 0.75, 0.9),

  // Roof terrace: top band of the frame, edges, outdoor setting
  { group: "terrace", level: "roof", min: [1.47, L.ufCeiling, 0], max: [9.3, L.terraceEdge, FRAME_DEPTH], material: "render" },
  ...deckEdges("terrace", "roof", L.terrace, L.terraceEdge),
  ...balustrade("terrace", "roof", [1.57, L.terrace, 3.42], [9.2, L.terrace + BAL_H, 3.45]),
  { group: "terrace", level: "roof", min: [3.3, L.terrace, 2.55], max: [6.1, L.terrace + 0.42, 3.3], material: "soft" },
  { group: "terrace", level: "roof", min: [3.3, L.terrace + 0.42, 3.1], max: [6.1, L.terrace + 0.8, 3.3], material: "soft" },
  ...pot("terrace", "roof", 2.1, L.terrace, 2.9),

  // Ground floor joinery and furniture (positions scaled from sheet 7; indicative)
  { group: "gf-front", level: "gf", min: [1.62, 0, 5.5], max: [2.45, 0.78, 8.3], material: "soft" },
  { group: "gf-front", level: "gf", min: [2.45, 0, 7.5], max: [4.6, 0.78, 8.3], material: "soft" },
  { group: "gf-front", level: "gf", min: [7.4, 0, 7.2], max: [8.2, 0.75, 8.8], material: "furniture" },
  { group: "gf-bed", level: "gf", min: [2.47, 0, 8.55], max: [3.93, 0.55, 10.55], material: "bed" },
  { group: "gf-bed", level: "gf", min: [1.52, 0, 11.85], max: [4.93, 2.4, 12.4], material: "interior" },
  { group: "gf-bed", level: "gf", min: [2.47, 0, 13.7], max: [3.93, 0.55, 15.7], material: "bed" },
  { group: "gf-bed", level: "gf", min: [7.4, 0, 13.8], max: [9.3, 0.55, 15.3], material: "bed" },
  { group: "gf-bed", level: "gf", min: [1.55, 0, 15.97], max: [4.9, 0.9, 16.55], material: "furniture" },
  { group: "gf-bed", level: "gf", min: [8.6, 0, 18.3], max: [9.3, 0.55, 19.98], material: "bed" },

  // Upper floor joinery and furniture (positions scaled from sheet 8; indicative)
  { group: "uf-living", level: "uf", min: [3.0, L.uf, 5.13], max: [4.25, L.uf + 0.75, 8.06], material: "furniture" },
  { group: "uf-living", level: "uf", min: [6.44, L.uf, 4.81], max: [7.39, L.uf + 0.9, 8.37], material: "interior" },
  { group: "uf-living", level: "uf", min: [8.55, L.uf, 3.65], max: [9.2, L.uf + 0.9, 9.5], material: "interior" },
  { group: "uf-living", level: "uf", min: [1.6, L.uf, 9.9], max: [2.4, L.uf + 0.78, 13.9], material: "soft" },
  { group: "uf-living", level: "uf", min: [2.4, L.uf, 13.2], max: [4.4, L.uf + 0.78, 13.9], material: "soft" },
  { group: "uf-master", level: "uf", min: [6.03, L.uf, 16.6], max: [7.91, L.uf + 0.55, 18.7], material: "bed" },
  { group: "uf-master", level: "uf", min: [4.7, L.uf, 18.75], max: [9.35, L.uf + 1.2, 18.95], material: "interior" },
  { group: "uf-master", level: "uf", min: [1.55, L.uf, 17.75], max: [4.5, L.uf + 0.9, 18.2], material: "furniture" },
];

/** Verandah posts under the balcony: positions from sheet 7, slender twin posts per the render. */
export const verandahPosts: Vec2[] = [
  [1.6, 0.15],
  [1.78, 0.15],
  [5.2, 0.15],
  [5.38, 0.15],
  [9.0, 0.15],
  [9.18, 0.15],
];

/** Timber pergola over the roof terrace (beam 8.22, top 8.40 above GF, sheets 10–11). Post and rafter spacing indicative. */
export const PERGOLA = {
  posts: [1.6, 5.385, 9.17].flatMap((x) => [[x, 0.15], [x, 3.35]] as Vec2[]),
  beamZ: [0.15, 3.35],
  x: [1.3, 9.47] as [number, number],
  z: [-0.15, 3.65] as [number, number],
  rafterSpacing: 0.34,
} as const;

/** Courtyard tree (sheet 2: 2 m × 2 m tree growth zone). Not selectable. */
export const COURTYARD_TREE = { at: [7.85, 11.35] as Vec2, height: 4.6, canopy: 1.25 } as const;

// ---------------------------------------------------------------------------------------------------
// Assembly view: separation directions (metres at full explode). Groups are presentation groups,
// not documented construction modules.

export const explode: Record<GroupId, Vec3> = {
  "gf-front": [0, 0, -1.2],
  "gf-bed": [0, 0, 0],
  garage: [0, 0, 3],
  "garage-roof": [0, 2.2, 3],
  tower: [-2.6, 0, 0],
  "uf-living": [0, 3.2, -1.2],
  "uf-master": [0, 3.2, 0],
  roof: [0, 5.6, -0.6],
  frame: [0, 3.2, -4.4],
  spiral: [0, 3.2, -4.4],
  terrace: [0, 5.8, -4.4],
  pergola: [0, 7.9, -4.4],
};

/** Everything the model builder needs for the Bay View Villa. */
export const bayView: HouseData<GroupId> = {
  centre: { x: 5.46, z: 13.65 },
  ufSlab: L.ufSlab,
  eaveOverhang: EAVE_OVERHANG,
  walls,
  slabs,
  roofs,
  downpipes,
  blocks,
  posts: { group: "frame", at: verandahPosts, height: L.ufSlab },
  solar: { ridge: ufRidge, arrays: solarArrays },
  spiral: { group: "spiral", ...SPIRAL },
  internalStair: { group: "tower", ...INTERNAL_STAIR },
  pergola: { group: "pergola", ...PERGOLA, posts: [...PERGOLA.posts], beamZ: [...PERGOLA.beamZ], base: L.terrace, beam: L.pergolaBeam, top: L.pergolaTop },
  tree: COURTYARD_TREE,
};
