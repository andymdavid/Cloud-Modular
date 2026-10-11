/**
 * Jurien Bay Type B residence: source geometry for the 3D home explorer.
 *
 * Source: Kellett Design Group, "1 Casuarina Crescent, Jurien Bay (Type B lot, west facing residences)",
 * DA set rev B08, printed 18/06/2025. Sheets: 3 GF plan, 4 UF plan, 5 roof terrace plan, 6–7 elevations,
 * 8 section, 9–10 3D perspectives. Figured dimensions are used throughout; anything scaled or assumed is
 * listed in `assumptions` (./jurien-type-b-info.ts) and in Design-Docs/08 - 3D Home Explorer.md.
 * Labels, facts and view settings live in ./jurien-type-b-info.ts.
 *
 * Coordinates are plan metres:
 *   x  across the lot, 0 = the dimension origin on sheets 3–5 (south side), increasing towards the garage boundary
 *   z  front to back, 0 = the verandah/balcony front edge, increasing towards Bay View road
 *   y  height above ground floor level (GF FL 0 = RL 10.000)
 *
 * The renderer (src/lib/explorer) turns these records into meshes; labels and facts live in the info module
 * so copy can change without touching geometry.
 */

export type Vec2 = [x: number, z: number];
export type Vec3 = [x: number, y: number, z: number];

/** Visibility tiers used by the floor controls, lowest first. */
export type Level = "gf" | "uf" | "roof" | "pergola";

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

export type MaterialKey =
  | "render"
  | "cladding"
  | "feature"
  | "interior"
  | "floor"
  | "deck"
  | "concrete"
  | "frameDark"
  | "glass"
  | "rail"
  | "timber"
  | "screen"
  | "roof"
  | "fascia"
  | "downpipe"
  | "solar"
  | "garageDoor"
  | "door"
  | "furniture"
  | "soft"
  | "bed"
  | "steel"
  | "pot"
  | "foliage"
  | "trunk";

export type OpeningKind = "slider" | "window" | "door" | "garage-door" | "opening";

export interface Opening {
  /** Start and end along the wall, in the plan coordinate that varies along it (x or z). */
  span: [number, number];
  /** Absolute heights. Default sill = wall base, head = base + 2.1 (interior doorways). */
  sill?: number;
  head?: number;
  kind?: OpeningKind;
}

export interface Wall {
  group: GroupId;
  level: Level;
  a: Vec2;
  b: Vec2;
  base: number;
  top: number;
  finish: MaterialKey;
  thickness?: number;
  openings?: Opening[];
}

export interface Slab {
  group: GroupId;
  level: Level;
  polygon: Vec2[];
  bottom: number;
  top: number;
  material: MaterialKey;
  /** Circular cut-out, e.g. the spiral stair opening in the roof terrace. */
  hole?: { centre: Vec2; radius: number };
}

export interface Block {
  group: GroupId | null;
  level: Level;
  min: Vec3;
  max: Vec3;
  material: MaterialKey;
}

export interface RoofPrism {
  group: GroupId;
  level: Level;
  x: [number, number];
  z: [number, number];
  base: number;
  /** Ridge runs along z. Left/right pitches as rise per metre. */
  ridge?: { x: number; y: number; pitchLeft: number; pitchRight: number };
  /** Single-pitch (skillion) roof instead of a ridge: eave heights at x[0] and x[1]. */
  skillion?: [number, number];
  /** Finish for the gable ends and the wall between ceiling and eave (default: horizontal cladding). */
  capFinish?: MaterialKey;
  /** Eaves that carry a gutter (default: both eaves, or the low side of a skillion). Guttered eaves overhang the wall. */
  gutters?: ("x0" | "x1")[];
  /** Gable ends that overhang the wall. Left flush where another roof or the terrace abuts. */
  extend?: ("z0" | "z1")[];
}

/** Eave and gable overhang, measured from the wall centreline: half the 200 mm wall plus a 50 mm lip. */
export const EAVE_OVERHANG = 0.15;

/**
 * Squareline downpipe on an x-facing wall, from the gutter above to the ground. Split at the upper floor so each half
 * follows its wing; where the upper wall face sits in or out from the lower one, the pipe offsets across the step.
 */
export interface Downpipe {
  z: number;
  /** Which way the wall faces: -1 towards x = 0, 1 away from it. */
  side: -1 | 1;
  /** Outer face of the ground-floor wall (and of the upper-floor wall, when different). */
  gfFace: number;
  ufFace?: number;
  gf: GroupId;
  uf?: GroupId;
}

