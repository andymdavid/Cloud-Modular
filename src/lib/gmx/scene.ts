import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * "How it works" for GMX, live in three.js and in millimetres: three Model 800s on a DN20 copper main, 25 mm apart,
 * labels up (after GMX's product photographs and placement guide). Each is a gloss black pressed-steel channel with
 * folded flanges over two ceramic magnet bars set in a V against the pipe, bolted through its flanges to a backing plate
 * with white nylon bolts and hex nuts. The pipe and the water in it are a solid section cut along the front, so the minerals
 * show flowing through; to show what is inside a unit, its housing turns to an x-ray outline rather than being cut.
 *
 * Stages, set from the steps beside it:
 *   0  hard water comes in: the run ahead of the units, minerals in the water as clumps of varying size
 *   1  through the field: the middle unit in x-ray, the field running between its magnets through the water
 *   2  minerals change form: every unit in x-ray, each clump breaking into fine pieces spread evenly through the water
 *      as it passes (GMX's account: the field breaks up mineral complexes into fine crystallization centres that stay
 *      suspended)
 *   3  rinsed away: the run after the units, the fine pieces carried on with the water
 *
 * The minerals follow GMX's account of the process, drawn larger than life; nothing is added or taken out, so the
 * same material goes in and comes out. Scale forms mostly where water is heated, so the cold main has none, and a
 * permanent magnet's field is static and strongest near the magnets, so the lines only shimmer and fade with depth.
 */
const PIPE_R = 9.5;
const PIPE_IN = 8.4;
const PIPE_LEN = 1100;
const UNIT_L = 121; // GMX's size for the Model 800: 5¼ × 4¾ × 1¾ inch, so 121 mm along the pipe, 133 across, 44 high
const UNIT_HALF_W = 66.5; // half the width across the pipe, to the flanges' edges
const WIDEN = UNIT_HALF_W / 55; // the profile below was drawn 110 mm across and is scaled to GMX's width
const UNITS = [-(UNIT_L + 25), 0, UNIT_L + 25];
const FIELD = [UNITS[0] - UNIT_L / 2, UNITS[2] + UNIT_L / 2];
const SHEET = 1.6;
const MAGNET_R = PIPE_R + 7; // the centre of each magnet bar, out from the pipe's axis
const FIELD_GOLD = new THREE.Color("#f2cf7e"); // the brand gold, lifted to read against the copper

// The camera's views, each with a slow drift while it holds
const VIEWS = [
  { pos: [-300, 150, 400], look: [-190, 0, 0], zoom: 0.78 },
  { pos: [110, 135, 245], look: [0, 10, 0], zoom: 0.85 },
  { pos: [0, 185, 440], look: [0, 6, 0], zoom: 0.6 },
  { pos: [300, 150, 400], look: [190, 0, 0], zoom: 0.78 },
] as const;

/** A studio to reflect: an overhead softbox, two strips and a broad high fill, with a dark flag low in front. */
function studio(renderer: THREE.WebGLRenderer) {
  const env = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.BoxGeometry(8000, 6000, 8000), new THREE.MeshBasicMaterial({ color: 0xb9bcbf, side: THREE.BackSide }));
  room.position.y = 2000;
  env.add(room);
  const light = (w: number, h: number, power: number, position: number[]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1).multiplyScalar(power), side: THREE.DoubleSide }));
    m.position.fromArray(position);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  light(3200, 1800, 5, [0, 4900, 400]);
  light(600, 3600, 6, [-3900, 1600, 1400]);
  light(600, 3600, 4, [3900, 1600, -600]);
  light(4200, 900, 2.6, [0, 2600, 3900]);
  light(4200, 800, 0.08, [0, -700, 3800]);
  env.scale.setScalar(0.001);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(env, 0.02).texture;
  pmrem.dispose();
  return texture;
}

