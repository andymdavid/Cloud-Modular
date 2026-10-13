import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { Collector, box, tiled } from "./geometry";
import type { MeshTag, SceneModel } from "./viewer";
import {
  CEILING,
  DOOR,
  FLOOR,
  MODULE,
  POD,
  PROFILES,
  WALL,
  WINDOW,
  BULKHEAD,
  blocks,
  fittings,
  runs,
  type GroupId,
  type MaterialKey,
  type PartId,
  type Vec3,
} from "@/data/explorer/module";

/**
 * Builds the typical module from ./module.ts: the braced steel frame, the floor, wall and ceiling build-ups
 * layer by layer, the bathroom pod, joinery, furniture and service runs. Geometry is merged per (group, part,
 * material), so the module renders in a few dozen draw calls.
 */

const { width: W, length: L, height: H } = MODULE;
const COL = PROFILES.column;
const FLOOR_TOP = PROFILES.floorBeamLong.depth; // top of the floor frame
const FFL = FLOOR_TOP + FLOOR.board + FLOOR.screed + FLOOR.vinyl; // finished floor level
const ROOF_UNDERSIDE = H - PROFILES.beam.depth; // underside of the roof frame
const CEILING_TOP = H - PROFILES.roofJoist.depth - CEILING.cavity; // top of the ceiling lining
const CEILING_FACE = CEILING_TOP - CEILING.plasterboard; // finished ceiling
const MIN_SHEET = 0.003; // very thin sheets and membranes are drawn at least this thick so they read

type Tag = MeshTag & { group: GroupId; part?: PartId; material: MaterialKey };

class Out {
  collector = new Collector<Tag>();
  add(group: GroupId, material: MaterialKey, geometry: THREE.BufferGeometry, part?: PartId) {
    this.collector.add(part ? { group, level: "all", material, part } : { group, level: "all", material }, geometry);
  }
  box(group: GroupId, material: MaterialKey, min: Vec3, max: Vec3, part?: PartId) {
    if (max[0] - min[0] < 1e-4 || max[1] - min[1] < 1e-4 || max[2] - min[2] < 1e-4) return;
    this.add(group, material, box(min, max), part);
  }
}

// ---------------------------------------------------------------------------------------------------
// Textures: drawn on canvases with a seeded random source, so the model (and its still) is the same every time

function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D, size: number, random: () => number) => void, seed = 1) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, size, seeded(seed));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Long wood grain running down the texture (v), in boards `boards` across, with dark joints when `joint` is set. */
function woodGrain(base: string, light: string, dark: string, boards: number, joint?: string, seed = 3) {
  return canvasTexture(512, (ctx, size, random) => {
    const boardWidth = size / boards;
    for (let b = 0; b < boards; b++) {
      const x0 = b * boardWidth;
      ctx.fillStyle = base;
      ctx.globalAlpha = 1;
      ctx.fillRect(x0, 0, boardWidth, size);
      // Per-board tone shift so boards read individually
      ctx.fillStyle = random() > 0.5 ? light : dark;
      ctx.globalAlpha = 0.12 + random() * 0.12;
      ctx.fillRect(x0, 0, boardWidth, size);
      for (let i = 0; i < 26; i++) {
        ctx.strokeStyle = random() > 0.4 ? dark : light;
        ctx.globalAlpha = 0.12 + random() * 0.18;
        ctx.lineWidth = 0.6 + random() * 1.6;
        const x = x0 + random() * boardWidth;
        const sway = (random() - 0.5) * boardWidth * 0.18;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.bezierCurveTo(x + sway, size * 0.33, x - sway, size * 0.66, x, size);
        ctx.stroke();
      }
      if (joint) {
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = joint;
        ctx.fillRect(x0, 0, Math.max(2, boardWidth * 0.04), size);
      }
    }
    ctx.globalAlpha = 1;
  }, seed);
}

