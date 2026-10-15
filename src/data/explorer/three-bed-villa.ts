/**
 * Seashells Jurien Bay, Short Stay 3 Bed Villa: source geometry for its 3D explorer.
 *
 * Source: Kellett Design Group, "1 Casuarina Crescent, Jurien Bay", Short Stay 3 Bed Villa, building permit set
 * rev C16, printed 3/03/2026. Sheets: 6 GF plan, 7 UF plan, 8 roof plan, 9 elevations, 11 section, 15 window and
 * door schedule, 16 3D perspectives. Figured dimensions are used throughout; anything scaled or assumed is listed
 * in `assumptions` (./three-bed-villa-info.ts). The set predates the modular shop drawings, so it is used for
 * layout and finishes only.
 *
 * Coordinates are plan metres as the sheets are drawn (north up):
 *   x  across the villa, 0 = the outer face of the boundary wall (west), increasing east
 *   z  rear to front, 0 = the rear wall, increasing towards the road
 *   y  height above ground floor level (GF FL 0)
 * The upper floor starts over the bed 1 / bath wall (2.89 m from the rear, section S-01) and runs to the front
 * wall; its dimensions on sheet 7 are measured from there.
 *
 * External walls are 115 mm and internal walls 90 mm (sheet 6 legend). Wall records are centrelines.
 */

import type { Block, HouseData, Opening, RoofPrism, Slab, Vec2, Vec3, Wall } from "./house";

export type GroupId = "gf-bed" | "gf-living" | "gf-roof" | "uf" | "shroud" | "vergola" | "roof";

type W = Wall<GroupId>;
type B = Block<GroupId>;

// ---------------------------------------------------------------------------------------------------
// Levels (sheets 9 and 11)

export const LEVELS = {
  gf: 0,
  /** Ground floor wall height and underside of the upper floor slab */
  gfWall: 2.4,
  uf: 2.7,
  /** Upper floor wall height where the raked roof starts (wall pitching height) */
  ufWall: 4.948,
  /** Top of the walls that hide the upper roof, at the front; the roof falls 3° to the rear */
  roofFront: 5.95,
  vergolaSoffit: 2.55,
  vergolaTop: 2.7,
} as const;

const L = LEVELS;
const tan = (deg: number) => Math.tan((deg * Math.PI) / 180);

const EXT = 0.115;
const c = EXT / 2;
const WIDTH = 4.35;
const Z_UF_REAR = 2.89; // bed 1 / bath wall line: the upper floor starts here (sheet 6, section S-01)
const Z_FRONT = 14.95;
const Z_MASTER_FRONT = 9.39; // master suite's glazed wall onto the void over the living room (sheet 7)
const Z_VERGOLA_FRONT = 17.395;

const xw = c;
const xe = WIDTH - c;

const gfExt = { level: "gf", base: L.gf, top: L.gfWall, finish: "cladding", thickness: EXT } as const;
const gfInt = { level: "gf", base: L.gf, top: L.gfWall, finish: "interior", thickness: 0.09 } as const;
const ufExt = { group: "uf", level: "uf", base: L.uf, top: L.ufWall, finish: "cladding", thickness: EXT } as const;
const ufInt = { group: "uf", level: "uf", base: L.uf, top: L.ufWall, finish: "interior", thickness: 0.09 } as const;
const door = (u0: number, u1: number, floor = 0): Opening => ({ span: [u0, u1], sill: floor, head: floor + 2.04, kind: "door" });
/** Window by sill and head above ground floor level (sheet 15 sizes, elevation heights). */
const win = (u0: number, u1: number, sill: number, head: number, kind: Opening["kind"] = "window"): Opening => ({ span: [u0, u1], sill, head, kind });
const uf = (z: number) => Z_UF_REAR + z; // sheet 7 dimensions run from the upper floor's rear wall

// ---------------------------------------------------------------------------------------------------
// Walls