/** A polyline with each inner corner rounded, to its own radius (a third number) or `r`. */
function fillet(points: ([number, number] | [number, number, number])[], radius: number, steps = 6) {
  const at = (i: number) => new THREE.Vector2(points[i][0], points[i][1]);
  const out: THREE.Vector2[] = [at(0)];
  for (let i = 1; i < points.length - 1; i++) {
    const p = at(i);
    const r = points[i][2] ?? radius;
    const a = at(i - 1).sub(p).normalize();
    const b = at(i + 1).sub(p).normalize();
    const half = Math.acos(THREE.MathUtils.clamp(a.dot(b), -1, 1)) / 2;
    const reach = r / Math.tan(half);
    const start = p.clone().addScaledVector(a, reach);
    const end = p.clone().addScaledVector(b, reach);
    const centre = p.clone().addScaledVector(a.clone().add(b).normalize(), r / Math.sin(half));
    const from = Math.atan2(start.y - centre.y, start.x - centre.x);
    let sweep = Math.atan2(end.y - centre.y, end.x - centre.x) - from;
    sweep = Math.atan2(Math.sin(sweep), Math.cos(sweep));
    for (let s = 0; s <= steps; s++) {
      const t = from + (sweep * s) / steps;
      out.push(new THREE.Vector2(centre.x + r * Math.cos(t), centre.y + r * Math.sin(t)));
    }
  }
  out.push(at(points.length - 1));
  return out;
}

/** A sheet of thickness `t` along a polyline: the line offset either side along its normals. */
function sheet(line: THREE.Vector2[], t: number) {
  const normals = line.map((p, i) => {
    const prev = line[Math.max(0, i - 1)];
    const next = line[Math.min(line.length - 1, i + 1)];
    const d = next.clone().sub(prev).normalize();
    return new THREE.Vector2(-d.y, d.x);
  });
  const left = line.map((p, i) => p.clone().addScaledVector(normals[i], t / 2));
  const right = line.map((p, i) => p.clone().addScaledVector(normals[i], -t / 2));
  return new THREE.Shape([...left, ...right.reverse()]);
}

/** Extrude a profile drawn in (z, y) along x, centred on x = 0, `length` long. */
function alongX(shape: THREE.Shape, length: number, bevel = 0, steps = 1) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: length - 2 * bevel,
    steps,
    bevelEnabled: bevel > 0,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 3,
    curveSegments: 48,
  });
  g.rotateY(-Math.PI / 2);
  g.translate(length / 2 - bevel, 0, 0);
  g.computeVertexNormals();
  return g;
}

/** The back half of a ring (or a disc, with no inner radius) in (z, y), from the top round the back to the bottom. */
function halfRing(outer: number, inner: number) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outer, Math.PI / 2, (Math.PI * 3) / 2, false);
  if (inner > 0) shape.absarc(0, 0, inner, (Math.PI * 3) / 2, Math.PI / 2, true);
  shape.closePath();
  return shape;
}

