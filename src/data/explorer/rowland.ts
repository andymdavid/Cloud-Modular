/**
 * 25 On Rowland and Forrest: source geometry for the whole-building explorer on its project page.
 *
 * Source: Doepel Marsh Architects, "25 Rowland Street, Subiaco", DA set rev A, 17/08/2025. Sheets: A100 basement,
 * A101 ground floor, A102–A106 levels 1–5, A107 level 6 loft and services, A108 roof plan, A200 short section,
 * A000 cover perspective (finishes). Plan positions are taken from the grid and dimension strings (1:100 at A3);
 * anything scaled or assumed is listed in `assumptions` (./rowland-info.ts).
 *
 * The DA set does not show module boundaries. Each apartment is split here into two modules along the party walls
 * and the bedroom / living line, about 3.1–4.2 m wide, so the split is indicative (the user's decision, 2026-10-15).
 *
 * Coordinates are plan metres (north up on the sheets):
 *   x  along the building, 0 = the west boundary, increasing east to Rowland Street (30.25)
 *   z  across it, 0 = the north boundary (grid A), increasing south to Forrest Street (grid D, 10.08)
 *   y  height above ground floor level (GF 0 = RL 23.100)
 */

import type { Block, HouseData, MaterialKey, Opening, RoofPrism, Slab, Vec2, Vec3, Wall } from "./house";
import { balustrade, pot } from "./house";

/** Groups: one per apartment, plus the parts built on site and shared by the building. */
export type GroupId = `apt-${number}` | "ground" | "basement" | "core" | "walkways" | "terraces" | "services" | "roof";

export type ApartmentType = "A" | "B" | "C" | "D" | "E";

type W = Wall<GroupId>;
type B = Block<GroupId>;
type S = Slab<GroupId>;

// ---------------------------------------------------------------------------------------------------
// Levels (A200 short section): 4.5 m ground floor, then 3.0 m floor to floor

const LENGTH = 30.25;
const DEPTH = 10.08;

/** Finished floor level of each storey above ground floor (Level 1 at RL 27.600 … Level 6 at RL 42.600). */
export const floorLevel = (storey: number) => (storey === 0 ? 0 : 4.5 + (storey - 1) * 3);
export const ROOF = 22.5; // RL 45.600
const B1 = -3.0; // RL 20.100

/** Module build-up: a 250 mm floor frame under the finished floor, walls 2.75 m to the next floor frame. */
const FRAME = 0.25;
const WALL_H = 2.75;
const WALL_T = 0.1;

// Plan lines (A102–A107)
const Z_WALK = 1.47; // grid B: south edge of the walkway, north face of the apartments
const Z_LIVING = 7.45; // south face of the living modules, behind their balconies
const Z_FRONT = 10.0; // south face of the bedroom modules and the deep apartments
const X_CORE = 2.92; // east face of the lift and stair core
const Z_CORE = 6.93; // south face of the core

export const levelId = (storey: number) => (storey === -1 ? "b1" : storey === 0 ? "gf" : `l${storey}`);

// ---------------------------------------------------------------------------------------------------
// Apartments and their modules

export interface Module {
  id: string;
  x: [number, number];
  z: [number, number];
  /** Living modules face a balcony; bedroom and deep modules carry a framed window to the street. */
  kind: "bedroom" | "living";
  /** Entry door in the north wall (from the walkway). */
  entry?: boolean;
  /** Balcony in front of a living module, to the south face. */
  balcony?: boolean;
}

export interface Apartment {
  number: number;
  storey: number;
  type: ApartmentType;
  /** Floor area as labelled on the plans. */
  area: string;
  modules: Module[];
}

