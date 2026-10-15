/**
 * Seashells Jurien Bay, 4 Bed Hasting Street Villa: source geometry for its 3D explorer.
 *
 * Source: Kellett Design Group, "1 Casuarina Crescent, Jurien Bay", Type B lot, Hasting's Villa, building permit
 * set rev B15, printed 3/03/2026. Sheets: 7 GF plan, 8 UF plan, 9 roof terrace plan, 10 elevations, 14 section,
 * 20 window and door schedule, 21–22 3D perspectives. Figured dimensions are used throughout; anything scaled or
 * assumed is listed in `assumptions` (./hasting-street-info.ts). The set predates the modular shop drawings, so it
 * is used for layout and finishes only.
 *
 * Coordinates are plan metres as the sheets are drawn (north up):
 *   x  across the lot, 0 = the garage's boundary wall, increasing east
 *   z  rear to front, 0 = the rear wall of the bedrooms, increasing towards the street
 *   y  height above ground floor level (GF FL 0)
 * Sheet 8 is drawn 0.38 m out of register with sheet 7 (compare the rear and front setbacks on the two sheets),
 * so upper-floor positions are taken from sheet 8 less 0.38 m in z.
 *
 * External walls are 115 mm and internal walls 90 mm (sheet 7 legend). Wall records are centrelines.
 */

import type { Block, HouseData, Opening, RoofPrism, Slab, Vec2, Vec3, Wall } from "./house";
import { balustrade, pot, slatScreen } from "./house";

export type GroupId =
  | "gf-bed"
  | "gf-living"
  | "garage"
  | "garage-roof"
  | "gf-roof"
  | "uf-master"
  | "uf-living"
  | "frame"
  | "spiral"
  | "terrace"
  | "roof";

type W = Wall<GroupId>;
type B = Block<GroupId>;

// ---------------------------------------------------------------------------------------------------
// Levels (sheets 10 and 14)

export const LEVELS = {
  gf: 0,
  gfCeiling: 2.7,
  ufSlab: 2.7,
  uf: 3.0,
  /** Balcony tiles 50 mm below the upper floor (sheet 8) */
  balcony: 2.95,
  ufCeiling: 5.7,
  terrace: 6.0,
  /** Underside of the frame around the balcony (elevations 1 and 4) */
  frameSoffit: 2.65,
} as const;

const L = LEVELS;
const tan = (deg: number) => Math.tan((deg * Math.PI) / 180);

// Outer faces (sheets 7 and 8) and wall centrelines
const EXT = 0.115;
const c = EXT / 2;
const X_HOUSE = 3.73; // west face of the house, east of the yard beside the garage
const X_EAST = 11.81; // east face
const X_GARAGE = 6.03; // east face of the garage
const Z_REAR = 0;
const Z_UF_REAR = 2.14; // the upper floor starts 2.14 m in from the rear wall (sheets 7–8 setbacks)
const Z_GARAGE_REAR = 10.51;
const Z_FRONT = 15.55; // sitting room front wall; the upper floor front wall is flush with it (15.57 on sheet 8)
const Z_GARAGE_FRONT = 16.54;
const Z_BALCONY_FRONT = 18.37;
const Z_VERANDAH_FRONT = 18.32;

const xw = X_HOUSE + c;
const xe = X_EAST - c;

const gfExt = { level: "gf", base: L.gf, top: L.ufSlab, finish: "cladding", thickness: EXT } as const;
const gfInt = { level: "gf", base: L.gf, top: L.gfCeiling, finish: "interior", thickness: 0.09 } as const;
const ufExt = { level: "uf", base: L.uf, top: L.ufCeiling, finish: "cladding", thickness: EXT } as const;
const ufInt = { level: "uf", base: L.uf, top: L.ufCeiling, finish: "interior", thickness: 0.09 } as const;
const door = (z0: number, z1: number): Opening => ({ span: [z0, z1], head: 2.04, kind: "door" });
const ufDoor = (u0: number, u1: number): Opening => ({ span: [u0, u1], sill: L.uf, head: L.uf + 2.04, kind: "door" });
/** Window by sill and head above its floor (sheet 20 sizes, elevation heights). */
const win = (u0: number, u1: number, sill: number, head: number, floor = 0, kind: Opening["kind"] = "window"): Opening => ({
  span: [u0, u1],
  sill: floor + sill,
  head: floor + head,
  kind,
});