/** The clear "fluid flow" sticker: a faint frosted panel with an outlined arrow and the words in it. */
export function stickerTexture() {
  const c = document.createElement("canvas");
  c.width = 680;
  c.height = 220;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "rgba(215, 220, 222, 0.22)";
  ctx.beginPath();
  ctx.roundRect(4, 4, 672, 212, 14);
  ctx.fill();
  ctx.strokeStyle = ctx.fillStyle = "rgba(210, 214, 216, 0.85)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(40, 80);
  ctx.lineTo(520, 80);
  ctx.lineTo(520, 40);
  ctx.lineTo(630, 110);
  ctx.lineTo(520, 180);
  ctx.lineTo(520, 140);
  ctx.lineTo(40, 140);
  ctx.closePath();
  ctx.stroke();
  ctx.font = "italic 600 52px Helvetica, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("FLUID FLOW", 290, 112);
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** The screen-printed label: a white outlined panel, the model each end and the GMX globe in the middle. */
export function labelTexture() {
  const c = document.createElement("canvas");
  c.width = 1400;
  c.height = 640;
  const ctx = c.getContext("2d")!;
  ctx.strokeStyle = ctx.fillStyle = "#f2f2ef";
  ctx.lineWidth = 9;
  ctx.strokeRect(24, 24, 1352, 592);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "500 150px Helvetica, Arial, sans-serif";
  for (const [x, turn] of [[130, -Math.PI / 2], [1270, Math.PI / 2]] as const) {
    ctx.save();
    ctx.translate(x, 320);
    ctx.rotate(turn);
    ctx.fillText("800", 0, 0);
    ctx.restore();
  }
  ctx.lineWidth = 8;
  for (const rx of [330, 150]) {
    ctx.beginPath();
    ctx.ellipse(700, 290, rx, 180, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.lineWidth = 6;
  for (const k of [-0.66, -0.3, 0.3, 0.66]) {
    const half = 330 * Math.sqrt(1 - k * k);
    ctx.beginPath();
    ctx.moveTo(700 - half, 290 + 180 * k);
    ctx.lineTo(700 + half, 290 + 180 * k);
    ctx.stroke();
  }
  ctx.fillStyle = "#0c0c0e";
  ctx.fillRect(455, 215, 490, 150);
  ctx.fillStyle = "#f2f2ef";
  ctx.font = "800 190px Helvetica, Arial, sans-serif";
  ctx.fillText("GMX", 700, 298);
  ctx.font = "500 46px Helvetica, Arial, sans-serif";
  ctx.fillText("®", 1050, 440);
  ctx.font = "500 44px Helvetica, Arial, sans-serif";
  ctx.fillText("CHINO, CALIFORNIA 91710", 700, 540);
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export type UnitMaterials = {
  coat: THREE.MeshPhysicalMaterial;
  magnet: THREE.Material;
  hardware: THREE.MeshStandardMaterial;
  label: THREE.MeshBasicMaterial;
  sticker: THREE.MeshBasicMaterial;
  edges: THREE.LineBasicMaterial;
};

/** One Model 800, centred on x: the channel and its label, the magnets, the backing plate and the hardware. */
export function buildUnit(x: number, m: UnitMaterials) {
  const unit = new THREE.Group();
  // the channel's centreline in (z, y), after GMX's photographs: a narrow flange with its bolt hole, a small step up to
  // a ledge, then the wall rising almost straight to a wide flat face over well-rounded shoulders, and down again
  const line = fillet(
    ([[-55, 0.8], [-46, 0.8, 1.2], [-44.5, 6, 1.5], [-40.5, 6, 1.5], [-38.5, 44, 7], [38.5, 44, 7], [40.5, 6, 1.5], [44.5, 6, 1.5], [46, 0.8, 1.2], [55, 0.8]] as number[][]).map(([z, ...rest]) => [z * WIDEN, ...rest]) as ([number, number] | [number, number, number])[],
    2,
  );
  const channel = alongX(sheet(line, SHEET), UNIT_L, 0.35, 48);
  // the face rolls down over a generous radius at both ends, where the pipe goes in, as the pressed housing does
  const ROLL = 13;
  const pos = channel.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const [x, y] = [pos.getX(i), pos.getY(i)];
    const d = Math.abs(x) - (UNIT_L / 2 - ROLL);
    if (d <= 0 || y <= 6) continue;
    const drop = ROLL - Math.sqrt(Math.max(0, ROLL * ROLL - d * d));
    pos.setY(i, y - drop * Math.min(1, (y - 6) / 30));
  }
  channel.computeVertexNormals();
  unit.add(new THREE.Mesh(channel, m.coat));
  // its x-ray outline, shown as the housing fades
  unit.add(new THREE.LineSegments(new THREE.EdgesGeometry(channel, 28), m.edges));

  const top = -PIPE_R - 0.4;
  const plate = alongX(new THREE.Shape([[-UNIT_HALF_W, top], [UNIT_HALF_W, top], [UNIT_HALF_W, top - SHEET * 1.4], [-UNIT_HALF_W, top - SHEET * 1.4]].map(([a, b]) => new THREE.Vector2(a, b))), UNIT_L, 0.35);
  unit.add(new THREE.Mesh(plate, m.coat));
  unit.add(new THREE.LineSegments(new THREE.EdgesGeometry(plate, 28), m.edges));

  // the two magnet bars in a V, their inner faces on the pipe
  const bar = new THREE.BoxGeometry(UNIT_L - 10, 14, 26);
  for (const side of [1, -1]) {
    const magnet = new THREE.Mesh(bar, m.magnet);
    magnet.position.set(0, MAGNET_R * Math.SQRT1_2, side * MAGNET_R * Math.SQRT1_2);
    magnet.rotation.x = (side * Math.PI) / 4;
    unit.add(magnet);
  }

  // a white nylon bolt up through the middle of each flange from under the plate, a nylon hex nut on top
  const shaft = new THREE.CylinderGeometry(2.4, 2.4, 22, 24);
  const head = new THREE.CylinderGeometry(4.4, 4.4, 3, 6);
  const nut = new THREE.CylinderGeometry(4.2, 4.2, 4, 6);
  for (const z of [50.5 * WIDEN, -50.5 * WIDEN]) {
    const bolt = new THREE.Mesh(shaft, m.hardware);
    bolt.position.set(0, -3.5, z);
    const cap = new THREE.Mesh(head, m.hardware);
    cap.position.set(0, top - SHEET * 1.4 - 1.5, z);
    const hex = new THREE.Mesh(nut, m.hardware);
    hex.position.set(0, 0.8 + SHEET / 2 + 2, z);
    unit.add(bolt, cap, hex);
  }

  // the printed label in the middle of the face, and the clear "fluid flow" sticker towards one flange; both clear of
  // the extrusion's bevel, which stands 0.35 proud of the sheet
  const faceY = 44 + SHEET / 2 + 0.35 + 0.08;
  const label = new THREE.Mesh(new THREE.PlaneGeometry(58 * WIDEN, 26.5 * WIDEN), m.label);
  label.rotation.x = -Math.PI / 2;
  label.position.set(0, faceY, -4);
  const sticker = new THREE.Mesh(new THREE.PlaneGeometry(34 * WIDEN, 11 * WIDEN), m.sticker);
  sticker.rotation.x = -Math.PI / 2;
  sticker.position.set(0, faceY, 24 * WIDEN);
  unit.add(label, sticker);

  for (const child of unit.children) if (child instanceof THREE.Mesh && child !== label && child !== sticker) child.castShadow = true;
  unit.position.x = x;
  return unit;
}

/** The field between one unit's magnets: fine lines from one bar's face down through the water to the other's, in
 * slices along the unit, merged into one geometry. Each line carries a strength, weaker the deeper it reaches into
 * the pipe, and a phase for its shimmer. */
function fieldGeometry(x: number) {
  const parts: THREE.BufferGeometry[] = [];
  // a point on a magnet's inner face (on the pipe), `offset` across the face from its middle
  const face = (side: number, offset: number) => {
    const a = (side * Math.PI) / 4;
    const r = PIPE_R + 0.2;
    return new THREE.Vector3(0, r * Math.cos(a) - offset * Math.sin(a) * side, r * Math.sin(a) + offset * Math.cos(a) * side);
  };
  let n = 0;
  for (let dx = -UNIT_L / 2 + 6; dx <= UNIT_L / 2 - 6; dx += 6.5) {
    for (const [offset, dip, strength] of [[-4.5, 3, 1], [-2, -1.5, 0.85], [0.5, -4.6, 0.7], [3, -7.2, 0.55]]) {
      const start = face(1, offset);
      const curve = new THREE.QuadraticBezierCurve3(start, new THREE.Vector3(0, 2 * dip - start.y, 0), face(-1, offset));
      const tube = new THREE.TubeGeometry(curve, 48, 0.2, 6).toNonIndexed();
      tube.translate(x + dx, 0, 0);
      const vertices = tube.attributes.position.count;
      tube.setAttribute("phase", new THREE.BufferAttribute(new Float32Array(vertices).fill((n++ * 0.37) % 1), 1));
      tube.setAttribute("strength", new THREE.BufferAttribute(new Float32Array(vertices).fill(strength), 1));
      parts.push(tube);
    }
  }
  return mergeGeometries(parts);
}

/** The field lines: brightest at the magnets' faces and fading with depth, with a slow, even shimmer (the field itself
 * is static, so nothing travels along them). */
function fieldMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { time: { value: 0 }, opacity: { value: 0 }, colour: { value: FIELD_GOLD } },
    vertexShader: /* glsl */ `
      attribute float phase;
      attribute float strength;
      varying float vAlong;
      varying float vPhase;
      varying float vStrength;
      void main() {
        vAlong = uv.x;
        vPhase = phase;
        vStrength = strength;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float time;
      uniform float opacity;
      uniform vec3 colour;
      varying float vAlong;
      varying float vPhase;
      varying float vStrength;
      void main() {
        float near = abs(vAlong * 2.0 - 1.0);
        float shimmer = 0.85 + 0.15 * sin(time * 0.8 + vPhase * 6.2832);
        float ends = smoothstep(0.0, 0.04, vAlong) * smoothstep(1.0, 0.96, vAlong);
        gl_FragColor = vec4(colour, opacity * ends * vStrength * (0.65 + 0.35 * near) * shimmer);
        #include <colorspace_fragment>
      }`,
  });
}

