/**
 * Fittings for the Cloud Homes models (./cloud-homes.ts): kitchens, bathrooms, robes, furniture and the services on the
 * walls, built from boxes and cylinders so the homes read as lived in.
 *
 * Layouts follow the Casuarina Crescent plans (Oct 2026 revisions): the kitchen sink under the front window, the
 * cooktop and microwave tower on the east wall, the fridge recess and pantry on the west wall, and the bathroom's
 * shower, vanity, washing machine, trough and toilet. Heights and depths follow the earlier 2 Bed set's internal
 * layouts (sheet 11: 900 bench, 750 splashback, 750 overheads 350 deep, 2400 tall units). Sizes of appliances,
 * furniture and services are indicative.
 */

import type { Block, MaterialKey, Vec3 } from "./house";

export interface Cylinder<G extends string> {
  group: G;
  level: string;
  material: MaterialKey;
  centre: Vec3;
  radius: number;
  length: number;
  axis?: "x" | "y" | "z";
}

export interface Rounded<G extends string> {
  group: G;
  level: string;
  material: MaterialKey;
  min: Vec3;
  max: Vec3;
  radius: number;
}

export interface Ring<G extends string> {
  group: G;
  level: string;
  material: MaterialKey;
  centre: Vec3;
  radius: number;
  tube: number;
  axis?: "x" | "y" | "z";
}

export class Fit<G extends string> {
  blocks: Block<G>[] = [];
  cylinders: Cylinder<G>[] = [];
  roundedBoxes: Rounded<G>[] = [];
  tori: Ring<G>[] = [];
  constructor(
    public group: G,
    public level = "gf",
    public floor = 0,
  ) {}

  box(min: Vec3, max: Vec3, material: MaterialKey) {
    this.blocks.push({ group: this.group, level: this.level, min: [min[0], min[1] + this.floor, min[2]], max: [max[0], max[1] + this.floor, max[2]], material });
  }

  /** Box with rounded edges, for appliance casings. */
  rbox(min: Vec3, max: Vec3, material: MaterialKey, radius = 0.02) {
    this.roundedBoxes.push({ group: this.group, level: this.level, material, min: [min[0], min[1] + this.floor, min[2]], max: [max[0], max[1] + this.floor, max[2]], radius });
  }

  ring(centre: Vec3, radius: number, tube: number, material: MaterialKey, axis: "x" | "y" | "z" = "z") {
    this.tori.push({ group: this.group, level: this.level, material, centre: [centre[0], centre[1] + this.floor, centre[2]], radius, tube, axis });
  }

  cyl(centre: Vec3, radius: number, length: number, material: MaterialKey, axis: "x" | "y" | "z" = "y") {
    this.cylinders.push({ group: this.group, level: this.level, material, centre: [centre[0], centre[1] + this.floor, centre[2]], radius, length, axis });
  }

  /**
   * A box against a wall, in wall terms: `u` along the wall, `d` out from the wall face, `y` up. The wall runs along
   * x (a rear or front wall at z = face) or along z (a side wall at x = face); `dir` is the direction into the room.
   */
  wall(along: "x" | "z", face: number, dir: 1 | -1) {
    return (u: [number, number], d: [number, number], y: [number, number], material: MaterialKey) => {
      const d0 = face + dir * d[0];
      const d1 = face + dir * d[1];
      const [a, b] = [Math.min(d0, d1), Math.max(d0, d1)];
      if (along === "x") this.box([u[0], y[0], a], [u[1], y[1], b], material);
      else this.box([a, y[0], u[0]], [b, y[1], u[1]], material);
    };
  }
}

type Place = ReturnType<Fit<string>["wall"]>;

/** Cabinet doors: fine shadow gaps on the front face, about every 600 mm. */
function doorGaps(place: Place, u: [number, number], depth: number, y: [number, number], every = 0.6) {
  const count = Math.max(1, Math.round((u[1] - u[0]) / every));
  const step = (u[1] - u[0]) / count;
  for (let i = 1; i < count; i++) {
    const at = u[0] + step * i;
    place([at - 0.002, at + 0.002], [depth, depth + 0.002], y, "gap");
  }
}

