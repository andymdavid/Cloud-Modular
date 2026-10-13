import * as THREE from "three";
import { Collector, box } from "./geometry";
import { corrugated, createMaterials } from "./build-module";
import type { MeshTag, SceneModel } from "./viewer";
import { CEILING, FLOOR, PROFILES, WALL, type MaterialKey, type Vec3 } from "@/data/explorer/module";
import { sampleLayers, type SampleKind } from "@/data/explorer/build-ups";

/**
 * Builds a build-up sample for the Floor, walls and ceiling cards: a 600 mm square of the floor, wall or ceiling,
 * each layer stepped back from the one before so every layer shows, as in the proposal's wall drawing. Each layer
 * is its own group, so it can be hovered and named; the scenes separate the layers slightly along the build-up.
 */

export const SAMPLE = 0.6; // sample size in metres
const STEP = 0.04; // how far each layer is cut back from the one before
const MIN_SHEET = 0.003; // very thin sheets are drawn at least this thick so they read
export const SAMPLE_HEIGHT = 0.8; // the wall sample's height

type Tag = MeshTag & { material: MaterialKey };

class Out {
  collector = new Collector<Tag>();
  box(layer: string, material: MaterialKey, min: Vec3, max: Vec3) {
    if (max[0] - min[0] < 1e-4 || max[1] - min[1] < 1e-4 || max[2] - min[2] < 1e-4) return;
    this.add(layer, material, box(min, max));
  }
  add(layer: string, material: MaterialKey, geometry: THREE.BufferGeometry) {
    this.collector.add({ group: layer, level: "all", material }, geometry);
  }
}

/** A C-section in a horizontal build-up, running along z at x, between y0 and y0 + depth, within z0..z1. */
function cAlongZ(out: Out, layer: string, x: number, y0: number, depth: number, flange: number, z0: number, z1: number) {
  const t = 0.003;
  out.box(layer, "steel", [x - t / 2, y0, z0], [x + t / 2, y0 + depth, z1]);
  out.box(layer, "steel", [x - t / 2, y0 + depth - t, z0], [x - t / 2 + flange, y0 + depth, z1]);
  out.box(layer, "steel", [x - t / 2, y0, z0], [x - t / 2 + flange, y0 + t, z1]);
}

/** Plan extent of the layer at `index` in a horizontal build-up: cut back on the +x and -z edges. */
function stepped(index: number) {
  return { x0: 0, x1: SAMPLE - index * STEP, z0: index * STEP, z1: SAMPLE };
}

function addFloor(out: Out) {
  const ids = sampleLayers.floor.map((layer) => layer.id);
  const at = (id: string) => stepped(ids.indexOf(id));
  const { depth, flange } = PROFILES.floorJoist;
  let y = 0;
  let e = at("base");
  out.box("base", "galv", [e.x0, y, e.z0], [e.x1, y + MIN_SHEET, e.z1]);
  y += MIN_SHEET;
  e = at("joists");
  for (const x of [0.1, 0.5]) cAlongZ(out, "joists", x, y, depth, flange, e.z0, e.z1);
  e = at("insulation");
  out.box("insulation", "rockwool", [e.x0, y, e.z0], [e.x1, y + FLOOR.insulation, e.z1]);
  y += depth;
  for (const [id, material, thickness] of [
    ["membrane", "membrane", MIN_SHEET],
    ["board", "fibreCement", FLOOR.board],
    ["screed", "screed", FLOOR.screed],
    ["vinyl", "vinyl", FLOOR.vinyl],
  ] as [string, MaterialKey, number][]) {
    e = at(id);
    out.box(id, material, [e.x0, y, e.z0], [e.x1, y + thickness, e.z1]);
    y += thickness;
  }
}

function addCeiling(out: Out) {
  const ids = sampleLayers.ceiling.map((layer) => layer.id);
  const at = (id: string) => stepped(ids.indexOf(id));
  const { depth, flange } = PROFILES.roofJoist;
  let e = at("plasterboard");
  let y = 0;
  out.box("plasterboard", "plasterboard", [e.x0, y, e.z0], [e.x1, y + CEILING.plasterboard, e.z1]);
  y += CEILING.plasterboard;
  // Furring channels across the sample in the service cavity
  e = at("cavity");
  for (const z of [0.18, 0.48]) out.box("cavity", "galv", [e.x0, y, Math.max(e.z0, z - 0.012)], [e.x1, y + 0.028, z + 0.012]);
  y += CEILING.cavity;
  e = at("joists");
  for (const x of [0.1, 0.5]) cAlongZ(out, "joists", x, y, depth, flange, e.z0, e.z1);
  e = at("insulation");
  out.box("insulation", "rockwool", [e.x0, y + depth - 0.02 - CEILING.insulation, e.z0], [e.x1, y + depth - 0.02, e.z1]);
  y += depth;
  e = at("deck");
  out.add("deck", "roofDeck", corrugated(e.x0, e.x1, e.z0, e.z1, y + 0.002));
}

