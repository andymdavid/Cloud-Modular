/**
 * Seashells Jurien Bay, Short Stay 2 Bed Villa: source geometry for its 3D explorer.
 *
 * Source: Kellett Design Group, "1 Casuarina Crescent, Jurien Bay", Short Stay 2 Bed Villa, building permit set
 * rev C05, printed 10/04/2026. Sheets: 5 GF plan, 6 roof plan, 7 elevations, 9 section, 12 window and door
 * schedule, 13 3D perspectives. Figured dimensions are used throughout; anything scaled or assumed is listed in
 * `assumptions` (./two-bed-villa-info.ts). The set predates the modular shop drawings, so it is used for layout
 * and finishes only.
 *
 * Single storey on the same 4.35 × 14.95 m footprint as the 3 Bed Villa, with the same plan convention:
 *   x  across the villa, 0 = the outer face of the boundary wall (west), increasing east
 *   z  rear to front, 0 = the rear wall, increasing towards the road
 *   y  height above floor level (GF FL 0)
 *
 * External walls are 115 mm and internal walls 90 mm (sheet 5 legend). Wall records are centrelines.
 */

import type { Block, HouseData, Opening, RoofPrism, Slab, Vec2, Vec3, Wall } from "./house";

export type GroupId = "gf-bed" | "gf-living" | "vergola" | "roof";

type W = Wall<GroupId>;
type B = Block<GroupId>;

// ---------------------------------------------------------------------------------------------------
// Levels (sheets 7 and 9)

export const LEVELS = {
  gf: 0,
  /** Wall pitching height */
  wall: 2.4,
  /** Hidden 2° roof: 2.7 at the rear gutter (RL 5.900), rising to the front */
  roofRear: 2.7,
  /** Top of the walls that hide the roof at the front (RL 6.450) */
  parapet: 3.25,
  vergolaSoffit: 2.55,
  vergolaTop: 2.7,
} as const;

const L = LEVELS;
const tan = (deg: number) => Math.tan((deg * Math.PI) / 180);

const EXT = 0.115;
const c = EXT / 2;
const WIDTH = 4.35;
const Z_FRONT = 14.95;
const Z_VERGOLA_FRONT = 17.395;
const ROOF_FRONT = L.roofRear + Z_FRONT * tan(2);

const xw = c;
const xe = WIDTH - c;

const ext = { level: "gf", base: L.gf, top: L.wall, finish: "cladding", thickness: EXT } as const;
const int = { level: "gf", base: L.gf, top: L.wall, finish: "interior", thickness: 0.09 } as const;
const door = (u0: number, u1: number): Opening => ({ span: [u0, u1], head: 2.04, kind: "door" });
/** Window by sill and head (sheet 12 sizes, elevation 4 heights). */
const win = (u0: number, u1: number, sill: number, head: number, kind: Opening["kind"] = "window"): Opening => ({ span: [u0, u1], sill, head, kind });

// ---------------------------------------------------------------------------------------------------
// Walls (sheet 5)

export const walls: W[] = [
  // Rear: bed 1, bath and laundry, powder room, robe and bed 2 along the hall (W-01 to W-04)
  { group: "gf-bed", ...ext, a: [xw, c], b: [xe, c] },
  { group: "gf-bed", ...ext, a: [xw, c], b: [xw, 9.38], openings: [win(5.555, 7.555, 1.6, 2.15)] },
  {
    group: "gf-bed",
    ...ext,
    a: [xe, c],
    b: [xe, 9.38],
    openings: [win(0.365, 2.665, 1.55, 2.15, "slider"), win(3.685, 4.585, 1.25, 2.15), win(6.98, 8.98, 1.6, 2.15, "slider")],
  },
  { group: "gf-bed", ...int, a: [xw, 2.935], b: [xe, 2.935], openings: [door(0.2, 1.02)] },
  { group: "gf-bed", ...int, a: [1.16, 2.935], b: [1.16, 9.38], openings: [door(3.3, 4.02), door(5.6, 6.32), door(6.75, 7.57)] },
  { group: "gf-bed", ...int, a: [1.16, 5.29], b: [xe, 5.29] },
  { group: "gf-bed", ...int, a: [2.99, 5.29], b: [2.99, 6.58] },
  { group: "gf-bed", ...int, a: [1.16, 6.58], b: [xe, 6.58], openings: [{ span: [3.035, 4.235], head: 2.4 }] },
  { group: "gf-bed", ...int, a: [1.16, 9.38], b: [xe, 9.38] },

  // Front: living, dining and kitchen, opening onto the vergola through SD-01 (W-05 on the west wall)
  { group: "gf-living", ...ext, a: [xw, 9.38], b: [xw, Z_FRONT - c], openings: [win(10.125, 12.125, 1.6, 2.15)] },
  { group: "gf-living", ...ext, a: [xe, 9.38], b: [xe, Z_FRONT - c] },
  { group: "gf-living", ...ext, a: [xw, Z_FRONT - c], b: [xe, Z_FRONT - c], openings: [win(0.715, 3.635, 0, 2.15, "slider")] },
];

// ---------------------------------------------------------------------------------------------------
// Floors

const rect = (x0: number, z0: number, x1: number, z1: number): Vec2[] => [
  [x0, z0],
  [x1, z0],
  [x1, z1],
  [x0, z1],
];

