import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { Collector as SharedCollector, boardTexture, box, stripeTexture, tiled } from "./geometry";
import type { Downpipe, HouseData, Level, MaterialKey, Opening, RoofPrism, Slab, Wall } from "@/data/explorer/house";

/**
 * Builds a house explorer model from its plan data (a HouseData from src/data/explorer). Geometry is collected per (group, level, material) and
 * merged, so the whole house renders in a few dozen draw calls and the floor controls can toggle meshes
 * without touching geometry.
 */

export interface MeshTag {
  group: string | null;
  level: Level;
  material: MaterialKey;
  part?: string;
}

export interface BuiltModel {
  /** Add this to the scene. Its child `root` is offset so the house sits centred on the origin. */
  object: THREE.Group;
  groups: Map<string, THREE.Group>;
  meshes: THREE.Mesh[];
  materials: Record<MaterialKey, THREE.Material>;
  dispose(): void;
}

// ---------------------------------------------------------------------------------------------------
// Materials

function createMaterials(anisotropy: number): Record<MaterialKey, THREE.Material> {
  const std = (color: string, roughness = 0.85, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

  return {
    render: std("#f4f2ee", 0.9),
    cladding: std("#ffffff", 0.85, 0, { map: tiled(stripeTexture(256, "#f1efea", "#d9d5cc", 4, false, 3), 0.72, anisotropy) }),
    feature: std("#ffffff", 0.7, 0.1, { map: tiled(stripeTexture(256, "#a9acaf", "#939699", 2, true, 4), 0.6, anisotropy) }),
    interior: std("#f6f4f0", 0.95),
    floor: std("#d6c6ac", 0.8),
    deck: std("#ffffff", 0.8, 0, { map: tiled(stripeTexture(256, "#ab9076", "#957a60", 4, false, 3), 0.56, anisotropy) }),
    concrete: std("#d4d1cb", 0.95),
    frameDark: std("#2c2c2d", 0.5, 0.3),
    glass: new THREE.MeshStandardMaterial({
      color: "#c6d8de",
      roughness: 0.05,
      metalness: 0,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
    rail: std("#b8955a", 0.35, 0.7),
    timber: std("#b8875a", 0.7),
    screen: std("#4a4e52", 0.7, 0.1),
    // Cool mid-grey Colorbond so the roof reads apart from the warm-white walls
    roof: std("#ffffff", 0.55, 0.3, { map: tiled(stripeTexture(256, "#a3a7aa", "#8e9295", 4, false, 3), 0.76, anisotropy) }),
    fascia: std("#55595c", 0.5, 0.3),
    downpipe: std("#d4d5d4", 0.5, 0.2),
    solar: std("#28313d", 0.35, 0.35),
    garageDoor: std("#ffffff", 0.7, 0.1, { map: tiled(stripeTexture(256, "#ecebe6", "#d2cfc7", 4, false, 3), 2.4, anisotropy) }),
    door: std("#e7e3db", 0.8),
    furniture: std("#d9d2c6", 0.85),
    soft: std("#cfc7ba", 0.95),
    bed: std("#f3f0ea", 0.95),
    steel: std("#f1f1ef", 0.45, 0.3),
    pot: std("#8f8a83", 0.9),
    foliage: std("#6f855c", 0.9, 0, { flatShading: true }),
    trunk: std("#7b6553", 0.9),
    // Timber-look aluminium cladding (vertical boards) and the dark cladding on the lofts (25 On Rowland and Forrest)
    timberClad: std("#ffffff", 0.72, 0.08, {
      map: tiled(boardTexture(512, ["#7b4a32", "#86553a", "#734530", "#8d5c3f", "#7f4e35", "#6f432d"], "#4a2d1f", 8, 3), 1.2, anisotropy),
    }),
    darkClad: std("#ffffff", 0.6, 0.2, { map: tiled(stripeTexture(256, "#2f3032", "#232426", 4, true, 3), 0.6, anisotropy) }),
    joinery: std("#eeebe5", 0.6),
    benchtop: std("#e6e2da", 0.35, 0.02),
    appliance: std("#151617", 0.15, 0.4),
    stainless: std("#c7c9ca", 0.3, 0.85),
    ceramic: std("#f4f3f0", 0.15, 0.02),
    fabric: std("#b9b2a6", 0.95),
    linen: std("#f1eee8", 0.9),
    rug: std("#cfc6b6", 1),
    gap: std("#2a2826", 0.9),
    unit: std("#e7e6e1", 0.45, 0.05),
    grille: std("#575858", 0.6, 0.2),
    tile: std("#f2f1ed", 0.2, 0.02),
    floorTile: std("#d9d6cf", 0.55, 0.02),
    mirror: std("#dfe4e6", 0.03, 1),
    led: new THREE.MeshStandardMaterial({ color: "#fff6e3", emissive: "#ffe9c2", emissiveIntensity: 1.4, roughness: 0.5 }),
  };
}

// ---------------------------------------------------------------------------------------------------
// Geometry helpers

/** Split an ExtrudeGeometry into its cap and side geometries (material groups 0 and 1). */
function splitGroups(geometry: THREE.BufferGeometry): THREE.BufferGeometry[] {
  const source = geometry.index ? geometry.toNonIndexed() : geometry;
  const result: THREE.BufferGeometry[] = [];
  for (const group of source.groups) {
    const part = new THREE.BufferGeometry();
    for (const name of ["position", "normal"] as const) {
      const attr = source.getAttribute(name);
      part.setAttribute(name, new THREE.BufferAttribute(
        (attr.array as Float32Array).slice(group.start * 3, (group.start + group.count) * 3),
        3,
      ));
    }
    const index = group.materialIndex ?? 0;
    result[index] = result[index] ? mergeGeometries([result[index], part])! : part;
  }
  if (source !== geometry) source.dispose();
  geometry.dispose();
  return result;
}

/** Swaps plan x and z (for roofs that fall across z), keeping faces outward by reversing each triangle. */
function swapXZ(geometry: THREE.BufferGeometry) {
  const flat = geometry.index ? geometry.toNonIndexed() : geometry;
  if (flat !== geometry) geometry.dispose();
  flat.applyMatrix4(new THREE.Matrix4().set(0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1));
  for (const name of Object.keys(flat.attributes)) {
    const attr = flat.getAttribute(name);
    for (let i = 0; i < attr.count; i += 3) {
      for (let c = 0; c < attr.itemSize; c++) {
        const a = attr.getComponent(i + 1, c);
        attr.setComponent(i + 1, c, attr.getComponent(i + 2, c));
        attr.setComponent(i + 2, c, a);
      }
    }
  }
  return flat;
}

class Collector {
  private inner = new SharedCollector<MeshTag>();
  /** Set while building a roof that falls across z: geometry is made with x and z swapped, then swapped back. */
  swap = false;

  add(group: string | null, level: Level, material: MaterialKey, geometry: THREE.BufferGeometry, part?: string) {
    const tag: MeshTag = part ? { group, level, material, part } : { group, level, material };
    this.inner.add(tag, this.swap ? swapXZ(geometry) : geometry);
  }

  merged() {
    return this.inner.merged();
  }
}

// ---------------------------------------------------------------------------------------------------
// Builders

function addWall(out: Collector, wall: Wall) {
  const { a, b, base, top, group, level, finish, part } = wall;
  const t = wall.thickness ?? 0.2;
  const alongX = a[1] === b[1];
  const start = alongX ? Math.min(a[0], b[0]) : Math.min(a[1], b[1]);
  const end = alongX ? Math.max(a[0], b[0]) : Math.max(a[1], b[1]);
  const fixed = alongX ? a[1] : a[0];

  // Wall-local rectangles (along, y) mapped back to plan space
  const piece = (u0: number, u1: number, y0: number, y1: number, depth = t, material: MaterialKey = finish) => {
    if (u1 - u0 < 0.005 || y1 - y0 < 0.005) return;
    const min: [number, number, number] = alongX ? [u0, y0, fixed - depth / 2] : [fixed - depth / 2, y0, u0];
    const max: [number, number, number] = alongX ? [u1, y1, fixed + depth / 2] : [fixed + depth / 2, y1, u1];
    out.add(group, level, material, box(min, max), part);
  };

  const openings = [...(wall.openings ?? [])]
    .map((o): Required<Opening> => ({
      span: [Math.max(start, Math.min(...o.span)), Math.min(end, Math.max(...o.span))],
      sill: o.sill ?? base,
      head: o.head ?? base + 2.1,
      kind: o.kind ?? "opening",
      pocketStart: o.pocketStart ?? false,
    }))
    .sort((p, q) => p.span[0] - q.span[0]);

  let cursor = start;
  for (const o of openings) {
    const [u0, u1] = o.span;
    const sill = Math.max(base, o.sill);
    const head = Math.min(top, o.head);
    piece(cursor, u0, base, top);
    piece(u0, u1, base, sill);
    piece(u0, u1, head, top);
    cursor = u1;
    if (head <= sill) continue;

    // Joinery within the opening
    const f = 0.05;
    if (o.kind === "slider" || o.kind === "window" || o.kind === "door") {
      const glassDepth = 0.02;
      if (o.kind === "door") piece(u0 + f, u1 - f, sill, head - f, 0.04, "door");
      else piece(u0 + f, u1 - f, sill + f, head - f, glassDepth, "glass");
      piece(u0, u0 + f, sill, head, 0.08, "frameDark");
      piece(u1 - f, u1, sill, head, 0.08, "frameDark");
      piece(u0, u1, head - f, head, 0.08, "frameDark");
      piece(u0, u1, sill, sill + f, 0.08, "frameDark");
      if (o.kind === "slider") {
        const panels = u1 - u0 > 3.2 ? 4 : 2;
        for (let i = 1; i < panels; i++) {
          const at = u0 + ((u1 - u0) * i) / panels;
          piece(at - f / 2, at + f / 2, sill, head, 0.08, "frameDark");
        }
      }
    } else if (o.kind === "cavity") {
      // Cavity slider, half open: the panel slides along the wall's centre into the pocket, so the leading edge and a
      // recessed pull show in the doorway; thin liners frame the opening
      const width = u1 - u0;
      const [p0, p1] = o.pocketStart ? [u0, u0 + width * 0.5] : [u0 + width * 0.5, u1];
      const edge = o.pocketStart ? p1 : p0;
      piece(p0, p1, sill, head - 0.01, 0.035, "door");
      const pull = o.pocketStart ? [edge - 0.06, edge - 0.03] : [edge + 0.03, edge + 0.06];
      piece(pull[0], pull[1], sill + 0.95, sill + 1.15, 0.04, "frameDark");
      piece(u0, u0 + 0.012, sill, head, t + 0.004, "interior");
      piece(u1 - 0.012, u1, sill, head, t + 0.004, "interior");
      piece(u0, u1, head - 0.012, head, t + 0.004, "interior");
    } else if (o.kind === "garage-door") {
      piece(u0, u1, sill, head, 0.06, "garageDoor");
    }
  }
  piece(cursor, end, base, top);
}

function addSlab(out: Collector, slab: Slab) {
  const shape = new THREE.Shape(slab.polygon.map(([x, z]) => new THREE.Vector2(x, z)));
  if (slab.hole) {
    const hole = new THREE.Path();
    hole.absarc(slab.hole.centre[0], slab.hole.centre[1], slab.hole.radius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: slab.top - slab.bottom, bevelEnabled: false, curveSegments: 32 });
  // Shape (x, z) extrudes along +z; rotating +90° about x puts depth downwards, then lift to the slab top
  geometry.rotateX(Math.PI / 2).translate(0, slab.top, 0);
  out.add(slab.group, slab.level, slab.material, geometry, slab.part);
}

const GUTTER = { width: 0.12, depth: 0.12, sheet: 0.012 };
const PIPE = { width: 0.1, depth: 0.07 };

/** Roof outline after overhangs: eaves with gutters, and any flagged gable ends, run past the wall to its outer face plus a lip. */
function roofOutline(roof: RoofPrism, defaultOverhang: number) {
  const overhang = roof.overhang ?? defaultOverhang;
  const lowSide = roof.skillion && roof.skillion[0] < roof.skillion[1] ? "x0" : "x1";
  const gutters = roof.gutters ?? (roof.skillion ? [lowSide] : ["x0", "x1"]);
  const extend = roof.extend ?? [];
  const x0 = roof.x[0] - (gutters.includes("x0") ? overhang : 0);
  const x1 = roof.x[1] + (gutters.includes("x1") ? overhang : 0);
  const z0 = roof.z[0] - (extend.includes("z0") ? overhang : 0);
  const z1 = roof.z[1] + (extend.includes("z1") ? overhang : 0);
  /** Top of the roof sheet at x (a skillion is extrapolated past its walls along the same fall). */
  const height = (x: number) => {
    let y: number;
    if (roof.skillion) {
      const [a, b] = roof.skillion;
      y = a + ((b - a) * (x - roof.x[0])) / (roof.x[1] - roof.x[0]);
    } else {
      const r = roof.ridge!;
      y = x < r.x ? r.y - (r.x - x) * r.pitchLeft : r.y - (x - r.x) * r.pitchRight;
    }
    return Math.max(roof.base + 0.04, y);
  };
  return { x0, x1, z0, z1, height, gutters, overhang };
}

/** A roof that falls across z is built as if it fell across x, with the plan axes swapped, then swapped back. */
function addRoof(out: Collector, roof: RoofPrism, defaultOverhang: number) {
  if (roof.axis === "z") {
    out.swap = true;
    addRoofAlongX(out, { ...roof, axis: "x", x: roof.z, z: roof.x }, defaultOverhang);
    out.swap = false;
  } else {
    addRoofAlongX(out, roof, defaultOverhang);
  }
}

function addRoofAlongX(out: Collector, roof: RoofPrism, defaultOverhang: number) {
  const { x0, x1, z0, z1, height, gutters } = roofOutline(roof, defaultOverhang);
  const points: [number, number][] = [[x0, roof.base], [x0, height(x0)]];
  if (roof.ridge && roof.ridge.x > x0 && roof.ridge.x < x1) points.push([roof.ridge.x, roof.ridge.y]);
  points.push([x1, height(x1)], [x1, roof.base]);
  const shape = new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)));
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: z1 - z0, bevelEnabled: false });
  geometry.translate(0, 0, z0);
  // Vertical sides (the wall between ceiling and eave) take the wall finish; only sloped faces are roof sheet
  const normal = geometry.getAttribute("normal");
  const groups = geometry.groups.slice();
  geometry.clearGroups();
  for (const g of groups) {
    for (let i = g.start; i < g.start + g.count; i += 3) {
      const material = g.materialIndex === 1 && Math.abs(normal.getY(i)) > 0.2 ? 1 : 0;
      const last = geometry.groups[geometry.groups.length - 1];
      if (last && last.materialIndex === material && last.start + last.count === i) last.count += 3;
      else geometry.addGroup(i, 3, material);
    }
  }
  const [caps, sides] = splitGroups(geometry);
  out.add(roof.group, roof.level, roof.capFinish ?? "cladding", caps);
  out.add(roof.group, roof.level, "roof", sides);

  // Squareline gutters: an open channel (back, sole, front lip) hung on the fascia just under the sheet edge
  const { width, depth, sheet } = GUTTER;
  for (const side of gutters) {
    const [x, dir] = side === "x0" ? [x0, -1] : [x1, 1];
    const top = height(x) - 0.01;
    const channel = (u0: number, u1: number, y0: number, y1: number) =>
      out.add(roof.group, roof.level, "fascia", box([x + dir * u0, y0, z0], [x + dir * u1, y1, z1]));
    channel(0, sheet, top - depth, top);
    channel(0, width, top - depth, top - depth + sheet);
    channel(width - sheet, width, top - depth, top + 0.01);
  }
}