/** One-bedroom levels 1–4 (A102–A105): Types A, B, C and D from west to east. */
const typicalLevel = (storey: number, first: number): Apartment[] => {
  const area = (type: ApartmentType) => (type === "D" ? (storey <= 2 ? "53 m²" : "51 m²") : type === "A" ? "53 m²" : "47 m²");
  const m = (n: number, i: number, rest: Omit<Module, "id">): Module => ({ id: `m${n}-${i}`, ...rest });
  return [
    {
      number: first,
      storey,
      type: "A",
      area: area("A"),
      modules: [
        m(first, 1, { x: [3.02, 6.91], z: [Z_WALK, Z_FRONT], kind: "bedroom", entry: true }),
        m(first, 2, { x: [6.91, 10.06], z: [Z_WALK, Z_FRONT], kind: "bedroom" }),
      ],
    },
    {
      number: first + 1,
      storey,
      type: "B",
      area: area("B"),
      modules: [
        m(first + 1, 1, { x: [10.06, 13.2], z: [Z_WALK, Z_FRONT], kind: "bedroom" }),
        m(first + 1, 2, { x: [13.2, 17.0], z: [Z_WALK, Z_LIVING], kind: "living", entry: true, balcony: true }),
      ],
    },
    {
      number: first + 2,
      storey,
      type: "C",
      area: area("C"),
      modules: [
        m(first + 2, 1, { x: [17.0, 20.6], z: [Z_WALK, Z_LIVING], kind: "living", entry: true, balcony: true }),
        m(first + 2, 2, { x: [20.6, 23.93], z: [Z_WALK, Z_FRONT], kind: "bedroom" }),
      ],
    },
    {
      number: first + 3,
      storey,
      type: "D",
      area: area("D"),
      modules: [
        m(first + 3, 1, { x: [23.93, 27.07], z: [0.1, Z_FRONT], kind: "bedroom" }),
        m(first + 3, 2, { x: [27.07, LENGTH], z: [0.1, Z_LIVING], kind: "living", balcony: true }),
      ],
    },
  ];
};

/** Level 5 (A106) and the loft level 6 (A107): the two-level Type E apartments 17 and 18. */
const Z_L5 = 7.98;
const loftApartments: Apartment[] = [
  {
    number: 17,
    storey: 5,
    type: "E",
    area: "86 m² over two levels",
    modules: [
      { id: "m17-1", x: [5.85, 10.06], z: [Z_WALK, Z_L5], kind: "living", entry: true },
      { id: "m17-2", x: [10.06, 14.25], z: [Z_WALK, Z_L5], kind: "living" },
    ],
  },
  {
    number: 18,
    storey: 5,
    type: "E",
    area: "86 m² over two levels",
    modules: [
      { id: "m18-1", x: [19.65, 23.93], z: [Z_WALK, Z_L5], kind: "living", entry: true },
      { id: "m18-2", x: [23.93, 28.1], z: [Z_WALK, Z_L5], kind: "living" },
    ],
  },
];
const LOFTS: Module[] = [
  { id: "m17-3", x: [5.96, 10.06], z: [Z_WALK, Z_L5], kind: "bedroom" },
  { id: "m17-4", x: [10.06, 14.25], z: [Z_WALK, Z_L5], kind: "bedroom" },
  { id: "m18-3", x: [19.65, 23.93], z: [Z_WALK, Z_L5], kind: "bedroom" },
  { id: "m18-4", x: [23.93, 28.1], z: [Z_WALK, Z_L5], kind: "bedroom" },
];

export const apartments: Apartment[] = [
  ...typicalLevel(1, 1),
  ...typicalLevel(2, 5),
  ...typicalLevel(3, 9),
  ...typicalLevel(4, 13),
  ...loftApartments,
];

// ---------------------------------------------------------------------------------------------------
// Builders

const walls: W[] = [];
const slabs: S[] = [];
const blocks: B[] = [];
const roofs: RoofPrism<GroupId>[] = [];

/** A box frame around a window, proud of the façade (the "window seat" frames on the cover perspective). */
function windowFrame(group: GroupId, level: string, part: string, axis: "x" | "z", at: number, out: 1 | -1, span: [number, number], sill: number, head: number) {
  const d = 0.32;
  const t = 0.08;
  const [u0, u1] = span;
  const face = (u: [number, number], y: [number, number]): B => {
    const [p0, p1] = axis === "z" ? [at, at + out * d] : [at, at + out * d];
    return axis === "z"
      ? { group, level, part, min: [u[0], y[0], Math.min(p0, p1)], max: [u[1], y[1], Math.max(p0, p1)], material: "frameDark" }
      : { group, level, part, min: [Math.min(p0, p1), y[0], u[0]], max: [Math.max(p0, p1), y[1], u[1]], material: "frameDark" };
  };
  blocks.push(face([u0 - t, u1 + t], [head, head + t]), face([u0 - t, u1 + t], [sill - t, sill]), face([u0 - t, u0], [sill, head]), face([u1, u1 + t], [sill, head]));
}

