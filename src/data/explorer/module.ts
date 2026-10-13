/**
 * Typical module (Rowland Street, Subiaco): source geometry for the 3D module explorer on /quality/.
 *
 * Sources (both in Design-Docs/, never published):
 *   - the modular solution proposal for Rowland Street (2026.03): steel profiles and spacings (4.1), the braced
 *     frame (4.3, 4.8), the floor, wall and ceiling build-ups (3.3), the eight systems and the exploded studio
 *     module the model recreates (2.1), service connections between modules (5.1 to 5.3)
 *   - the architectural DA set (rev A, 17/08/2025): 3.0 m floor to floor (short section), apartment bays of
 *     6.7 to 6.9 m by about 7.4 m (level plans), a fan coil unit in each apartment and condensers and hot water
 *     units on the roof (level 2 and level 6 plans)
 * The module's size is indicative (half an apartment bay, 7.4 m long, 2.95 m high); no module dimensions are
 * documented. Window, door, fit-out and service positions are illustrative.
 *
 * Coordinates are metres: x across the module (0 = the outer face of the west frame), z along it (0 = the window
 * end, increasing towards the entry), y up from the underside of the floor frame.
 */

export type Vec3 = [x: number, y: number, z: number];

/** Selectable systems, in the order of the part list. */
export type GroupId =
  | "structure"
  | "floor"
  | "walls"
  | "ceiling"
  | "electrical"
  | "hvac"
  | "plumbing"
  | "smart"
  | "bathroom"
  | "joinery"
  | "furniture";

/** Pieces that separate on their own within a system. */
export type PartId =
  | "floor-base"
  | "floor-insulation"
  | "floor-deck"
  | `${"wall-west" | "wall-east" | "wall-front" | "wall-back"}-${"lining" | "frame" | "skin"}`
  | "ceiling-lining"
  | "ceiling-insulation"
  | "ceiling-deck";

export type MaterialKey =
  | "steel"
  | "galv"
  | "rockwool"
  | "plasterboard"
  | "finishBoard"
  | "fibreCement"
  | "membrane"
  | "vapour"
  | "batten"
  | "cladding"
  | "roofDeck"
  | "vinyl"
  | "screed"
  | "glass"
  | "frameDark"
  | "door"
  | "podShell"
  | "tile"
  | "porcelain"
  | "chrome"
  | "oak"
  | "joineryWhite"
  | "stone"
  | "appliance"
  | "fabric"
  | "linen"
  | "throw"
  | "rug"
  | "conduit"
  | "fitting"
  | "coldWater"
  | "hotWater"
  | "waste"
  | "copper"
  | "duct"
  | "unit"
  | "panel";

export const MODULE = { width: 3.4, length: 7.4, height: 2.95 };

/** Steel profiles in metres (proposal 4.1). Depth is vertical for beams and joists. */
export const PROFILES = {
  column: 0.15, // RHS 150×150×6, at the corners and mid-length on both long sides
  floorBeamLong: { width: 0.1, depth: 0.25 }, // RHS 250×100×5
  beam: { width: 0.1, depth: 0.15 }, // RHS 150×100×4: floor beams at the ends, and every roof beam
  floorJoist: { depth: 0.16, flange: 0.06, spacing: 0.4 }, // C160×60×20×2.0 at 400 mm
  roofJoist: { depth: 0.14, flange: 0.05, spacing: 1.2 }, // C140×50×20×2.0 at 1200 mm
  brace: { width: 0.08, thickness: 0.012 }, // indicative flat bar; the proposal shows X-bracing, not its size
  stud: { width: 0.075, depth: 0.15, spacing: 0.6 }, // 150 light-gauge studs (proposal 3.3); width and spacing indicative
};

/** Layer thicknesses in metres (proposal 3.3). Very thin sheets are drawn at a visible minimum. */
export const FLOOR = {
  baseSheet: 0.0008, // galvanised steel sheet
  insulation: 0.1, // rock wool between the joists
  membrane: 0.00035, // waterproof breathable membrane
  board: 0.024, // fibre cement board
  screed: 0.01, // gypsum self-levelling compound
  vinyl: 0.006, // SPC rigid-core vinyl
};

export const WALL = {
  finish: 0.004, // decorative finish board
  plasterboard: 0.013, // fire-rated
  vapour: 0.00035, // PE vapour barrier
  insulation: 0.125, // rock wool between the studs
  board: 0.009, // fibre cement
  membrane: 0.00035, // breathable membrane, fixed on site (proposal drawing; its table puts it inside the board)
  batten: 0.025, // keel (thickness indicative), fixed on site
  cladding: 0.002, // aluminium, fixed on site
};

export const CEILING = {
  deck: 0.0016, // corrugated steel
  insulation: 0.1, // rock wool
  cavity: 0.05,
  plasterboard: 0.013, // fire-rated
};

/** Openings, in wall-local metres: span along the wall and sill/head above the frame underside. */
export const WINDOW = { span: [0.55, 2.85] as [number, number], sill: 0.8, head: 2.45 }; // window end (z = 0)
export const DOOR = { span: [2.2, 3.1] as [number, number], head: 2.39 }; // entry end (z = length)