/** The gutter a downpipe drains, found by its eave line: returns the gutter's outer edge position and sole height. */
function gutterFor(house: HouseData, pipe: Downpipe, face: number) {
  for (const roof of house.roofs) {
    if (roof.axis === "z") continue;
    const { x0, x1, z0, z1, height, gutters, overhang } = roofOutline(roof, house.eaveOverhang);
    if (pipe.z < z0 || pipe.z > z1) continue;
    for (const side of gutters) {
      const [edge, dir] = side === "x0" ? [x0, -1] : [x1, 1];
      if (dir === pipe.side && Math.abs(edge - (face + dir * (overhang - 0.1))) < 0.03) {
        return { edge, sole: height(edge) - 0.01 - GUTTER.depth };
      }
    }
  }
  throw new Error(`No gutter above the downpipe at z ${pipe.z}`);
}

/** Downpipe tight to the wall, with a gooseneck up to the gutter outlet and an offset where the wall face steps. */
function addDownpipe(out: Collector, house: HouseData, pipe: Downpipe) {
  const { z, side: dir } = pipe;
  const upperFace = pipe.ufFace ?? pipe.gfFace;
  const { edge, sole } = gutterFor(house, pipe, upperFace);
  const piece = (group: string, level: Level, u0: number, u1: number, y0: number, y1: number, face: number) =>
    out.add(group, level, "downpipe", box([face + dir * u0, y0, z - PIPE.width / 2], [face + dir * u1, y1, z + PIPE.width / 2]));
  const topGroup = pipe.uf ?? pipe.gf;
  const topLevel: Level = pipe.uf ? "uf" : "gf";
  const outlet = Math.abs(edge - upperFace) + GUTTER.width / 2; // outlet sits under the middle of the gutter
  const bendLow = sole - 0.16;
  // Gooseneck: outlet down from the gutter sole, then back to the wall
  piece(topGroup, topLevel, outlet - PIPE.depth / 2, outlet + PIPE.depth / 2, bendLow, sole, upperFace);
  piece(topGroup, topLevel, 0, outlet + PIPE.depth / 2, bendLow - PIPE.depth, bendLow, upperFace);
  if (!pipe.uf) {
    piece(pipe.gf, "gf", 0, PIPE.depth, 0, bendLow - PIPE.depth, pipe.gfFace);
    return;
  }
  const step = Math.abs(upperFace - pipe.gfFace) > 0.005;
  const offsetTop = house.ufSlab + (step ? PIPE.depth : 0);
  piece(pipe.uf, "uf", 0, PIPE.depth, offsetTop, bendLow - PIPE.depth, upperFace);
  if (step) {
    // Offset across the step between the upper and lower wall faces, just above the floor line
    const inner = dir * Math.min(dir * upperFace, dir * pipe.gfFace);
    piece(pipe.uf, "uf", 0, Math.abs(upperFace - pipe.gfFace) + PIPE.depth, house.ufSlab, offsetTop, inner);
  }
  piece(pipe.gf, "gf", 0, PIPE.depth, 0, house.ufSlab, pipe.gfFace);
}