/** Floor planks along v, with staggered end joints. */
function planks(base: string, light: string, dark: string, seed = 7) {
  const texture = woodGrain(base, light, dark, 4, "#8a6f53", seed);
  const canvas = texture.image as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  const size = canvas.width;
  const random = seeded(seed + 1);
  ctx.fillStyle = "#8a6f53";
  ctx.globalAlpha = 0.7;
  for (let b = 0; b < 4; b++) {
    const y = random() * size;
    ctx.fillRect((b * size) / 4, y, size / 4, 2);
  }
  ctx.globalAlpha = 1;
  texture.needsUpdate = true;
  return texture;
}

/** Fine speckle for boards, screeds and plaster. */
function speckle(base: string, flecks: string[], density = 0.06, seed = 11) {
  return canvasTexture(256, (ctx, size, random) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);
    const count = size * size * density;
    for (let i = 0; i < count; i++) {
      ctx.fillStyle = flecks[Math.floor(random() * flecks.length)];
      ctx.globalAlpha = 0.25 + random() * 0.35;
      ctx.fillRect(random() * size, random() * size, 1 + random(), 1 + random());
    }
    ctx.globalAlpha = 1;
  }, seed);
}

/** Rock wool: a dense mat of short fibres. */
function fibres(base: string, light: string, dark: string, seed = 5) {
  return canvasTexture(256, (ctx, size, random) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 2600; i++) {
      ctx.strokeStyle = random() > 0.5 ? light : dark;
      ctx.globalAlpha = 0.25 + random() * 0.4;
      ctx.lineWidth = 0.5 + random() * 0.8;
      const x = random() * size;
      const y = random() * size;
      const angle = (random() - 0.5) * 0.9;
      const length = 4 + random() * 12;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }, seed);
}

/** Square tiles with grout lines. */
function tiles(base: string, grout: string, count: number, seed = 13) {
  return canvasTexture(256, (ctx, size, random) => {
    const step = size / count;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        ctx.fillStyle = base;
        ctx.fillRect(i * step, j * step, step, step);
        ctx.fillStyle = random() > 0.5 ? "#ffffff" : "#000000";
        ctx.globalAlpha = 0.03;
        ctx.fillRect(i * step, j * step, step, step);
        ctx.globalAlpha = 1;
      }
    }
    ctx.fillStyle = grout;
    for (let i = 0; i <= count; i++) {
      ctx.fillRect(i * step - 1, 0, 2, size);
      ctx.fillRect(0, i * step - 1, size, 2);
    }
  }, seed);
}

