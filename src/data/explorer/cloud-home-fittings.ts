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
  /** Part of a ring, in radians from the ring's local +x (default the full circle). */
  arc?: number;
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

  ring(centre: Vec3, radius: number, tube: number, material: MaterialKey, axis: "x" | "y" | "z" = "z", arc?: number) {
    this.tori.push({ group: this.group, level: this.level, material, centre: [centre[0], centre[1] + this.floor, centre[2]], radius, tube, axis, arc });
  }

  cyl(centre: Vec3, radius: number, length: number, material: MaterialKey, axis: "x" | "y" | "z" = "y") {
    this.cylinders.push({ group: this.group, level: this.level, material, centre: [centre[0], centre[1] + this.floor, centre[2]], radius, length, axis });
  }

  /**
   * A box against a wall, in wall terms: `u` along the wall, `d` out from the wall face, `y` up. The wall runs along
   * x (a rear or front wall at z = face) or along z (a side wall at x = face); `dir` is the direction into the room.
   */
  wall(along: "x" | "z", face: number, dir: 1 | -1) {
    const bounds = (u: [number, number], d: [number, number], y: [number, number]): [Vec3, Vec3] => {
      const d0 = face + dir * d[0];
      const d1 = face + dir * d[1];
      const [a, b] = [Math.min(d0, d1), Math.max(d0, d1)];
      return along === "x" ? [[u[0], y[0], a], [u[1], y[1], b]] : [[a, y[0], u[0]], [b, y[1], u[1]]];
    };
    const place = (u: [number, number], d: [number, number], y: [number, number], material: MaterialKey) => {
      const [min, max] = bounds(u, d, y);
      this.box(min, max, material);
    };
    return Object.assign(place, { bounds });
  }
}

type Place = ReturnType<Fit<string>["wall"]>;

/**
 * Door and drawer fronts: separate panels standing 18 mm proud of the carcass with 3 mm gaps between them, so the
 * joins read as real shadow lines. `rows` splits the height into drawers (fractions from the bottom).
 */
function fronts(place: Place, u: [number, number], depth: number, y: [number, number], { every = 0.6, rows }: { every?: number; rows?: number[] } = {}) {
  const gap = 0.003;
  const count = Math.max(1, Math.round((u[1] - u[0]) / every));
  const step = (u[1] - u[0]) / count;
  const cuts = rows ? [0, ...rows, 1] : [0, 1];
  for (let i = 0; i < count; i++) {
    const u0 = u[0] + step * i + gap / 2;
    const u1 = u[0] + step * (i + 1) - gap / 2;
    for (let r = 0; r < cuts.length - 1; r++) {
      const y0 = y[0] + (y[1] - y[0]) * cuts[r] + gap / 2;
      const y1 = y[0] + (y[1] - y[0]) * cuts[r + 1] - gap / 2;
      place([u0, u1], [depth - 0.018, depth], [y0, y1], "joinery");
    }
  }
}

/**
 * Base cabinets: recessed kick, carcass, door or drawer fronts, a finger-pull rail under the benchtop, and the
 * benchtop with a small overhang. Benchtops are 33 mm (laminate); the stone upgrade adds a thicker edge (`stoneEdge`).
 */
export function baseRun(place: Place, u: [number, number], { bench = true, rows, every }: { bench?: boolean; rows?: number[]; every?: number } = {}) {
  place(u, [0, 0.52], [0, 0.1], "gap");
  place(u, [0, 0.56], [0.1, 0.84], "joinery");
  fronts(place, u, 0.58, [0.1, 0.84], { rows, every });
  place(u, [0.54, 0.575], [0.84, 0.867], "gap"); // finger-pull rail
  if (bench) place(u, [0, 0.62], [0.867, 0.9], "benchtop");
}

/** The thicker front edge that stone benchtops show (40 mm), in its own group so it appears with the upgrade. */
function stoneEdge(place: Place, u: [number, number]) {
  place(u, [0.6, 0.62], [0.86, 0.867], "benchtop");
}

/** Overhead cupboards 350 deep from 1650 to 2400 with fronts, and the LED strip light under them. */
export function overheads(place: Place, u: [number, number], { led = true } = {}) {
  place(u, [0, 0.33], [1.65, 2.4], "joinery");
  fronts(place, u, 0.35, [1.65, 2.4], { every: 0.45 });
  if (led) place([u[0] + 0.03, u[1] - 0.03], [0.26, 0.29], [1.643, 1.65], "led");
}

