/**
 * Plan records shared by the house explorers (Seashells Jurien Bay villas). Each house module describes its walls,
 * slabs, roofs and fittings in plan metres and exports a HouseData; src/lib/explorer/build-model.ts turns that into
 * meshes. Coordinates: x and z in plan, y up from ground floor level. Each house sets its own plan origin.
 */

export type Vec2 = [x: number, z: number];
export type Vec3 = [x: number, y: number, z: number];

/** Visibility tier used by the floor controls ("gf", "uf", "roof" and so on); each scene ranks its own. */
export type Level = string;

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
  | "trunk"
  | "timberClad"
  | "darkClad"
  /** Kitchen and robe joinery (the Cloud Homes design tool recolours it) */
  | "joinery"
  // Interiors and services detail (Cloud Homes)
  | "benchtop"
  | "appliance"
  | "stainless"
  | "ceramic"
  | "fabric"
  | "linen"
  | "rug"
  | "gap"
  | "unit"
  | "grille"
  | "tile"
  | "led"
  | "floorTile"
  | "mirror";

export type OpeningKind = "slider" | "window" | "door" | "garage-door" | "opening";

export interface Opening {
  /** Start and end along the wall, in the plan coordinate that varies along it (x or z). */
  span: [number, number];
  /** Absolute heights. Default sill = wall base, head = base + 2.1 (interior doorways). */
  sill?: number;
  head?: number;
  kind?: OpeningKind;
}

export interface Wall<G extends string = string> {
  group: G;
  level: Level;
  /** Separates on its own within its group, by the scene's explode[part]. */
  part?: string;
  a: Vec2;
  b: Vec2;
  base: number;
  top: number;
  finish: MaterialKey;
  thickness?: number;
  openings?: Opening[];
}

export interface Slab<G extends string = string> {
  group: G;
  level: Level;
  /** Separates on its own within its group, by the scene's explode[part]. */
  part?: string;
  polygon: Vec2[];
  bottom: number;
  top: number;
  material: MaterialKey;
  /** Circular cut-out, e.g. the spiral stair opening in the roof terrace. */
  hole?: { centre: Vec2; radius: number };
}

export interface Block<G extends string = string> {
  group: G | null;
  level: Level;
  /** Separates on its own within its group, by the scene's explode[part]. */
  part?: string;
  min: Vec3;
  max: Vec3;
  material: MaterialKey;
}

export interface RoofPrism<G extends string = string> {
  group: G;
  level: Level;
  x: [number, number];
  z: [number, number];
  base: number;
  /**
   * Which plan axis the roof falls across. "x" (default): ridge and skillion heights vary with x, and gutters and
   * eaves are named x0/x1, gable ends z0/z1. "z": the same with the axes swapped, so x0/x1 name the z[0]/z[1] eaves
   * and z0/z1 the x[0]/x[1] gable ends.
   */
  axis?: "x" | "z";
  /** Ridge runs across the fall. Left/right pitches as rise per metre. `x` is the ridge position on the fall axis. */
  ridge?: { x: number; y: number; pitchLeft: number; pitchRight: number };
  /** Single-pitch (skillion) roof instead of a ridge: eave heights at the start and end of the fall axis. */
  skillion?: [number, number];
  /** Finish for the gable ends and the wall between ceiling and eave (default: horizontal cladding). */
  capFinish?: MaterialKey;
  /** Eaves that carry a gutter (default: both eaves, or the low side of a skillion). Guttered eaves overhang the wall. */
  gutters?: ("x0" | "x1")[];
  /** Gable ends that overhang the wall. Left flush where another roof or the terrace abuts. */
  extend?: ("z0" | "z1")[];
  /** Overhang past x/z for guttered eaves and extended gable ends (default: the house's eaveOverhang). */
  overhang?: number;
}

/**
 * Squareline downpipe on an x-facing wall, from the gutter above to the ground. Split at the upper floor so each half
 * follows its wing; where the upper wall face sits in or out from the lower one, the pipe offsets across the step.
 */
export interface Downpipe<G extends string = string> {
  z: number;
  /** Which way the wall faces: -1 towards x = 0, 1 away from it. */
  side: -1 | 1;
  /** Outer face of the ground-floor wall (and of the upper-floor wall, when different). */
  gfFace: number;
  ufFace?: number;
  gf: G;
  uf?: G;
}