function createMaterials(anisotropy: number): Record<MaterialKey, THREE.Material> {
  const std = (color: string, roughness = 0.85, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  const mapped = (texture: THREE.Texture, tile: number, roughness = 0.85, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) =>
    std("#ffffff", roughness, metalness, { map: tiled(texture, tile, anisotropy), ...extra });

  const cladding = woodGrain("#c49c6c", "#d8b78c", "#a07b52", 3, "#6b5038", 21);
  const oak = woodGrain("#c9a57a", "#dcbd94", "#a8835a", 2, undefined, 31);

  return {
    steel: std("#3b3f43", 0.42, 0.55),
    galv: mapped(speckle("#b9bec2", ["#d6dadd", "#9da3a8"], 0.05, 41), 0.5, 0.35, 0.75),
    rockwool: mapped(fibres("#c4a964", "#dcc489", "#9c8248", 51), 0.35, 1),
    plasterboard: mapped(speckle("#e7cfcf", ["#f1dddd", "#d8bcbc"], 0.03, 61), 0.8, 0.95),
    finishBoard: mapped(speckle("#ece7df", ["#f4f0ea", "#ddd6cb"], 0.02, 71), 0.8, 0.9),
    fibreCement: mapped(speckle("#a3a29d", ["#b8b7b2", "#8c8b86"], 0.08, 81), 0.6, 0.95),
    membrane: std("#f1f2ef", 0.7),
    vapour: new THREE.MeshStandardMaterial({ color: "#d9e6ec", roughness: 0.3, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide }),
    batten: std("#9ea4a8", 0.45, 0.7),
    cladding: mapped(cladding, 0.45, 0.55, 0.15, { bumpMap: cladding, bumpScale: 1.5 }),
    roofDeck: std("#c3c7ca", 0.38, 0.75),
    vinyl: mapped(planks("#c8a77f", "#dcc19c", "#a4835e", 91), 0.72, 0.55),
    screed: mapped(speckle("#cfcac1", ["#dcd8d0", "#b9b3a8"], 0.06, 101), 0.6, 0.95),
    glass: new THREE.MeshStandardMaterial({ color: "#bcd3da", roughness: 0.04, metalness: 0.1, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide }),
    frameDark: std("#2a2c2e", 0.45, 0.4),
    door: mapped(oak, 1.2, 0.6),
    podShell: std("#f3f2ef", 0.6),
    tile: mapped(tiles("#dedbd6", "#c4c0b9", 4, 111), 0.6, 0.35),
    porcelain: std("#fbfbfa", 0.18, 0.05),
    chrome: std("#d8dadc", 0.15, 1),
    oak: mapped(oak, 1.2, 0.6),
    joineryWhite: std("#f1efea", 0.55),
    stone: std("#f4f2ee", 0.25),
    appliance: std("#1e2022", 0.25, 0.4),
    fabric: mapped(speckle("#cbbfae", ["#d8cdbe", "#b6a995"], 0.12, 121), 0.4, 1),
    linen: mapped(speckle("#efebe4", ["#f7f4ef", "#e0dad0"], 0.08, 131), 0.4, 1),
    throw: mapped(speckle("#9b8f80", ["#ab9f90", "#887b6c"], 0.12, 141), 0.3, 1),
    rug: mapped(speckle("#d9d3c8", ["#e5e0d7", "#c7bfb2"], 0.15, 151), 0.3, 1),
    conduit: std("#e07b2e", 0.55),
    fitting: std("#f4f4f2", 0.5),
    coldWater: std("#2f78c4", 0.45),
    hotWater: std("#c94436", 0.45),
    waste: std("#c7c9c8", 0.55),
    copper: std("#b87346", 0.3, 0.85),
    duct: std("#c9ccce", 0.35, 0.8),
    unit: std("#e9e9e6", 0.5, 0.1),
    panel: std("#1d1f22", 0.25, 0.3),
  };
}

// ---------------------------------------------------------------------------------------------------
// Steel frame

/** A C-section joist spanning across the module (x), web centred at z, top at `top`. */
function cJoist(out: Out, z: number, top: number, depth: number, flange: number) {
  const t = 0.004; // drawn wall thickness; the real section is 2 mm
  const x0 = PROFILES.floorBeamLong.width + 0.025;
  const x1 = W - x0;
  out.box("structure", "steel", [x0, top - depth, z - t / 2], [x1, top, z + t / 2]);
  out.box("structure", "steel", [x0, top - t, z - t / 2], [x1, top, z - t / 2 + flange]);
  out.box("structure", "steel", [x0, top - depth, z - t / 2], [x1, top - depth + t, z - t / 2 + flange]);
}

/** A flat bar from (z0, y0) to (z1, y1) in the plane x = at. */
function braceAlongZ(out: Out, at: number, z0: number, y0: number, z1: number, y1: number) {
  const { width, thickness } = PROFILES.brace;
  const length = Math.hypot(z1 - z0, y1 - y0);
  const geometry = new THREE.BoxGeometry(thickness, width, length);
  geometry.rotateX(-Math.atan2(y1 - y0, z1 - z0));
  geometry.translate(at, (y0 + y1) / 2, (z0 + z1) / 2);
  out.add("structure", "steel", geometry);
}

function addFrame(out: Out) {
  const { floorBeamLong: longBeam, beam, floorJoist, roofJoist } = PROFILES;
  const inset = (COL - longBeam.width) / 2; // beams sit centred on the column line

  // Columns: corners and mid-length on both long sides
  const columnZ = [0, L / 2 - COL / 2, L - COL];
  for (const x of [0, W - COL]) {
    for (const z of columnZ) out.box("structure", "steel", [x, 0, z], [x + COL, H, z + COL]);
  }

  // Floor beams: deep along the long sides, shallower at the ends (tops flush)
  for (const x of [inset, W - inset - longBeam.width]) {
    out.box("structure", "steel", [x, 0, COL], [x + longBeam.width, FLOOR_TOP, L - COL]);
  }
  for (const z of [inset, L - inset - beam.width]) {
    out.box("structure", "steel", [COL, FLOOR_TOP - beam.depth, z], [W - COL, FLOOR_TOP, z + beam.width]);
  }

  // Roof beams all round
  for (const x of [inset, W - inset - beam.width]) {
    out.box("structure", "steel", [x, ROOF_UNDERSIDE, COL], [x + beam.width, H, L - COL]);
  }
  for (const z of [inset, L - inset - beam.width]) {
    out.box("structure", "steel", [COL, ROOF_UNDERSIDE, z], [W - COL, H, z + beam.width]);
  }

  // Secondary beams: floor joists at 400 and roof joists at 1200
  for (let z = floorJoist.spacing; z < L - 0.2; z += floorJoist.spacing) cJoist(out, z, FLOOR_TOP, floorJoist.depth, floorJoist.flange);
  for (let z = roofJoist.spacing; z < L - 0.3; z += roofJoist.spacing) cJoist(out, z, H, roofJoist.depth, roofJoist.flange);

  // X-bracing in one bay of each long wall
  const bays: [number, number, number][] = [
    [COL / 2, L / 2 + COL / 2, L - COL], // west wall, entry bay
    [W - COL / 2, COL, L / 2 - COL / 2], // east wall, window bay
  ];
  for (const [x, z0, z1] of bays) {
    braceAlongZ(out, x, z0, FLOOR_TOP, z1, ROOF_UNDERSIDE);
    braceAlongZ(out, x, z0, ROOF_UNDERSIDE, z1, FLOOR_TOP);
  }
}

// ---------------------------------------------------------------------------------------------------
// Walls: each wall is described in its own frame (u along the wall, d through it, outwards positive from the
// outer face of the frame), with rectangular openings cut through every layer.

interface WallFrame {
  part: PartId;
  /** Map wall-local (u along, y up, d outwards) to model space. */
  at(u: number, y: number, d: number): Vec3;
  length: number;
  opening?: { u: [number, number]; y: [number, number] };
}

const walls: WallFrame[] = [
  { part: "wall-west", length: L, at: (u, y, d) => [-d, y, u] },
  { part: "wall-east", length: L, at: (u, y, d) => [W + d, y, L - u] },
  { part: "wall-front", length: W, at: (u, y, d) => [W - u, y, -d], opening: { u: [W - WINDOW.span[1], W - WINDOW.span[0]], y: [WINDOW.sill, WINDOW.head] } },
  { part: "wall-back", length: W, at: (u, y, d) => [u, y, L + d], opening: { u: DOOR.span, y: [FFL, DOOR.head] } },
];

function wallBox(out: Out, wall: WallFrame, material: MaterialKey, u0: number, u1: number, y0: number, y1: number, d0: number, d1: number, group: GroupId = "walls") {
  if (u1 - u0 < 1e-4 || y1 - y0 < 1e-4) return;
  const a = wall.at(u0, y0, d0);
  const b = wall.at(u1, y1, d1);
  out.box(group, material, [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2])], [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2])], group === "walls" ? wall.part : undefined);
}