/** Full-height joinery (pantry, robe) with door fronts. */
export function tallUnit(place: Place, u: [number, number], depth = 0.6, top = 2.4) {
  place(u, [0, depth - 0.08], [0, 0.1], "gap");
  place(u, [0, depth - 0.02], [0.1, top], "joinery");
  fronts(place, u, depth, [0.1, top], { every: 0.5, rows: [0.86] });
}

/** Wall oven: stainless frame, black glass door with a bar handle, and a control strip with two knobs. */
function oven(fit: Fit<string>, place: Place, u: [number, number], d: number, y: number, normal: "x" | "z", at: (uu: number, dd: number) => [number, number]) {
  const [u0, u1] = u;
  place([u0, u1], [d - 0.02, d], [y, y + 0.6], "stainless");
  place([u0 + 0.02, u1 - 0.02], [d, d + 0.004], [y + 0.02, y + 0.46], "appliance");
  place([u0 + 0.02, u1 - 0.02], [d, d + 0.003], [y + 0.5, y + 0.58], "appliance");
  const [hx, hz] = at((u0 + u1) / 2, d + 0.035);
  fit.cyl([hx, y + 0.43, hz], 0.01, u1 - u0 - 0.12, "stainless", normal === "x" ? "z" : "x");
  for (const k of [0.25, 0.75]) {
    const [kx, kz] = at(u0 + (u1 - u0) * k, d + 0.012);
    fit.cyl([kx, y + 0.54, kz], 0.016, 0.02, "stainless", normal);
  }
}

/** Microwave: black glass door with a stainless control panel beside it. */
function microwave(place: Place, u: [number, number], d: number, y: number) {
  const [u0, u1] = u;
  place([u0, u1], [d - 0.02, d], [y, y + 0.38], "stainless");
  place([u0 + 0.02, u0 + (u1 - u0) * 0.74], [d, d + 0.004], [y + 0.02, y + 0.36], "appliance");
  place([u0 + (u1 - u0) * 0.78, u1 - 0.02], [d, d + 0.003], [y + 0.24, y + 0.33], "appliance");
}

// ---------------------------------------------------------------------------------------------------
// Kitchen: front run with the sink under the window and the dishwasher beside it, east run with the cooktop and the
// oven and microwave tower, west fridge recess and pantry. Splashback tiled to the window sill and the overheads.