/** Base cabinets: recessed kick, carcass with door gaps, a 20 mm benchtop with a small overhang, and a splashback. */
export function baseRun(place: Place, u: [number, number], { splashback = true, bench = true } = {}) {
  place(u, [0, 0.55], [0, 0.1], "gap");
  place(u, [0, 0.58], [0.1, 0.88], "joinery");
  doorGaps(place, u, 0.58, [0.12, 0.86]);
  place(u, [0.58, 0.582], [0.5, 0.504], "gap"); // drawer line
  if (bench) place(u, [0, 0.6], [0.88, 0.9], "benchtop");
  if (splashback) place(u, [0, 0.012], [0.9, 1.5], "benchtop");
}

/** Overhead cupboards 350 deep from 1650 to 2400, with door gaps. */
export function overheads(place: Place, u: [number, number]) {
  place(u, [0, 0.35], [1.65, 2.4], "joinery");
  doorGaps(place, u, 0.35, [1.66, 2.39], 0.45);
}

/** Full-height joinery (pantry, robe) with door gaps. */
export function tallUnit(place: Place, u: [number, number], depth = 0.6, top = 2.4) {
  place(u, [0, 0.55], [0, 0.1], "gap");
  place(u, [0, depth], [0.1, top], "joinery");
  doorGaps(place, u, depth, [0.12, top - 0.02], 0.5);
}

// ---------------------------------------------------------------------------------------------------
// Kitchen: front run with the sink under the window, east run with cooktop and microwave tower, west fridge and pantry

export function kitchen<G extends string>(group: G, width: number, front: number, sinkAt: number) {
  const fit = new Fit(group);
  const ext = 0.115;
  const inX0 = ext;
  const inX1 = width - ext;
  const inFront = front - ext;
  const frontRun = fit.wall("x", inFront, -1);
  const eastRun = fit.wall("z", inX1, -1);
  const westRun = fit.wall("z", inX0, 1);

  // Front run, full width, sink centred under the window
  baseRun(frontRun, [inX0, inX1 - 0.6], { splashback: false });
  frontRun([inX0, sinkAt - 1], [0, 0.012], [0.9, 1.4], "benchtop");
  frontRun([sinkAt + 1, inX1], [0, 0.012], [0.9, 1.4], "benchtop");
  overheads(frontRun, [inX0, sinkAt - 1.05]);
  overheads(frontRun, [sinkAt + 1.05, inX1]);
  // Double bowl sink set into the benchtop, with a mixer
  fit.box([sinkAt - 0.4, 0.895, inFront - 0.52], [sinkAt + 0.4, 0.902, inFront - 0.1], "stainless");
  fit.box([sinkAt - 0.37, 0.75, inFront - 0.49], [sinkAt - 0.02, 0.9, inFront - 0.13], "gap");
  fit.box([sinkAt + 0.02, 0.75, inFront - 0.49], [sinkAt + 0.37, 0.9, inFront - 0.13], "gap");
  fit.cyl([sinkAt, 1.06, inFront - 0.06], 0.018, 0.32, "stainless");
  fit.cyl([sinkAt, 1.2, inFront - 0.16], 0.012, 0.22, "stainless", "z");

  // East run: corner, cooktop, then the microwave tower
  baseRun(eastRun, [inFront - 2.2 + 0.6, inFront]);
  fit.box([inX1 - 0.56, 0.9, inFront - 1.6], [inX1 - 0.04, 0.906, inFront - 1.0], "appliance"); // induction cooktop
  overheads(eastRun, [inFront - 1.65, inFront - 0.6]);
  tallUnit(eastRun, [inFront - 2.2, inFront - 1.6]);
  eastRun([inFront - 2.15, inFront - 1.65], [0.6, 0.605], [1.05, 1.42], "appliance"); // microwave
  eastRun([inFront - 2.15, inFront - 1.65], [0.6, 0.605], [0.35, 0.95], "appliance"); // oven

  // West: fridge in its recess, then the pantry
  westRun([inFront - 2.0, inFront - 1.28], [0, 0.66], [2.0, 2.4], "joinery");
  westRun([inFront - 1.98, inFront - 1.3], [0.02, 0.68], [0, 1.85], "stainless");
  westRun([inFront - 1.645, inFront - 1.635], [0.68, 0.685], [0.1, 1.8], "gap");
  tallUnit(westRun, [inFront - 1.28, inFront - 0.66], 0.6);
  return fit;
}