/** A layer across the wall between u0..u1 and y0..y1 at depth d0..d1, with the wall's opening cut out. */
function wallLayer(out: Out, wall: WallFrame, material: MaterialKey, u0: number, u1: number, y0: number, y1: number, d0: number, d1: number) {
  const o = wall.opening;
  if (!o || o.u[1] <= u0 || o.u[0] >= u1) {
    wallBox(out, wall, material, u0, u1, y0, y1, d0, d1);
    return;
  }
  const [ou0, ou1] = [Math.max(u0, o.u[0]), Math.min(u1, o.u[1])];
  const [oy0, oy1] = [Math.max(y0, o.y[0]), Math.min(y1, o.y[1])];
  wallBox(out, wall, material, u0, ou0, y0, y1, d0, d1);
  wallBox(out, wall, material, ou1, u1, y0, y1, d0, d1);
  wallBox(out, wall, material, ou0, ou1, y0, oy0, d0, d1);
  wallBox(out, wall, material, ou0, ou1, oy1, y1, d0, d1);
}

function addWall(out: Out, wall: WallFrame) {
  const long = wall.length === L;
  // Long walls run the full length outside and wrap the corners; end walls sit between them
  const outside = WALL.board + MIN_SHEET + WALL.batten + MIN_SHEET;
  const [ou0, ou1] = long ? [-outside, wall.length + outside] : [0, wall.length];
  const [iu0, iu1] = [COL, wall.length - COL]; // inside, between the columns

  // Studs between the columns (none across the opening, which gets a head and sill), and rock wool between them
  const studTop = ROOF_UNDERSIDE;
  const { stud } = PROFILES;
  for (let u = COL + stud.spacing; u < wall.length - COL - 0.1; u += stud.spacing) {
    const o = wall.opening;
    if (o && u + stud.width > o.u[0] && u < o.u[1]) continue;
    if (long && Math.abs(u - L / 2) < COL) continue; // mid-length column
    wallBox(out, wall, "galv", u, u + stud.width, FLOOR_TOP, studTop, -stud.depth, 0);
  }
  if (wall.opening) {
    const { u, y } = wall.opening;
    for (const [s, e] of [[u[0] - stud.width, u[0]], [u[1], u[1] + stud.width]]) wallBox(out, wall, "galv", s, e, FLOOR_TOP, studTop, -stud.depth, 0);
    if (y[0] > FLOOR_TOP + 0.05) wallBox(out, wall, "galv", u[0], u[1], y[0] - 0.05, y[0], -stud.depth, 0);
    wallBox(out, wall, "galv", u[0], u[1], y[1], y[1] + 0.05, -stud.depth, 0);
  }
  const insulationFace = -(stud.depth - WALL.insulation) / 2;
  wallLayer(out, wall, "rockwool", iu0, iu1, FLOOR_TOP, studTop, insulationFace - WALL.insulation, insulationFace);

  // Inside: vapour barrier, fire-rated plasterboard, finish board (frame-local d is negative inwards)
  let d = -stud.depth;
  const inside: [MaterialKey, number][] = [["vapour", MIN_SHEET], ["plasterboard", WALL.plasterboard], ["finishBoard", WALL.finish]];
  for (const [material, thickness] of inside) {
    wallLayer(out, wall, material, iu0, iu1, FFL, CEILING_FACE, d - thickness, d);
    d -= thickness;
  }

  // Outside: fibre cement, membrane, battens, then the aluminium cladding
  d = 0;
  wallLayer(out, wall, "fibreCement", ou0, ou1, 0, H, d, d + WALL.board);
  d += WALL.board;
  wallLayer(out, wall, "membrane", ou0, ou1, 0, H, d, d + MIN_SHEET);
  d += MIN_SHEET;
  for (let u = ou0 + 0.05; u < ou1 - 0.03; u += 0.6) {
    const o = wall.opening;
    if (o && u + 0.045 > o.u[0] && u < o.u[1]) {
      wallBox(out, wall, "batten", u, u + 0.045, 0, o.y[0], d, d + WALL.batten);
      wallBox(out, wall, "batten", u, u + 0.045, o.y[1], H, d, d + WALL.batten);
      continue;
    }
    wallBox(out, wall, "batten", u, u + 0.045, 0, H, d, d + WALL.batten);
  }
  d += WALL.batten;
  wallLayer(out, wall, "cladding", ou0, ou1, 0, H, d, d + MIN_SHEET);
}