/** A small jagged crystal: an octahedron pulled out of shape, faceted. */
function crystalGeometry() {
  const g = new THREE.OctahedronGeometry(1, 0);
  const p = g.attributes.position;
  const stretch = new Map<string, number[]>();
  for (let i = 0; i < p.count; i++) {
    const key = [p.getX(i), p.getY(i), p.getZ(i)].map((value) => value.toFixed(3)).join();
    if (!stretch.has(key)) stretch.set(key, [0.75 + Math.random() * 0.6, 0.75 + Math.random() * 0.6, 0.75 + Math.random() * 0.6]);
    const [a, b, c] = stretch.get(key)!;
    p.setXYZ(i, p.getX(i) * a * 1.3, p.getY(i) * b * 0.8, p.getZ(i) * c);
  }
  g.computeVertexNormals();
  return g;
}

export function mountGmxScene(canvas: HTMLCanvasElement) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;

  const scene = new THREE.Scene();
  scene.environment = studio(renderer);

  const sun = new THREE.DirectionalLight("#ffffff", 0.9);
  sun.position.set(-60, 400, 120);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.radius = 14;
  sun.shadow.blurSamples = 20;
  Object.assign(sun.shadow.camera, { left: -700, right: 700, top: 320, bottom: -320, near: 100, far: 800 }); // past the floor's edges
  scene.add(sun);

  // the floor under the pipe catches only its soft shadow
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(1300, 520), new THREE.ShadowMaterial({ opacity: 0.16 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -38;
  floor.receiveShadow = true;
  scene.add(floor);

  const camera = new THREE.PerspectiveCamera(24, 1, 1, 5000);
  const look = new THREE.Vector3().fromArray(VIEWS[0].look);
  camera.position.fromArray(VIEWS[0].pos);
  camera.zoom = VIEWS[0].zoom;

  // The copper main and the water in it, both cut along the front as solid sections
  const pipe = new THREE.Mesh(alongX(halfRing(PIPE_R, PIPE_IN), PIPE_LEN), new THREE.MeshPhysicalMaterial({ color: "#d9926a", metalness: 1, roughness: 0.28 }));
  pipe.castShadow = true;
  scene.add(pipe);
  const water = new THREE.Mesh(
    alongX(halfRing(PIPE_IN - 0.05, 0), PIPE_LEN),
    new THREE.MeshPhysicalMaterial({ color: "#b9dcef", roughness: 0.06, transparent: true, opacity: 0.16, depthWrite: false }),
  );
  water.renderOrder = 2;
  scene.add(water);

  // Three units, each with its own housing materials so it can turn to x-ray on its own
  const label = labelTexture();
  // ceramic ferrite, a dull mid grey so the bars stand out from the black housing in x-ray
  const magnet = new THREE.MeshPhysicalMaterial({ color: "#77797e", roughness: 0.62, clearcoat: 0.3, clearcoatRoughness: 0.4 });
  const units = UNITS.map((x) => {
    const materials: UnitMaterials = {
      coat: new THREE.MeshPhysicalMaterial({ color: "#0b0b0d", roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.05 }),
      magnet,
      hardware: new THREE.MeshStandardMaterial({ color: "#efece4", roughness: 0.5 }),
      sticker: new THREE.MeshBasicMaterial({ map: stickerTexture(), transparent: true, toneMapped: false }),
      label: new THREE.MeshBasicMaterial({ map: label, transparent: true, toneMapped: false }),
      edges: new THREE.LineBasicMaterial({ color: "#1b1b1d", transparent: true, opacity: 0, depthWrite: false }),
    };
    scene.add(buildUnit(x, materials));
    const field = new THREE.Mesh(fieldGeometry(x), fieldMaterial());
    field.renderOrder = 3;
    scene.add(field);
    return { materials, field: field.material as THREE.ShaderMaterial, xray: 0, goal: 0 };
  });

  // Minerals: clumps of varying size coming in, each made of fine pieces that break apart and spread evenly through
  // the water as they pass the units. One colour throughout, so it reads as the same material changing form.
  const count = 190;
  const PIECES = 14;
  const pieces = new THREE.InstancedMesh(
    crystalGeometry(),
    new THREE.MeshPhysicalMaterial({ color: "#ece7da", roughness: 0.55, clearcoat: 0.4, clearcoatRoughness: 0.4 }),
    count * PIECES,
  );
  pieces.castShadow = false;
  scene.add(pieces);
  // a point anywhere across the water in the back half of the pipe, a few just forward of the cut
  const across = (margin: number) => {
    const r = (PIPE_IN - margin) * Math.sqrt(Math.random());
    const a = Math.PI * (0.425 + Math.random() * 1.15);
    return [r * Math.sin(a), r * Math.cos(a)];
  };
  const minerals = Array.from({ length: count }, () => {
    const size = 0.9 + Math.random() ** 1.6 * 1.9; // mostly small clumps, a few large ones
    const [y, z] = across(size + 0.6);
    return {
      x: -PIPE_LEN / 2 + Math.random() * PIPE_LEN,
      y,
      z,
      size,
      speed: 26 + 46 * (1 - (Math.hypot(y, z) / PIPE_IN) ** 2),
      spin: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
      turn: (Math.random() - 0.5) * 1.6,
      pieces: Array.from({ length: PIECES }, () => {
        const [sy, sz] = across(0.8);
        return {
          // packed tight in the clump, then spread across the pipe and a little along it
          packed: new THREE.Vector3().randomDirection().multiplyScalar(size * 0.45 * Math.cbrt(Math.random())),
          spread: new THREE.Vector3((Math.random() - 0.5) * 26, sy, sz),
          scale: 0.45 + Math.random() * 0.35,
        };
      }),
    };
  });

  // State, eased towards the stage's targets each frame
  let stage = 0;
  const state = { change: 0, flow: 1 };
  const target = { ...state };
  const setTargets = () => {
    target.change = stage >= 2 ? 1 : 0;
    target.flow = stage === 2 ? 0.55 : 1;
    units.forEach((unit, i) => (unit.goal = stage === 2 || (stage === 1 && i === 1) ? 1 : 0));
  };
  setTargets();

  let fit = 1;
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    fit = Math.min(1, camera.aspect / 1.3); // keep the view's width on narrow stages
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const v = new THREE.Vector3();
  const s = new THREE.Vector3();
  const e = new THREE.Euler();
  const drift = new THREE.Vector3();
  const clock = new THREE.Clock();
  let running = false;
  let time = 0;

  const frame = () => {
    if (!running) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    time += dt;
    const ease = reduced ? 1 : 1 - Math.exp(-dt * 2.2);

    state.change += (target.change - state.change) * ease;
    state.flow += (target.flow - state.flow) * ease;

    // the units: the housing fades to its outline in x-ray, and the field shows inside it
    for (const unit of units) {
      unit.xray += (unit.goal - unit.xray) * ease;
      const solid = 1 - unit.xray * 0.94;
      const { coat, hardware, label: print, sticker, edges } = unit.materials;
      for (const material of [coat, hardware]) {
        material.opacity = solid;
        // three compiles opaque materials with alpha forced to 1, so switching needs a recompile
        if (material.transparent !== solid < 0.999) {
          material.transparent = solid < 0.999;
          material.needsUpdate = true;
        }
        material.depthWrite = solid > 0.6;
        // reflections ignore opacity, so they fade with it or the housing reads as smoked glass
        material.envMapIntensity = solid;
      }
      coat.clearcoat = solid;
      print.opacity = sticker.opacity = 1 - unit.xray;
      edges.opacity = unit.xray * 0.75;
      unit.field.uniforms.opacity.value = unit.xray;
      unit.field.uniforms.time.value = time;
    }

    // the camera eases to the stage's view and drifts slowly while it holds
    const view = VIEWS[stage];
    if (!reduced) drift.set(Math.sin(time * 0.21) * 14, Math.sin(time * 0.16) * 7, Math.cos(time * 0.19) * 10);
    camera.position.lerp(v.fromArray(view.pos).add(drift), ease);
    look.lerp(v.fromArray(view.look), ease);
    camera.lookAt(look);
    camera.zoom += (view.zoom * fit - camera.zoom) * ease;
    camera.updateProjectionMatrix();

    for (let i = 0; i < count; i++) {
      const p = minerals[i];
      if (!reduced) p.x += p.speed * state.flow * dt;
      if (p.x > PIPE_LEN / 2) p.x -= PIPE_LEN;
      const passed = THREE.MathUtils.smoothstep(p.x, FIELD[0] + 6, FIELD[1] - 6) * state.change;
      q.setFromEuler(e.set(p.spin.x + time * p.turn, p.spin.y + time * p.turn * 0.7, p.spin.z));
      const apart = passed * passed * (3 - 2 * passed);
      for (let k = 0; k < PIECES; k++) {
        const piece = p.pieces[k];
        // in the clump the pieces turn with it; once apart each sits at its own place across the water
        const packed = v.copy(piece.packed).applyQuaternion(q);
        const x = p.x + packed.x * (1 - apart) + piece.spread.x * apart;
        const y = (p.y + packed.y) * (1 - apart) + piece.spread.y * apart;
        const z = (p.z + packed.z) * (1 - apart) + piece.spread.z * apart;
        const size = THREE.MathUtils.lerp(p.size * 0.42 * piece.scale + 0.25, 0.13 + piece.scale * 0.05, apart);
        pieces.setMatrixAt(i * PIECES + k, m4.compose(v.set(x, y, z), q, s.setScalar(size)));
      }
    }
    pieces.instanceMatrix.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };

  return {
    setStage(next: number) {
      stage = Math.max(0, Math.min(VIEWS.length - 1, next));
      setTargets();
    },
    /** Run only while the stage is on screen. */
    setRunning(on: boolean) {
      if (on === running) return;
      running = on;
      if (on) {
        clock.getDelta();
        requestAnimationFrame(frame);
      }
    },
  };
}