// ---------------------------------------------------------------------------------------------------
// Walls

export const walls: W[] = [
  // Ground floor, bedroom wing: beds 2–4, bath, laundry (sheet 7; windows W-02 to W-05, D-02 on sheet 20)
  { group: "gf-bed", ...gfExt, a: [xw, Z_REAR + c], b: [xe, Z_REAR + c], openings: [win(8.98, 10.98, 0.85, 2.4)] },
  { group: "gf-bed", ...gfExt, a: [xw, Z_REAR + c], b: [xw, 7.68], openings: [win(0.8, 2.8, 0.85, 2.4), win(4.9, 6.9, 0.85, 2.4)] },
  {
    group: "gf-bed",
    ...gfExt,
    a: [xe, Z_REAR + c],
    b: [xe, 8.25],
    openings: [win(4.77, 6.37, 0.9, 2.4), { span: [6.59, 7.5], head: 2.4, kind: "door" }],
  },
  { group: "gf-bed", ...gfInt, a: [7.19, Z_REAR], b: [7.19, 7.68], openings: [{ span: [0.5, 1.5], head: 2.4 }, door(2.65, 3.47), door(4.4, 5.22)] },
  { group: "gf-bed", ...gfInt, a: [8.28, Z_REAR], b: [8.28, 8.25], openings: [door(2.65, 3.47), door(4.9, 5.62), door(6.65, 7.47)] },
  { group: "gf-bed", ...gfInt, a: [7.19, 2.38], b: [8.28, 2.38] },
  { group: "gf-bed", ...gfInt, a: [xw, 3.58], b: [7.19, 3.58] },
  { group: "gf-bed", ...gfInt, a: [xw, 7.68], b: [7.19, 7.68] },
  { group: "gf-bed", ...gfInt, a: [8.28, 3.47], b: [xe, 3.47], openings: [{ span: [10.4, 11.29], head: 2.4 }] },
  { group: "gf-bed", ...gfInt, a: [9.95, 3.47], b: [9.95, 4.62] },
  { group: "gf-bed", ...gfInt, a: [9.95, 4.62], b: [xe, 4.62] },
  { group: "gf-bed", ...gfInt, a: [8.28, 6.52], b: [xe, 6.52] },
  { group: "gf-bed", ...gfInt, a: [8.28, 8.25], b: [xe, 8.25] },

  // Ground floor, living: activity, store, stair and sitting room (sheet 7; SD-01, W-06, D-01, W-01 on sheet 20)
  { group: "gf-living", ...gfExt, a: [xw, 7.68], b: [xw, Z_GARAGE_REAR + c], openings: [win(8.125, 10.125, 0, 2.4, 0, "slider")] },
  { group: "gf-living", ...gfExt, a: [xe, 8.25], b: [xe, Z_FRONT - c], openings: [win(9.5, 10.4, 1.87, 2.66)] },
  {
    group: "gf-living",
    ...gfExt,
    finish: "feature",
    a: [X_GARAGE - c, Z_FRONT - c],
    b: [xe, Z_FRONT - c],
    openings: [{ span: [6.21, 7.32], head: 2.4, kind: "door" }, win(7.89, 8.79, 0, 2.4), win(9.69, 10.59, 0, 2.4)],
  },
  { group: "gf-living", ...gfInt, a: [8.28, 8.25], b: [8.28, 9.33], openings: [door(8.42, 9.24)] },

  // Garage (sheet 7): boundary wall to the west, auto sectional doors front and rear, side door to the sitting room
  { group: "garage", level: "gf", base: -0.08, top: L.ufSlab, finish: "cladding", thickness: EXT, a: [c, Z_GARAGE_REAR + c], b: [c, Z_GARAGE_FRONT - c] },
  {
    group: "garage",
    level: "gf",
    base: -0.08,
    top: L.ufSlab,
    finish: "cladding",
    thickness: EXT,
    a: [c, Z_GARAGE_FRONT - c],
    b: [X_GARAGE - c, Z_GARAGE_FRONT - c],
    openings: [{ span: [0.43, 5.63], sill: -0.08, head: 2.4, kind: "garage-door" }],
  },
  {
    group: "garage",
    level: "gf",
    base: -0.08,
    top: L.ufSlab,
    finish: "cladding",
    thickness: EXT,
    a: [c, Z_GARAGE_REAR + c],
    b: [X_GARAGE - c, Z_GARAGE_REAR + c],
    openings: [{ span: [0.43, 3.43], sill: -0.08, head: 2.4, kind: "garage-door" }],
  },
  {
    group: "garage",
    level: "gf",
    base: -0.08,
    top: L.ufSlab,
    finish: "cladding",
    thickness: EXT,
    a: [X_GARAGE - c, Z_GARAGE_REAR + c],
    b: [X_GARAGE - c, Z_GARAGE_FRONT - c],
    openings: [{ span: [10.65, 11.47], sill: 0, head: 2.04, kind: "door" }],
  },

  // Upper floor, master wing: master suite, walk-in robe, ensuite (sheet 8; W-10, W-11)
  { group: "uf-master", ...ufExt, a: [xw, Z_UF_REAR + c], b: [xe, Z_UF_REAR + c], openings: [win(5.02, 7.12, 0.85, 2.4, L.uf)] },
  { group: "uf-master", ...ufExt, a: [xw, Z_UF_REAR + c], b: [xw, 6.7] },
  { group: "uf-master", ...ufExt, a: [xe, Z_UF_REAR + c], b: [xe, 6.7], openings: [win(4.98, 5.58, 1.0, 2.4, L.uf)] },
  { group: "uf-master", ...ufInt, a: [8.28, Z_UF_REAR], b: [8.28, 6.6], openings: [{ span: [2.4, 3.3], sill: L.uf, head: L.uf + 2.4 }, { span: [5.3, 6.5], sill: L.uf, head: L.uf + 2.4 }] },
  { group: "uf-master", ...ufInt, a: [8.28, 3.72], b: [xe, 3.72] },
  { group: "uf-master", ...ufInt, a: [8.28, 6.86], b: [xe, 6.86], openings: [ufDoor(8.5, 9.32)] },
  { group: "uf-master", ...ufInt, a: [xw, 6.6], b: [8.28, 6.6], openings: [ufDoor(7.3, 8.12)] },

  // Upper floor, living wing: kitchen, dining, living, powder room (sheet 8; W-08, W-09, W-12 to W-14, SD-02, SD-03)
  { group: "uf-living", ...ufExt, a: [xw, 6.7], b: [xw, Z_FRONT - c], openings: [win(7.46, 10.46, 0.9, 1.7, L.uf), win(11.87, 14.87, 0.4, 2.4, L.uf)] },
  {
    group: "uf-living",
    ...ufExt,
    a: [xe, 6.7],
    b: [xe, Z_FRONT - c],
    openings: [win(7.19, 7.79, 1.0, 2.4, L.uf), win(9.08, 9.98, 0, 2.4, L.uf), win(13.93, 15.13, 0.4, 2.4, L.uf)],
  },
  {
    group: "uf-living",
    ...ufExt,
    finish: "feature",
    a: [xw, Z_FRONT - c],
    b: [xe, Z_FRONT - c],
    openings: [win(4.83, 8.14, 0, 2.4, L.uf, "slider"), win(8.395, 10.605, 0, 2.4, L.uf, "slider")],
  },
  { group: "uf-living", ...ufInt, a: [9.8, 6.86], b: [9.8, 8.3] },
  { group: "uf-living", ...ufInt, a: [9.8, 8.3], b: [xe, 8.3] },
];