export const slabs: Slab<GroupId>[] = [
  { group: "gf-bed", level: "gf", polygon: rect(0, 0, WIDTH, 9.38), bottom: -0.2, top: 0, material: "floor" },
  { group: "gf-living", level: "gf", polygon: rect(0, 9.38, WIDTH, Z_FRONT), bottom: -0.2, top: 0, material: "floor" },
  // Deck under the vergola and the boardwalk to the parking bays (sheet 5)
  { group: "gf-living", level: "gf", polygon: rect(0.23, Z_FRONT, 4.12, Z_VERGOLA_FRONT), bottom: -0.15, top: 0, material: "deck" },
  { group: "gf-living", level: "gf", polygon: rect(0.17, Z_VERGOLA_FRONT, 1.8, 21.1), bottom: -0.15, top: 0, material: "deck" },
];

// ---------------------------------------------------------------------------------------------------
// Roof (sheets 6, 7, 9): Klip-lok at 2°, falling to a gutter at the rear, hidden behind the side and front walls

export const roofs: RoofPrism<GroupId>[] = [
  {
    group: "roof",
    level: "roof",
    axis: "z",
    x: [EXT, WIDTH - EXT],
    z: [0, Z_FRONT - EXT],
    base: L.wall,
    skillion: [L.roofRear, ROOF_FRONT - EXT * tan(2)],
    gutters: ["x0"],
    overhang: 0.15,
  },
  // Side walls carried up past the roof to hide it, with a sloping capping (elevations 2 and 4)
  ...([0, WIDTH - EXT] as const).map(
    (x0): RoofPrism<GroupId> => ({
      group: "roof",
      level: "roof",
      axis: "z",
      x: [x0, x0 + EXT],
      z: [0, Z_FRONT],
      base: L.wall,
      skillion: [L.roofRear + 0.08, L.parapet],
      gutters: [],
    }),
  ),
];

// ---------------------------------------------------------------------------------------------------
// Blocks: front parapet, vergola, joinery and furniture

/** Steel louvred vergola over the deck (sheets 5, 7): perimeter frame and louvre blades. */
function vergolaBlocks(): B[] {
  const [x0, x1] = [0.23, 4.12];
  const [z0, z1] = [Z_FRONT, Z_VERGOLA_FRONT];
  const [y0, y1] = [L.vergolaSoffit, L.vergolaTop];
  const t = 0.1;
  const out: B[] = [
    { group: "vergola", level: "gf", min: [x0, y0, z1 - t], max: [x1, y1, z1], material: "fascia" },
    { group: "vergola", level: "gf", min: [x0, y0, z0], max: [x0 + t, y1, z1 - t], material: "fascia" },
    { group: "vergola", level: "gf", min: [x1 - t, y0, z0], max: [x1, y1, z1 - t], material: "fascia" },
  ];
  for (let z = z0 + 0.12; z < z1 - t - 0.1; z += 0.2) {
    out.push({ group: "vergola", level: "gf", min: [x0 + t, y0 + 0.04, z], max: [x1 - t, y0 + 0.06, z + 0.16], material: "steel" });
  }
  return out;
}

/** Raked post leaning out at 70° to the vergola's front corner (elevations 2, 4). */
const rakedPost = (x: number) => ({
  group: "vergola" as const,
  level: "gf" as const,
  material: "frameDark" as const,
  from: [x, 0, Z_VERGOLA_FRONT - 0.05 - L.vergolaSoffit / tan(70)] as Vec3,
  to: [x, L.vergolaSoffit, Z_VERGOLA_FRONT - 0.05] as Vec3,
  size: 0.09,
});

export const blocks: B[] = [
  // Front wall carried up to hide the roof
  { group: "roof", level: "roof", min: [EXT, L.wall, Z_FRONT - EXT], max: [WIDTH - EXT, L.parapet, Z_FRONT], material: "cladding" },
  ...vergolaBlocks(),

  // Joinery and furniture (positions scaled from sheet 5; indicative)
  { group: "gf-bed", level: "gf", min: [0.13, 0, 0.13], max: [0.62, 2.4, 1.6], material: "interior" },
  { group: "gf-bed", level: "gf", min: [1.6, 0, 0.17], max: [3.13, 0.55, 2.2], material: "bed" },
  { group: "gf-bed", level: "gf", min: [3.05, 0, 5.34], max: [4.23, 2.4, 5.95], material: "interior" },
  { group: "gf-bed", level: "gf", min: [2.2, 0, 7.4], max: [4.23, 0.55, 8.93], material: "bed" },
  { group: "gf-living", level: "gf", min: [1.25, 0, 9.43], max: [3.6, 0.9, 10.0], material: "interior" },
  { group: "gf-living", level: "gf", min: [3.65, 0, 9.43], max: [4.23, 0.9, 11.9], material: "interior" },
  { group: "gf-living", level: "gf", min: [1.0, 0, 10.9], max: [2.0, 0.75, 12.2], material: "furniture" },
  { group: "gf-living", level: "gf", min: [0.13, 0, 12.6], max: [0.93, 0.78, 14.6], material: "soft" },
  { group: "gf-living", level: "gf", min: [1.9, 0, 13.0], max: [2.8, 0.42, 13.9], material: "furniture" },
  { group: "gf-living", level: "gf", min: [1.7, 0, 15.7], max: [2.7, 0.72, 16.5], material: "furniture" },
];

/** Everything the model builder needs for the 2 Bed Villa. */
export const twoBedVilla: HouseData<GroupId> = {
  centre: { x: WIDTH / 2, z: 10.0 },
  ufSlab: L.wall,
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
  vergola: [0, 1.2, 2.4],
  roof: [0, 3.2, -0.6],
};
