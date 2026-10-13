import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

/** Geometry and texture helpers shared by the explorer model builders. */

export function stripeTexture(size: number, base: string, line: string, count: number, vertical: boolean, lineWidth = 2) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = line;
  const step = size / count;
  for (let i = 0; i < count; i++) {
    const at = Math.round(i * step);
    if (vertical) ctx.fillRect(at, 0, lineWidth, size);
    else ctx.fillRect(0, at, size, lineWidth);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** UVs are written in metres (see planarUVs), so `tile` is the texture's real-world size. */
export function tiled(texture: THREE.Texture, tile: number, anisotropy: number) {
  texture.repeat.set(1 / tile, 1 / tile);
  texture.anisotropy = anisotropy;
  return texture;
}

/** World-space planar UVs in metres, so tiled textures line up across merged pieces. */
export function planarUVs(geometry: THREE.BufferGeometry) {
  const position = geometry.getAttribute("position");
  const normal = geometry.getAttribute("normal");
  const uv = new Float32Array(position.count * 2);
  for (let i = 0; i < position.count; i++) {
    const nx = Math.abs(normal.getX(i));
    const ny = Math.abs(normal.getY(i));
    const nz = Math.abs(normal.getZ(i));
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    if (ny > 0.7) uv.set([x, z], i * 2);
    else if (nx > nz) uv.set([z, y], i * 2);
    else uv.set([x, y], i * 2);
  }
  geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

export function box(min: [number, number, number], max: [number, number, number]) {
  const [x0, y0, z0] = min;
  const [x1, y1, z1] = max;
  return new THREE.BoxGeometry(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0)).translate(
    (x0 + x1) / 2,
    (y0 + y1) / 2,
    (z0 + z1) / 2,
  );
}

/**
 * Collects geometry per tag (group, level, material and anything else that sets a mesh apart) and merges each
 * bucket into one geometry, so a model renders in a few dozen draw calls.
 */
export class Collector<Tag extends object> {
  private buckets = new Map<string, { tag: Tag; parts: THREE.BufferGeometry[] }>();

  add(tag: Tag, geometry: THREE.BufferGeometry) {
    const key = JSON.stringify(tag);
    let bucket = this.buckets.get(key);
    if (!bucket) this.buckets.set(key, (bucket = { tag, parts: [] }));
    const flat = geometry.index ? geometry.toNonIndexed() : geometry;
    if (flat !== geometry) geometry.dispose();
    for (const name of Object.keys(flat.attributes)) if (name !== "position" && name !== "normal") flat.deleteAttribute(name);
    planarUVs(flat);
    bucket.parts.push(flat);
  }

  *merged() {
    for (const { tag, parts } of this.buckets.values()) {
      const geometry = mergeGeometries(parts)!;
      parts.forEach((part) => part.dispose());
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
      yield { tag, geometry };
    }
  }
}