// ---------------------------------------------------------------------------------------------------
// Floors and slabs

const rect = (x0: number, z0: number, x1: number, z1: number): Vec2[] => [
  [x0, z0],
  [x1, z0],
  [x1, z1],
  [x0, z1],
];

/** Stair void in the upper floor, over the lower flight and landing (sheet 8 stair, less 0.38 m). */
const VOID = { x: [8.93, X_EAST - EXT] as [number, number], z: [8.3, 10.68] as [number, number] };

const gfBedFloor: Vec2[] = [[X_HOUSE, Z_REAR], [X_EAST, Z_REAR], [X_EAST, 8.25], [8.28, 8.25], [8.28, 7.68], [X_HOUSE, 7.68]];
const gfLivingFloor: Vec2[] = [
  [X_HOUSE, 7.68],
  [8.28, 7.68],
  [8.28, 8.25],
  [X_EAST, 8.25],
  [X_EAST, Z_FRONT],
  [X_GARAGE, Z_FRONT],
  [X_GARAGE, Z_GARAGE_REAR],
  [X_HOUSE, Z_GARAGE_REAR],
];
const ufMasterFloor = rect(X_HOUSE, Z_UF_REAR, X_EAST, 6.7);
const ufLivingFloor: Vec2[] = [
  [X_HOUSE, 6.7],
  [X_EAST, 6.7],
  [X_EAST, VOID.z[0]],
  [VOID.x[0], VOID.z[0]],
  [VOID.x[0], VOID.z[1]],
  [X_EAST, VOID.z[1]],
  [X_EAST, Z_FRONT],
  [X_HOUSE, Z_FRONT],
];