// ---------------------------------------------------------------------------------------------------
// Levels (sheets 6–8)

export const LEVELS = {
  gf: 0,
  gfCeiling: 2.7,
  ufSlab: 2.72,
  uf: 3.022,
  ufCeiling: 5.722,
  terrace: 6.044,
  pergolaBeam: 8.264,
  pergolaTop: 8.444,
} as const;

const L = LEVELS;
const tan = (deg: number) => Math.tan((deg * Math.PI) / 180);

/** Main roof: ridge along the house, 15° to the south and 9° to the north. Ridge RL 16.759 (elevations 3–4). */
const ufRidge = { x: 4.53, y: 6.759, pitchLeft: tan(15), pitchRight: tan(9) };
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
  // Ground floor, front wing: sitting / theatre and office / rumpus (sheet 3; openings from elevations 1–2)
  { group: "gf-front", ...gfExt, a: [1.47, 3.5], b: [6.27, 3.5], openings: [{ span: [2.37, 5.22], head: 2.4, kind: "slider" }] },
  { group: "gf-front", ...gfExt, a: [6.27, 3.5], b: [6.27, 5.86], openings: [{ span: [3.82, 4.8], head: 2.4, kind: "door" }] },
  { group: "gf-front", ...gfExt, a: [6.27, 5.86], b: [9.4, 5.86], openings: [{ span: [6.53, 8.85], head: 2.4, kind: "slider" }] },
  { group: "gf-front", ...gfExt, a: [9.4, 5.86], b: [9.4, 9.64] },
  { group: "gf-front", ...gfExt, a: [9.4, 9.64], b: [6.27, 9.64] },
  { group: "gf-front", ...gfInt, a: [6.27, 5.86], b: [6.27, 9.64], openings: [{ span: [8.7, 9.5] }] },

  // Ground floor, bedroom wing: beds 2–4, laundry, bath, hall (sheet 3; elevations 2 and 4)
  {
    group: "gf-bed",
    ...gfExt,
    a: [1.47, 9.64],
    b: [1.47, 18.26],
    openings: [
      { span: [9.8, 11.57], sill: 0.85, head: 2.4, kind: "slider" },
      { span: [12.68, 15.6], sill: 0.85, head: 2.4, kind: "slider" },
      { span: [16.6, 17.5], head: 2.4, kind: "door" },
    ],
  },
  { group: "gf-bed", ...gfExt, a: [1.47, 18.26], b: [4.57, 18.26] },
  { group: "gf-bed", ...gfExt, a: [4.57, 18.26], b: [4.57, 20.62], openings: [{ span: [18.77, 20.54], head: 2.4, kind: "slider" }] },
  { group: "gf-bed", ...gfExt, a: [4.57, 20.62], b: [9.4, 20.62], openings: [{ span: [5.15, 5.95], kind: "door" }] },
  { group: "gf-bed", ...gfExt, a: [9.4, 20.62], b: [9.4, 13.0], openings: [{ span: [18.75, 20.42], sill: 1.0, head: 2.4, kind: "window" }] },
  { group: "gf-bed", ...gfExt, a: [9.4, 13.0], b: [6.27, 13.0] },
  { group: "gf-bed", ...gfExt, a: [6.27, 13.0], b: [6.27, 9.64], openings: [{ span: [9.92, 12.71], sill: 0.85, head: 2.4, kind: "slider" }] },
  { group: "gf-bed", ...gfInt, a: [1.47, 8.44], b: [4.98, 8.44] },
  { group: "gf-bed", ...gfInt, a: [4.98, 8.44], b: [4.98, 18.26], openings: [{ span: [10.9, 11.7] }, { span: [12.6, 13.4] }, { span: [16.5, 17.3] }] },
  { group: "gf-bed", ...gfInt, a: [1.47, 11.8], b: [4.98, 11.8] },
  { group: "gf-bed", ...gfInt, a: [1.47, 15.9], b: [4.98, 15.9] },
  { group: "gf-bed", ...gfInt, a: [6.27, 13.0], b: [6.27, 20.62], openings: [{ span: [15.0, 15.8] }, { span: [18.5, 19.3] }] },
  { group: "gf-bed", ...gfInt, a: [6.27, 16.75], b: [9.4, 16.75], openings: [{ span: [7.4, 8.2] }] },
  { group: "gf-bed", ...gfInt, a: [7.3, 16.75], b: [7.3, 18.0] },
  { group: "gf-bed", ...gfInt, a: [6.27, 18.0], b: [9.4, 18.0], openings: [{ span: [6.4, 7.2] }] },

  // Stair tower: mid-grey vertical cladding (render, sheets 9–10), tall front window (elevation 1), internal stair (sheets 3–4)
  ...towerWall([0.15, 3.0], [1.47, 3.0], [{ span: [0.55, 1.28], sill: 0.6, head: 4.2, kind: "window" }]),
  ...towerWall([0.15, 3.0], [0.15, 9.64]),
  ...towerWall([0.15, 9.64], [1.47, 9.64]),
  ...towerWall([1.47, 3.0], [1.47, 3.5]),
  { group: "tower", ...gfInt, a: [1.47, 3.5], b: [1.47, 9.64], openings: [{ span: [3.6, 4.9] }, { span: [8.75, 9.5] }] },
  { group: "tower", ...ufInt, a: [1.47, 3.5], b: [1.47, 9.685], openings: [{ span: [8.3, 9.6], ...ufDoor }] },

  // Upper floor, living wing: dining, kitchen, living (sheet 4; front glazing from elevation 1)
  { group: "uf-living", ...ufExt, a: [1.47, 3.5], b: [9.3, 3.5], openings: [{ span: [2.37, 6.98], sill: L.uf, head: 5.422, kind: "slider" }] },
  { group: "uf-living", ...ufExt, a: [9.3, 3.5], b: [9.3, 9.685] },
  { group: "uf-living", ...ufExt, a: [9.3, 9.685], b: [6.27, 9.685] },
  { group: "uf-living", ...ufExt, a: [6.27, 9.685], b: [6.27, 13.045] },
  { group: "uf-living", ...ufExt, a: [1.47, 9.685], b: [1.47, 14.0] },
  { group: "uf-living", ...ufInt, a: [6.27, 13.045], b: [6.27, 14.0], openings: [{ span: [13.15, 13.95], ...ufDoor }] },

  // Upper floor, master wing: master suite, dresser, ensuite, powder room (sheet 4; elevations 2 and 4)
  {
    group: "uf-master",
    ...ufExt,
    a: [1.47, 14.0],
    b: [1.47, 18.3],
    openings: [
      { span: [14.26, 15.0], sill: 4.222, head: 5.422, kind: "window" },
      { span: [16.55, 17.55], sill: 3.822, head: 5.422, kind: "window" },
    ],
  },
  { group: "uf-master", ...ufExt, a: [1.47, 18.3], b: [4.6, 18.3] },
  { group: "uf-master", ...ufExt, a: [4.6, 18.3], b: [4.6, 20.755], openings: [{ span: [19.18, 20.06], sill: 4.722, head: 5.422, kind: "window" }] },
  { group: "uf-master", ...ufExt, a: [4.6, 20.755], b: [9.45, 20.755] },
  { group: "uf-master", ...ufExt, a: [9.45, 20.755], b: [9.45, 13.045], openings: [{ span: [15.18, 17.39], sill: 4.622, head: 5.422, kind: "window" }] },
  { group: "uf-master", ...ufExt, a: [9.45, 13.045], b: [6.27, 13.045] },
  { group: "uf-master", ...ufInt, a: [1.47, 14.0], b: [6.27, 14.0], openings: [{ span: [3.9, 4.5], ...ufDoor }] },
  { group: "uf-master", ...ufInt, a: [1.47, 15.2], b: [4.6, 15.2] },
  { group: "uf-master", ...ufInt, a: [4.6, 14.0], b: [4.6, 18.3], openings: [{ span: [15.6, 16.4], ...ufDoor }] },

  // Garage (sheet 3; elevations 3–4). Grano floor at -80 mm.
  { group: "garage", level: "gf", base: -0.08, top: 2.78, finish: "cladding", a: [4.57, 20.62], b: [4.57, 27.46], openings: [{ span: [22.56, 26.25], sill: -0.08, head: 2.4, kind: "opening" }] },
  { group: "garage", level: "gf", base: -0.08, top: 2.78, finish: "cladding", a: [4.57, 27.46], b: [10.77, 27.46], openings: [{ span: [5.0, 10.34], sill: -0.08, head: 2.4, kind: "garage-door" }] },
  { group: "garage", level: "gf", base: -0.08, top: 2.78, finish: "cladding", a: [10.77, 27.46], b: [10.77, 20.62] },
  // Side door to the path, beside the bath (sheet 3 door swing; sheet 9 lower perspective)
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

