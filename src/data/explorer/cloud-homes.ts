/**
 * Cloud Homes: source geometry for the three homes in the "Design yours" tool (/cloud-homes/design/).
 *
 * Source: Kellett Design Group, "1 Casuarina Crescent, Jurien Bay", building permit sets printed 21/10/2026:
 *   1 Bed   Short Stay 1 Bed Villa, rev C07 (sheets 5 GF plan, 12 3D perspectives)
 *   2 Bed   Short Stay 2 Bed Villa, rev C09 (sheets 5 GF plan, 13 3D perspectives)
 *   4 Bed   Type C 4 Bed Option, rev C17 (sheets 6 GF plan, 7 UF plan, 16 3D perspectives)
 * Plan positions use the figured dimensions on those sheets. The sets supplied have no elevations or sections, so
 * heights, the hidden roofs and the front frame follow the earlier Seashells sets already modelled on the site
 * (2 Bed rev C05, 3 Bed rev C16), and are indicative. The drawings note "Dimensions to be confirmed in factory".
 *
 * Coordinates, as the plans are drawn:
 *   x  across the home, 0 = the outer face of the west wall, increasing east (the vergola side)
 *   z  rear to front, 0 = the rear wall, increasing towards the front
 *   y  height above ground floor level (GF FL 0)
 * Wall records are centrelines.
 */

import type { Block, HouseData, Opening, RoofPrism, Slab, Vec2, Vec3, Wall } from "./house";
import {
  acUnit,
  bathroom,
  batteryAndInverter,
  bed,
  collect,
  dining,
  downpipe,
  evCharger,
  Fit,
  heatPumpHotWater,
  kitchen,
  lounge,
  powderRoom,
  subBoard,
  tallUnit,
} from "./cloud-home-fittings";

export type CloudHomeId = "one-bed" | "two-bed" | "four-bed";
export type GroupId = "bedrooms" | "living" | "upper" | "vergola" | "roof" | "frame" | "solar" | "battery" | "services" | "stone" | "access";

type W = Wall<GroupId>;
type B = Block<GroupId>;

const tan = (deg: number) => Math.tan((deg * Math.PI) / 180);
const EXT = 0.115;
const INT = 0.09;
const c = EXT / 2;
const i2 = INT / 2;

/** Front frame: the side walls and a head band project 450 mm past the front wall (plans: 450 beyond the walls). */
const FRAME_DEPTH = 0.45;
const VERGOLA_WIDTH = 1.65;

const LV = {
  gf: 0,
  gfWall: 2.4,
  /** Single storey: hidden 2° roof, 2.7 at the rear gutter, behind walls carried up to 3.25 */
  roofRear: 2.7,
  parapet: 3.25,
  /** Two storey (4 Bed): upper floor, upper wall height and the top of the walls hiding the 3° upper roof */
  uf: 2.7,
  ufWall: 4.948,
  roofFront: 5.95,
  vergolaSoffit: 2.55,
  vergolaTop: 2.7,
} as const;

const rect = (x0: number, z0: number, x1: number, z1: number): Vec2[] => [
  [x0, z0],
  [x1, z0],
  [x1, z1],
  [x0, z1],
];

const door = (u0: number, u1: number, floor = 0): Opening => ({ span: [u0, u1], sill: floor, head: floor + 2.04, kind: "door" });
const win = (u0: number, u1: number, sill: number, head: number, kind: Opening["kind"] = "window"): Opening => ({ span: [u0, u1], sill, head, kind });
/** Window by its schedule size (height × width), head at 2.15 above the floor. */
const sized = (u0: number, width: number, height: number, floor = 0, kind: Opening["kind"] = "window"): Opening =>
  win(u0, u0 + width, floor + 2.15 - height, floor + 2.15, kind);

// ---------------------------------------------------------------------------------------------------
// Shared pieces

