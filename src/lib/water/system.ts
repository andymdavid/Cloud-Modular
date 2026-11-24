import * as THREE from "three";
import { buildCartridge, type CartridgeKind } from "@/lib/water/cartridge";

/**
 * The three-stage system (FH20BB3), in millimetres, standing on the floor at y = 0, matched to the supplier's product
 * render: three 20 inch Big Blue sumps (tapered, with fine vertical ribs and rings round the base) with black ring nuts
 * under one polished stainless bracket (a shelf a little wider than the heads with a rolled front edge, and a back plate
 * carrying a 60 mm gauge over each head), and
 * 1 inch stainless unions at the inlet (left) and outlet (right). About 58 × 21 × 74 cm overall, as specified.
 *
 * For "How it works", `active` (1 to 3) cuts the front half away from that housing and its cartridge, with a flat
 * section through the media, and `flow` draws the water's path through it: in at the head, down the gap outside the
 * cartridge, in through the media along its height, and up the core to the next head. `flow` 0 draws the water arriving at
 * the inlet, 4 leaving the outlet.
 */
export const CENTRES = [-190, 0, 190];
const SUMP_TOP = 560;
const CARTRIDGE_Y = 30 + 254; // a 508 mm cartridge standing 30 mm off the sump's floor
const KINDS: CartridgeKind[] = ["pp", "carbon", "carbon"];
const WATER = "#ffffff";
const GLOW = "#2fb4f2";
const HEAD_Y = 608; // the ports, through the side of each head
const SHELF_Y = 614; // the underside of the bracket's shelf
const PLATE_FRONT = -84; // the face of its back plate
const SHELF_H = 58;
const GAUGE_Y = SHELF_Y + SHELF_H + 34;

/** The sump: tapered, rounded at the foot with rings round it, and two pairs of fine ribs running up its sides. */
function sumpGeometry() {
  const g = lathe(
    [[0, 0], [38, 0], [60, 3], [71, 10], [75.5, 20], [76.6, 26], [77.6, 28], [77.6, 31], [76.8, 33], [77.8, 36], [77.8, 39], [77, 41], [78, 44], [78, 47], [77.4, 49], ...Array.from({ length: 59 }, (_, i) => [77.4 + ((86 - 77.4) * (i + 1)) / 60, 49 + ((528 - 49) * (i + 1)) / 60]), [86, 528], [87.5, 546], [87.5, SUMP_TOP]],
    720,
  );
  const pos = g.attributes.position;
  const ribs = [-7, 7, 173, 187].map((d) => THREE.MathUtils.degToRad(d)); // either side of the front and the back
  for (let i = 0; i < pos.count; i++) {
    const [x, y, z] = [pos.getX(i), pos.getY(i), pos.getZ(i)];
    if (y < 50 || y > 527) continue;
    const a = Math.atan2(x, z);
    const near = Math.min(...ribs.map((r) => Math.abs(Math.atan2(Math.sin(a - r), Math.cos(a - r)))));
    const lift = Math.max(0, 1 - near / THREE.MathUtils.degToRad(0.9)) * 3 * Math.min(1, (y - 50) / 16, (527 - y) / 16);
    if (!lift) continue;
    const k = (Math.hypot(x, z) + lift) / Math.hypot(x, z);
    pos.setXYZ(i, x * k, y, z * k);
  }
  g.computeVertexNormals();
  return g;
}

function lathe(points: number[][], segments = 128) {
  const g = new THREE.LatheGeometry(points.map(([r, y]) => new THREE.Vector2(r, y)), segments);
  g.computeVertexNormals();
  return g;
}

/** A dial face: white, ticks round a 270° sweep, 0 to 150 PSI, with the needle resting near 60. */
function gaugeFace() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#f7f7f5";
  ctx.fillRect(0, 0, 512, 512);
  ctx.translate(256, 256);
  const angle = (v: number) => (-225 + (v / 150) * 270) * (Math.PI / 180);
  ctx.strokeStyle = "#c83a2e";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(0, 0, 196, angle(120), angle(150));
  ctx.stroke();
  ctx.strokeStyle = "#1a1a1a";
  for (let v = 0; v <= 150; v += 5) {
    const major = v % 25 === 0;
    ctx.lineWidth = major ? 8 : 4;
    const a = angle(v);
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * (major ? 170 : 184), Math.sin(a) * (major ? 170 : 184));
    ctx.lineTo(Math.cos(a) * 206, Math.sin(a) * 206);
    ctx.stroke();
  }
  ctx.fillStyle = "#1a1a1a";
  ctx.font = "700 40px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let v = 0; v <= 150; v += 25) {
    const a = angle(v);
    ctx.fillText(String(v), Math.cos(a) * 132, Math.sin(a) * 132);
  }
  ctx.font = "600 30px sans-serif";
  ctx.fillText("PSI", 0, 90);
  ctx.rotate(angle(60) + Math.PI / 2);
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.moveTo(-6, 30);
  ctx.lineTo(0, -180);
  ctx.lineTo(6, 30);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** A flat section through a cartridge's media, either side of the core, as two thin slabs in the cut plane. */