function addSolar(out: Collector, solar: NonNullable<HouseData["solar"]>) {
  const { ridge, arrays } = solar;
  const pitch = ridge.pitchRight;
  const angle = Math.atan(pitch);
  for (const array of arrays) {
    const width = (array.x[1] - array.x[0]) / array.cols;
    const depth = (array.z[1] - array.z[0]) / array.rows;
    for (let c = 0; c < array.cols; c++) {
      for (let r = 0; r < array.rows; r++) {
        const cx = array.x[0] + width * (c + 0.5);
        const cz = array.z[0] + depth * (r + 0.5);
        const cy = ridge.y - (cx - ridge.x) * pitch + 0.07;
        const panel = new THREE.BoxGeometry((width - 0.04) / Math.cos(angle), 0.04, depth - 0.04);
        panel.rotateZ(-angle).translate(cx, cy, cz);
        out.add("roof", "roof", "solar", panel);
      }
    }
  }
}

function addSpiral(out: Collector, spiral: NonNullable<HouseData["spiral"]>) {
  const { group, centre, radius, from, to, risers } = spiral;
  const [cx, cz] = centre;
  const rise = (to - from) / risers;
  const step = (Math.PI * 2) / (risers + 1);
  const start = spiral.start ?? Math.PI * 0.5; // default: first tread faces the balcony front (+z)

  out.add(group, "uf", "steel", new THREE.CylinderGeometry(0.05, 0.05, to - from + 1.0, 12).translate(cx, (from + to + 1.0) / 2, cz));

  const rail: THREE.Vector3[] = [];
  for (let i = 0; i < risers; i++) {
    const angle = start + step * i;
    const y = from + rise * (i + 1);
    const tread = new THREE.BoxGeometry(radius - 0.06, 0.04, 0.3);
    tread.translate((radius - 0.06) / 2 + 0.04, 0, 0).rotateY(-angle).translate(cx, y - 0.02, cz);
    out.add(group, "uf", "steel", tread);
    const px = cx + Math.cos(angle) * (radius - 0.03);
    const pz = cz + Math.sin(angle) * (radius - 0.03);
    out.add(group, "uf", "steel", new THREE.CylinderGeometry(0.012, 0.012, 0.9, 6).translate(px, y + 0.45, pz));
    rail.push(new THREE.Vector3(px, y + 0.9, pz));
  }
  out.add(group, "uf", "steel", new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rail), 96, 0.022, 6));
}