interface Shell {
  width: number;
  front: number;
  /** Top of the walls at the front frame */
  frameTop: number;
}

/** The front frame: two side fins and a head band, 450 mm deep, around the front wall. */
function frameBlocks({ width, front, frameTop }: Shell, headBottom: number): B[] {
  const z1 = front + FRAME_DEPTH;
  return [
    { group: "frame", level: "roof", min: [0, 0, front], max: [EXT, frameTop, z1], material: "cladding" },
    { group: "frame", level: "roof", min: [width - EXT, 0, front], max: [width, frameTop, z1], material: "cladding" },
    { group: "frame", level: "roof", min: [EXT, headBottom, front], max: [width - EXT, frameTop, z1], material: "cladding" },
  ];
}

/** Steel louvred vergola on the east side, over a deck, with steel posts at the outer corners. */
function vergola(width: number, z0: number, z1: number): { blocks: B[]; slab: Slab<GroupId>; posts: Vec2[] } {
  const x0 = width;
  const x1 = width + VERGOLA_WIDTH - 0.09;
  const [y0, y1] = [LV.vergolaSoffit, LV.vergolaTop];
  const t = 0.1;
  const blocks: B[] = [
    { group: "vergola", level: "gf", min: [x1 - t, y0, z0], max: [x1, y1, z1], material: "fascia" },
    { group: "vergola", level: "gf", min: [x0, y0, z0], max: [x1 - t, y1, z0 + t], material: "fascia" },
    { group: "vergola", level: "gf", min: [x0, y0, z1 - t], max: [x1 - t, y1, z1], material: "fascia" },
  ];
  for (let x = x0 + 0.1; x < x1 - t - 0.1; x += 0.2) {
    blocks.push({ group: "vergola", level: "gf", min: [x, y0 + 0.04, z0 + t], max: [x + 0.16, y0 + 0.06, z1 - t], material: "steel" });
  }
  const p = 0.045;
  for (const z of [z0 + p, z1 - p]) {
    blocks.push({ group: "vergola", level: "gf", min: [x1 - 2 * p, 0, z - p], max: [x1, y0, z + p], material: "frameDark" });
  }
  return {
    blocks,
    slab: { group: "vergola", level: "gf", polygon: rect(width, z0, width + VERGOLA_WIDTH, z1), bottom: -0.15, top: -0.02, material: "deck" },
    posts: [],
  };
}

/** Solar panels laid in rows on a hidden skillion roof that rises `slope` (rise per metre) towards +z. */
function solarRows(x0: number, x1: number, z0: number, z1: number, yAt: (z: number) => number, cols: number): B[] {
  const out: B[] = [];
  const rowDepth = 1.05;
  const colWidth = (x1 - x0) / cols;
  for (let z = z0; z + rowDepth <= z1 + 1e-6; z += rowDepth + 0.04) {
    const y = yAt(z + rowDepth / 2) + 0.08;
    for (let i = 0; i < cols; i++) {
      out.push({
        group: "solar",
        level: "roof",
        min: [x0 + i * colWidth + 0.02, y, z],
        max: [x0 + (i + 1) * colWidth - 0.02, y + 0.04, z + rowDepth],
        material: "solar",
      });
    }
  }
  return out;
}

/**
 * Klip-Lok ribs (43 mm deep, sheets 12 of the earlier 3 Bed set) running down the fall of a skillion roof, as
 * members from the rear to the front edge. Rib spacing is indicative.
 */
function roofRibs(x0: number, x1: number, z0: number, z1: number, yAt: (z: number) => number) {
  const out: { group: GroupId; level: string; material: "roof"; from: Vec3; to: Vec3; size: number }[] = [];
  const pitch = 0.33;
  for (let x = x0 + pitch / 2; x < x1 - 0.05; x += pitch) {
    out.push({ group: "roof", level: "roof", material: "roof", from: [x, yAt(z0) + 0.015, z0], to: [x, yAt(z1) + 0.015, z1], size: 0.03 });
  }
  return out;
}