export function kitchen<G extends string>(group: G, width: number, front: number, sinkAt: number) {
  const fit = new Fit(group);
  const stone = new Fit("stone" as G);
  const ext = 0.115;
  const inX0 = ext;
  const inX1 = width - ext;
  const inFront = front - ext;
  const frontRun = fit.wall("x", inFront, -1);
  const eastRun = fit.wall("z", inX1, -1);
  const westRun = fit.wall("z", inX0, 1);
  const frontAt = (u: number, d: number): [number, number] => [u, inFront - d];
  const eastAt = (u: number, d: number): [number, number] => [inX1 - d, u];

  // Front run: cupboards, the sink cabinet, the dishwasher, then drawers to the corner
  const [s0, s1] = [sinkAt - 0.45, sinkAt + 0.45];
  baseRun(frontRun, [inX0, s0], { bench: false });
  frontRun([s0, s1], [0, 0.52], [0, 0.1], "gap");
  frontRun([s0, s1], [0, 0.56], [0.1, 0.66], "joinery");
  fronts(frontRun, [s0, s1], 0.58, [0.1, 0.84], { every: 0.45 });
  frontRun([s0, s1], [0.54, 0.575], [0.84, 0.867], "gap");
  // Dishwasher: integrated panel with a stainless strip handle
  frontRun([s1, s1 + 0.6], [0, 0.52], [0, 0.1], "gap");
  frontRun([s1 + 0.0015, s1 + 0.5985], [0, 0.58], [0.1, 0.84], "joinery");
  frontRun([s1 + 0.1, s1 + 0.5], [0.58, 0.6], [0.8, 0.815], "stainless");
  baseRun(frontRun, [s1 + 0.6, inX1 - 0.6], { bench: false, rows: [0.33, 0.66], every: 0.5 });
  // Benchtop around the sink cut-out (the bowls sit under it)
  const [c0, c1] = [sinkAt - 0.41, sinkAt + 0.41];
  frontRun([inX0, c0], [0, 0.62], [0.867, 0.9], "benchtop");
  frontRun([c1, inX1 - 0.6], [0, 0.62], [0.867, 0.9], "benchtop");
  frontRun([c0, c1], [0, 0.1], [0.867, 0.9], "benchtop");
  frontRun([c0, c1], [0.52, 0.62], [0.867, 0.9], "benchtop");
  stoneEdge(stone.wall("x", inFront, -1), [inX0, inX1 - 0.6]);
  // Double bowl: floors 200 deep, walls, divider, and a gooseneck mixer behind
  for (const [b0, b1] of [
    [c0, sinkAt - 0.01],
    [sinkAt + 0.01, c1],
  ] as [number, number][]) {
    frontRun([b0, b1], [0.1, 0.52], [0.66, 0.67], "stainless");
    frontRun([b0, b1], [0.1, 0.11], [0.67, 0.867], "stainless");
    frontRun([b0, b1], [0.51, 0.52], [0.67, 0.867], "stainless");
    frontRun([b0, b0 + 0.01], [0.1, 0.52], [0.67, 0.867], "stainless");
    frontRun([b1 - 0.01, b1], [0.1, 0.52], [0.67, 0.867], "stainless");
    const [wx, wz] = frontAt((b0 + b1) / 2, 0.31);
    fit.cyl([wx, 0.672, wz], 0.03, 0.004, "appliance");
  }
  // Divider between the bowls, closed to just under the benchtop
  frontRun([sinkAt - 0.01, sinkAt + 0.01], [0.1, 0.52], [0.66, 0.862], "stainless");
  const [mx, mz] = frontAt(sinkAt, 0.05);
  fit.cyl([mx, 0.905, mz], 0.03, 0.01, "stainless");
  fit.cyl([mx, 1.06, mz], 0.014, 0.3, "stainless");
  fit.ring([mx, 1.21, mz - 0.09], 0.09, 0.012, "stainless", "x", Math.PI);
  fit.cyl([mx, 1.17, mz - 0.18], 0.012, 0.08, "stainless");
  fit.cyl([mx + 0.04, 1.02, mz], 0.008, 0.08, "stainless", "x");
  // Splashback (2 Bed set sheet 11): one band from the benchtop to the window sill along the whole run, then up to
  // the underside of the overheads wherever there are overheads
  const [w0, w1] = [sinkAt - 1, sinkAt + 1];
  frontRun([inX0, inX1], [0, 0.01], [0.9, 1.4], "tile");
  frontRun([inX0, w0 - 0.05], [0, 0.01], [1.4, 1.65], "tile");
  frontRun([w1 + 0.05, inX1], [0, 0.01], [1.4, 1.65], "tile");
  overheads(frontRun, [inX0, sinkAt - 1.05]);
  overheads(frontRun, [sinkAt + 1.05, inX1]);

  // East run: blind corner, drawers under the cooktop, then the oven and microwave tower
  const cook: [number, number] = [inFront - 1.6, inFront - 0.6];
  baseRun(eastRun, [inFront - 0.6, inFront], { bench: false });
  baseRun(eastRun, cook, { bench: false, rows: [0.33, 0.66], every: 0.5 });
  eastRun([inFront - 1.6, inFront], [0, 0.62], [0.867, 0.9], "benchtop");
  stoneEdge(stone.wall("z", inX1, -1), [inFront - 1.6, inFront - 0.6]);
  eastRun([inFront - 1.6, inFront - 0.62], [0, 0.01], [0.9, 1.65], "tile");
  // Induction cooktop: black glass with a fine frame and four marked zones
  const cu = (cook[0] + cook[1]) / 2;
  eastRun([cu - 0.3, cu + 0.3], [0.06, 0.58], [0.9, 0.906], "appliance");
  for (const [du, dd, r] of [
    [-0.14, 0.2, 0.09],
    [0.14, 0.2, 0.07],
    [-0.14, 0.44, 0.07],
    [0.14, 0.44, 0.09],
  ]) {
    const [zx, zz] = eastAt(cu + du, dd);
    fit.ring([zx, 0.907, zz], r, 0.0025, "grille", "y");
  }
  // Slide-out rangehood under the overheads
  eastRun([cu - 0.3, cu + 0.3], [0.0, 0.33], [1.6, 1.65], "stainless");
  overheads(eastRun, [inFront - 1.65, inFront - 0.6], { led: false });
  eastRun([inFront - 1.62, inFront - 0.63], [0.26, 0.29], [1.593, 1.6], "led");
  // Tower: oven, microwave and cupboards
  const tower: [number, number] = [inFront - 2.2, inFront - 1.6];
  eastRun(tower, [0, 0.52], [0, 0.1], "gap");
  eastRun(tower, [0, 0.58], [0.1, 2.4], "joinery");
  fronts(eastRun, tower, 0.6, [0.1, 0.32]);
  fronts(eastRun, tower, 0.6, [1.5, 2.4]);
  oven(fit as Fit<string>, eastRun, [tower[0] + 0.01, tower[1] - 0.01], 0.6, 0.34, "x", eastAt);
  microwave(eastRun, [tower[0] + 0.01, tower[1] - 0.01], 0.6, 1.05);
  eastRun([tower[0] + 0.01, tower[1] - 0.01], [0.58, 0.6], [0.94, 1.05], "joinery");
  eastRun([tower[0] + 0.01, tower[1] - 0.01], [0.58, 0.6], [1.43, 1.5], "joinery");

  // West: fridge in its recess under a cupboard, then the pantry
  const recess: [number, number] = [inFront - 2.0, inFront - 1.28];
  westRun(recess, [0, 0.62], [2.0, 2.4], "joinery");
  fronts(westRun, recess, 0.64, [2.0, 2.4], { every: 0.36 });
  const westAt = (u: number, d: number): [number, number] => [inX0 + d, u];
  fridgeAt(fit as Fit<string>, westRun, [recess[0] + 0.02, recess[1] - 0.02], westAt);
  tallUnit(westRun, [inFront - 1.28, inFront - 0.66], 0.6);
  return collect(fit, stone as unknown as Fit<G>);
}