function addWindow(out: Out) {
  const wall = walls[2];
  const o = wall.opening!;
  const [u0, u1] = o.u;
  const [y0, y1] = o.y;
  const f = 0.05;
  const [d0, d1] = [0.0, WALL.board + WALL.batten + 0.01]; // frame sits in the outer layers
  const piece = (a: number, b: number, c: number, e: number, material: MaterialKey, dd0 = d0, dd1 = d1) => wallBox(out, wall, material, a, b, c, e, dd0, dd1);
  piece(u0, u0 + f, y0, y1, "frameDark");
  piece(u1 - f, u1, y0, y1, "frameDark");
  piece(u0, u1, y0, y0 + f, "frameDark");
  piece(u0, u1, y1 - f, y1, "frameDark");
  const mid = (u0 + u1) / 2;
  piece(mid - f / 2, mid + f / 2, y0, y1, "frameDark");
  piece(u0 + f, u1 - f, y0 + f, y1 - f, "glass", 0.02, 0.03);
  // Reveal linings through the wall thickness
  const reveal = -PROFILES.stud.depth - WALL.plasterboard - WALL.finish - MIN_SHEET;
  piece(u0, u1, y0 - 0.02, y0, "finishBoard", reveal, 0);
  piece(u0, u1, y1, y1 + 0.02, "finishBoard", reveal, 0);
  piece(u0 - 0.02, u0, y0, y1, "finishBoard", reveal, 0);
  piece(u1, u1 + 0.02, y0, y1, "finishBoard", reveal, 0);
}