function section(kind: CartridgeKind) {
  const g = new THREE.Group();
  const layers =
    kind === "pp"
      ? [
          { from: 14.5, to: 44, color: "#1c1d1f", rough: 1 }, // granular carbon
          { from: 44, to: 56, color: "#f0f0f2", rough: 1 }, // melt-blown polypropylene
        ]
      : [
          { from: 14.5, to: 55, color: "#2e3033", rough: 1 }, // sintered carbon block
          { from: 55, to: 57.4, color: "#ecebe7", rough: 0.9 }, // wrap and netting
        ];
  for (const side of [-1, 1])
    for (const layer of layers) {
      const w = layer.to - layer.from;
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w, 492, 0.6), new THREE.MeshStandardMaterial({ color: layer.color, roughness: layer.rough }));
      slab.position.set(side * (layer.from + w / 2), 0, -0.4);
      g.add(slab);
    }
  return g;
}

export const pathCurve = (points: number[][]) =>
  new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)), false, "catmullrom", 0.1);

/** The water's path drawn in the render as a faint track with an arrowhead at its end, so the direction reads even
 * without motion. The page animates the flowing water over it, along the same paths (see waterPaths). */
function flowTrack(points: number[][], outside: boolean) {
  const curve = pathCurve(points);
  const g = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color: outside ? GLOW : WATER, transparent: true, opacity: outside ? 0.55 : 0.5, depthWrite: false, toneMapped: false });
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 200, outside ? 4 : 3, 12, false), material));
  const head = new THREE.Mesh(new THREE.ConeGeometry(outside ? 13 : 10, 26, 24), new THREE.MeshBasicMaterial({ color: outside ? GLOW : WATER, toneMapped: false }));
  head.position.copy(curve.getPoint(1));
  head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), curve.getTangent(1));
  g.add(head);
  return g;
}

/** The water's paths for a step: arriving at the inlet (0), through the cut housing (1 to 3), leaving the outlet (4). */
export function waterPaths(flow: number): { points: number[][]; outside: boolean }[] {
  if (flow === 0) return [{ points: [[-470, HEAD_Y, 0], [-420, HEAD_Y, 0], [-372, HEAD_Y, 0]], outside: true }];
  if (flow === 4) return [{ points: [[356, HEAD_Y, 0], [410, HEAD_Y, 0], [462, HEAD_Y, 0]], outside: true }];
  if (flow < 1 || flow > 3) return [];
  const x = CENTRES[flow - 1];
  const z = -6;
  const inside = (points: number[][]) => ({ points, outside: false });
  return [
    // in at the head and down the gap outside the cartridge, on both sides
    inside([[x - 88, 608, z], [x - 68, 580, z], [x - 68, 330, z], [x - 68, 62, z]]),
    inside([[x - 40, 612, z], [x + 30, 604, z], [x + 68, 572, z], [x + 68, 330, z], [x + 68, 62, z]]),
    // in through the media to the core, all the way up the cartridge
    ...[110, 210, 310, 410, 510].flatMap((y) => [-1, 1].map((side) => inside([[x + side * 66, y, z], [x + side * 44, y, z], [x + side * 22, y, z]]))),
    // up the core and on to the next head
    inside([[x, 70, z], [x, 360, z], [x, 580, z], [x + 30, 606, z], [x + 100, 610, z]]),
  ];
}

/** Fine brushing for stainless steel, as a roughness map: streaks along the texture's u axis. */
function brushed() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#6a6a6a";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) {
    const v = 80 + Math.random() * 60;
    ctx.fillStyle = `rgba(${v},${v},${v},0.35)`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 60 + Math.random() * 260, 1);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/**
 * `cabinet` builds the FH20BB3-SSS (from the supplier's photos): the same system closed in a 304 stainless steel box,
 * a door across the front with a lever lock, the top folded into a shelf with a short upstand at the back, and the
 * gauges standing on top, each with its red pressure-release button.
 */