/** Fridge in a west wall recess: body, freezer drawer, two doors, gaps and handles. */
function fridgeAt(fit: Fit<string>, place: Place, u: [number, number], at: (uu: number, dd: number) => [number, number]) {
  const [u0, u1] = u;
  const mid = (u0 + u1) / 2;
  place([u0, u1], [0.02, 0.6], [0.02, 1.82], "stainless");
  place([u0, u1], [0.6, 0.66], [0.02, 0.7], "stainless");
  place([u0, mid - 0.002], [0.6, 0.66], [0.705, 1.82], "stainless");
  place([mid + 0.002, u1], [0.6, 0.66], [0.705, 1.82], "stainless");
  place([u0, u1], [0.6, 0.661], [0.7, 0.705], "gap");
  place([mid - 0.002, mid + 0.002], [0.6, 0.661], [0.705, 1.82], "gap");
  for (const hu of [mid - 0.05, mid + 0.05]) {
    const [hx, hz] = at(hu, 0.695);
    fit.cyl([hx, 1.25, hz], 0.011, 0.55, "stainless");
  }
  const [bx, bz] = at(mid, 0.695);
  fit.cyl([bx, 0.6, bz], 0.011, u1 - u0 - 0.16, "stainless", "z");
}

// ---------------------------------------------------------------------------------------------------
// Bathrooms (2 Bed set sheet 11 bath and powder room layouts): tiled floor, a hobless shower behind a glass screen,
// wall-hung vanity with mirror cabinet, washing machine and trough, toilet, towel rail. Grab rails, in their own
// group, appear with the accessible bathroom extra.

/** Wall-faced toilet against a wall: cistern, pan and closed seat with soft edges, and a dual flush button. */
function toilet(fit: Fit<string>, side: Place, at: (u: number, d: number) => [number, number], u: number) {
  fit.rbox(...span(side, [u - 0.19, u + 0.19], [0.01, 0.17], [0.38, 0.84]), "ceramic", 0.04);
  fit.rbox(...span(side, [u - 0.18, u + 0.18], [0.12, 0.62], [0, 0.39]), "ceramic", 0.07);
  fit.rbox(...span(side, [u - 0.185, u + 0.185], [0.13, 0.64], [0.385, 0.43]), "ceramic", 0.03);
  const [bx, bz] = at(u, 0.09);
  fit.cyl([bx, 0.845, bz], 0.035, 0.012, "stainless");
}

/** World min and max for a wall-relative box (for rounded boxes). */
function span(place: Place, u: [number, number], d: [number, number], y: [number, number]): [Vec3, Vec3] {
  return (place as Place & { bounds(u: [number, number], d: [number, number], y: [number, number]): [Vec3, Vec3] }).bounds(u, d, y);
}