// ---------------------------------------------------------------------------------------------------
// Bathroom: shower in one corner behind a glass screen, vanity, washing machine and trough, toilet

export function bathroom<G extends string>(
  group: G,
  { x, z, laundry = true, level = "gf", floor = 0 }: { x: [number, number]; z: [number, number]; laundry?: boolean; level?: string; floor?: number },
) {
  const fit = new Fit(group, level, floor);
  const [x0, x1] = x;
  const [z0, z1] = z;
  const back = fit.wall("x", z1, -1); // fittings along the far wall
  // Shower: tiled floor, glass screen and rail shower
  fit.box([x0, 0, z1 - 0.9], [x0 + 0.9, 0.012, z1], "ceramic");
  fit.box([x0 + 0.9, 0, z1 - 0.9], [x0 + 0.91, 2.0, z1 - 0.1], "glass");
  fit.box([x0 + 0.02, 0, z1 - 0.9], [x0 + 0.9, 2.0, z1 - 0.89], "glass");
  fit.cyl([x0 + 0.06, 1.5, z1 - 0.45], 0.012, 0.9, "stainless");
  fit.cyl([x0 + 0.16, 1.95, z1 - 0.45], 0.1, 0.012, "stainless");
  // Wall-hung vanity with a basin, mixer and mirror
  const v0 = x0 + 0.95;
  back([v0, v0 + 0.85], [0, 0.46], [0.35, 0.82], "joinery");
  back([v0 + 0.425 - 0.002, v0 + 0.425 + 0.002], [0.46, 0.462], [0.37, 0.8], "gap");
  back([v0, v0 + 0.85], [0, 0.47], [0.82, 0.85], "ceramic");
  back([v0 + 0.2, v0 + 0.65], [0.1, 0.42], [0.83, 0.851], "gap");
  fit.cyl([v0 + 0.425, 0.95, z1 - 0.06], 0.014, 0.2, "stainless");
  back([v0 + 0.05, v0 + 0.8], [0, 0.02], [1.1, 1.95], "stainless");
  if (laundry && x1 - (v0 + 0.85) > 1.1) {
    // Washing machine and trough
    const w0 = v0 + 0.95;
    back([w0, w0 + 0.6], [0.02, 0.62], [0, 0.85], "unit");
    fit.cyl([w0 + 0.3, 0.45, z1 - 0.625], 0.18, 0.01, "appliance", "z");
    back([x1 - 0.5, x1 - 0.05], [0, 0.5], [0, 0.88], "stainless");
  }
  // Toilet against the opposite end wall, facing into the room
  const side = fit.wall("z", x1, -1);
  const tz = z0 + 0.55;
  side([tz - 0.19, tz + 0.19], [0, 0.17], [0.4, 0.85], "ceramic"); // cistern
  side([tz - 0.18, tz + 0.18], [0.17, 0.66], [0, 0.4], "ceramic"); // pan
  side([tz - 0.19, tz + 0.19], [0.17, 0.68], [0.4, 0.43], "ceramic"); // seat
  return fit;
}

/** Powder room: toilet on one wall and a small basin on the far wall. */
export function powderRoom<G extends string>(group: G, { x, z }: { x: [number, number]; z: [number, number] }) {
  const fit = new Fit(group);
  const side = fit.wall("z", x[1], -1);
  const tz = z[0] + 0.45;
  side([tz - 0.19, tz + 0.19], [0, 0.17], [0.4, 0.85], "ceramic");
  side([tz - 0.18, tz + 0.18], [0.17, 0.66], [0, 0.4], "ceramic");
  side([tz - 0.19, tz + 0.19], [0.17, 0.68], [0.4, 0.43], "ceramic");
  const back = fit.wall("x", z[1], -1);
  back([x[0] + 0.1, x[0] + 0.55], [0, 0.32], [0.8, 0.88], "ceramic");
  fit.cyl([x[0] + 0.325, 0.96, z[1] - 0.05], 0.012, 0.16, "stainless");
  back([x[0] + 0.12, x[0] + 0.53], [0, 0.02], [1.05, 1.75], "stainless");
  return fit;
}

// ---------------------------------------------------------------------------------------------------
// Furniture