export const walls: W[] = [
  // Ground floor, rear: bed 1, bath and laundry, stair, bed 2 (sheet 6; W-01 to W-03 on sheet 15, heights from elevation 4)
  { group: "gf-bed", ...gfExt, a: [xw, c], b: [xe, c] },
  { group: "gf-bed", ...gfExt, a: [xw, c], b: [xw, 8.69] },
  {
    group: "gf-bed",
    ...gfExt,
    a: [xe, c],
    b: [xe, 8.69],
    openings: [win(0.515, 2.515, 1.6, 2.15, "slider"), win(3.055, 3.955, 1.25, 2.15), win(6.645, 8.645, 1.6, 2.15, "slider")],
  },
  { group: "gf-bed", ...gfInt, a: [xw, 2.935], b: [xe, 2.935], openings: [door(0.2, 1.02)] },
  { group: "gf-bed", ...gfInt, a: [1.16, 2.935], b: [1.16, 8.69], openings: [door(3.05, 3.77), { span: [4.85, 5.85], head: 2.4 }, door(6.05, 6.87)] },
  { group: "gf-bed", ...gfInt, a: [1.16, 4.8], b: [xe, 4.8] },
  { group: "gf-bed", ...gfInt, a: [1.16, 5.89], b: [xe, 5.89] },
  { group: "gf-bed", ...gfInt, a: [1.16, 8.69], b: [xe, 8.69] },

  // Ground floor, living, dining and kitchen, opening onto the vergola through SD-01 (sheets 6, 15)
  { group: "gf-living", ...gfExt, a: [xw, 8.69], b: [xw, Z_FRONT - c] },
  { group: "gf-living", ...gfExt, a: [xe, 8.69], b: [xe, Z_FRONT - c] },
  { group: "gf-living", ...gfExt, a: [xw, Z_FRONT - c], b: [xe, Z_FRONT - c], openings: [win(0.715, 3.635, 0, 2.15, "slider")] },

  // Upper floor: master suite, ensuite, robes and stair (sheet 7; W-05 to W-07 heights from elevation 4)
  { ...ufExt, a: [xw, Z_UF_REAR + c], b: [xe, Z_UF_REAR + c] },
  { ...ufExt, a: [xw, Z_UF_REAR + c], b: [xw, Z_FRONT - c] },
  {
    ...ufExt,
    a: [xe, Z_UF_REAR + c],
    b: [xe, Z_FRONT - c],
    openings: [win(uf(0.24), uf(1.74), 4.3, 4.85), win(uf(2.33), uf(4.33), 4.3, 4.85), win(uf(5.045), uf(6.455), 3.9, 4.85, "slider")],
  },
  // Front wall: the 2.92 m fixed window W-04 lights the living room through the void
  { ...ufExt, a: [xw, Z_FRONT - c], b: [xe, Z_FRONT - c], openings: [win(0.715, 3.635, 3.35, 4.85)] },
  { ...ufInt, a: [1.16, Z_UF_REAR + c], b: [1.16, 4.8], openings: [door(4.0, 4.72, L.uf)] },
  { ...ufInt, a: [xw, 3.81], b: [1.16, 3.81] },
  { ...ufInt, a: [1.16, 4.8], b: [xe, 4.8] },
  { ...ufInt, a: [1.69, 4.8], b: [1.69, 5.9] },
  { ...ufInt, a: [1.16, 5.9], b: [3.28, 5.9] },
  { ...ufInt, a: [3.28, 5.9], b: [3.28, 7.9], openings: [door(6.95, 7.77, L.uf)] },
  // Master suite's glazed wall onto the void (W-08, W-09: 950 × 1800 fixed)
  { ...ufInt, a: [xw, Z_MASTER_FRONT], b: [xe, Z_MASTER_FRONT], openings: [win(0.53, 2.1, 3.7, 4.65), win(2.32, 3.9, 3.7, 4.65)] },
];

// ---------------------------------------------------------------------------------------------------
// Floors and slabs

const rect = (x0: number, z0: number, x1: number, z1: number): Vec2[] => [
  [x0, z0],
  [x1, z0],
  [x1, z1],
  [x0, z1],
];

/**
 * Stair (sheets 6–7): risers 1–9 run east from the hall, two winders turn at the east wall, and risers 12–15
 * run towards the front up to the upper floor. Upper floor void over the flights, kept inside the east wall.
 */
const RISE = L.uf / 16;
const ufFloor: Vec2[] = [
  [0, Z_UF_REAR],
  [WIDTH, Z_UF_REAR],
  [WIDTH, 4.8],
  [WIDTH - EXT, 4.8],
  [1.69, 4.8],
  [1.69, 5.9],
  [3.235, 5.9],
  [3.235, 6.85],
  [WIDTH - EXT, 6.85],
  [WIDTH, 6.85],
  [WIDTH, Z_MASTER_FRONT + 0.045],
  [0, Z_MASTER_FRONT + 0.045],
];