/** Heated towel ladder on a wall with a folded towel over it. */
function towelRail(fit: Fit<string>, place: Place, at: (u: number, d: number) => [number, number], u: number, normal: "x" | "z") {
  const along = normal === "x" ? "z" : "x";
  for (const uu of [u - 0.2, u + 0.2]) {
    const [px, pz] = at(uu, 0.06);
    fit.cyl([px, 1.05, pz], 0.012, 0.7, "stainless");
  }
  for (let i = 0; i < 5; i++) {
    const [rx, rz] = at(u, 0.06);
    fit.cyl([rx, 0.75 + i * 0.15, rz], 0.009, 0.4, "stainless", along);
  }
  place([u - 0.16, u + 0.16], [0.035, 0.085], [1.0, 1.36], "linen");
}

export function bathroom<G extends string>(
  group: G,
  { x, z, laundry = true, level = "gf", floor = 0 }: { x: [number, number]; z: [number, number]; laundry?: boolean; level?: string; floor?: number },
) {
  const fit = new Fit(group, level, floor);
  const access = new Fit("access" as G, level, floor);
  const [x0, x1] = x;
  const [z0, z1] = z;
  const back = fit.wall("x", z1, -1); // fittings along the far wall
  const backAt = (u: number, d: number): [number, number] => [u, z1 - d];
  const side = fit.wall("z", x1, -1); // the toilet wall
  const sideAt = (u: number, d: number): [number, number] => [x1 - d, u];
  const west = fit.wall("z", x0, 1);
  const front = fit.wall("x", z0, 1);
  const frontAt = (u: number, d: number): [number, number] => [u, z0 + d];

  // Floor tiles and a tiled skirting
  fit.box([x0, 0, z0], [x1, 0.008, z1], "floorTile");
  // Shower (bath layout, 2 Bed set sheet 11): hobless 900 × 900 corner with full-height wall tiles, falling to a
  // centre floor waste. A fixed glass return on the vanity side; the front is a fixed panel and a hinged door that
  // swings out into the room. The rail shower and mixer are on the side wall.
  const sx1 = x0 + 0.9;
  const sz0 = z1 - 0.9;
  west([sz0 - 0.05, z1], [0, 0.008], [0, 2.1], "tile");
  back([x0, sx1 + 0.05], [0, 0.008], [0, 2.1], "tile");
  fit.box([x0 + 0.4, 0.008, sz0 + 0.4], [x0 + 0.5, 0.011, sz0 + 0.5], "stainless"); // shower floor waste
  fit.box([x0 + 0.42, 0.011, sz0 + 0.42], [x0 + 0.48, 0.012, sz0 + 0.48], "grille");
  const glass = (min: Vec3, max: Vec3) => fit.box(min, max, "glass");
  glass([sx1 - 0.004, 0.01, sz0], [sx1 + 0.004, 2.0, z1 - 0.01]); // fixed return on the vanity side
  glass([x0 + 0.01, 0.01, sz0 - 0.004], [x0 + 0.44, 2.0, sz0 + 0.004]); // fixed front panel
  glass([x0 + 0.455, 0.01, sz0 - 0.004], [sx1 - 0.01, 2.0, sz0 + 0.004]); // hinged door
  fit.box([x0, 1.99, sz0 - 0.008], [sx1 + 0.008, 2.005, sz0 + 0.008], "stainless"); // top rail
  fit.box([sx1 - 0.008, 1.99, sz0], [sx1 + 0.008, 2.005, z1], "stainless");
  for (const y of [0.3, 1.7]) fit.box([sx1 - 0.03, y, sz0 - 0.012], [sx1 - 0.01, y + 0.08, sz0 + 0.012], "stainless"); // hinges
  fit.cyl([x0 + 0.5, 1.05, sz0 - 0.03], 0.01, 0.3, "stainless"); // door handle
  fit.cyl([x0 + 0.5, 1.05, sz0 + 0.03], 0.01, 0.3, "stainless");
  // Rail shower, overhead rose on an arm and the mixer, on the side wall
  const wx = x0 + 0.05;
  fit.cyl([wx, 1.4, sz0 + 0.45], 0.012, 0.9, "stainless");
  fit.rbox([wx + 0.02, 1.45, sz0 + 0.42], [wx + 0.06, 1.65, sz0 + 0.48], "stainless", 0.015);
  fit.cyl([x0 + 0.2, 2.05, sz0 + 0.45], 0.01, 0.3, "stainless", "x");
  fit.cyl([x0 + 0.35, 2.035, sz0 + 0.45], 0.12, 0.012, "stainless");
  fit.cyl([x0 + 0.01, 1.0, sz0 + 0.25], 0.06, 0.012, "stainless", "x");
  fit.cyl([x0 + 0.05, 1.0, sz0 + 0.25], 0.01, 0.07, "stainless", "x");
  // Room floor waste (FW) in the middle of the bathroom
  const [fx, fz] = [(x0 + x1) / 2, (z0 + sz0) / 2];
  fit.box([fx - 0.05, 0.008, fz - 0.05], [fx + 0.05, 0.011, fz + 0.05], "stainless");

  // Wall-hung vanity with two drawers, an integrated basin, a mixer and a mirror cabinet
  const v0 = x0 + 0.95;
  const v1 = v0 + 0.85;
  back([v0, v1], [0, 0.44], [0.42, 0.8], "joinery");
  fronts(back, [v0, v1], 0.46, [0.42, 0.8], { every: 0.85, rows: [0.5] });
  const [b0, b1] = [v0 + 0.22, v1 - 0.22];
  back([v0, b0], [0, 0.47], [0.8, 0.84], "ceramic");
  back([b1, v1], [0, 0.47], [0.8, 0.84], "ceramic");
  back([b0, b1], [0, 0.12], [0.8, 0.84], "ceramic");
  back([b0, b1], [0.42, 0.47], [0.8, 0.84], "ceramic");
  back([b0, b1], [0.12, 0.42], [0.72, 0.73], "ceramic");
  back([b0, b0 + 0.01], [0.12, 0.42], [0.73, 0.84], "ceramic");
  back([b1 - 0.01, b1], [0.12, 0.42], [0.73, 0.84], "ceramic");
  back([b0, b1], [0.12, 0.13], [0.73, 0.84], "ceramic");
  back([b0, b1], [0.41, 0.42], [0.73, 0.84], "ceramic");
  const [tx, tz] = backAt((v0 + v1) / 2, 0.06);
  fit.cyl([tx, 0.92, tz], 0.012, 0.16, "stainless");
  fit.ring([tx, 1.0, tz - 0.05], 0.05, 0.009, "stainless", "x", Math.PI);
  back([v0 + 0.02, v1 - 0.02], [0, 0.12], [1.1, 1.85], "joinery");
  back([v0 + 0.02, (v0 + v1) / 2 - 0.0015], [0.12, 0.125], [1.11, 1.84], "mirror");
  back([(v0 + v1) / 2 + 0.0015, v1 - 0.02], [0.12, 0.125], [1.11, 1.84], "mirror");

  if (laundry && x1 - v1 > 1.1) {
    // Front-loading washing machine and a stainless trough with a gooseneck tap
    const w0 = v1 + 0.08;
    fit.rbox(...span(back, [w0, w0 + 0.6], [0.02, 0.62], [0.01, 0.85]), "unit", 0.03);
    const [dx, dz] = backAt(w0 + 0.3, 0.625);
    fit.ring([dx, 0.4, dz], 0.19, 0.025, "stainless");
    fit.cyl([dx, 0.4, dz + 0.004], 0.17, 0.01, "appliance", "z");
    back([w0 + 0.04, w0 + 0.56], [0.62, 0.623], [0.72, 0.8], "grille");
    const t0 = x1 - 0.52;
    back([t0, x1 - 0.03], [0, 0.48], [0.08, 0.86], "stainless");
    back([t0, x1 - 0.03], [0, 0.03], [0.86, 0.9], "stainless");
    back([t0, x1 - 0.03], [0.45, 0.48], [0.86, 0.9], "stainless");
    back([t0, t0 + 0.03], [0, 0.48], [0.86, 0.9], "stainless");
    back([x1 - 0.06, x1 - 0.03], [0, 0.48], [0.86, 0.9], "stainless");
    back([t0 + 0.03, x1 - 0.06], [0.03, 0.45], [0.86, 0.861], "grille");
    const [gx, gz] = backAt((t0 + x1) / 2, 0.06);
    fit.cyl([gx, 1.05, gz], 0.012, 0.3, "stainless");
    fit.ring([gx, 1.2, gz - 0.08], 0.08, 0.01, "stainless", "x", Math.PI);
  }

  // Toilet on the side wall, roll holder beside it, towel rail on the wall opposite the vanity
  const tu = z0 + 0.5;
  toilet(fit as Fit<string>, side, sideAt, tu);
  const [hx, hz] = sideAt(tu + 0.38, 0.05);
  fit.cyl([hx, 0.7, hz], 0.05, 0.1, "linen", "x");
  // Towel rail on the bedroom wall, between the cavity slider and the toilet
  towelRail(fit as Fit<string>, front, frontAt, x1 - 0.82, "z");
  // Grab rails (accessible extra): beside the toilet and in the shower
  const [gx1, gz1] = sideAt(tu + 0.3, 0.06);
  access.cyl([gx1, 0.8, gz1], 0.016, 0.6, "stainless", "z");
  access.cyl([x0 + 0.06, 1.1, z1 - 0.7], 0.016, 0.6, "stainless", "z");
  return collect(fit, access as unknown as Fit<G>);
}