/** Queen bed with its head against a wall: base, mattress, duvet with a throw, pillows, headboard and bedsides. */
export function bed<G extends string>(group: G, { along, face, dir, centre, level = "gf", floor = 0 }: { along: "x" | "z"; face: number; dir: 1 | -1; centre: number; level?: string; floor?: number }) {
  const fit = new Fit(group, level, floor);
  const place = fit.wall(along, face, dir);
  const half = 0.77;
  const u: [number, number] = [centre - half, centre + half];
  place([u[0] - 0.02, u[1] + 0.02], [0, 0.05], [0, 1.1], "fabric"); // headboard
  place(u, [0.05, 2.08], [0.05, 0.32], "fabric");
  place([u[0] + 0.02, u[1] - 0.02], [0.07, 2.06], [0.32, 0.55], "linen");
  place([u[0] - 0.01, u[1] + 0.01], [0.6, 2.09], [0.5, 0.58], "linen"); // duvet
  place([u[0] - 0.02, u[1] + 0.02], [1.55, 1.95], [0.56, 0.6], "fabric"); // throw
  place([u[0] + 0.08, centre - 0.04], [0.1, 0.5], [0.55, 0.7], "linen");
  place([centre + 0.04, u[1] - 0.08], [0.1, 0.5], [0.55, 0.7], "linen");
  for (const s of [-1, 1]) {
    const edge = s < 0 ? u[0] - 0.08 : u[1] + 0.08;
    const v: [number, number] = s < 0 ? [edge - 0.45, edge] : [edge, edge + 0.45];
    place(v, [0, 0.4], [0, 0.5], "timber");
  }
  return fit;
}

/** Bed without bedsides, for tight rooms. */
export function bedOnly<G extends string>(group: G, opts: Parameters<typeof bed>[1]) {
  const fit = bed(group, opts);
  fit.blocks = fit.blocks.filter((b) => b.material !== "timber");
  return fit;
}

/** Three-seat sofa against a wall, with a coffee table and a rug in front. */
export function lounge<G extends string>(group: G, { along, face, dir, u, level = "gf", floor = 0 }: { along: "x" | "z"; face: number; dir: 1 | -1; u: [number, number]; level?: string; floor?: number }) {
  const fit = new Fit(group, level, floor);
  const place = fit.wall(along, face, dir);
  const mid = (u[0] + u[1]) / 2;
  place([u[0] - 0.3, u[1] + 0.3], [0.5, 2.2], [0, 0.01], "rug");
  place(u, [0.05, 0.95], [0.08, 0.42], "fabric");
  place(u, [0.05, 0.28], [0.42, 0.82], "fabric");
  place([u[0], u[0] + 0.16], [0.28, 0.95], [0.42, 0.6], "fabric");
  place([u[1] - 0.16, u[1]], [0.28, 0.95], [0.42, 0.6], "fabric");
  place([u[0] + 0.18, mid - 0.01], [0.3, 0.92], [0.42, 0.5], "linen");
  place([mid + 0.01, u[1] - 0.18], [0.3, 0.92], [0.42, 0.5], "linen");
  place([mid - 0.5, mid + 0.5], [1.3, 1.9], [0.38, 0.42], "timber");
  place([mid - 0.45, mid + 0.45], [1.35, 1.85], [0, 0.38], "gap");
  return fit;
}

/** Dining table for four with chairs. `centre` is the table centre in plan; the table's long side runs along `along`. */
export function dining<G extends string>(group: G, { centre, along = "x" }: { centre: [number, number]; along?: "x" | "z" }) {
  const fit = new Fit(group);
  const [cx, cz] = centre;
  const [hl, hw] = along === "x" ? [0.7, 0.42] : [0.42, 0.7];
  fit.box([cx - hl, 0.72, cz - hw], [cx + hl, 0.75, cz + hw], "timber");
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) fit.box([cx + sx * (hl - 0.06) - 0.025, 0, cz + sz * (hw - 0.06) - 0.025], [cx + sx * (hl - 0.06) + 0.025, 0.72, cz + sz * (hw - 0.06) + 0.025], "timber");
  // Two chairs on each long side
  for (const side of [-1, 1]) {
    for (const offset of [-0.32, 0.32]) {
      const [x, z] = along === "x" ? [cx + offset, cz + side * (hw + 0.18)] : [cx + side * (hl + 0.18), cz + offset];
      fit.box([x - 0.21, 0.44, z - 0.21], [x + 0.21, 0.48, z + 0.21], "fabric");
      fit.box([x - 0.19, 0, z - 0.19], [x + 0.19, 0.44, z + 0.19], "gap");
      const [bx0, bx1, bz0, bz1] =
        along === "x" ? [x - 0.21, x + 0.21, z + side * 0.19 - 0.02, z + side * 0.19 + 0.02] : [x + side * 0.19 - 0.02, x + side * 0.19 + 0.02, z - 0.21, z + 0.21];
      fit.box([Math.min(bx0, bx1), 0.48, Math.min(bz0, bz1)], [Math.max(bx0, bx1), 0.85, Math.max(bz0, bz1)], "timber");
    }
  }
  return fit;
}