/** One volumetric module: floor frame, finished floor, four walls with openings, made in the factory. */
function addModule(group: GroupId, storey: number, level: string, module: Module, finish: MaterialKey, options: { east?: boolean; westBalcony?: boolean } = {}) {
  const part = module.id;
  const y = storey === 6 ? floorLevel(6) : floorLevel(storey);
  const [x0, x1] = module.x;
  const [z0, z1] = module.z;
  const h = { base: y, top: y + WALL_H, level, group, part, thickness: WALL_T } as const;
  const c = WALL_T / 2;

  slabs.push({ group, level, part, polygon: rect(x0, z0, x1, z1), bottom: y - FRAME, top: y, material: finish });
  slabs.push({ group, level, part, polygon: rect(x0 + WALL_T, z0 + WALL_T, x1 - WALL_T, z1 - WALL_T), bottom: y, top: y + 0.003, material: "floor" });

  // North wall: entry door, or a high window
  const mid = (x0 + x1) / 2;
  walls.push({
    ...h,
    finish,
    a: [x0, z0 + c],
    b: [x1, z0 + c],
    openings: [module.entry ? { span: [mid - 0.45, mid + 0.45], sill: y, head: y + 2.1, kind: "door" } : { span: [mid - 0.6, mid + 0.6], sill: y + 1.5, head: y + 2.2, kind: "window" }],
  });
  // South wall: a framed window from the bedrooms, a full-width slider onto the balcony from living modules
  const south: Opening =
    module.kind === "living"
      ? { span: [x0 + 0.35, x1 - 0.35], sill: y, head: y + 2.4, kind: "slider" }
      : { span: [mid - 0.85, mid + 0.85], sill: y + 0.5, head: y + 2.4, kind: "window" };
  walls.push({ ...h, finish, a: [x0, z1 - c], b: [x1, z1 - c], openings: [south] });
  if (module.kind === "bedroom") windowFrame(group, level, part, "z", z1, 1, [mid - 0.85, mid + 0.85], y + 0.5, y + 2.4);

  // Side walls: interior between modules, cladding where they face out (east end, balcony sides)
  for (const [x, side] of [[x0 + c, -1], [x1 - c, 1]] as const) {
    const exposedEast = side === 1 && options.east;
    const openings: Opening[] = [];
    if (exposedEast) {
      openings.push({ span: [1.6, 3.4], sill: y + 0.5, head: y + 2.4, kind: "window" }, { span: [4.6, 6.4], sill: y + 0.5, head: y + 2.4, kind: "window" });
      windowFrame(group, level, part, "x", x1, 1, [1.6, 3.4], y + 0.5, y + 2.4);
      windowFrame(group, level, part, "x", x1, 1, [4.6, 6.4], y + 0.5, y + 2.4);
    }
    if (side === -1 && options.westBalcony) {
      walls.push({ ...h, finish: "interior", a: [x, z0 + WALL_T], b: [x, Z_CORE] });
      walls.push({ ...h, finish, a: [x, Z_CORE], b: [x, z1 - WALL_T], openings: [{ span: [Z_CORE + 0.3, z1 - 0.4], sill: y, head: y + 2.4, kind: "slider" }] });
    } else if (storey < 5 && module.kind === "bedroom" && z1 > Z_LIVING + 0.5 && z0 < Z_LIVING) {
      // Deep modules: the part beside a neighbour's balcony is outside
      walls.push({ ...h, finish: exposedEast ? finish : "interior", a: [x, z0 + WALL_T], b: [x, Z_LIVING], openings: exposedEast ? openings : undefined });
      walls.push({ ...h, finish, a: [x, Z_LIVING], b: [x, z1 - WALL_T] });
    } else {
      walls.push({ ...h, finish: exposedEast || storey >= 5 ? finish : "interior", a: [x, z0 + WALL_T], b: [x, z1 - WALL_T], openings: exposedEast ? openings : undefined });
    }
  }

  if (module.balcony) {
    // Balcony slab with a timber soffit, glass balustrade (cover perspective)
    slabs.push({ group, level, part, polygon: rect(x0, z1, x1, Z_FRONT), bottom: y - FRAME, top: y - 0.02, material: "timberClad" });
    slabs.push({ group, level, part, polygon: rect(x0, z1, x1, Z_FRONT), bottom: y - 0.02, top: y, material: "deck" });
    blocks.push(...balustrade<GroupId>(group, level, [x0 + 0.05, y, Z_FRONT - 0.06], [x1 - 0.05, y + 1.05, Z_FRONT - 0.03]).map((b) => ({ ...b, part })));
  }
}