/** Powder room: tiled floor, a small wall-hung basin with a mirror, and a toilet. */
export function powderRoom<G extends string>(group: G, { x, z }: { x: [number, number]; z: [number, number] }) {
  const fit = new Fit(group);
  fit.box([x[0], 0, z[0]], [x[1], 0.008, z[1]], "floorTile");
  const side = fit.wall("z", x[1], -1);
  const sideAt = (u: number, d: number): [number, number] => [x[1] - d, u];
  toilet(fit as Fit<string>, side, sideAt, z[0] + 0.45);
  const back = fit.wall("x", z[1], -1);
  const backAt = (u: number, d: number): [number, number] => [u, z[1] - d];
  const [b0, b1] = [x[0] + 0.1, x[0] + 0.55];
  fit.rbox(...span(back, [b0, b1], [0, 0.3], [0.72, 0.86]), "ceramic", 0.03);
  back([b0 + 0.06, b1 - 0.06], [0.06, 0.26], [0.86, 0.861], "floorTile");
  const [tx, tz] = backAt((b0 + b1) / 2, 0.04);
  fit.cyl([tx, 0.94, tz], 0.01, 0.16, "stainless");
  fit.ring([tx, 1.02, tz - 0.04], 0.04, 0.008, "stainless", "x", Math.PI);
  back([b0, b1], [0, 0.02], [1.1, 1.75], "mirror");
  return fit;
}