/** Spiral stair, balcony to roof terrace. Position scaled from sheets 4–5; diameter not dimensioned. */
export const SPIRAL = { centre: [8.15, 2.35] as Vec2, radius: 0.82, from: L.uf, to: L.terrace, risers: 16 } as const;

/** Internal stair, GF to UF: 16 risers numbered on sheets 3–4. Flight position scaled from the plans. */
export const INTERNAL_STAIR = { x: [0.25, 1.25] as [number, number], zStart: 4.9, going: 0.25, risers: 16, to: L.uf } as const;

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

  // Balcony (sheet 4: 7.83 × 3.50) and roof terrace (sheet 5: 7.83 × 3.50) inside the white frame
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

/** Downpipes at the DP and RWH marks on sheet 3. Faces are wall centrelines ± 0.1 m (walls are 200 mm). */
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

/** Solar arrays on the 9° roof plane (sheet 5 hatching, sheet 10 perspective). Panel count is indicative. */
export const solarArrays = [
  { x: [5.36, 8.7] as [number, number], z: [4.2, 9.2] as [number, number], cols: 2, rows: 5 },
  { x: [5.36, 8.7] as [number, number], z: [13.5, 20.3] as [number, number], cols: 2, rows: 7 },
];

// ---------------------------------------------------------------------------------------------------
// Blocks: frame members, balustrades, screens, joinery and furniture