/**
 * Services where the plans place them: the battery and inverter beside the sub-board on the rear wall, the heat pump
 * hot water unit on its slab, the air conditioning unit (1 and 2 Bed), downpipes at the rear corners and the
 * electric vehicle charger on the east wall near the front. The battery is a design choice, in its own group.
 */
function services(width: number, front: number, top: number, ac: boolean) {
  const fits = [
    subBoard<GroupId>("services", 0.95),
    heatPumpHotWater<GroupId>("services", 1.85),
    downpipe<GroupId>("services", 0.2, top),
    downpipe<GroupId>("services", width - 0.2, top),
    evCharger<GroupId>("services", width, front - 0.55),
    batteryAndInverter<GroupId>("battery", 0.25),
  ];
  if (ac) fits.push(acUnit<GroupId>("services", width - 0.85));
  return collect(...fits);
}

/** Single-storey hidden roof: falls 2° to a rear gutter between side walls carried up to the parapet. */
function singleStoreyRoof(width: number, front: number): RoofPrism<GroupId>[] {
  const roofFront = LV.roofRear + front * tan(2);
  return [
    {
      group: "roof",
      level: "roof",
      axis: "z",
      x: [EXT, width - EXT],
      z: [0, front - EXT],
      base: LV.gfWall,
      skillion: [LV.roofRear, roofFront - EXT * tan(2)],
      gutters: ["x0"],
      overhang: 0.15,
    },
    ...([0, width - EXT] as const).map(
      (x0): RoofPrism<GroupId> => ({
        group: "roof",
        level: "roof",
        axis: "z",
        x: [x0, x0 + EXT],
        z: [0, front],
        base: LV.gfWall,
        skillion: [LV.roofRear + 0.08, LV.parapet],
        gutters: [],
      }),
    ),
  ];
}

// ---------------------------------------------------------------------------------------------------
// 1 Bed (rev C07, sheet 5): bed 1, bath and laundry, then living, dining and kitchen. 4.3 × 11.5 m plus the frame.