/** Balcony frame (sheet 8): legs 325 wide, the east side closed by a wall, the west side open behind glass. */
const FRAME = { x: [3.96, 11.47] as [number, number], z: [Z_FRONT, Z_BALCONY_FRONT] as [number, number], depth: 0.3, leg: 0.325 };

/** Spiral stair, balcony to roof terrace. Position and diameter scaled from sheet 8 (not dimensioned). */
export const SPIRAL = { centre: [10.17, 16.63] as Vec2, radius: 0.86, from: L.balcony, to: L.terrace, risers: 12 } as const;
const spiralHole = { centre: SPIRAL.centre, radius: SPIRAL.radius + 0.08 };

export const slabs: Slab<GroupId>[] = [
  { group: "gf-bed", level: "gf", polygon: gfBedFloor, bottom: -0.2, top: 0, material: "floor" },
  { group: "gf-living", level: "gf", polygon: gfLivingFloor, bottom: -0.2, top: 0, material: "floor" },
  // Verandah deck (sheet 7: 5.725 m wide, 2.77 m deep, running on past the garage front)
  {
    group: "gf-living",
    level: "gf",
    polygon: [[X_GARAGE, Z_FRONT], [11.49, Z_FRONT], [11.49, Z_VERANDAH_FRONT], [5.76, Z_VERANDAH_FRONT], [5.76, Z_GARAGE_FRONT], [X_GARAGE, Z_GARAGE_FRONT]],
    bottom: -0.15,
    top: 0,
    material: "deck",
  },
  { group: "garage", level: "gf", polygon: rect(0, Z_GARAGE_REAR, X_GARAGE, Z_GARAGE_FRONT), bottom: -0.2, top: -0.08, material: "concrete" },

  // Upper floor: structural slab (the band on the façade) with a thin floor finish on top
  { group: "uf-master", level: "uf", polygon: ufMasterFloor, bottom: L.ufSlab, top: L.uf, material: "render" },
  { group: "uf-master", level: "uf", polygon: ufMasterFloor, bottom: L.uf, top: L.uf + 0.003, material: "floor" },
  { group: "uf-living", level: "uf", polygon: ufLivingFloor, bottom: L.ufSlab, top: L.uf, material: "render" },
  { group: "uf-living", level: "uf", polygon: ufLivingFloor, bottom: L.uf, top: L.uf + 0.003, material: "floor" },
  // The slab edge carries on under the east wall past the stair void
  { group: "uf-living", level: "uf", polygon: rect(VOID.x[1], VOID.z[0], X_EAST, VOID.z[1]), bottom: L.ufSlab, top: L.uf, material: "render" },

  // Balcony and roof terrace inside the frame, both tiled (sheets 8–9)
  { group: "frame", level: "uf", polygon: rect(FRAME.x[0], FRAME.z[0], FRAME.x[1], FRAME.z[1]), bottom: L.frameSoffit, top: L.balcony - 0.02, material: "render" },
  { group: "frame", level: "uf", polygon: rect(FRAME.x[0] + 0.04, FRAME.z[0], FRAME.x[1] - 0.25, FRAME.z[1] - FRAME.depth), bottom: L.balcony - 0.02, top: L.balcony, material: "concrete" },
  { group: "terrace", level: "roof", polygon: rect(FRAME.x[0], FRAME.z[0], FRAME.x[1], FRAME.z[1]), bottom: L.ufCeiling, top: L.terrace - 0.02, material: "render", hole: spiralHole },
  { group: "terrace", level: "roof", polygon: rect(FRAME.x[0], FRAME.z[0], FRAME.x[1], FRAME.z[1]), bottom: L.terrace - 0.02, top: L.terrace, material: "concrete", hole: spiralHole },
];