// ---------------------------------------------------------------------------------------------------
// Furniture

/** Centre of a wall-relative box, in plan, with its top height. */
function centreOf(place: Place, u: [number, number], d: [number, number], y: number): Vec3 {
  const [min, max] = span(place, u, d, [y, y]);
  return [(min[0] + max[0]) / 2, y, (min[2] + max[2]) / 2];
}

/**
 * Bedside table: a rounded top over a drawer box with its front and pull, on four slim legs, with a lamp (round base,
 * stem and linen shade) and a small book.
 */
function bedside<G extends string>(fit: Fit<G>, place: Place, u: [number, number]) {
  const [u0, u1] = u;
  for (const lu of [u0 + 0.02, u1 - 0.045]) for (const ld of [0.03, 0.355]) place([lu, lu + 0.025], [ld, ld + 0.025], [0, 0.3], "timber");
  fit.rbox(...span(place, u, [0.02, 0.4], [0.3, 0.5]), "timber", 0.012);
  place([u0 + 0.02, u1 - 0.02], [0.4, 0.404], [0.32, 0.46], "timber");
  place([u0 + 0.02, u1 - 0.02], [0.404, 0.406], [0.388, 0.392], "gap");
  place([(u0 + u1) / 2 - 0.05, (u0 + u1) / 2 + 0.05], [0.406, 0.42], [0.415, 0.425], "stainless");
  const lamp = centreOf(place, [u0 + 0.12, u0 + 0.26], [0.12, 0.26], 0.5);
  fit.cyl([lamp[0], 0.515, lamp[2]], 0.065, 0.03, "ceramic");
  fit.cyl([lamp[0], 0.63, lamp[2]], 0.008, 0.2, "stainless");
  fit.cyl([lamp[0], 0.79, lamp[2]], 0.11, 0.17, "linen");
  fit.box(...span(place, [u1 - 0.17, u1 - 0.05], [0.18, 0.34], [0.5, 0.525]), "fabric");
}