function oneBed(): HouseData<GroupId> {
  const width = 4.3;
  const front = 11.5;
  const xw = c;
  const xe = width - c;
  const ext = { level: "gf", base: LV.gf, top: LV.gfWall, finish: "cladding", thickness: EXT } as const;
  const int = { level: "gf", base: LV.gf, top: LV.gfWall, finish: "interior", thickness: INT } as const;
  const bedWall = 2.91;
  const bathWall = 5.265;
  const v = vergola(width, 5.31, 9.26);

  const walls: W[] = [
    { group: "bedrooms", ...ext, a: [xw, c], b: [xe, c] },
    { group: "bedrooms", ...ext, a: [xw, 0], b: [xw, bathWall], openings: [sized(3.365, 2.0, 0.55)] },
    { group: "bedrooms", ...ext, a: [xe, 0], b: [xe, bathWall], openings: [sized(0.43, 2.3, 0.6), sized(3.975, 0.9, 0.9)] },
    { group: "bedrooms", ...int, a: [xw, bedWall], b: [xe, bedWall], openings: [door(0.2, 1.02)] },
    { group: "bedrooms", ...int, a: [1.135, bedWall], b: [1.135, bathWall], openings: [door(3.2, 3.92)] },
    { group: "bedrooms", ...int, a: [xw, bathWall], b: [xe, bathWall], openings: [{ span: [0.15, 1.09], head: 2.4 }] },
    { group: "living", ...ext, a: [xw, bathWall], b: [xw, front], openings: [sized(6.245, 2.0, 0.55)] },
    { group: "living", ...ext, a: [xe, bathWall], b: [xe, front], openings: [win(5.74, 8.66, 0, 2.15, "slider")] },
    { group: "living", ...ext, a: [xw, front - c], b: [xe, front - c], openings: [sized(1.15, 2.0, 0.75)] },
  ];

  const slabs: Slab<GroupId>[] = [
    { group: "bedrooms", level: "gf", polygon: rect(0, 0, width, bathWall), bottom: -0.2, top: -0.01, material: "concrete" },
    { group: "bedrooms", level: "gf", polygon: rect(0, 0, width, bathWall), bottom: -0.01, top: 0, material: "floor" },
    { group: "living", level: "gf", polygon: rect(0, bathWall, width, front), bottom: -0.2, top: -0.01, material: "concrete" },
    { group: "living", level: "gf", polygon: rect(0, bathWall, width, front), bottom: -0.01, top: 0, material: "floor" },
    v.slab,
  ];

  const roofs = singleStoreyRoof(width, front);
  const shell = { width, front, frameTop: LV.parapet };
  const blocks: B[] = [
    { group: "roof", level: "roof", min: [EXT, LV.gfWall, front - EXT], max: [width - EXT, LV.parapet, front], material: "cladding" },
    ...frameBlocks(shell, 2.6),
    ...v.blocks,
    ...solarRows(0.35, width - 0.35, 0.4, 8.0, (z) => LV.roofRear + z * tan(2), 2),
  ];
  const robe = new Fit<GroupId>("bedrooms");
  tallUnit(robe.wall("z", EXT, 1), [EXT, 1.59], 0.5);
  const inside = collect(
    services(width, front, LV.roofRear, true),
    kitchen<GroupId>("living", width, front, 2.15),
    bathroom<GroupId>("bedrooms", { x: [1.18, width - EXT], z: [bedWall + 0.045, bathWall - 0.045] }),
    bed<GroupId>("bedrooms", { along: "x", face: EXT, dir: 1, centre: 2.4 }),
    robe,
    lounge<GroupId>("living", { along: "z", face: EXT, dir: 1, u: [5.6, 7.6] }),
    dining<GroupId>("living", { centre: [2.6, 8.55], along: "z" }),
  );
  blocks.push(...inside.blocks);

  return {
    centre: { x: width / 2 + VERGOLA_WIDTH / 2, z: front / 2 },
    ufSlab: LV.gfWall,
    eaveOverhang: 0.15,
    walls,
    slabs,
    roofs,
    downpipes: [],
    blocks,
    posts: { group: "vergola", at: v.posts, height: LV.vergolaSoffit },
    struts: roofRibs(EXT, width - EXT, 0, front - EXT, (z) => LV.roofRear + z * tan(2)),
    cylinders: inside.cylinders,
    roundedBoxes: inside.roundedBoxes,
    tori: inside.tori,
  };
}

// ---------------------------------------------------------------------------------------------------
// 2 Bed (rev C09, sheet 5): bed 1, bath and laundry, powder room and robe, bed 2, then living, dining and
// kitchen. 4.3 × 14.9 m plus the frame. The west wall is a boundary wall with no openings.