export const slabs: Slab<GroupId>[] = [
  { group: "gf-bed", level: "gf", polygon: rect(0, 0, WIDTH, 8.69), bottom: -0.2, top: 0, material: "floor" },
  { group: "gf-living", level: "gf", polygon: rect(0, 8.69, WIDTH, Z_FRONT), bottom: -0.2, top: 0, material: "floor" },
  // Deck under the vergola and the boardwalk to the parking bays (sheet 6)
  { group: "gf-living", level: "gf", polygon: rect(0.23, Z_FRONT, 4.12, Z_VERGOLA_FRONT), bottom: -0.15, top: 0, material: "deck" },
  { group: "gf-living", level: "gf", polygon: rect(0.17, Z_VERGOLA_FRONT, 1.8, 21.1), bottom: -0.15, top: 0, material: "deck" },
  // Upper floor slab with a thin finish on top; the slab edge carries on under the east wall past the stair
  { group: "uf", level: "uf", polygon: ufFloor, bottom: L.gfWall, top: L.uf, material: "render" },
  { group: "uf", level: "uf", polygon: ufFloor, bottom: L.uf, top: L.uf + 0.003, material: "floor" },
  { group: "uf", level: "uf", polygon: rect(WIDTH - EXT, 4.8, WIDTH, 6.85), bottom: L.gfWall, top: L.uf, material: "render" },
  // Around the void over the living room the slab is only an edge beam under the walls, so the band runs on
  { group: "gf-living", level: "gf", polygon: rect(0, Z_MASTER_FRONT + 0.045, EXT, Z_FRONT), bottom: L.gfWall, top: L.uf, material: "render" },
  { group: "gf-living", level: "gf", polygon: rect(WIDTH - EXT, Z_MASTER_FRONT + 0.045, WIDTH, Z_FRONT), bottom: L.gfWall, top: L.uf, material: "render" },
  { group: "gf-living", level: "gf", polygon: rect(EXT, Z_FRONT - EXT, WIDTH - EXT, Z_FRONT), bottom: L.gfWall, top: L.uf, material: "render" },
];

// ---------------------------------------------------------------------------------------------------
// Roofs (sheets 8, 9, 11): the upper roof is Klip-lok at 3°, falling to the rear behind walls that hide it; the
// bed 1 roof is Klip-lok at 6°, guttered at the rear.

export const roofs: RoofPrism<GroupId>[] = [
  {
    group: "roof",
    level: "roof",
    axis: "z",
    x: [0, WIDTH],
    z: [Z_UF_REAR, Z_FRONT],
    base: L.ufWall,
    skillion: [L.roofFront - (Z_FRONT - Z_UF_REAR) * tan(3), L.roofFront],
    gutters: [],
  },
  {
    group: "gf-roof",
    level: "roof",
    axis: "z",
    x: [0, WIDTH],
    z: [0, Z_UF_REAR + c],
    base: L.gfWall,
    skillion: [2.7, 2.7 + Z_UF_REAR * tan(6)],
    gutters: ["x0"],
    extend: ["z1"],
    overhang: 0.15,
  },
];

// ---------------------------------------------------------------------------------------------------
// Blocks: stair, window shroud, vergola, joinery and furniture

function stairBlocks(): B[] {
  const out: B[] = [];
  const tread = (x0: number, x1: number, z0: number, z1: number, step: number): B => ({
    group: "gf-bed",
    level: "gf",
    min: [x0, 0, z0],
    max: [x1, RISE * step, z1],
    material: "floor",
  });
  const going = 0.25;
  for (let i = 0; i < 9; i++) out.push(tread(1.2 + going * i, 1.2 + going * (i + 1), 4.85, 5.85, i + 1));
  out.push(tread(3.45, xe - c, 4.85, 5.35, 10));
  out.push(tread(3.45, xe - c, 5.35, 5.85, 11));
  for (let i = 0; i < 4; i++) out.push(tread(3.235, xe - c, 5.85 + going * i, 5.85 + going * (i + 1), 12 + i));
  return out;
}

/** Feature window shroud around W-04, projecting 450 mm (sheets 7, 9), with plantation shutters behind it. */
function shroudBlocks(): B[] {
  const [x0, x1] = [0.23, 4.12];
  const [z0, z1] = [Z_FRONT, Z_FRONT + 0.45];
  const [y0, y1] = [3.2, 5.0];
  const t = 0.1;
  const out: B[] = [
    { group: "shroud", level: "uf", min: [x0, y0, z0], max: [x1, y0 + t, z1], material: "render" },
    { group: "shroud", level: "uf", min: [x0, y1 - t, z0], max: [x1, y1, z1], material: "render" },
    { group: "shroud", level: "uf", min: [x0, y0 + t, z0], max: [x0 + t, y1 - t, z1], material: "render" },
    { group: "shroud", level: "uf", min: [x1 - t, y0 + t, z0], max: [x1, y1 - t, z1], material: "render" },
  ];
  for (let y = 3.4; y < 4.82; y += 0.09) {
    out.push({ group: "shroud", level: "uf", min: [0.75, y, Z_FRONT + 0.03], max: [3.6, y + 0.05, Z_FRONT + 0.07], material: "interior" });
  }
  return out;
}