// ---------------------------------------------------------------------------------------------------
// Services on the outside walls (rear wall outer face at z = 0, outside towards -z)

/** Fan guard: a mid-grey fan behind concentric rings and a cross of spokes, facing -z at depth z. */
function fanGuard<G extends string>(fit: Fit<G>, x: number, y: number, z: number, radius: number) {
  fit.cyl([x, y, z - 0.002], radius, 0.004, "grille", "z");
  fit.cyl([x, y, z - 0.006], radius * 0.18, 0.006, "unit", "z");
  for (let i = 1; i <= 4; i++) fit.ring([x, y, z - 0.008], (radius * i) / 4, 0.0035, "unit");
  fit.box([x - radius, y - 0.003, z - 0.011], [x + radius, y + 0.003, z - 0.005], "unit");
  fit.box([x - 0.003, y - radius, z - 0.011], [x + 0.003, y + radius, z - 0.005], "unit");
}

/**
 * Air conditioning condenser on two feet just off the ground, with the fan guard on its face, the valve cover on its
 * side, insulated refrigerant pipes looping down and into the wall, and an isolator switch on the wall beside it.
 */
export function acUnit<G extends string>(group: G, x: number) {
  const fit = new Fit(group);
  const [y0, y1, z0, z1] = [0.08, 0.63, -0.41, -0.12];
  for (const fx of [x - 0.3, x + 0.3]) fit.box([fx - 0.03, 0, z0 + 0.02], [fx + 0.03, y0, z1 - 0.02], "gap");
  fit.rbox([x - 0.4, y0, z0], [x + 0.4, y1, z1], "unit", 0.025);
  fanGuard(fit, x - 0.08, (y0 + y1) / 2, z0, 0.2);
  fit.rbox([x + 0.39, 0.16, -0.33], [x + 0.44, 0.36, -0.17], "unit", 0.012);
  // Insulated pipes: out of the valve cover, down, then back into the wall low down
  const px = x + 0.5;
  fit.cyl([x + 0.47, 0.28, -0.25], 0.022, 0.07, "linen", "x");
  fit.cyl([px, 0.2, -0.25], 0.022, 0.18, "linen");
  fit.cyl([px, 0.11, -0.125], 0.022, 0.27, "linen", "z");
  fit.rbox([px - 0.05, 0.06, -0.025], [px + 0.05, 0.16, 0], "unit", 0.01);
  // Isolator switch on the wall
  fit.rbox([x + 0.22, 0.85, -0.06], [x + 0.34, 1.0, 0], "unit", 0.01);
  fit.box([x + 0.265, 0.9, -0.064], [x + 0.295, 0.95, -0.06], "grille");
  return fit;
}

/**
 * Heat pump hot water (all-in-one): a round tank with the heat pump on top, its fan guard facing out, on a low slab,
 * with its water pipes running into the wall.
 */
export function heatPumpHotWater<G extends string>(group: G, x: number) {
  const fit = new Fit(group);
  const zc = -0.42;
  fit.box([x - 0.36, -0.2, zc - 0.36], [x + 0.36, 0.03, zc + 0.36], "concrete");
  fit.cyl([x, 0.05, zc], 0.24, 0.04, "gap");
  fit.cyl([x, 0.695, zc], 0.27, 1.25, "unit");
  fit.cyl([x, 1.33, zc], 0.275, 0.02, "grille");
  fit.cyl([x, 1.5, zc], 0.28, 0.32, "unit");
  fit.cyl([x, 1.675, zc], 0.25, 0.03, "unit");
  fanGuard(fit, x, 1.5, zc - 0.285, 0.11);
  for (const [px, py] of [
    [x + 0.08, 0.3],
    [x + 0.16, 1.05],
  ]) {
    fit.cyl([px, py, (zc + 0.24) / 2], 0.014, -(zc + 0.24) + 0.02, "stainless", "z");
  }
  return fit;
}