/** The wall sample stands on its base: inside face at z = 0, outside towards -z (the side the camera sees). */
function addWall(out: Out) {
  const ids = sampleLayers.walls.map((layer) => layer.id);
  const extent = (id: string) => {
    const index = ids.indexOf(id);
    return { x1: SAMPLE - index * (STEP * 0.75), y1: SAMPLE_HEIGHT - index * (STEP * 1.25) };
  };
  const slab = (id: string, material: MaterialKey, d0: number, d1: number) => {
    const { x1, y1 } = extent(id);
    out.box(id, material, [0, 0, -d1], [x1, y1, -d0]);
  };
  let d = 0;
  slab("finish", "finishBoard", d, (d += WALL.finish));
  slab("plasterboard", "plasterboard", d, (d += WALL.plasterboard));
  slab("vapour", "vapour", d, (d += MIN_SHEET));
  // Steel studs (C sections, web through the wall) and the rock wool between them
  const { stud } = PROFILES;
  const studs = extent("studs");
  for (const x of [0.06, 0.46]) {
    const t = 0.003;
    out.box("studs", "galv", [x, 0, -(d + stud.depth)], [x + t, studs.y1, -d]);
    out.box("studs", "galv", [x, 0, -(d + t)], [x + 0.04, studs.y1, -d]);
    out.box("studs", "galv", [x, 0, -(d + stud.depth)], [x + 0.04, studs.y1, -(d + stud.depth - t)]);
  }
  const insulation = extent("insulation");
  const inset = (stud.depth - WALL.insulation) / 2;
  out.box("insulation", "rockwool", [0, 0, -(d + inset + WALL.insulation)], [insulation.x1, insulation.y1, -(d + inset)]);
  d += stud.depth;
  slab("board", "fibreCement", d, (d += WALL.board));
  slab("membrane", "membrane", d, (d += MIN_SHEET));
  const battens = extent("battens");
  for (const x of [0.08, 0.38]) out.box("battens", "batten", [x, 0, -(d + WALL.batten)], [x + 0.045, battens.y1, -d]);
  d += WALL.batten;
  slab("cladding", "cladding", d, d + MIN_SHEET);
}

export function buildSample(kind: SampleKind, { anisotropy = 4 }: { anisotropy?: number } = {}): SceneModel {
  const materials = createMaterials(anisotropy);
  const out = new Out();
  if (kind === "floor") addFloor(out);
  else if (kind === "ceiling") addCeiling(out);
  else addWall(out);

  const object = new THREE.Group();
  object.name = `sample-${kind}`;
  const root = new THREE.Group();
  root.position.set(-SAMPLE / 2, 0, kind === "walls" ? 0.1 : -SAMPLE / 2);
  object.add(root);

  const groups = new Map<string, THREE.Group>();
  const meshes: THREE.Mesh[] = [];
  for (const { tag, geometry } of out.collector.merged()) {
    let group = groups.get(tag.group!);
    if (!group) {
      group = new THREE.Group();
      group.name = tag.group!;
      groups.set(tag.group!, group);
      root.add(group);
    }
    const material = materials[tag.material];
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { ...tag } satisfies MeshTag;
    mesh.castShadow = !material.transparent;
    mesh.receiveShadow = !material.transparent;
    if (material.transparent) mesh.renderOrder = 2;
    group.add(mesh);
    meshes.push(mesh);
  }

  // Only the materials this sample uses are kept; the rest are disposed now
  const used = new Set(meshes.map((mesh) => mesh.material as THREE.Material));
  for (const material of Object.values(materials)) {
    if (used.has(material)) continue;
    (material as THREE.MeshStandardMaterial).map?.dispose();
    material.dispose();
  }

  return {
    object,
    groups,
    meshes,
    materials,
    dispose() {
      meshes.forEach((mesh) => mesh.geometry.dispose());
      for (const material of used) {
        (material as THREE.MeshStandardMaterial).map?.dispose();
        material.dispose();
      }
    },
  };
}