const FRAME_DEPTH = 0.3;
const BAL_H = 1.0; // balustrade height above finished floor (indicative; not dimensioned)

/** Glass balustrade with a warm metal top rail (finish per the render; plans show slats). */
const balustrade = (group: GroupId, level: Level, min: Vec3, max: Vec3): Block[] => [
  { group, level, min, max: [max[0], max[1] - 0.04, max[2]], material: "glass" },
  { group, level, min: [min[0] - 0.02, max[1] - 0.04, min[2] - 0.02], max: [max[0] + 0.02, max[1] + 0.01, max[2] + 0.02], material: "rail" },
];

/** 1.6 m privacy screen of dark vertical battens with a capping rail (elevations 2 and 4). Batten size indicative. */
function slatScreen(group: GroupId, level: Level, x: number, floor: number, z0: number, z1: number): Block[] {
  const batten = 0.04;
  const pitch = 0.11;
  const count = Math.floor((z1 - z0 - batten) / pitch) + 1;
  const inset = (z1 - z0 - batten - (count - 1) * pitch) / 2;
  const top = floor + 1.6;
  return [
    ...Array.from({ length: count }, (_, i): Block => {
      const z = z0 + inset + i * pitch;
      return { group, level, min: [x - 0.03, floor, z], max: [x + 0.03, top - 0.04, z + batten], material: "screen" };
    }),
    { group, level, min: [x - 0.04, top - 0.04, z0], max: [x + 0.04, top, z1], material: "screen" },
  ];
}

/** Balcony and terrace edges: glass front and sides, 1.6 m privacy screens towards the back (elevations 2 and 4). */
const deckEdges = (group: GroupId, level: Level, floor: number, frontTop: number): Block[] => [
  ...balustrade(group, level, [1.82, frontTop, FRAME_DEPTH + 0.02], [8.95, floor + BAL_H, FRAME_DEPTH + 0.05]),
  ...balustrade(group, level, [1.54, floor, FRAME_DEPTH], [1.57, floor + BAL_H, 1.4]),
  ...balustrade(group, level, [9.2, floor, FRAME_DEPTH], [9.23, floor + BAL_H, 1.4]),
  ...slatScreen(group, level, 1.555, floor, 1.4, 3.0),
  ...slatScreen(group, level, 9.215, floor, 1.4, 3.0),
];

const pot = (group: GroupId, level: Level, x: number, y: number, z: number, size = 1): Block[] => [
  { group, level, min: [x - 0.2 * size, y, z - 0.2 * size], max: [x + 0.2 * size, y + 0.45 * size, z + 0.2 * size], material: "pot" },
  { group, level, min: [x - 0.32 * size, y + 0.45 * size, z - 0.32 * size], max: [x + 0.32 * size, y + 1.25 * size, z + 0.32 * size], material: "foliage" },
];