// ---------------------------------------------------------------------------------------------------
// Roofs (sheet 10): Klip-lok throughout. Upper floor 3° each way from a ridge along the house (6.212 m);
// the strip over the rear bedrooms 8° to the rear; the garage 4° down to its boundary wall.

const ufRidge = { x: (X_HOUSE + X_EAST) / 2, y: 6.212, pitchLeft: tan(3), pitchRight: tan(3) };

export const roofs: RoofPrism<GroupId>[] = [
  { group: "roof", level: "roof", x: [X_HOUSE, X_EAST], z: [Z_UF_REAR, Z_FRONT], base: L.ufCeiling, ridge: ufRidge, extend: ["z0"], overhang: 0.4 },
  {
    group: "gf-roof",
    level: "roof",
    axis: "z",
    x: [X_HOUSE, X_EAST],
    z: [Z_REAR, Z_UF_REAR + c],
    base: L.gfCeiling,
    skillion: [3.03, 3.03 + Z_UF_REAR * tan(8)],
    gutters: ["x0"],
    extend: ["z0", "z1"],
    overhang: 0.3,
  },
  {
    group: "garage-roof",
    level: "roof",
    x: [0, X_HOUSE + c],
    z: [Z_GARAGE_REAR, Z_GARAGE_FRONT],
    base: L.gfCeiling,
    skillion: [2.775, 2.775 + X_HOUSE * tan(4)],
    extend: ["z0", "z1"],
    overhang: 0.15,
  },
];

// ---------------------------------------------------------------------------------------------------
// Blocks: frame, balustrades, screens, stair, joinery and furniture

const BAL_H = 1.0; // balustrade height above finished floor (indicative; not dimensioned)
const RISE = L.uf / 16; // 16 risers, ground to upper floor (sheets 7–8)
const GOING = 0.256;

/**
 * Dog-leg stair (sheet 7): risers 1–7 run east along the front half of the stair, a landing at the east wall,
 * then risers 9–15 run back west along the rear half to the upper floor. Solid treads from the floor.
 */
function stairBlocks(): B[] {
  const out: B[] = [];
  const tread = (x0: number, x1: number, z0: number, z1: number, step: number): B => ({
    group: "gf-living",
    level: "gf",
    min: [x0, 0, z0],
    max: [x1, RISE * step, z1],
    material: "floor",
  });
  const lowerStart = 8.93;
  for (let i = 0; i < 7; i++) out.push(tread(lowerStart + GOING * i, lowerStart + GOING * (i + 1), 9.37, 10.37, i + 1));
  const landing = lowerStart + GOING * 7;
  out.push(tread(landing, xe - c, VOID.z[0], 10.37, 8));
  for (let i = 0; i < 7; i++) out.push(tread(landing - GOING * (i + 1), landing - GOING * i, VOID.z[0], 9.33, 9 + i));
  return out;
}