const rect = (x0: number, z0: number, x1: number, z1: number): Vec2[] => [
  [x0, z0],
  [x1, z0],
  [x1, z1],
  [x0, z1],
];

// Apartments
for (const apartment of apartments) {
  const group: GroupId = `apt-${apartment.number}`;
  const level = levelId(apartment.storey);
  for (const module of apartment.modules) {
    addModule(group, apartment.storey, level, module, "timberClad", {
      east: module.x[1] >= LENGTH - 0.01,
      westBalcony: apartment.type === "A" && module.x[0] < 3.1,
    });
  }
  if (apartment.type === "A") {
    // South-west corner balcony beside the core (9 m², A102–A105)
    const y = floorLevel(apartment.storey);
    const part = apartment.modules[0].id;
    slabs.push({ group, level, part, polygon: rect(0.1, Z_CORE, 3.02, Z_FRONT), bottom: y - FRAME, top: y - 0.02, material: "timberClad" });
    slabs.push({ group, level, part, polygon: rect(0.1, Z_CORE, 3.02, Z_FRONT), bottom: y - 0.02, top: y, material: "deck" });
    blocks.push(...balustrade<GroupId>(group, level, [0.15, y, Z_FRONT - 0.06], [2.95, y + 1.05, Z_FRONT - 0.03]).map((b) => ({ ...b, part })));
    blocks.push(...balustrade<GroupId>(group, level, [0.12, y, Z_CORE + 0.05], [0.15, y + 1.05, Z_FRONT - 0.06]).map((b) => ({ ...b, part })));
  }
}
// Lofts on level 6, in dark cladding (cover perspective), with Juliette balconies to the south
for (const loft of LOFTS) {
  const number = Number(loft.id.slice(1, 3));
  addModule(`apt-${number}`, 6, "l6", loft, "darkClad");
}

// Walkways along the north side, levels 1–5 (enclosed on 1–2, open air with trellis wires on 3–5)
for (let storey = 1; storey <= 5; storey++) {
  const y = floorLevel(storey);
  const level = levelId(storey);
  const part = `walk-${storey}`;
  const x1 = storey === 5 ? 28.1 : 23.93;
  slabs.push({ group: "walkways", level, part, polygon: rect(X_CORE, 0.05, x1, Z_WALK), bottom: y - FRAME, top: y, material: "concrete" });
  if (storey <= 2) {
    walls.push({ group: "walkways", level, part, a: [X_CORE, 0.1], b: [x1, 0.1], base: y, top: y + WALL_H, finish: "timberClad", thickness: 0.15 });
  } else {
    blocks.push(...balustrade<GroupId>("walkways", level, [X_CORE + 0.1, y, 0.08], [x1 - 0.05, y + 1.1, 0.11]).map((b) => ({ ...b, part })));
    for (let x = X_CORE + 0.6; x < x1; x += 1.2) blocks.push({ group: "walkways", level, part, min: [x - 0.015, y, 0.06], max: [x + 0.015, y + WALL_H, 0.09], material: "steel" });
  }
}

// Lift and stair core, levels 1–5 and the lift overrun (A102–A107); concrete, built on site
for (let storey = 1; storey <= 6; storey++) {
  const y = floorLevel(storey);
  const level = levelId(storey);
  const part = `core-${storey}`;
  const zEnd = storey === 6 ? 2.2 : Z_CORE;
  const top = storey === 6 ? ROOF + 0.5 : y + WALL_H;
  const wall = (a: Vec2, b: Vec2, openings?: Opening[]) => walls.push({ group: "core", level, part, a, b, base: y - FRAME, top, finish: "concrete", thickness: 0.2, openings });
  wall([0.1, 0.1], [X_CORE, 0.1]);
  wall([0.1, 0.1], [0.1, zEnd]);
  wall([0.1, zEnd], [X_CORE, zEnd]);
  wall([X_CORE, 0.1], [X_CORE, zEnd], storey === 6 ? undefined : [{ span: [0.6, 1.6], sill: y, head: y + 2.1, kind: "opening" }]);
  if (storey < 6) {
    // Stair flights, simplified (A102)
    for (let i = 0; i < 9; i++) blocks.push({ group: "core", level, part, min: [0.35, y - FRAME, 2.6 + i * 0.28], max: [1.45, y - FRAME + (i + 1) * 0.17, 2.6 + (i + 1) * 0.28], material: "concrete" });
  }
}