/** Integral bathroom pod, inside the entry end on the west side, door facing east. */
export const POD = { x: [0.18, 1.82] as [number, number], z: [5.3, 7.22] as [number, number], height: 2.2, wall: 0.04, door: [5.45, 6.2] as [number, number] };

export interface Block {
  group: GroupId;
  material: MaterialKey;
  min: Vec3;
  max: Vec3;
  /** Corner radius for soft furniture and joinery. */
  radius?: number;
}

const FFL = 0.29; // finished floor level above the frame underside

/** Fit-out, set out from the proposal's studio module (2.1) and interior images (3.4). */
export const blocks: Block[] = [
  // Kitchen run on the west wall: base cabinets, benchtop, tall pantry and fridge, overhead cupboards
  { group: "joinery", material: "joineryWhite", min: [0.18, FFL + 0.1, 3.45], max: [0.76, FFL + 0.87, 4.65] },
  { group: "joinery", material: "oak", min: [0.2, FFL, 3.47], max: [0.72, FFL + 0.1, 4.63] },
  { group: "joinery", material: "stone", min: [0.18, FFL + 0.87, 3.43], max: [0.79, FFL + 0.9, 4.67] },
  { group: "joinery", material: "appliance", min: [0.3, FFL + 0.9, 3.65], max: [0.62, FFL + 0.905, 4.0] },
  { group: "joinery", material: "chrome", min: [0.32, FFL + 0.9, 4.2], max: [0.6, FFL + 0.91, 4.5] },
  { group: "joinery", material: "oak", min: [0.18, FFL, 4.67], max: [0.78, FFL + 2.15, 5.28] },
  { group: "joinery", material: "joineryWhite", min: [0.18, FFL + 1.5, 3.45], max: [0.53, FFL + 2.15, 4.65] },
  // Wardrobe on the east wall, opposite the bathroom
  { group: "joinery", material: "oak", min: [2.62, FFL, 4.35], max: [3.22, FFL + 2.15, 5.55] },
  // Bed (queen) with its head on the west wall, bedside tables and a timber bedhead panel
  { group: "furniture", material: "oak", min: [0.18, FFL + 0.15, 1.5], max: [0.24, FFL + 1.05, 3.3] },
  { group: "furniture", material: "fabric", min: [0.25, FFL, 1.62], max: [2.28, FFL + 0.32, 3.18], radius: 0.03 },
  { group: "furniture", material: "linen", min: [0.27, FFL + 0.32, 1.64], max: [2.26, FFL + 0.52, 3.16], radius: 0.06 },
  { group: "furniture", material: "throw", min: [1.55, FFL + 0.5, 1.6], max: [2.3, FFL + 0.55, 3.2], radius: 0.02 },
  { group: "furniture", material: "linen", min: [0.3, FFL + 0.5, 1.75], max: [0.66, FFL + 0.64, 2.35], radius: 0.06 },
  { group: "furniture", material: "linen", min: [0.3, FFL + 0.5, 2.45], max: [0.66, FFL + 0.64, 3.05], radius: 0.06 },
  { group: "furniture", material: "oak", min: [0.25, FFL, 1.06], max: [0.7, FFL + 0.5, 1.5], radius: 0.01 },
  { group: "furniture", material: "oak", min: [0.25, FFL, 3.3], max: [0.7, FFL + 0.5, 3.74], radius: 0.01 },
  // Armchair by the window with its back to the east wall, facing into the room, and a side table beside it
  { group: "furniture", material: "fabric", min: [2.42, FFL, 0.5], max: [3.17, FFL + 0.42, 1.25], radius: 0.06 },
  { group: "furniture", material: "fabric", min: [3.03, FFL + 0.42, 0.5], max: [3.17, FFL + 0.85, 1.25], radius: 0.05 },
  { group: "furniture", material: "fabric", min: [2.42, FFL + 0.42, 0.5], max: [3.03, FFL + 0.62, 0.62], radius: 0.04 },
  { group: "furniture", material: "fabric", min: [2.42, FFL + 0.42, 1.13], max: [3.03, FFL + 0.62, 1.25], radius: 0.04 },
  { group: "furniture", material: "oak", min: [2.7, FFL, 1.35], max: [3.1, FFL + 0.48, 1.75], radius: 0.02 },
  { group: "furniture", material: "rug", min: [0.9, FFL, 0.4], max: [3.1, FFL + 0.008, 3.6] },
];

/** Service runs: straight pipes and conduits as polylines, radius in metres. */
export interface Run {
  group: GroupId;
  material: MaterialKey;
  radius: number;
  points: Vec3[];
}

const CAV = 2.78; // ceiling cavity, between the lining and the roof joists
const UNDERFLOOR = 0.17; // within the floor joist depth