const frameBlocks = (): B[] => {
  const [x0, x1] = FRAME.x;
  const [, z1] = FRAME.z;
  const zf = z1 - FRAME.depth;
  return [
    // The balcony and terrace slabs form the frame's bottom and top bands; a lip finishes the bottom band at the
    // front, and the legs stand between them (perspectives, sheets 21–22)
    { group: "frame", level: "uf", min: [x0, L.balcony - 0.02, zf], max: [x1, L.uf, z1], material: "render" },
    { group: "frame", level: "uf", min: [x0, L.uf, zf], max: [x0 + FRAME.leg, L.ufCeiling, z1], material: "render" },
    { group: "frame", level: "uf", min: [x1 - FRAME.leg, L.uf, zf], max: [x1, L.ufCeiling, z1], material: "render" },
    // East side closed by a clad wall behind the spiral stair (sheet 8, elevation 4)
    { group: "frame", level: "uf", min: [x1 - 0.25, L.balcony - 0.02, FRAME.z[0]], max: [x1, L.ufCeiling, zf], material: "feature" },
    // Glass to the front and the open west side
    ...balustrade("frame", "uf", [x0 + FRAME.leg, L.balcony, zf + 0.02], [x1 - FRAME.leg, L.balcony + BAL_H, zf + 0.05]),
    ...balustrade("frame", "uf", [x0 + 0.02, L.balcony, FRAME.z[0] + 0.05], [x0 + 0.05, L.balcony + BAL_H, zf]),
    ...pot("frame", "uf", 4.8, L.balcony, 17.55),
    { group: "frame", level: "uf", min: [6.0, L.balcony, 16.6], max: [7.6, L.balcony + 0.72, 17.4], material: "furniture" },

    // Roof terrace: glass on three sides, 1.6 m batten screen to the east (sheets 9–10)
    ...balustrade("terrace", "roof", [x0 + 0.02, L.terrace, z1 - 0.06], [x1 - 0.2, L.terrace + BAL_H, z1 - 0.03]),
    ...balustrade("terrace", "roof", [x0 + 0.02, L.terrace, FRAME.z[0] + 0.05], [x0 + 0.05, L.terrace + BAL_H, z1 - 0.06]),
    ...balustrade("terrace", "roof", [x0 + 0.05, L.terrace, FRAME.z[0] + 0.03], [x1 - 0.2, L.terrace + BAL_H, FRAME.z[0] + 0.06]),
    ...slatScreen("terrace", "roof", x1 - 0.12, L.terrace, FRAME.z[0] + 0.03, z1 - 0.03),
    { group: "terrace", level: "roof", min: [5.0, L.terrace, 15.75], max: [7.6, L.terrace + 0.42, 16.45], material: "soft" },
    { group: "terrace", level: "roof", min: [5.0, L.terrace + 0.42, 15.75], max: [7.6, L.terrace + 0.8, 15.95], material: "soft" },
    ...pot("terrace", "roof", 4.5, L.terrace, 17.8),
  ];
};