/** Steel louvred vergola over the deck (sheets 6, 9): perimeter frame and louvre blades, posts raked at 70°. */
const VERGOLA = { x: [0.23, 4.12] as [number, number], z: [Z_FRONT, Z_VERGOLA_FRONT] as [number, number] };
function vergolaBlocks(): B[] {
  const [x0, x1] = VERGOLA.x;
  const [z0, z1] = VERGOLA.z;
  const [y0, y1] = [L.vergolaSoffit, L.vergolaTop];
  const t = 0.1;
  const out: B[] = [
    { group: "vergola", level: "uf", min: [x0, y0, z1 - t], max: [x1, y1, z1], material: "fascia" },
    { group: "vergola", level: "uf", min: [x0, y0, z0], max: [x0 + t, y1, z1 - t], material: "fascia" },
    { group: "vergola", level: "uf", min: [x1 - t, y0, z0], max: [x1, y1, z1 - t], material: "fascia" },
  ];
  for (let z = z0 + 0.12; z < z1 - t - 0.1; z += 0.2) {
    out.push({ group: "vergola", level: "uf", min: [x0 + t, y0 + 0.04, z], max: [x1 - t, y0 + 0.06, z + 0.16], material: "steel" });
  }
  return out;
}

/** Raked posts: foot set back 0.93 m so the post leans out at 70° to the vergola's front corners (elevations 2, 4). */
const rakedPost = (x: number): { group: GroupId; level: "uf"; material: "frameDark"; from: Vec3; to: Vec3; size: number } => ({
  group: "vergola",
  level: "uf",
  material: "frameDark",
  from: [x, 0, Z_VERGOLA_FRONT - 0.05 - L.vergolaSoffit / tan(70)],
  to: [x, L.vergolaSoffit, Z_VERGOLA_FRONT - 0.05],
  size: 0.09,
});

export const blocks: B[] = [
  ...stairBlocks(),
  ...shroudBlocks(),
  ...vergolaBlocks(),

  // Ground floor joinery and furniture (positions scaled from sheet 6; indicative)
  { group: "gf-bed", level: "gf", min: [0.13, 0, 0.13], max: [0.6, 2.4, 1.37], material: "interior" },
  { group: "gf-bed", level: "gf", min: [1.6, 0, 0.17], max: [3.13, 0.55, 2.2], material: "bed" },
  { group: "gf-bed", level: "gf", min: [2.2, 0, 6.6], max: [4.23, 0.55, 8.13], material: "bed" },
  { group: "gf-living", level: "gf", min: [1.25, 0, 8.74], max: [3.6, 0.9, 9.35], material: "interior" },
  { group: "gf-living", level: "gf", min: [3.65, 0, 8.74], max: [4.23, 0.9, 11.0], material: "interior" },
  { group: "gf-living", level: "gf", min: [1.0, 0, 10.4], max: [2.0, 0.75, 11.9], material: "furniture" },
  { group: "gf-living", level: "gf", min: [0.13, 0, 12.4], max: [0.93, 0.78, 14.6], material: "soft" },
  { group: "gf-living", level: "gf", min: [1.9, 0, 13.0], max: [2.8, 0.42, 13.9], material: "furniture" },
  { group: "gf-living", level: "gf", min: [1.7, 0, 15.7], max: [2.7, 0.72, 16.5], material: "furniture" },

  // Upper floor (sheet 7; indicative)
  { group: "uf", level: "uf", min: [0.6, L.uf, 7.3], max: [2.63, L.uf + 0.55, 8.83], material: "bed" },
  { group: "uf", level: "uf", min: [0.13, L.uf, Z_UF_REAR + 0.13], max: [1.1, L.uf + 2.1, 3.75], material: "interior" },
];

/** Everything the model builder needs for the 3 Bed Villa. */
export const threeBedVilla: HouseData<GroupId> = {
  centre: { x: WIDTH / 2, z: 10.0 },
  ufSlab: L.gfWall,
  eaveOverhang: 0.15,
  walls,
  slabs,
  roofs,
  downpipes: [],
  blocks,
  posts: { group: "vergola", at: [], height: 0 },
  struts: [rakedPost(0.3), rakedPost(4.05)],
};

// ---------------------------------------------------------------------------------------------------
// Assembly view: separation directions (metres at full explode). Groups are presentation groups,
// not documented construction modules. The front is +z.

export const explode: Record<GroupId, Vec3> = {
  "gf-bed": [0, 0, -1.4],
  "gf-living": [0, 0, 0],
  "gf-roof": [0, 2.2, -1.4],
  uf: [0, 2.8, -0.6],
  shroud: [0, 2.8, 2.2],
  vergola: [0, 1.4, 2.6],
  roof: [0, 5.2, -0.6],
};