/** Slim battery with a status light, and the inverter above it with its display, joined by conduit. */
export function batteryAndInverter<G extends string>(group: G, x: number) {
  const fit = new Fit(group);
  fit.rbox([x, 0.35, -0.15], [x + 0.6, 1.45, -0.01], "unit", 0.04);
  fit.box([x + 0.29, 1.05, -0.153], [x + 0.31, 1.3, -0.149], "stainless");
  fit.rbox([x + 0.06, 1.56, -0.17], [x + 0.54, 2.0, -0.01], "unit", 0.025);
  fit.box([x + 0.23, 1.84, -0.173], [x + 0.37, 1.91, -0.169], "appliance");
  fit.cyl([x + 0.3, 1.505, -0.07], 0.012, 0.11, "unit");
  fit.cyl([x + 0.48, 2.3, -0.04], 0.012, 0.6, "unit");
  return fit;
}

/** Meter box and sub-board: a shallow cabinet with a door seam and a small handle. */
export function subBoard<G extends string>(group: G, x: number) {
  const fit = new Fit(group);
  fit.rbox([x, 1.1, -0.13], [x + 0.42, 1.75, -0.01], "unit", 0.015);
  fit.box([x + 0.02, 1.12, -0.133], [x + 0.4, 1.122, -0.129], "gap");
  fit.box([x + 0.02, 1.728, -0.133], [x + 0.4, 1.73, -0.129], "gap");
  fit.box([x + 0.02, 1.12, -0.133], [x + 0.022, 1.73, -0.129], "gap");
  fit.box([x + 0.398, 1.12, -0.133], [x + 0.4, 1.73, -0.129], "gap");
  fit.box([x + 0.35, 1.38, -0.14], [x + 0.37, 1.48, -0.13], "grille");
  return fit;
}

/** Square downpipe down a corner from the roof to the ground, with a short offset at the top and a shoe at the base. */
export function downpipe<G extends string>(group: G, x: number, top: number) {
  const fit = new Fit(group);
  fit.box([x - 0.05, 0.05, -0.085], [x + 0.05, top - 0.25, -0.01], "downpipe");
  fit.box([x - 0.05, top - 0.25, -0.14], [x + 0.05, top - 0.05, -0.01], "downpipe");
  fit.box([x - 0.055, 0, -0.14], [x + 0.055, 0.06, -0.01], "downpipe");
  return fit;
}

/** Wall-mounted electric vehicle charger on an east wall (outer face at x = face), with its cable coiled on a holster. */
export function evCharger<G extends string>(group: G, face: number, z: number) {
  const fit = new Fit(group);
  fit.rbox([face, 1.05, z - 0.13], [face + 0.11, 1.45, z + 0.13], "unit", 0.03);
  fit.box([face + 0.11, 1.32, z - 0.05], [face + 0.113, 1.36, z + 0.05], "appliance");
  fit.rbox([face, 0.86, z - 0.04], [face + 0.07, 0.98, z + 0.04], "unit", 0.015);
  for (const r of [0.13, 0.145, 0.16]) fit.ring([face + 0.05, 0.84, z], r, 0.012, "appliance", "x");
  return fit;
}

/** Merge several fittings into block and cylinder lists. */
type Parts<G extends string> = { blocks: Block<G>[]; cylinders: Cylinder<G>[]; roundedBoxes: Rounded<G>[]; tori: Ring<G>[] };

export function collect<G extends string>(...fits: Parts<G>[]): Parts<G> {
  return {
    blocks: fits.flatMap((f) => f.blocks),
    cylinders: fits.flatMap((f) => f.cylinders),
    roundedBoxes: fits.flatMap((f) => f.roundedBoxes),
    tori: fits.flatMap((f) => f.tori),
  };
}