export const blocks: Block[] = [
  // White rendered frame around the balcony (elevation 1: "rendered blueboard")
  { group: "frame", level: "uf", min: [1.47, L.ufSlab, 0], max: [9.3, 3.3, FRAME_DEPTH], material: "render" },
  { group: "frame", level: "uf", min: [1.47, 3.3, 0], max: [1.82, L.ufCeiling, FRAME_DEPTH], material: "render" },
  { group: "frame", level: "uf", min: [8.95, 3.3, 0], max: [9.3, L.ufCeiling, FRAME_DEPTH], material: "render" },
  ...deckEdges("frame", "uf", L.uf, 3.3),
  ...pot("frame", "uf", 2.4, L.uf, 0.8),
  ...pot("frame", "uf", 6.9, L.uf, 0.75, 0.9),

  // Roof terrace: top band of the frame, edges, outdoor setting
  { group: "terrace", level: "roof", min: [1.47, L.ufCeiling, 0], max: [9.3, 6.344, FRAME_DEPTH], material: "render" },
  ...deckEdges("terrace", "roof", L.terrace, 6.344),
  ...balustrade("terrace", "roof", [1.57, L.terrace, 3.42], [9.2, L.terrace + BAL_H, 3.45]),
  { group: "terrace", level: "roof", min: [3.3, L.terrace, 2.55], max: [6.1, L.terrace + 0.42, 3.3], material: "soft" },
  { group: "terrace", level: "roof", min: [3.3, L.terrace + 0.42, 3.1], max: [6.1, L.terrace + 0.8, 3.3], material: "soft" },
  ...pot("terrace", "roof", 2.1, L.terrace, 2.9),

  // Ground floor joinery and furniture (positions scaled from sheet 3; indicative)
  { group: "gf-front", level: "gf", min: [1.62, 0, 5.5], max: [2.45, 0.78, 8.3], material: "soft" },
  { group: "gf-front", level: "gf", min: [2.45, 0, 7.5], max: [4.6, 0.78, 8.3], material: "soft" },
  { group: "gf-front", level: "gf", min: [7.4, 0, 7.2], max: [8.2, 0.75, 8.8], material: "furniture" },
  { group: "gf-bed", level: "gf", min: [2.47, 0, 8.55], max: [3.93, 0.55, 10.55], material: "bed" },
  { group: "gf-bed", level: "gf", min: [1.52, 0, 11.85], max: [4.93, 2.4, 12.4], material: "interior" },
  { group: "gf-bed", level: "gf", min: [2.47, 0, 13.7], max: [3.93, 0.55, 15.7], material: "bed" },
  { group: "gf-bed", level: "gf", min: [7.4, 0, 13.8], max: [9.3, 0.55, 15.3], material: "bed" },
  { group: "gf-bed", level: "gf", min: [1.55, 0, 15.97], max: [4.9, 0.9, 16.55], material: "furniture" },
  { group: "gf-bed", level: "gf", min: [8.6, 0, 18.3], max: [9.3, 0.55, 19.98], material: "bed" },

  // Upper floor joinery and furniture (positions scaled from sheet 4; indicative)
  { group: "uf-living", level: "uf", min: [3.0, L.uf, 5.13], max: [4.25, L.uf + 0.75, 8.06], material: "furniture" },
  { group: "uf-living", level: "uf", min: [6.44, L.uf, 4.81], max: [7.39, L.uf + 0.9, 8.37], material: "interior" },
  { group: "uf-living", level: "uf", min: [8.55, L.uf, 3.65], max: [9.2, L.uf + 0.9, 9.5], material: "interior" },
  { group: "uf-living", level: "uf", min: [1.6, L.uf, 9.9], max: [2.4, L.uf + 0.78, 13.9], material: "soft" },
  { group: "uf-living", level: "uf", min: [2.4, L.uf, 13.2], max: [4.4, L.uf + 0.78, 13.9], material: "soft" },
  { group: "uf-master", level: "uf", min: [6.03, L.uf, 16.6], max: [7.91, L.uf + 0.55, 18.7], material: "bed" },
  { group: "uf-master", level: "uf", min: [4.7, L.uf, 18.75], max: [9.35, L.uf + 1.2, 18.95], material: "interior" },
  { group: "uf-master", level: "uf", min: [1.55, L.uf, 17.75], max: [4.5, L.uf + 0.9, 18.2], material: "furniture" },
];

/** Verandah posts under the balcony: positions from sheet 3, slender twin posts per the render. */
export const verandahPosts: Vec2[] = [
  [1.6, 0.15],
  [1.78, 0.15],
  [5.2, 0.15],
  [5.38, 0.15],
  [9.0, 0.15],
  [9.18, 0.15],
];

/** Timber pergola over the roof terrace (top RL 18.444, sheets 6–7). Post and rafter spacing indicative. */
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