function addInternalStair(out: Collector, stair: NonNullable<HouseData["internalStair"]>) {
  const { group, x, zStart, going, risers, to } = stair;
  const rise = to / risers;
  for (let i = 0; i < risers - 1; i++) {
    out.add(group, "gf", "floor", box([x[0], 0, zStart + i * going], [x[1], rise * (i + 1), zStart + (i + 1) * going]));
  }
}

function addPergola(out: Collector, pergola: NonNullable<HouseData["pergola"]>) {
  const { group, posts, beamZ, x, z, rafterSpacing, base, beam, top } = pergola;
  for (const [px, pz] of posts) out.add(group, "pergola", "timber", box([px - 0.06, base, pz - 0.06], [px + 0.06, beam, pz + 0.06]));
  for (const bz of beamZ) out.add(group, "pergola", "timber", box([x[0], beam - 0.18, bz - 0.05], [x[1], beam, bz + 0.05]));
  for (let rx = x[0] + 0.12; rx <= x[1] - 0.1; rx += rafterSpacing) {
    out.add(group, "pergola", "timber", box([rx - 0.025, beam, z[0]], [rx + 0.025, top, z[1]]));
  }
}

function addTree(out: Collector, tree: NonNullable<HouseData["tree"]>) {
  const { at, height, canopy } = tree;
  const [tx, tz] = at;
  out.add(null, "gf", "trunk", new THREE.CylinderGeometry(0.07, 0.11, height * 0.6, 8).translate(tx, height * 0.3, tz));
  const clumps: [number, number, number, number][] = [
    [0, height - canopy * 0.9, 0, canopy],
    [0.55, height - canopy * 1.3, 0.3, canopy * 0.7],
    [-0.5, height - canopy * 1.2, -0.35, canopy * 0.65],
  ];
  for (const [dx, y, dz, r] of clumps) out.add(null, "gf", "foliage", new THREE.IcosahedronGeometry(r, 1).translate(tx + dx, y, tz + dz));
}

