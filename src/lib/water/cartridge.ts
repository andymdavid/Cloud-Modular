import * as THREE from "three";

/**
 * A 20 inch jumbo filter cartridge (about 114 mm across and 508 mm long), modelled in millimetres and centred on the
 * origin, upright, matched to the supplier's product photos. "carbon" is the CTO20BB: a sintered coconut carbon block
 * in a white non-woven wrap and an extruded diamond netting, with low, flat white end caps. "pp" is the PP20BB-CC:
 * white melt-blown polypropylene (the granular carbon is inside) between taller blue caps with a flared rim and a raised
 * boss round the core. Textures are drawn on canvases so there are no image files. Used for the page's cartridge
 * renders now and the full system model later.
 */
export type CartridgeKind = "carbon" | "pp";

const R = 56; // body radius
const LENGTH = 508;

/** Each cap's profile, from the core outwards (radius, height in mm), and the cap's colour. */
const caps = {
  // A short lip round the core, the flat face, then the rounded rim
  carbon: {
    color: "#eeede9",
    profile: [[14.5, 0], [14.5, 8.6], [15.5, 9.4], [19.5, 9.4], [20.5, 8.4], [56.4, 8], [57.9, 7.2], [58.6, 5.6], [58.6, 1.2], [58, 0.2], [56, 0]],
  },
  // Measured against the 114 mm body in the supplier's photo. Top: a wide raised boss round a large bore, the face,
  // then a deep band only a little wider than the body. Bottom: a plain cup whose band flares out at the base.
  pp: {
    color: "#1a62d8",
    profile: [[13.6, 0], [13.6, 21], [14.6, 22], [26, 22], [27, 21], [27, 17.2], [28, 16.4], [57.6, 16], [58.6, 15.2], [59, 13.8], [59, 0.6], [58.4, 0], [56, 0]],
    bottom: [[13.6, 0], [13.6, 18], [57.6, 18], [58.6, 17.2], [59, 15.8], [59, 5], [60.6, 1.6], [60.4, 0.3], [56, 0]],
  },
} satisfies Record<CartridgeKind, { color: string; profile: number[][]; bottom?: number[][] }>;

const bottomProfile = (kind: CartridgeKind): number[][] => (caps[kind] as { bottom?: number[][] }).bottom ?? caps[kind].profile;
const height = (profile: number[][]) => Math.max(...profile.map(([, y]) => y));

function canvas(size: number, draw: (ctx: CanvasRenderingContext2D, size: number) => void) {
  const el = document.createElement("canvas");
  el.width = el.height = size;
  draw(el.getContext("2d")!, size);
  return el;
}

/**
 * The wrap and its netting, drawn on one tile per cell so they line up. Everything comes from one smooth field over
 * the tile, dome = sin(pi * (u + v)) * sin(pi * (u - v)), which is 0 along the diagonals and peaks in the middle of
 * each cell. The net is where the dome is low, so the openings come out as rounded diamonds and the strands thicken
 * into knots where they cross; the non-woven wrap pillows up with the dome, and its square grid of perforations
 * (7 across, 8 down) shows the carbon as grey dots, clearest in the middle of each cell. Matched to the supplier's
 * close-up photo.
 */
const CELLS_AROUND = 22;
const CELLS_ALONG = 25;
const STRAND = 0.1; // dome value at a strand's edge