function addDoor(out: Out) {
  const wall = walls[3];
  const o = wall.opening!;
  const [u0, u1] = o.u;
  const [y0, y1] = o.y;
  const f = 0.04;
  const reveal = -PROFILES.stud.depth - WALL.plasterboard - WALL.finish - MIN_SHEET;
  const piece = (a: number, b: number, c: number, e: number, material: MaterialKey, dd0: number, dd1: number) => wallBox(out, wall, material, a, b, c, e, dd0, dd1);
  piece(u0, u0 + f, y0, y1, "frameDark", reveal, WALL.board);
  piece(u1 - f, u1, y0, y1, "frameDark", reveal, WALL.board);
  piece(u0, u1, y1 - f, y1, "frameDark", reveal, WALL.board);
  piece(u0 + f, u1 - f, y0, y1 - f, "door", -0.08, -0.04);
  piece(u1 - f - 0.12, u1 - f - 0.1, y0 + 0.95, y0 + 1.1, "chrome", -0.11, -0.08);
}

// ---------------------------------------------------------------------------------------------------
// Floor and ceiling build-ups

function addFloor(out: Out) {
  const [x0, x1, z0, z1] = [COL, W - COL, COL, L - COL];
  const { depth } = PROFILES.floorJoist;
  const joistBottom = FLOOR_TOP - depth;
  out.box("floor", "galv", [x0, joistBottom - MIN_SHEET, z0], [x1, joistBottom, z1], "floor-base");
  out.box("floor", "rockwool", [x0, joistBottom, z0], [x1, joistBottom + FLOOR.insulation, z1], "floor-insulation");
  let y = FLOOR_TOP;
  out.box("floor", "membrane", [x0, y - MIN_SHEET, z0], [x1, y, z1], "floor-deck");
  out.box("floor", "fibreCement", [x0, y, z0], [x1, (y += FLOOR.board), z1], "floor-deck");
  out.box("floor", "screed", [x0, y, z0], [x1, (y += FLOOR.screed), z1], "floor-deck");
  out.box("floor", "vinyl", [x0, y, z0], [x1, (y += FLOOR.vinyl), z1], "floor-deck");
}

/** Corrugated deck over the whole module: a sine profile across x, run along z. */
function corrugated(x0: number, x1: number, z0: number, z1: number, base: number) {
  const pitch = 0.076;
  const amplitude = 0.009;
  const thickness = 0.003;
  const shape = new THREE.Shape();
  const steps = Math.round(((x1 - x0) / pitch) * 12);
  const top = (x: number) => base + amplitude + amplitude * Math.sin(((x - x0) / pitch) * Math.PI * 2);
  shape.moveTo(x0, top(x0) - thickness);
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    shape.lineTo(x, top(x));
  }
  for (let i = steps; i >= 0; i--) {
    const x = x0 + ((x1 - x0) * i) / steps;
    shape.lineTo(x, top(x) - thickness);
  }
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: z1 - z0, bevelEnabled: false, curveSegments: 1 });
  geometry.translate(0, 0, z0);
  return geometry;
}