function twoBed(): HouseData<GroupId> {
  const width = 4.3;
  const front = 14.9;
  const xw = c;
  const xe = width - c;
  const ext = { level: "gf", base: LV.gf, top: LV.gfWall, finish: "cladding", thickness: EXT } as const;
  const int = { level: "gf", base: LV.gf, top: LV.gfWall, finish: "interior", thickness: INT } as const;
  const hall = 1.135;
  const [bed1, bath, pdr, bed2] = [2.91, 5.265, 6.555, 9.355];
  const v = vergola(width, 9.4, 12.66);

  const walls: W[] = [
    { group: "bedrooms", ...ext, a: [xw, c], b: [xe, c] },
    { group: "bedrooms", ...ext, a: [xw, 0], b: [xw, bed2] },
    { group: "bedrooms", ...ext, a: [xe, 0], b: [xe, bed2], openings: [sized(0.43, 2.3, 0.6), sized(3.975, 0.9, 0.9), sized(6.86, 2.0, 0.55)] },
    { group: "bedrooms", ...int, a: [xw, bed1], b: [xe, bed1], openings: [door(0.2, 1.02)] },
    { group: "bedrooms", ...int, a: [hall, bed1], b: [hall, bed2 - 0.7], openings: [door(3.2, 3.92), door(5.4, 6.12), door(6.7, 7.52)] },
    { group: "bedrooms", ...int, a: [hall, bath], b: [xe, bath] },
    { group: "bedrooms", ...int, a: [2.965, bath], b: [2.965, pdr] },
    { group: "bedrooms", ...int, a: [hall, pdr], b: [xe, pdr] },
    { group: "bedrooms", ...int, a: [hall, bed2], b: [xe, bed2] },
    { group: "living", ...ext, a: [xw, bed2], b: [xw, front] },
    { group: "living", ...ext, a: [xe, bed2], b: [xe, front], openings: [win(9.49, 12.41, 0, 2.15, "slider")] },
    { group: "living", ...ext, a: [xw, front - c], b: [xe, front - c], openings: [sized(1.15, 2.0, 0.75)] },
  ];

  const slabs: Slab<GroupId>[] = [
    { group: "bedrooms", level: "gf", polygon: rect(0, 0, width, bed2), bottom: -0.2, top: -0.01, material: "concrete" },
    { group: "bedrooms", level: "gf", polygon: rect(0, 0, width, bed2), bottom: -0.01, top: 0, material: "floor" },
    { group: "living", level: "gf", polygon: rect(0, bed2, width, front), bottom: -0.2, top: -0.01, material: "concrete" },
    { group: "living", level: "gf", polygon: rect(0, bed2, width, front), bottom: -0.01, top: 0, material: "floor" },
    v.slab,
  ];

  const shell = { width, front, frameTop: LV.parapet };
  const blocks: B[] = [
    { group: "roof", level: "roof", min: [EXT, LV.gfWall, front - EXT], max: [width - EXT, LV.parapet, front], material: "cladding" },
    ...frameBlocks(shell, 2.6),
    ...v.blocks,
    ...solarRows(0.35, width - 0.35, 0.4, 9.0, (z) => LV.roofRear + z * tan(2), 2),
  ];
  const robes = new Fit<GroupId>("bedrooms");
  tallUnit(robes.wall("z", EXT, 1), [EXT, 1.59], 0.5);
  tallUnit(robes.wall("z", width - EXT, -1), [pdr - 1.2, pdr - 0.045], 0.6);
  const inside = collect(
    services(width, front, LV.roofRear, true),
    kitchen<GroupId>("living", width, front, 2.15),
    bathroom<GroupId>("bedrooms", { x: [1.18, width - EXT], z: [bed1 + 0.045, bath - 0.045] }),
    powderRoom<GroupId>("bedrooms", { x: [1.18, 2.92], z: [bath + 0.045, pdr - 0.045] }),
    bed<GroupId>("bedrooms", { along: "x", face: EXT, dir: 1, centre: 2.4 }),
    bed<GroupId>("bedrooms", { along: "z", face: width - EXT, dir: -1, centre: 7.95 }),
    robes,
    lounge<GroupId>("living", { along: "z", face: EXT, dir: 1, u: [9.7, 11.7] }),
    dining<GroupId>("living", { centre: [2.6, 12.45], along: "z" }),
  );
  blocks.push(...inside.blocks);

  return {
    centre: { x: width / 2 + VERGOLA_WIDTH / 2, z: front / 2 },
    ufSlab: LV.gfWall,
    eaveOverhang: 0.15,
    walls,
    slabs,
    roofs: singleStoreyRoof(width, front),
    downpipes: [],
    blocks,
    posts: { group: "vergola", at: v.posts, height: LV.vergolaSoffit },
    struts: roofRibs(EXT, width - EXT, 0, front - EXT, (z) => LV.roofRear + z * tan(2)),
    cylinders: inside.cylinders,
    roundedBoxes: inside.roundedBoxes,
    tori: inside.tori,
  };
}