function cellTextures() {
  const S = 512;
  const random = mulberry(7);
  const dome = (u: number, v: number) => Math.abs(Math.sin(Math.PI * (u + v)) * Math.sin(Math.PI * (u - v)));

  const field = (pixel: (d: number) => [number, number, number]) =>
    canvas(S, (ctx, s) => {
      const img = ctx.createImageData(s, s);
      for (let y = 0; y < s; y++)
        for (let x = 0; x < s; x++) {
          const [r, g, b] = pixel(dome((x + 0.5) / s, (y + 0.5) / s));
          const i = (y * s + x) * 4;
          img.data[i] = r;
          img.data[i + 1] = g;
          img.data[i + 2] = b;
          img.data[i + 3] = 255;
        }
      ctx.putImageData(img, 0, 0);
    });

  const perforations = (ctx: CanvasRenderingContext2D, s: number, bumpPass: boolean) => {
    const cols = 7, rows = 8;
    for (let c = 0; c < cols; c++)
      for (let r = 0; r < rows; r++) {
        const x = ((c + 0.5) / cols) * s, y = ((r + 0.5) / rows) * s;
        const k = Math.min(dome(x / s, y / s) / 0.6, 1);
        if (k < 0.2) continue;
        ctx.fillStyle = bumpPass ? `rgba(0,0,0,${0.3 * k})` : `rgba(104,103,114,${0.35 + 0.55 * k})`;
        ctx.beginPath();
        ctx.arc(x, y, (s / cols) * (0.17 + 0.08 * k), 0, Math.PI * 2);
        ctx.fill();
      }
  };

  const wrapMap = field((d) => {
    const l = 200 + 34 * Math.sqrt(d) + (random() - 0.5) * 8;
    return [l, l, l + 6];
  });
  perforations(wrapMap.getContext("2d")!, S, false);
  const wrapBump = field((d) => {
    const l = 255 * Math.sqrt(d);
    return [l, l, l];
  });
  perforations(wrapBump.getContext("2d")!, S, true);

  const netAlpha = field((d) => (d < STRAND ? [255, 255, 255] : [0, 0, 0]));
  const netBump = field((d) => {
    const l = 255 * Math.sqrt(Math.max(0, 1 - d / STRAND));
    return [l, l, l];
  });

  const textures = {
    wrapMap: new THREE.CanvasTexture(wrapMap),
    wrapBump: new THREE.CanvasTexture(wrapBump),
    netAlpha: new THREE.CanvasTexture(netAlpha),
    netBump: new THREE.CanvasTexture(netBump),
  };
  textures.wrapMap.colorSpace = THREE.SRGBColorSpace;
  for (const t of Object.values(textures)) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(CELLS_AROUND, CELLS_ALONG); // cells about 17 mm across and 20 mm tall
    t.anisotropy = 16;
  }
  return textures;
}

/** A point and its copies one tile over in each direction, for drawing marks that cross the tile's edges. */
function wrapped(x: number, y: number, s: number) {
  const out: [number, number][] = [];
  for (const dx of [-s, 0, s]) for (const dy of [-s, 0, s]) out.push([x + dx, y + dy]);
  return out;
}