function addPlantFoliage(out: Collector, block: HouseData["blocks"][number]) {
  // Planter foliage reads better as a rounded mass than a box
  const [x0, y0, z0] = block.min;
  const [x1, y1, z1] = block.max;
  const r = Math.min(x1 - x0, y1 - y0, z1 - z0) / 2;
  const geometry = new THREE.IcosahedronGeometry(r * 1.15, 1).scale(1, (y1 - y0) / (2 * r), 1).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  out.add(block.group, block.level, "foliage", geometry, block.part);
}

// ---------------------------------------------------------------------------------------------------

export function buildHouse(house: HouseData, { anisotropy = 4 }: { anisotropy?: number } = {}): BuiltModel {
  const materials = createMaterials(anisotropy);
  const out = new Collector();

  house.walls.forEach((wall) => addWall(out, wall));
  house.slabs.forEach((slab) => addSlab(out, slab));
  house.roofs.forEach((roof) => addRoof(out, roof, house.eaveOverhang));
  house.downpipes.forEach((pipe) => addDownpipe(out, house, pipe));
  for (const block of house.blocks) {
    if (block.material === "foliage") addPlantFoliage(out, block);
    else out.add(block.group, block.level, block.material, box(block.min, block.max), block.part);
  }
  const { posts } = house;
  for (const [px, pz] of posts.at) {
    out.add(posts.group, "gf", "render", new THREE.CylinderGeometry(0.045, 0.045, posts.height, 12).translate(px, posts.height / 2, pz));
  }
  if (house.solar) addSolar(out, house.solar);
  if (house.spiral) addSpiral(out, house.spiral);
  if (house.internalStair) addInternalStair(out, house.internalStair);
  if (house.pergola) addPergola(out, house.pergola);
  if (house.tree) addTree(out, house.tree);
  for (const cylinder of house.cylinders ?? []) {
    const geometry = new THREE.CylinderGeometry(cylinder.radius, cylinder.radius, cylinder.length, 24);
    if (cylinder.axis === "x") geometry.rotateZ(Math.PI / 2);
    if (cylinder.axis === "z") geometry.rotateX(Math.PI / 2);
    geometry.translate(...cylinder.centre);
    out.add(cylinder.group, cylinder.level, cylinder.material, geometry);
  }
  for (const rounded of house.roundedBoxes ?? []) {
    const [x0, y0, z0] = rounded.min;
    const [x1, y1, z1] = rounded.max;
    const geometry = new RoundedBoxGeometry(x1 - x0, y1 - y0, z1 - z0, 3, rounded.radius);
    geometry.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    out.add(rounded.group, rounded.level, rounded.material, geometry);
  }
  for (const ring of house.tori ?? []) {
    const geometry = new THREE.TorusGeometry(ring.radius, ring.tube, 8, 48, ring.arc ?? Math.PI * 2);
    if (ring.axis === "x") geometry.rotateY(Math.PI / 2);
    if (ring.axis === "y") geometry.rotateX(Math.PI / 2);
    geometry.translate(...ring.centre);
    out.add(ring.group, ring.level, ring.material, geometry);
  }
  for (const strut of house.struts ?? []) {
    const from = new THREE.Vector3(...strut.from);
    const to = new THREE.Vector3(...strut.to);
    const direction = to.clone().sub(from);
    const member = new THREE.BoxGeometry(strut.size, direction.length(), strut.size);
    member.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize()));
    member.translate(...from.add(to).multiplyScalar(0.5).toArray());
    out.add(strut.group, strut.level, strut.material, member);
  }

  const object = new THREE.Group();
  object.name = "explorer-model";
  const root = new THREE.Group();
  root.position.set(-house.centre.x, 0, -house.centre.z);
  object.add(root);

  const groups = new Map<string, THREE.Group>();
  const site = new THREE.Group();
  site.name = "site";
  root.add(site);

  const meshes: THREE.Mesh[] = [];
  for (const { tag, geometry } of out.merged()) {
    let parent = site;
    if (tag.group) {
      let group = groups.get(tag.group);
      if (!group) {
        group = new THREE.Group();
        group.name = tag.group;
        group.userData.groupId = tag.group;
        groups.set(tag.group, group);
        root.add(group);
      }
      parent = group;
    }
    const mesh = new THREE.Mesh(geometry, materials[tag.material]);
    mesh.userData = { ...tag } satisfies MeshTag;
    mesh.castShadow = tag.material !== "glass";
    mesh.receiveShadow = tag.material !== "glass";
    if (tag.material === "glass") mesh.renderOrder = 2;
    parent.add(mesh);
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