function addCeiling(out: Out) {
  const [x0, x1, z0, z1] = [COL, W - COL, COL, L - COL];
  out.box("ceiling", "plasterboard", [x0, CEILING_FACE, z0], [x1, CEILING_TOP, z1], "ceiling-lining");
  // Furring channels holding the lining, across the module at 600 mm
  for (let z = z0 + 0.3; z < z1; z += 0.6) out.box("ceiling", "galv", [x0, CEILING_TOP, z - 0.012], [x1, CEILING_TOP + 0.028, z + 0.012], "ceiling-lining");
  const insulationTop = H - 0.02;
  out.box("ceiling", "rockwool", [x0, insulationTop - CEILING.insulation, z0], [x1, insulationTop, z1], "ceiling-insulation");
  out.add("ceiling", "roofDeck", corrugated(0, W, 0, L, H + 0.004), "ceiling-deck"); // seated on the roof joists

  // Bulkhead over the bathroom and the end of the kitchen (front, side and the strip beyond the pod)
  const { x: [bx0, bx1], z: [bz0, bz1], underside } = BULKHEAD;
  const t = CEILING.plasterboard;
  out.box("ceiling", "plasterboard", [bx0, underside, bz0], [bx1, CEILING_FACE, bz0 + t], "ceiling-lining");
  out.box("ceiling", "plasterboard", [bx1 - t, underside, bz0], [bx1, CEILING_FACE, bz1], "ceiling-lining");
  out.box("ceiling", "plasterboard", [bx0, underside - t, bz0], [bx1, underside, POD.z[0]], "ceiling-lining");
}

// ---------------------------------------------------------------------------------------------------
// Fit-out and services

function addPod(out: Out) {
  const [x0, x1] = POD.x;
  const [z0, z1] = POD.z;
  const top = FFL + POD.height;
  const t = POD.wall;
  const g: GroupId = "bathroom";
  // Shell with a door opening on the east face, tiled inside
  out.box(g, "podShell", [x0, FFL, z0], [x0 + t, top, z1]);
  out.box(g, "podShell", [x0, FFL, z0], [x1, top, z0 + t]);
  out.box(g, "podShell", [x0, FFL, z1 - t], [x1, top, z1]);
  out.box(g, "podShell", [x1 - t, FFL, z0], [x1, top, POD.door[0]]);
  out.box(g, "podShell", [x1 - t, FFL, POD.door[1]], [x1, top, z1]);
  out.box(g, "podShell", [x1 - t, FFL + 2.05, POD.door[0]], [x1, top, POD.door[1]]);
  out.box(g, "podShell", [x0, top - 0.04, z0], [x1, top, z1]);
  out.box(g, "tile", [x0 + t, FFL, z0 + t], [x1 - t, FFL + 0.03, z1 - t]);
  out.box(g, "tile", [x0 + t, FFL + 0.03, z0 + t], [x0 + t + 0.006, top - 0.04, z1 - t]);
  out.box(g, "tile", [x0 + t, FFL + 0.03, z0 + t], [x1 - t, top - 0.04, z0 + t + 0.006]);
  // Shower: glass screen, rail and head on the west wall
  out.box(g, "glass", [1.08, FFL + 0.03, z0 + t], [1.09, FFL + 1.95, 6.05]);
  out.box(g, "chrome", [x0 + t, FFL + 0.9, 5.7], [x0 + t + 0.03, FFL + 1.95, 5.72]);
  out.add(g, "chrome", new THREE.CylinderGeometry(0.1, 0.1, 0.01, 24).translate(x0 + t + 0.15, FFL + 2.0, 5.71));
  // Toilet and vanity against the entry-end wall, with a mirror over the basin
  out.add(g, "porcelain", new RoundedBoxGeometry(0.38, 0.4, 0.55, 3, 0.08).translate(0.45, FFL + 0.2, z1 - t - 0.3));
  out.add(g, "porcelain", new RoundedBoxGeometry(0.38, 0.35, 0.16, 3, 0.04).translate(0.45, FFL + 0.55, z1 - t - 0.09));
  out.box(g, "oak", [0.85, FFL + 0.45, z1 - t - 0.45], [1.5, FFL + 0.82, z1 - t]);
  out.add(g, "porcelain", new RoundedBoxGeometry(0.42, 0.06, 0.36, 3, 0.02).translate(1.17, FFL + 0.85, z1 - t - 0.22));
  out.box(g, "chrome", [0.9, FFL + 1.05, z1 - t - 0.01], [1.45, FFL + 1.75, z1 - t]);
}