/** White melt-blown polypropylene: soft cloudy density over fine fibres. */
function meltBlownTextures() {
  const random = mulberry(11);
  const draw = (bumpPass: boolean) =>
    canvas(1024, (ctx, s) => {
      ctx.fillStyle = bumpPass ? "#808080" : "#f1f1f3";
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 1400; i++) {
        const l = bumpPass ? 40 + random() * 180 : 224 + random() * 28;
        const r = 10 + random() * 40;
        const x0 = random() * s, y0 = random() * s;
        // drawn again across each edge so the tile repeats without a seam
        for (const [x, y] of wrapped(x0, y0, s)) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, `rgba(${l},${l},${l + 3},0.4)`);
          g.addColorStop(1, `rgba(${l},${l},${l + 3},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(x - r, y - r, r * 2, r * 2);
        }
      }
      for (let i = 0; i < 26000; i++) {
        const l = bumpPass ? 60 + random() * 190 : 210 + random() * 45;
        ctx.strokeStyle = `rgba(${l},${l},${l + 3},0.3)`;
        ctx.lineWidth = 0.5 + random() * 0.8;
        const x0 = random() * s, y0 = random() * s, a = random() * Math.PI, len = 3 + random() * 9;
        for (const [x, y] of wrapped(x0, y0, s)) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.quadraticCurveTo(x + Math.cos(a + 0.6) * len, y + Math.sin(a + 0.6) * len, x + Math.cos(a) * len * 1.6, y + Math.sin(a) * len * 1.6);
          ctx.stroke();
        }
      }
    });
  const map = new THREE.CanvasTexture(draw(false));
  map.colorSpace = THREE.SRGBColorSpace;
  const bump = new THREE.CanvasTexture(draw(true));
  for (const t of [map, bump]) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 4);
    t.anisotropy = 16;
  }
  return { map, bump };
}

function capGeometry(profile: number[][]) {
  const p = profile.map(([x, y]) => new THREE.Vector2(x, y));
  const g = new THREE.LatheGeometry(p, 128);
  g.computeVertexNormals();
  return g;
}

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildCartridge(kind: CartridgeKind = "carbon") {
  const group = new THREE.Group();
  const capH = height(caps[kind].profile);
  const baseH = height(bottomProfile(kind));
  const BODY = LENGTH - capH - baseH + 2;
  const mid = (baseH - capH) / 2; // the body's centre, so the whole cartridge stays centred on the origin
  const topY = mid + BODY / 2 - 1;

  const capMaterial = new THREE.MeshPhysicalMaterial({ color: caps[kind].color, roughness: 0.36, clearcoat: 0.35, clearcoatRoughness: 0.35, side: THREE.DoubleSide });

  if (kind === "carbon") {
    const tex = cellTextures();
    const wrapMaterial = new THREE.MeshStandardMaterial({ map: tex.wrapMap, bumpMap: tex.wrapBump, bumpScale: 3, roughness: 0.94 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(R, R, BODY, 240, 1, true), wrapMaterial);
    body.position.y = mid;
    body.castShadow = body.receiveShadow = true;
    group.add(body);

    const netting = new THREE.Mesh(
      new THREE.CylinderGeometry(R + 1.4, R + 1.4, BODY - 2, 240, 1, true),
      new THREE.MeshStandardMaterial({ color: "#f3f2f5", roughness: 0.5, alphaMap: tex.netAlpha, alphaTest: 0.5, bumpMap: tex.netBump, bumpScale: 3, side: THREE.DoubleSide }),
    );
    netting.position.y = mid;
    netting.castShadow = netting.receiveShadow = true;
    netting.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, alphaMap: tex.netAlpha, alphaTest: 0.5 });
    group.add(netting);
  } else {
    const { map, bump } = meltBlownTextures();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(R, R, BODY, 240, 1, true), new THREE.MeshStandardMaterial({ map, bumpMap: bump, bumpScale: 3, roughness: 1 }));
    body.position.y = mid;
    body.castShadow = body.receiveShadow = true;
    group.add(body);
  }

  const top = new THREE.Mesh(capGeometry(caps[kind].profile), capMaterial);
  top.position.y = topY;
  const bottom = new THREE.Mesh(capGeometry(bottomProfile(kind)), capMaterial);
  bottom.scale.y = -1;
  bottom.position.y = mid - BODY / 2 + 1;
  for (const c of [top, bottom]) {
    c.castShadow = c.receiveShadow = true;
    group.add(c);
  }

  // The open core: a dark bore, and on the carbon block a flat gasket round its mouth (the PP's ring is moulded in)
  const coreR = caps[kind].profile[0][0] - 0.1;
  const bore = new THREE.Mesh(new THREE.CylinderGeometry(coreR, coreR, 60, 48, 1, true), new THREE.MeshStandardMaterial({ color: "#050506", roughness: 1, side: THREE.BackSide }));
  bore.position.y = topY + capH - 31;
  group.add(bore);
  if (kind === "carbon") {
    const gasket = new THREE.Mesh(new THREE.TorusGeometry(17, 1.6, 24, 96), new THREE.MeshStandardMaterial({ color: "#d9d7d0", roughness: 0.8 }));
    gasket.rotation.x = Math.PI / 2;
    gasket.position.y = topY + 9.6;
    group.add(gasket);
  }

  return group;
}

export const cartridgeSize = (kind: CartridgeKind) => ({ radius: Math.max(...caps[kind].profile.map(([x]) => x)), height: LENGTH });