export const blocks: B[] = [
  ...frameBlocks(),
  ...stairBlocks(),

  // Upper floor stair void: glass to the living side (sheet 8 "balustrade to NCC")
  ...balustrade<GroupId>("uf-living", "uf", [VOID.x[0], L.uf, VOID.z[1] - 0.03], [xe - c, L.uf + BAL_H, VOID.z[1]]),
  ...balustrade<GroupId>("uf-living", "uf", [VOID.x[0] - 0.03, L.uf, 9.4], [VOID.x[0], L.uf + BAL_H, VOID.z[1]]),

  // Ground floor joinery and furniture (positions scaled from sheet 7; indicative)
  { group: "gf-bed", level: "gf", min: [4.73, 0, 0.17], max: [6.26, 0.55, 2.2], material: "bed" },
  { group: "gf-bed", level: "gf", min: [3.85, 0, 4.95], max: [5.88, 0.55, 6.48], material: "bed" },
  { group: "gf-bed", level: "gf", min: [9.25, 0, 0.17], max: [10.78, 0.55, 2.2], material: "bed" },
  { group: "gf-bed", level: "gf", min: [4.14, 0, 3.64], max: [6.71, 2.4, 4.14], material: "interior" },
  { group: "gf-bed", level: "gf", min: [11.0, 0, 4.75], max: [11.7, 0.6, 6.42], material: "interior" },
  { group: "gf-living", level: "gf", min: [4.3, 0, 8.4], max: [5.5, 0.75, 9.8], material: "furniture" },
  { group: "gf-living", level: "gf", min: [6.3, 0, 11.4], max: [7.1, 0.78, 14.2], material: "soft" },
  { group: "gf-living", level: "gf", min: [7.1, 0, 13.4], max: [9.3, 0.78, 14.2], material: "soft" },
  { group: "gf-living", level: "gf", min: [8.0, 0, 11.8], max: [9.0, 0.42, 12.8], material: "furniture" },

  // Upper floor joinery and furniture (positions scaled from sheet 8; indicative)
  { group: "uf-master", level: "uf", min: [6.15, L.uf, 3.5], max: [8.2, L.uf + 0.55, 5.03], material: "bed" },
  { group: "uf-master", level: "uf", min: [8.35, L.uf, 2.25], max: [8.95, L.uf + 2.1, 3.65], material: "interior" },
  { group: "uf-living", level: "uf", min: [3.85, L.uf, 6.75], max: [4.5, L.uf + 0.9, 9.6], material: "interior" },
  { group: "uf-living", level: "uf", min: [5.9, L.uf, 8.0], max: [6.9, L.uf + 0.9, 10.4], material: "interior" },
  { group: "uf-living", level: "uf", min: [4.6, L.uf, 11.6], max: [5.6, L.uf + 0.75, 13.6], material: "furniture" },
  { group: "uf-living", level: "uf", min: [8.9, L.uf, 13.6], max: [11.4, L.uf + 0.78, 14.4], material: "soft" },
  { group: "uf-living", level: "uf", min: [11.0, L.uf, 11.4], max: [11.7, L.uf + 0.78, 13.6], material: "soft" },
];

/** Verandah posts: twin steel posts at each front corner of the verandah (sheet 7), up to the frame. */
export const verandahPosts: Vec2[] = [
  [5.91, 18.22],
  [6.09, 18.22],
  [11.0, 18.22],
  [11.18, 18.22],
];

// ---------------------------------------------------------------------------------------------------
// Assembly view: separation directions (metres at full explode). Groups are presentation groups,
// not documented construction modules. The front is +z.

export const explode: Record<GroupId, Vec3> = {
  "gf-bed": [0, 0, -1.6],
  "gf-living": [0, 0, 0],
  garage: [-3.2, 0, 0],
  "garage-roof": [-3.2, 2.2, 0],
  "gf-roof": [0, 2.4, -1.6],
  "uf-master": [0, 3.2, -1.6],
  "uf-living": [0, 3.2, 0],
  frame: [0, 3.2, 4.0],
  spiral: [0, 3.2, 4.0],
  terrace: [0, 5.6, 4.0],
  roof: [0, 5.6, -0.6],
};

/** Everything the model builder needs for the Hasting Street Villa. */
export const hastingStreet: HouseData<GroupId> = {
  centre: { x: 5.9, z: 9.2 },
  ufSlab: L.ufSlab,
  eaveOverhang: 0.15,
  walls,
  slabs,
  roofs,
  downpipes: [],
  blocks,
  posts: { group: "frame", at: verandahPosts, height: L.frameSoffit },
  spiral: { group: "spiral", ...SPIRAL, start: -Math.PI / 2 },
};