/**
 * Queen bed with its head against a wall: an upholstered, rounded headboard, a raised base on a recessed plinth, a
 * soft mattress, the duvet folded back at the top with a throw across the foot, and four pillows. Bedside tables
 * either side.
 */
export function bed<G extends string>(group: G, { along, face, dir, centre, level = "gf", floor = 0 }: { along: "x" | "z"; face: number; dir: 1 | -1; centre: number; level?: string; floor?: number }) {
  const fit = new Fit(group, level, floor);
  const place = fit.wall(along, face, dir);
  const half = 0.77;
  const u: [number, number] = [centre - half, centre + half];
  const r = (uu: [number, number], d: [number, number], y: [number, number], material: MaterialKey, radius: number) => fit.rbox(...span(place, uu, d, y), material, radius);
  r([u[0] - 0.04, u[1] + 0.04], [0, 0.09], [0.05, 1.15], "fabric", 0.04); // headboard
  place([u[0] + 0.08, u[1] - 0.08], [0.15, 2.0], [0, 0.08], "gap"); // plinth
  r([u[0], u[1]], [0.09, 2.12], [0.08, 0.32], "fabric", 0.03); // base
  r([u[0] + 0.02, u[1] - 0.02], [0.1, 2.1], [0.31, 0.53], "linen", 0.06); // mattress
  r([u[0] - 0.01, u[1] + 0.01], [0.62, 2.13], [0.44, 0.58], "linen", 0.05); // duvet
  r([u[0] - 0.005, u[1] + 0.005], [0.55, 0.72], [0.5, 0.6], "linen", 0.04); // turned-back fold
  r([u[0] - 0.03, u[1] + 0.03], [1.55, 1.98], [0.5, 0.605], "fabric", 0.03); // throw
  for (const [p0, p1] of [
    [u[0] + 0.06, centre - 0.03],
    [centre + 0.03, u[1] - 0.06],
  ] as [number, number][]) {
    r([p0, p1], [0.11, 0.33], [0.52, 0.7], "linen", 0.07); // back pillow, against the headboard
    r([p0 + 0.03, p1 - 0.03], [0.3, 0.52], [0.53, 0.64], "linen", 0.05);
  }
  bedside(fit, place, [u[0] - 0.53, u[0] - 0.08]);
  bedside(fit, place, [u[1] + 0.08, u[1] + 0.53]);
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
  // Coffee table: a thin rounded top on four slim legs, a lower shelf, and a few things on it
  fit.rbox(...span(place, [mid - 0.55, mid + 0.55], [1.3, 1.9], [0.36, 0.39]), "timber", 0.025);
  for (const lu of [mid - 0.5, mid + 0.475]) for (const ld of [1.34, 1.835]) place([lu, lu + 0.025], [ld, ld + 0.025], [0, 0.36], "timber");
  place([mid - 0.5, mid + 0.5], [1.36, 1.84], [0.1, 0.115], "timber");
  fit.box(...span(place, [mid - 0.38, mid - 0.1], [1.42, 1.62], [0.39, 0.42]), "fabric");
  fit.box(...span(place, [mid - 0.35, mid - 0.13], [1.44, 1.6], [0.42, 0.44]), "linen");
  const bowl = centreOf(place, [mid + 0.15, mid + 0.35], [1.5, 1.7], 0.39);
  fit.cyl([bowl[0], 0.42, bowl[2]], 0.11, 0.06, "ceramic");
  fit.cyl([bowl[0], 0.451, bowl[2]], 0.095, 0.004, "gap");
  // Floor lamp in the corner beside the sofa
  const lamp = centreOf(place, [u[1] + 0.12, u[1] + 0.32], [0.12, 0.32], 0);
  fit.cyl([lamp[0], 0.01, lamp[2]], 0.13, 0.02, "appliance");
  fit.cyl([lamp[0], 0.75, lamp[2]], 0.01, 1.45, "appliance");
  fit.cyl([lamp[0], 1.5, lamp[2]], 0.17, 0.26, "linen");
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
      fit.box([x - 0.21, 0.42, z - 0.21], [x + 0.21, 0.48, z + 0.21], "fabric");
      for (const lx of [-0.18, 0.18]) for (const lz of [-0.18, 0.18]) fit.box([x + lx - 0.015, 0, z + lz - 0.015], [x + lx + 0.015, 0.42, z + lz + 0.015], "timber");
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