// Level 5 terrace plate over level 4: deep soil gardens, decks and the courtyard between the two lofts (A106)
{
  const y = floorLevel(5);
  const level = "l5";
  const part = "terrace-5";
  slabs.push({ group: "terraces", level, part, polygon: rect(X_CORE, Z_WALK, LENGTH, DEPTH), bottom: y - FRAME, top: y - 0.02, material: "concrete" });
  slabs.push({ group: "terraces", level, part, polygon: rect(0.1, Z_CORE, X_CORE, DEPTH), bottom: y - FRAME, top: y - 0.02, material: "concrete" });
  // Decks to the apartments
  slabs.push({ group: "terraces", level, part, polygon: rect(6.2, Z_L5, 14.25, Z_FRONT), bottom: y - 0.02, top: y, material: "deck" });
  slabs.push({ group: "terraces", level, part, polygon: rect(22.3, Z_L5, 28.1, Z_FRONT), bottom: y - 0.02, top: y, material: "deck" });
  slabs.push({ group: "terraces", level, part, polygon: rect(28.1, 1.6, LENGTH - 0.1, Z_L5), bottom: y - 0.02, top: y, material: "deck" });
  // Planted areas: low planter beds with shrubs and small trees
  const bed = (x0: number, z0: number, x1: number, z1: number) =>
    blocks.push({ group: "terraces", level, part, min: [x0, y, z0], max: [x1, y + 0.45, z1], material: "concrete" }, { group: "terraces", level, part, min: [x0 + 0.05, y + 0.45, z0 + 0.05], max: [x1 - 0.05, y + 0.5, z1 - 0.05], material: "trunk" });
  bed(0.2, 7.05, 5.75, 9.95);
  bed(14.45, 2.6, 19.45, 9.95);
  bed(28.2, 0.15, LENGTH - 0.1, 1.45);
  bed(28.2, 8.05, LENGTH - 0.1, 9.95);
  for (const [x, z, s] of [
    [1.6, 8.5, 1.5],
    [4.2, 8.9, 1.1],
    [15.8, 4.2, 1.6],
    [17.8, 7.6, 1.8],
    [15.6, 9.0, 1.0],
    [29.2, 9.0, 1.0],
  ] as const) {
    blocks.push(...pot<GroupId>("terraces", level, x, y + 0.2, z, s).map((b) => ({ ...b, part })).filter((b) => b.material === "foliage"));
  }
  // Planting trailing over the edge of the level 5 gardens and down the corners (cover perspective)
  const trail = (axis: "x" | "z", from: number, to: number, face: number) => {
    // Two staggered rows of overlapping clumps, longer and shorter in a fixed irregular sequence
    for (const [row, offset, out] of [
      [0, 0, 0.0],
      [1, 0.17, 0.14],
    ] as const) {
      let i = 0;
      for (let u = from + offset; u <= to; u += 0.34, i++) {
        const length = row === 0 ? 0.7 + ((i * 37) % 11) / 7 : 0.4 + ((i * 23) % 7) / 8;
        const width = 0.28 + ((i * 13) % 5) / 25;
        const top = y + 0.5;
        const [a0, a1] = [u - width, u + width];
        const [f0, f1] = [face - 0.08 + out, face + 0.42 + out];
        blocks.push(
          axis === "x"
            ? { group: "terraces", level, part, min: [a0, top - length, f0], max: [a1, top + 0.15, f1], material: "foliage" }
            : { group: "terraces", level, part, min: [f0, top - length, a0], max: [f1, top + 0.15, a1], material: "foliage" },
        );
      }
    }
  };
  trail("x", 0.4, 5.5, DEPTH);
  trail("x", 14.7, 19.2, DEPTH);
  trail("x", 28.4, 29.9, DEPTH);
  trail("z", 8.2, 9.8, LENGTH);
  trail("z", 0.3, 1.3, LENGTH);

  // Glass edge along the street fronts
  blocks.push(...balustrade<GroupId>("terraces", level, [0.15, y, DEPTH - 0.08], [LENGTH - 0.15, y + 1.05, DEPTH - 0.05]).map((b) => ({ ...b, part })));
  blocks.push(...balustrade<GroupId>("terraces", level, [LENGTH - 0.08, y, Z_WALK], [LENGTH - 0.05, y + 1.05, DEPTH - 0.08]).map((b) => ({ ...b, part })));
  // Covering over the walkway at level 5 is open; the courtyard stays open to the sky
}