export function buildSystem({ active = 0, flow = -1, cabinet = false }: { active?: number; flow?: number; cabinet?: boolean } = {}) {
  const group = new THREE.Group();
  const cut = [new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)];

  const steel = new THREE.MeshStandardMaterial({ color: "#ffffff", metalness: 0.55, roughness: 0.16, envMapIntensity: 2 });
  const satin = new THREE.MeshStandardMaterial({ color: "#fbfbfb", metalness: 0.4, roughness: 0.32, envMapIntensity: 1.6 });
  const chrome = new THREE.MeshStandardMaterial({ color: "#f2f2f2", metalness: 1, roughness: 0.1, envMapIntensity: 1.5 });
  const red = new THREE.MeshPhysicalMaterial({ color: "#d0261c", roughness: 0.3, clearcoat: 0.6 });
  const brush = brushed();
  const sheet = (vertical: boolean) => {
    const map = brush.clone();
    map.rotation = vertical ? Math.PI / 2 : 0;
    map.repeat.set(2, 2);
    return new THREE.MeshStandardMaterial({ color: "#e4e6e8", metalness: 1, roughness: 0.42, roughnessMap: map, envMapIntensity: 1.6 });
  };
  const black = new THREE.MeshPhysicalMaterial({ color: "#141516", roughness: 0.5, clearcoat: 0.2 });
  const face = new THREE.MeshStandardMaterial({ map: gaugeFace(), roughness: 0.4 });

  const sump = sumpGeometry();
  // the ring nut, and the head above it up to the bracket
  const nut = lathe([[87.5, 544], [91, 545], [93, 548], [93.6, 553], [93.6, 588], [93, 594], [90.5, 598], [88, 599], [88, 601], [89, 602], [89, 616]]);

  CENTRES.forEach((x, i) => {
    const stage = i + 1;
    const isCut = stage === active;
    const blue = new THREE.MeshPhysicalMaterial({
      color: "#2059b8",
      roughness: 0.34,
      clearcoat: 0.35,
      clearcoatRoughness: 0.3,
      side: THREE.DoubleSide,
      clippingPlanes: isCut ? cut : null,
    });
    const housing = new THREE.Group();
    housing.position.x = x;
    housing.add(new THREE.Mesh(sump, blue));
    housing.add(new THREE.Mesh(nut, black));

    const cartridge = buildCartridge(KINDS[i]);
    cartridge.position.y = CARTRIDGE_Y;
    if (isCut) {
      cartridge.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.material = (o.material as THREE.Material).clone();
          (o.material as THREE.Material).clippingPlanes = cut;
          (o.material as THREE.Material).side = THREE.DoubleSide;
        }
      });
      const slab = section(KINDS[i]);
      slab.position.y = CARTRIDGE_Y;
      housing.add(slab);
      // the perforated core tube, its back half showing through the cut
      const core = new THREE.Mesh(new THREE.CylinderGeometry(14.4, 14.4, 500, 48, 1, true), new THREE.MeshStandardMaterial({ color: "#d8d8d4", roughness: 0.8, side: THREE.DoubleSide, clippingPlanes: cut }));
      core.position.y = CARTRIDGE_Y;
      housing.add(core);
    }
    housing.add(cartridge);

    // over each head, the gauge: on the face of the bracket's back plate, or for the cabinet standing on its top
    const [gy, gz] = cabinet ? [SHELF_Y + SHELF_H + 44, 10] : [GAUGE_Y, PLATE_FRONT + 12];
    const caseMesh = new THREE.Mesh(new THREE.CylinderGeometry(31, 31, 24, 64), chrome);
    caseMesh.rotation.x = Math.PI / 2;
    caseMesh.position.set(0, gy, gz);
    const dial = new THREE.Mesh(new THREE.CircleGeometry(27.5, 64), face);
    dial.position.set(0, gy, gz + 12.2);
    const bezel = new THREE.Mesh(new THREE.TorusGeometry(29.5, 3, 16, 64), chrome);
    bezel.position.set(0, gy, gz + 12.4);
    const glass = new THREE.Mesh(new THREE.CircleGeometry(28, 64), new THREE.MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.02, transparent: true, opacity: 0.12 }));
    glass.position.set(0, gy, gz + 13.2);
    housing.add(caseMesh, dial, bezel, glass);
    if (cabinet) {
      const top = SHELF_Y + SHELF_H;
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 14, 24), chrome);
      stem.position.set(0, top + 7, gz);
      const nutG = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 4, 6), chrome);
      nutG.position.set(0, top + 2, gz);
      const buttonBase = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 5, 6), chrome);
      buttonBase.position.set(62, top + 2.5, 40);
      const button = new THREE.Mesh(new THREE.CylinderGeometry(7, 7.5, 13, 32), red);
      button.position.set(62, top + 11, 40);
      housing.add(stem, nutG, buttonBase, button);
      for (const bx of [-62, 30]) {
        const bolt = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 3, 6), chrome);
        bolt.position.set(bx, top + 1.5, bx < 0 ? -40 : 52);
        housing.add(bolt);
      }
    }

    group.add(housing);
  });

  // the stainless bracket: a shelf the heads hang from, its front edge rolled down, and a back plate the gauges mount on
  const [bw, bd, roll] = [cabinet ? 304 : 288, 103, 14];
  const bh = SHELF_H;
  const side = new THREE.Shape();
  side.moveTo(-bd, 0);
  side.lineTo(bd, 0);
  side.lineTo(bd, bh - roll);
  side.absarc(bd - roll, bh - roll, roll, 0, Math.PI / 2, false);
  side.lineTo(-bd, bh);
  side.lineTo(-bd, 0);
  const shelfGeometry = new THREE.ExtrudeGeometry(side, { depth: bw * 2, bevelEnabled: true, bevelThickness: 6, bevelSize: 2, bevelSegments: 8, curveSegments: 32 });
  shelfGeometry.rotateY(-Math.PI / 2); // the section's width runs front to back, the extrusion across
  shelfGeometry.translate(bw, 0, 0);
  const shelf = new THREE.Mesh(shelfGeometry, steel);
  shelf.position.y = SHELF_Y;
  group.add(shelf);

  // the back plate, or for the cabinet a short upstand along the back of its top
  const [pw, ph, pr] = cabinet ? [bw, 40, 14] : [258, 72, 20];
  const outline = new THREE.Shape();
  outline.moveTo(-pw, 0);
  outline.lineTo(pw, 0);
  outline.lineTo(pw, ph - pr);
  outline.quadraticCurveTo(pw, ph, pw - pr, ph);
  outline.lineTo(-pw + pr, ph);
  outline.quadraticCurveTo(-pw, ph, -pw, ph - pr);
  outline.lineTo(-pw, 0);
  const plate = new THREE.Mesh(new THREE.ExtrudeGeometry(outline, { depth: 3, bevelEnabled: true, bevelThickness: 1, bevelSize: 1, bevelSegments: 3, curveSegments: 24 }), satin);
  plate.position.set(0, SHELF_Y + bh - 2, cabinet ? -bd : PLATE_FRONT - 4);
  group.add(plate);

  if (cabinet) {
    // the 1.5 mm stainless box under the top, the door across its front with a lever lock on the right
    const [cw, cf, cb] = [bw - 10, bd - 8, -bd]; // half width, front face, back
    const H = SHELF_Y;
    const box = (w: number, h: number, d: number, x: number, y: number, z: number, material: THREE.Material) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
      m.position.set(x, y, z);
      group.add(m);
      return m;
    };
    const walls = sheet(true);
    box(3, H, cf - cb, -cw + 1.5, H / 2, (cf + cb) / 2, walls);
    box(3, H, cf - cb, cw - 1.5, H / 2, (cf + cb) / 2, walls);
    box(cw * 2, H, 3, 0, H / 2, cb + 1.5, walls);
    box(cw * 2, 3, cf - cb, 0, 1.5, (cf + cb) / 2, walls);
    // the front frame round the door
    const frame = 14;
    box(frame, H, 3, -cw + frame / 2, H / 2, cf - 1.5, walls);
    box(frame, H, 3, cw - frame / 2, H / 2, cf - 1.5, walls);
    box(cw * 2, frame, 3, 0, frame / 2, cf - 1.5, walls);
    box(cw * 2, frame, 3, 0, H - frame / 2, cf - 1.5, walls);
    // the door, a folded panel standing just proud of the frame, with a dark shadow gap round it
    box(cw * 2 - frame * 2, H - frame * 2, 2, 0, H / 2, cf - 6, new THREE.MeshStandardMaterial({ color: "#1b1c1e", roughness: 0.9 }));
    box(cw * 2 - frame * 2 - 5, H - frame * 2 - 5, 12, 0, H / 2, cf + 4, sheet(true));
    // the lever lock
    const lx = cw - frame - 52;
    box(20, 64, 3, lx, H * 0.5, cf + 12.5, chrome);
    box(10, 46, 8, lx, H * 0.5 - 6, cf + 18, chrome);
    const key = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 4, 24), new THREE.MeshStandardMaterial({ color: "#2b7fd4", roughness: 0.4 }));
    key.rotation.x = Math.PI / 2;
    key.position.set(lx, H * 0.5 + 24, cf + 15);
    group.add(key);
  }

  // 1 inch unions at the inlet and outlet
  for (const side of [-1, 1]) {
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(16.5, 16.5, 70, 32), steel);
    pipe.rotation.z = Math.PI / 2;
    pipe.position.set(side * 318, HEAD_Y, 0);
    const nutU = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 22, 6), steel);
    nutU.rotation.z = Math.PI / 2;
    nutU.position.set(side * 326, HEAD_Y, 0);
    group.add(pipe, nutU);
  }

  for (const m of group.children) m.traverse((o) => o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true));

  for (const path of waterPaths(flow)) group.add(flowTrack(path.points, path.outside));

  return group;
}