function addBlocks(out: Out) {
  for (const block of [...blocks, ...fittings]) {
    const { min, max, radius } = block;
    if (radius) {
      const size: Vec3 = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
      const r = Math.min(radius, ...size.map((s) => s / 2 - 1e-3));
      const geometry = new RoundedBoxGeometry(size[0], size[1], size[2], 3, r);
      geometry.translate((min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2);
      out.add(block.group, block.material, geometry);
    } else {
      out.box(block.group, block.material, min, max);
    }
  }
  // Downlights on the ceiling line
  for (const [x, z] of [[1.6, 1.0], [1.6, 2.4], [1.6, 4.0], [2.6, 6.0]]) {
    out.add("electrical", "fitting", new THREE.CylinderGeometry(0.045, 0.045, 0.012, 20).translate(x, CEILING_FACE - 0.006, z));
  }
}

/** Straight runs between polyline points, with a ball at each bend. */
function addRuns(out: Out) {
  const up = new THREE.Vector3(0, 1, 0);
  for (const run of runs) {
    for (let i = 0; i < run.points.length - 1; i++) {
      const a = new THREE.Vector3(...run.points[i]);
      const b = new THREE.Vector3(...run.points[i + 1]);
      const length = a.distanceTo(b);
      if (length < 1e-4) continue;
      const geometry = new THREE.CylinderGeometry(run.radius, run.radius, length, 12, 1, true);
      geometry.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(up, b.clone().sub(a).normalize()));
      geometry.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
      out.add(run.group, run.material, geometry);
      if (i > 0) out.add(run.group, run.material, new THREE.SphereGeometry(run.radius, 12, 8).translate(a.x, a.y, a.z));
    }
  }
}

// ---------------------------------------------------------------------------------------------------

export function buildModule({ anisotropy = 4 }: { anisotropy?: number } = {}): SceneModel {
  const materials = createMaterials(anisotropy);
  const out = new Out();

  addFrame(out);
  walls.forEach((wall) => addWall(out, wall));
  addWindow(out);
  addDoor(out);
  addFloor(out);
  addCeiling(out);
  addPod(out);
  addBlocks(out);
  addRuns(out);

  const object = new THREE.Group();
  object.name = "module-model";
  const root = new THREE.Group();
  root.position.set(-W / 2, 0, -L / 2);
  object.add(root);

  const groups = new Map<string, THREE.Group>();
  const meshes: THREE.Mesh[] = [];
  for (const { tag, geometry } of out.collector.merged()) {
    let group = groups.get(tag.group);
    if (!group) {
      group = new THREE.Group();
      group.name = tag.group;
      groups.set(tag.group, group);
      root.add(group);
    }
    const material = materials[tag.material];
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { ...tag } satisfies MeshTag;
    const transparent = material.transparent;
    mesh.castShadow = !transparent;
    mesh.receiveShadow = !transparent;
    if (transparent) mesh.renderOrder = 2;
    group.add(mesh);
    meshes.push(mesh);
  }

  return {
    object,
    groups,
    meshes,
    materials,
    dispose() {
      meshes.forEach((mesh) => mesh.geometry.dispose());
      for (const material of Object.values(materials)) {
        const map = (material as THREE.MeshStandardMaterial).map;
        map?.dispose();
        material.dispose();
      }
    },
  };
}