export interface HouseData<G extends string = string> {
  /** Plan point placed at the scene origin. */
  centre: { x: number; z: number };
  /** Underside of the upper floor slab (top of ground-floor walls). */
  ufSlab: number;
  /** Default roof overhang past the roof's x/z extents. */
  eaveOverhang: number;
  walls: Wall<G>[];
  slabs: Slab<G>[];
  roofs: RoofPrism<G>[];
  downpipes: Downpipe<G>[];
  blocks: Block<G>[];
  /** Slender round posts from the ground to `height` (verandah posts under a balcony). */
  posts: { group: G; at: Vec2[]; height: number };
  /** Solar panels laid on a ridge roof's right-hand (x1) plane. */
  solar?: { ridge: { x: number; y: number; pitchRight: number }; arrays: { x: [number, number]; z: [number, number]; cols: number; rows: number }[] };
  spiral?: { group: G; centre: Vec2; radius: number; from: number; to: number; risers: number; /** Radians; where the first tread points. */ start?: number };
  /** Straight internal stair rising along +z (solid treads from the floor). */
  internalStair?: { group: G; x: [number, number]; zStart: number; going: number; risers: number; to: number };
  pergola?: { group: G; posts: Vec2[]; beamZ: number[]; x: [number, number]; z: [number, number]; rafterSpacing: number; base: number; beam: number; top: number };
  tree?: { at: Vec2; height: number; canopy: number };
  /** Round parts: taps, tanks, fans, cables. `axis` is the direction of the cylinder's length (default "y"). */
  cylinders?: { group: G; level: Level; material: MaterialKey; centre: Vec3; radius: number; length: number; axis?: "x" | "y" | "z" }[];
  /** Boxes with rounded edges (appliance casings). */
  roundedBoxes?: { group: G; level: Level; material: MaterialKey; min: Vec3; max: Vec3; radius: number }[];
  /** Rings, e.g. a fan guard. `axis` is the direction the ring faces (default "z"). */
  tori?: { group: G; level: Level; material: MaterialKey; centre: Vec3; radius: number; tube: number; axis?: "x" | "y" | "z"; arc?: number }[];
  /** Straight square members between two points, e.g. raked steel posts. */
  struts?: { group: G; level: Level; material: MaterialKey; from: Vec3; to: Vec3; size: number }[];
}

// ---------------------------------------------------------------------------------------------------
// Shared fittings

/** Glass balustrade with a warm metal top rail. */
export const balustrade = <G extends string>(group: G, level: Level, min: Vec3, max: Vec3): Block<G>[] => [
  { group, level, min, max: [max[0], max[1] - 0.04, max[2]], material: "glass" },
  { group, level, min: [min[0] - 0.02, max[1] - 0.04, min[2] - 0.02], max: [max[0] + 0.02, max[1] + 0.01, max[2] + 0.02], material: "rail" },
];

/** Privacy screen of dark vertical battens with a capping rail, along z at x. Batten size indicative. */
export function slatScreen<G extends string>(group: G, level: Level, x: number, floor: number, z0: number, z1: number, height = 1.6): Block<G>[] {
  const batten = 0.04;
  const pitch = 0.11;
  const count = Math.floor((z1 - z0 - batten) / pitch) + 1;
  const inset = (z1 - z0 - batten - (count - 1) * pitch) / 2;
  const top = floor + height;
  return [
    ...Array.from({ length: count }, (_, i): Block<G> => {
      const z = z0 + inset + i * pitch;
      return { group, level, min: [x - 0.03, floor, z], max: [x + 0.03, top - 0.04, z + batten], material: "screen" };
    }),
    { group, level, min: [x - 0.04, top - 0.04, z0], max: [x + 0.04, top, z1], material: "screen" },
  ];
}

/** Planter: a pot with a rounded mass of foliage. */
export const pot = <G extends string>(group: G, level: Level, x: number, y: number, z: number, size = 1): Block<G>[] => [
  { group, level, min: [x - 0.2 * size, y, z - 0.2 * size], max: [x + 0.2 * size, y + 0.45 * size, z + 0.2 * size], material: "pot" },
  { group, level, min: [x - 0.32 * size, y + 0.45 * size, z - 0.32 * size], max: [x + 0.32 * size, y + 1.25 * size, z + 0.32 * size], material: "foliage" },
];