// Services deck on level 6 over the core and lobby: condensers and hot water units behind louvred screens (A107)
{
  const y = 19.1; // RL 42.200
  const level = "l6";
  const part = "services-6";
  slabs.push({ group: "services", level, part, polygon: [[0.1, 0.1], [7.2, 0.1], [7.2, 2.3], [X_CORE, 2.3], [X_CORE, Z_CORE], [0.1, Z_CORE]], bottom: y - 0.3, top: y, material: "concrete" });
  for (let i = 0; i < 5; i++) blocks.push({ group: "services", level, part, min: [3.2 + i * 0.8, y, 0.3], max: [3.85 + i * 0.8, y + 0.6, 0.65], material: "steel" });
  for (let i = 0; i < 4; i++) blocks.push({ group: "services", level, part, min: [0.3, y, 2.6 + i * 0.9], max: [0.65, y + 0.6, 3.25 + i * 0.9], material: "steel" });
  for (let i = 0; i < 3; i++) blocks.push({ group: "services", level, part, min: [1.5, y, 3.0 + i * 1.1], max: [2.2, y + 1.6, 3.7 + i * 1.1], material: "furniture" });
  // Louvred screens to 1.8 m on the open sides
  for (let x = 3.0; x < 7.2; x += 0.12) blocks.push({ group: "services", level, part, min: [x, y, 2.25], max: [x + 0.04, y + 1.8, 2.3], material: "darkClad" });
  for (let z = 2.3; z < Z_CORE; z += 0.12) blocks.push({ group: "services", level, part, min: [X_CORE - 0.05, y, z], max: [X_CORE, y + 1.8, z + 0.04], material: "darkClad" });
  for (let x = 0.1; x < X_CORE; x += 0.12) blocks.push({ group: "services", level, part, min: [x, y, Z_CORE - 0.05], max: [x + 0.04, y + 1.8, Z_CORE], material: "darkClad" });
}

// Loft roofs: metal deck at 3°, RL 45.700 at the north edge rising to 46.100 at the south, PV cells (A108, A200)
for (const [x0, x1] of [
  [5.85, 14.25],
  [19.65, 28.1],
] as const) {
  roofs.push({ group: "roof", level: "roof", axis: "z", x: [x0, x1], z: [Z_WALK, Z_L5], base: floorLevel(6) + WALL_H, skillion: [ROOF + 0.1, ROOF + 0.5], gutters: [], capFinish: "darkClad" });
  const fall = 0.4 / (Z_L5 - Z_WALK);
  for (let x = x0 + 0.3; x + 1.0 < x1 - 0.2; x += 1.1) {
    for (let z = Z_WALK + 0.4; z + 1.7 < Z_L5 - 0.2; z += 1.8) {
      const top = ROOF + 0.1 + (z + 1.7 - Z_WALK) * fall + 0.06;
      blocks.push({ group: "roof", level: "roof", min: [x, top - 0.08 - 1.7 * fall, z], max: [x + 1.0, top, z + 1.7], material: "solar" });
    }
  }
}