// ---------------------------------------------------------------------------------------------------
// 4 Bed (rev C17, sheets 6–7). Ground: bed 2, bath and laundry, stair, bed 1, then living, dining and kitchen,
// 4.35 × 14.95 m. Upper, from 2.89 m behind the rear wall to the front: bath, stair and sitting room, hall, bed 4,
// bed 3. The west wall is a boundary wall with no openings.

function fourBed(): HouseData<GroupId> {
  const width = 4.35;
  const front = 14.95;
  const ufRear = 2.89;
  const xw = c;
  const xe = width - c;
  const gfExt = { level: "gf", base: LV.gf, top: LV.gfWall, finish: "cladding", thickness: EXT } as const;
  const gfInt = { level: "gf", base: LV.gf, top: LV.gfWall, finish: "interior", thickness: INT } as const;
  const ufExt = { group: "upper", level: "uf", base: LV.uf, top: LV.ufWall, finish: "cladding", thickness: EXT } as const;
  const ufInt = { group: "upper", level: "uf", base: LV.uf, top: LV.ufWall, finish: "interior", thickness: INT } as const;
  const hall = 1.215 + i2;
  const [bed2, bath, stair, bed1] = [2.935, 4.8, 5.89, 8.69];
  const v = vergola(width, 8.62, 12.57);

  const walls: W[] = [
    // Ground floor (sheet 6)
    { group: "bedrooms", ...gfExt, a: [xw, c], b: [xe, c] },
    { group: "bedrooms", ...gfExt, a: [xw, 0], b: [xw, bed1] },
    { group: "bedrooms", ...gfExt, a: [xe, 0], b: [xe, bed1], openings: [win(0.515, 2.715, 0, 2.15, "slider"), sized(3.43, 0.75, 0.9), sized(6.525, 2.0, 0.55)] },
    { group: "bedrooms", ...gfInt, a: [xw, bed2], b: [xe, bed2], openings: [door(0.2, 1.12)] },
    { group: "bedrooms", ...gfInt, a: [hall, bed2], b: [hall, bed1], openings: [door(3.05, 3.77), { span: [4.85, 5.85], head: 2.4 }, door(6.05, 6.87)] },
    { group: "bedrooms", ...gfInt, a: [hall, bath], b: [xe, bath] },
    { group: "bedrooms", ...gfInt, a: [hall, stair], b: [xe, stair] },
    { group: "bedrooms", ...gfInt, a: [hall, bed1], b: [xe, bed1] },
    { group: "living", ...gfExt, a: [xw, bed1], b: [xw, front] },
    { group: "living", ...gfExt, a: [xe, bed1], b: [xe, front], openings: [win(9.135, 12.055, 0, 2.15, "slider")] },
    { group: "living", ...gfExt, a: [xw, front - c], b: [xe, front - c], openings: [sized(1.175, 2.0, 0.75)] },

    // Upper floor (sheet 7; window heights indicative)
    { ...ufExt, a: [xw, ufRear + c], b: [xe, ufRear + c] },
    { ...ufExt, a: [xw, ufRear], b: [xw, front] },
    {
      ...ufExt,
      a: [xe, ufRear],
      b: [xe, front],
      openings: [sized(3.245, 1.5, 0.55, LV.uf), sized(5.7, 1.0, 0.55, LV.uf), sized(9.6, 1.66, 0.95, LV.uf), sized(12.6, 1.66, 0.95, LV.uf)],
    },
    { ...ufExt, a: [xw, front - c], b: [xe, front - c], openings: [win(0.715, 3.635, LV.uf + 0.65, LV.uf + 2.15)] },
    { ...ufInt, a: [xw, 4.8], b: [xe, 4.8], openings: [door(0.2, 1.02, LV.uf)] },
    { ...ufInt, a: [3.19, 4.8], b: [3.19, 7.9] },
    { ...ufInt, a: [xw, 7.9], b: [xe, 7.9], openings: [{ span: [0.5, 1.6], sill: LV.uf, head: LV.uf + 2.1 }] },
    { ...ufInt, a: [1.215, 9.1], b: [xe, 9.1], openings: [door(1.4, 2.22, LV.uf)] },
    { ...ufInt, a: [1.215, 9.1], b: [1.215, 11.99] },
    { ...ufInt, a: [xw, 11.99], b: [xe, 11.99], openings: [door(0.2, 1.02, LV.uf)] },
  ];

  const ufFloor = rect(0, ufRear, width, front);
  const slabs: Slab<GroupId>[] = [
    { group: "bedrooms", level: "gf", polygon: rect(0, 0, width, bed1), bottom: -0.2, top: -0.01, material: "concrete" },
    { group: "bedrooms", level: "gf", polygon: rect(0, 0, width, bed1), bottom: -0.01, top: 0, material: "floor" },
    { group: "living", level: "gf", polygon: rect(0, bed1, width, front), bottom: -0.2, top: -0.01, material: "concrete" },
    { group: "living", level: "gf", polygon: rect(0, bed1, width, front), bottom: -0.01, top: 0, material: "floor" },
    v.slab,
    { group: "upper", level: "uf", polygon: ufFloor, bottom: LV.gfWall, top: LV.uf, material: "render" },
    { group: "upper", level: "uf", polygon: ufFloor, bottom: LV.uf, top: LV.uf + 0.003, material: "floor" },
  ];

  const roofs: RoofPrism<GroupId>[] = [
    // Upper roof falling 3° to the rear behind the walls; the bed 2 roof at 6°, guttered at the rear
    {
      group: "roof",
      level: "roof",
      axis: "z",
      x: [0, width],
      z: [ufRear, front],
      base: LV.ufWall,
      skillion: [LV.roofFront - (front - ufRear) * tan(3), LV.roofFront],
      gutters: [],
    },
    {
      group: "roof",
      level: "roof",
      axis: "z",
      x: [0, width],
      z: [0, ufRear + c],
      base: LV.gfWall,
      skillion: [2.7, 2.7 + ufRear * tan(6)],
      gutters: ["x0"],
      extend: ["z1"],
      overhang: 0.15,
    },
  ];

  const rise = LV.uf / 16;
  const going = 0.25;
  const tread = (x0: number, x1: number, z0: number, z1: number, step: number): B => ({
    group: "bedrooms",
    level: "gf",
    min: [x0, 0, z0],
    max: [x1, rise * step, z1],
    material: "floor",
  });
  const stairs: B[] = [
    ...Array.from({ length: 9 }, (_, i) => tread(1.26 + going * i, 1.26 + going * (i + 1), bath + i2, stair - i2, i + 1)),
    tread(3.51, xe - c, bath + i2, 5.35, 10),
    tread(3.51, xe - c, 5.35, stair - i2, 11),
  ];

  const shell = { width, front, frameTop: LV.roofFront };
  const blocks: B[] = [
    ...frameBlocks(shell, LV.ufWall + 0.25),
    ...v.blocks,
    ...stairs,
    ...solarRows(0.35, width - 0.35, ufRear + 0.4, front - 0.6, (z) => LV.roofFront - (front - z) * tan(3), 2),
  ];
  const robe = new Fit<GroupId>("bedrooms");
  tallUnit(robe.wall("z", EXT, 1), [EXT, 1.375], 0.6);
  const upper = { level: "uf", floor: LV.uf };
  const inside = collect(
    services(width, front, 2.7, false),
    kitchen<GroupId>("living", width, front, 2.175),
    bathroom<GroupId>("bedrooms", { x: [hall + i2, width - EXT], z: [bed2 + i2, bath - i2] }),
    bathroom<GroupId>("upper", { x: [1.26, width - EXT], z: [ufRear + EXT, 4.8 - i2], laundry: false, ...upper }),
    bed<GroupId>("bedrooms", { along: "x", face: EXT, dir: 1, centre: 2.45 }),
    bed<GroupId>("bedrooms", { along: "z", face: width - EXT, dir: -1, centre: 7.31 }),
    bed<GroupId>("upper", { along: "z", face: width - EXT, dir: -1, centre: 10.55, ...upper }),
    bed<GroupId>("upper", { along: "z", face: EXT, dir: 1, centre: 13.4, ...upper }),
    robe,
    lounge<GroupId>("living", { along: "z", face: EXT, dir: 1, u: [9.0, 11.0] }),
    lounge<GroupId>("upper", { along: "z", face: EXT, dir: 1, u: [5.4, 7.2], ...upper }),
    dining<GroupId>("living", { centre: [2.6, 12.05], along: "z" }),
  );
  blocks.push(...inside.blocks);

  return {
    centre: { x: width / 2 + VERGOLA_WIDTH / 2, z: front / 2 },
    ufSlab: LV.gfWall,
    eaveOverhang: 0.15,
    walls,
    slabs,
    roofs,
    downpipes: [],
    blocks,
    posts: { group: "vergola", at: v.posts, height: LV.vergolaSoffit },
    struts: [
      ...roofRibs(0, width, ufRear, front, (z) => LV.roofFront - (front - z) * tan(3)),
      ...roofRibs(0, width, -0.15, ufRear, (z) => 2.7 + z * tan(6)),
    ],
    cylinders: inside.cylinders,
    roundedBoxes: inside.roundedBoxes,
    tori: inside.tori,
  };
}