export const runs: Run[] = [
  // Electrical: switchboard by the entry up into the ceiling cavity, along the module to the lights, and
  // down the walls to the power points; the circuits meet the next module's at the joint (proposal 5.2)
  { group: "electrical", material: "conduit", radius: 0.012, points: [[3.3, 1.75, 6.75], [3.3, CAV, 6.75], [1.7, CAV, 6.75]] },
  { group: "electrical", material: "conduit", radius: 0.012, points: [[2.5, CAV, 6.75], [2.5, CAV, 0.6]] },
  { group: "electrical", material: "conduit", radius: 0.012, points: [[2.5, CAV, 2.4], [0.1, CAV, 2.4], [0.1, FFL + 0.3, 2.4]] },
  { group: "electrical", material: "conduit", radius: 0.012, points: [[2.5, CAV, 4.0], [0.1, CAV, 4.0], [0.1, FFL + 1.1, 4.0]] },
  { group: "electrical", material: "conduit", radius: 0.012, points: [[2.5, CAV, 1.0], [3.3, CAV, 1.0], [3.3, FFL + 0.3, 1.0]] },
  { group: "electrical", material: "conduit", radius: 0.012, points: [[3.3, CAV, 6.75], [3.3, CAV, 7.3], [3.42, CAV, 7.3]] },
  // Water: cold and hot from the connection point at the entry end to the bathroom and the kitchen
  { group: "plumbing", material: "coldWater", radius: 0.011, points: [[1.95, UNDERFLOOR, 7.3], [1.95, UNDERFLOOR, 5.0], [0.5, UNDERFLOOR, 5.0], [0.5, UNDERFLOOR, 4.1], [0.5, FFL + 0.5, 4.1]] },
  { group: "plumbing", material: "hotWater", radius: 0.011, points: [[2.02, UNDERFLOOR, 7.3], [2.02, UNDERFLOOR, 5.08], [0.58, UNDERFLOOR, 5.08], [0.58, UNDERFLOOR, 4.18], [0.58, FFL + 0.5, 4.18]] },
  { group: "plumbing", material: "coldWater", radius: 0.011, points: [[1.95, UNDERFLOOR, 6.4], [1.2, UNDERFLOOR, 6.4], [1.2, FFL + 0.05, 6.4]] },
  { group: "plumbing", material: "hotWater", radius: 0.011, points: [[2.02, UNDERFLOOR, 6.3], [1.3, UNDERFLOOR, 6.3], [1.3, FFL + 0.05, 6.3]] },
  // Drainage: waste from the bathroom and the kitchen sink to the same connection point
  { group: "plumbing", material: "waste", radius: 0.045, points: [[0.6, FFL + 0.02, 6.9], [0.6, 0.15, 6.9], [1.75, 0.15, 6.9], [1.75, 0.15, 7.3]] },
  { group: "plumbing", material: "waste", radius: 0.025, points: [[0.45, FFL + 0.4, 4.35], [0.45, 0.15, 4.35], [1.6, 0.15, 4.35], [1.6, 0.15, 6.9]] },
  // Heating and cooling: refrigerant pair from the fan coil unit up to the roof condensers, and its supply duct
  { group: "hvac", material: "copper", radius: 0.008, points: [[0.5, 2.55, 6.15], [0.5, 2.55, 7.1], [0.5, MODULE.height + 0.06, 7.1]] },
  { group: "hvac", material: "copper", radius: 0.006, points: [[0.56, 2.55, 6.15], [0.56, 2.55, 7.05], [0.56, MODULE.height + 0.06, 7.05]] },
  { group: "hvac", material: "duct", radius: 0.07, points: [[1.0, 2.62, 5.4], [1.0, 2.62, 4.97]] },
];

/** Bulkhead over the bathroom pod and the end of the kitchen, which hides the fan coil unit and its duct. */
export const BULKHEAD = { x: [0.17, 1.82] as [number, number], z: [4.95, 7.23] as [number, number], underside: 2.5 };

/** Service fittings: boards, units, outlets and fixtures, as boxes. */
export const fittings: Block[] = [
  { group: "electrical", material: "panel", min: [3.13, 1.45, 6.55], max: [3.22, 1.95, 6.95] },
  { group: "electrical", material: "fitting", min: [0.18, FFL + 0.25, 2.33], max: [0.2, FFL + 0.33, 2.47] },
  { group: "electrical", material: "fitting", min: [0.18, FFL + 1.05, 3.93], max: [0.2, FFL + 1.13, 4.07] },
  { group: "electrical", material: "fitting", min: [3.2, FFL + 0.25, 0.93], max: [3.22, FFL + 0.33, 1.07] },
  { group: "smart", material: "panel", min: [3.2, 1.25, 7.0], max: [3.22, 1.37, 7.12] },
  { group: "smart", material: "fitting", min: [1.65, 2.7, 3.0], max: [1.75, 2.74, 3.1] },
  { group: "smart", material: "panel", min: [2.9, 1.45, 7.28], max: [2.97, 1.6, 7.32] },
  { group: "hvac", material: "unit", min: [0.3, 2.52, 5.4], max: [1.3, 2.73, 6.15] },
  { group: "hvac", material: "duct", min: [0.75, 2.56, 4.94], max: [1.25, 2.68, 4.955] },
  { group: "plumbing", material: "fitting", min: [1.7, 0.05, 7.22], max: [2.1, 0.27, 7.38] },
];