// Ground floor (A101): built on site in board-formed concrete under a thick level 1 slab that runs out as an awning
{
  const level = "gf";
  const top = 3.9;
  const ext = (a: Vec2, b: Vec2, openings?: Opening[]) => walls.push({ group: "ground", level, a, b, base: 0, top, finish: "concrete", thickness: 0.25, openings });
  slabs.push({ group: "ground", level, polygon: rect(0, 0, LENGTH, DEPTH), bottom: -0.25, top: 0, material: "concrete" });
  ext([0.12, 0.12], [LENGTH - 0.12, 0.12]);
  ext([0.12, 0.12], [0.12, DEPTH - 0.12]);
  // Forrest Street: lobby entry, garage door at the crossover, commercial glazing and entry
  ext([0.12, DEPTH - 0.12], [LENGTH - 0.12, DEPTH - 0.12], [
    { span: [3.0, 5.0], sill: 0, head: 2.7, kind: "door" },
    { span: [5.6, 10.6], sill: 0.4, head: 3.2, kind: "window" },
    { span: [11.7, 16.4], sill: 0, head: 3.6, kind: "garage-door" },
    { span: [18.2, 24.8], sill: 0, head: 3.4, kind: "slider" },
    { span: [25.0, 26.8], sill: 0, head: 3.0, kind: "door" },
  ]);
  // Rowland Street: commercial glazing
  ext([LENGTH - 0.12, 0.12], [LENGTH - 0.12, DEPTH - 0.12], [{ span: [2.2, 7.6], sill: 0.4, head: 3.2, kind: "window" }]);
  // Core walls on the ground floor
  walls.push({ group: "ground", level, a: [X_CORE, 0.1], b: [X_CORE, Z_CORE], base: 0, top, finish: "concrete", thickness: 0.2, openings: [{ span: [2.3, 3.4], sill: 0, head: 2.1, kind: "opening" }] });
  walls.push({ group: "ground", level, a: [0.1, Z_CORE], b: [X_CORE, Z_CORE], base: 0, top, finish: "concrete", thickness: 0.2 });
  // Level 1 slab band and awning (cover perspective): over the footpath to Forrest Street and round the corner
  slabs.push({ group: "ground", level, polygon: [[0, 0], [LENGTH, 0], [LENGTH + 0.5, 0.6], [LENGTH + 0.5, DEPTH + 0.9], [0, DEPTH + 0.9]], bottom: top, top: floorLevel(1) - FRAME, material: "concrete" });
  // Signage blade at the corner
  blocks.push({ group: "ground", level, min: [LENGTH - 0.4, 0.6, DEPTH - 0.05], max: [LENGTH - 0.25, 3.6, DEPTH + 0.35], material: "frameDark" });
}

// Basement (A100), simplified: a concrete box under the west end, for the lobby, stores and fire services
{
  const level = "b1";
  const [x1, z1] = [14.0, 6.9];
  slabs.push({ group: "basement", level, polygon: rect(0, 0, x1, z1), bottom: B1 - 0.3, top: B1, material: "concrete" });
  const wall = (a: Vec2, b: Vec2) => walls.push({ group: "basement", level, a, b, base: B1, top: -0.25, finish: "concrete", thickness: 0.3 });
  wall([0.15, 0.15], [x1 - 0.15, 0.15]);
  wall([0.15, 0.15], [0.15, z1 - 0.15]);
  wall([0.15, z1 - 0.15], [x1 - 0.15, z1 - 0.15]);
  wall([x1 - 0.15, 0.15], [x1 - 0.15, z1 - 0.15]);
  blocks.push({ group: "basement", level, min: [5.0, B1, 1.0], max: [9.0, B1 + 2.4, 5.5], material: "steel" });
}

// ---------------------------------------------------------------------------------------------------
// Scene data

export const rowland: HouseData<GroupId> = {
  centre: { x: LENGTH / 2, z: DEPTH / 2 },
  ufSlab: floorLevel(1),
  eaveOverhang: 0.1,
  walls,
  slabs,
  roofs,
  downpipes: [],
  blocks,
  posts: { group: "ground", at: [], height: 0 },
};

/**
 * Assembly view: the factory-made modules lift off level by level and spread apart, while the parts built on
 * site (basement, ground floor, core) stay put. Walkways, terraces and services rise with their level.
 */
const LIFT = 2.2;
const SPREAD = 0.22;
export const explode: Record<string, Vec3> = {};
const centreX = LENGTH / 2;
for (const apartment of apartments) {
  explode[`apt-${apartment.number}`] = [0, LIFT * apartment.storey, 0];
  for (const module of apartment.modules) {
    const cx = (module.x[0] + module.x[1]) / 2;
    explode[module.id] = [(cx - centreX) * SPREAD, LIFT * apartment.storey, 0.6];
  }
}
for (const loft of LOFTS) {
  const cx = (loft.x[0] + loft.x[1]) / 2;
  explode[loft.id] = [(cx - centreX) * SPREAD, LIFT * 6, 0.6];
}
for (let storey = 1; storey <= 6; storey++) {
  explode[`walk-${storey}`] = [0, LIFT * storey, -1.2];
  explode[`core-${storey}`] = [0, 0, 0];
}
explode["terrace-5"] = [0, LIFT * 5, 0];
explode["services-6"] = [0, LIFT * 6, 0];
explode.terraces = [0, LIFT * 5, 0];
explode.services = [0, LIFT * 6, 0];
explode.walkways = [0, 0, 0];
explode.roof = [0, LIFT * 7, 0];