export const cloudHomeModels: Record<CloudHomeId, () => HouseData<GroupId>> = {
  "one-bed": oneBed,
  "two-bed": twoBed,
  "four-bed": fourBed,
};

/** Separation is not used in the design tool. */
export const explode: Record<GroupId, Vec3> = {
  bedrooms: [0, 0, 0],
  living: [0, 0, 0],
  upper: [0, 0, 0],
  vergola: [0, 0, 0],
  roof: [0, 0, 0],
  frame: [0, 0, 0],
  solar: [0, 0, 0],
  battery: [0, 0, 0],
  services: [0, 0, 0],
  stone: [0, 0, 0],
  access: [0, 0, 0],
};

/** Views: the outside, or with the roof (and upper floor) lifted off to see inside. */
export const levelRank: Record<string, number> = { gf: 0, uf: 1, roof: 2 };

/** Points the design tool's camera can close in on, in scene coordinates (the plan less the home's centre). */
const SIZES: Record<CloudHomeId, { width: number; front: number; bath: [number, number] }> = {
  "one-bed": { width: 4.3, front: 11.5, bath: [2.68, 4.09] },
  "two-bed": { width: 4.3, front: 14.9, bath: [2.68, 4.09] },
  "four-bed": { width: 4.35, front: 14.95, bath: [2.77, 3.87] },
};

export const focusPoints = (id: CloudHomeId) => {
  const { width, front, bath } = SIZES[id];
  // Centre in plan is (width / 2 + vergola / 2, front / 2); aim just behind the kitchen so it sits mid-screen
  return {
    kitchen: [-VERGOLA_WIDTH / 2, 1.0, front / 2 - 0.7] as Vec3,
    // The services on the rear wall, between the battery and the air conditioning unit
    services: [-VERGOLA_WIDTH / 2, 0.9, -front / 2 - 0.3] as Vec3,
    // The bathroom (ground floor), from its centre in plan
    bathroom: [bath[0] - (width / 2 + VERGOLA_WIDTH / 2), 0.9, bath[1] - front / 2] as Vec3,
  };
};
