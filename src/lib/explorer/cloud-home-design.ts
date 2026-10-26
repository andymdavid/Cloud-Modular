import * as THREE from "three";
import { buildHouse } from "./build-model";
import { tiled } from "./geometry";
import { createExplorer, type Explorer, type ExplorerScene } from "./viewer";
import { cloudHomeModels, explode, focusPoints, levelRank, type CloudHomeId } from "@/data/explorer/cloud-homes";

/**
 * The 3D home in the Cloud Homes "Design yours" tool: one of the three homes, finished with the chosen cladding and
 * colours, with solar and the battery shown or hidden, turning to each section's view. Loaded on demand by the
 * design and availability pages. Parts can't be picked here: the tool is about choices, not the specification.
 */

export interface DesignView {
  azimuth: number;
  polar: number;
  inside?: boolean;
  focus?: "kitchen" | "services" | "bathroom";
}

export interface DesignState {
  paint: Record<string, string>;
  cladding: "panels" | "boards";
  show: Record<string, boolean>;
  grain: string[];
  stone: boolean;
}

const sceneFor = (id: CloudHomeId): ExplorerScene => ({
  label: "Interactive 3D model of your Cloud Home",
  build: (options) => buildHouse(cloudHomeModels[id](), options),
  explode,
  levelRank,
  views: [
    { id: "exterior", maxRank: 2 },
    { id: "inside", maxRank: 0 },
  ],
  camera: { azimuth: 40, polar: 70 },
  stage: {
    shadowExtent: 15,
    shadowFar: 60,
    sun: [10, 21, 15],
    groundRadius: 15,
    groundStretch: 1.4,
    groundY: -0.21,
    // Phones show the home in a short, wide stage, so it can fill more of it
    fit: typeof window !== "undefined" && window.innerWidth < 1024 ? 0.82 : 0.72,
    studio: { background: STAGE_BACKGROUND },
    target: [0, 1.6, 0],
    panLimit: [[-8, -0.5, -12], [8, 8, 12]],
  },
});

/** Stage colour behind the home; matches .cloud-stage in CloudHomeShell.astro. */
export const STAGE_BACKGROUND = "#f2f1ec";

const shade = (colour: string, by: number) => `#${new THREE.Color(colour).multiplyScalar(by).getHexString()}`;

/** Small repeatable pseudo-random sequence, so textures are the same on every load. */
function random(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

interface Surface {
  map: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
}

/**
 * A colour map and a matching bump map drawn together. `draw` paints both canvases: on the bump canvas mid grey is the
 * surface, darker is recessed (joints, gaps) and lighter is raised.
 */
function surface(size: number, draw: (colour: CanvasRenderingContext2D, bump: CanvasRenderingContext2D, size: number) => void): Surface {
  const make = () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    return canvas;
  };
  const colourCanvas = make();
  const bumpCanvas = make();
  const bump = bumpCanvas.getContext("2d")!;
  bump.fillStyle = "#808080";
  bump.fillRect(0, 0, size, size);
  draw(colourCanvas.getContext("2d")!, bump, size);
  const map = new THREE.CanvasTexture(colourCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  for (const texture of [map, bumpMap]) texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return { map, bump: bumpMap };
}

/** Faint mottling so painted and coated surfaces don't read as flat computer colour. */
function grain(ctx: CanvasRenderingContext2D, size: number, amount: number, seed: number) {
  const next = random(seed);
  for (let i = 0; i < size * size * 0.06; i++) {
    const light = next() > 0.5;
    ctx.fillStyle = light ? `rgba(255,255,255,${amount * next()})` : `rgba(0,0,0,${amount * next()})`;
    ctx.fillRect(Math.floor(next() * size), Math.floor(next() * size), 2, 2);
  }
}

/** Painted fibre cement: one 1.2 m sheet per tile with a shadowed vertical joint at its edge. */
const fibreCement = (colour: string) =>
  surface(512, (c, b, size) => {
    c.fillStyle = colour;
    c.fillRect(0, 0, size, size);
    grain(c, size, 0.025, 7);
    c.fillStyle = shade(colour, 0.7);
    c.fillRect(0, 0, 3, size);
    c.fillStyle = shade(colour, 1.06);
    c.fillRect(3, 0, 1, size);
    b.fillStyle = "#202020";
    b.fillRect(0, 0, 4, size);
  });

/** Klip-Lok pan between two ribs (0.33 m), with fine stiffening lines along the sheet. */
const klipLok = (colour: string) =>
  surface(128, (c, b, size) => {
    c.fillStyle = colour;
    c.fillRect(0, 0, size, size);
    for (const at of [0.3, 0.5, 0.7]) {
      c.fillStyle = shade(colour, 0.93);
      c.fillRect(Math.round(at * size), 0, 1, size);
      b.fillStyle = "#6a6a6a";
      b.fillRect(Math.round(at * size), 0, 2, size);
    }
    c.fillStyle = shade(colour, 0.8);
    c.fillRect(0, 0, 2, size);
  });

/** Vertical timber-look boards, 150 mm wide, with grain and a dark recessed joint. */
const timberBoards = () =>
  surface(512, (c, b, size) => {
    const tones = ["#9a6a45", "#a6754e", "#8f6040", "#ad7c55", "#9e6e49", "#93643f"];
    const boards = 8;
    const step = size / boards;
    const next = random(11);
    for (let i = 0; i < boards; i++) {
      c.fillStyle = tones[(i * 7 + 3) % tones.length];
      c.fillRect(Math.round(i * step), 0, Math.ceil(step), size);
      for (let g = 0; g < 14; g++) {
        c.fillStyle = `rgba(60,35,20,${0.1 + next() * 0.14})`;
        c.fillRect(Math.round(i * step + next() * step), 0, 1, size);
      }
    }
    c.fillStyle = "#4d3322";
    b.fillStyle = "#202020";
    for (let i = 0; i < boards; i++) {
      c.fillRect(Math.round(i * step), 0, 3, size);
      b.fillRect(Math.round(i * step), 0, 4, size);
    }
  });

/** Timber veneer: fine grain running along u, in the given colour. */
const veneer = (colour: string) =>
  surface(512, (c, b, size) => {
    c.fillStyle = colour;
    c.fillRect(0, 0, size, size);
    const next = random(17);
    for (let i = 0; i < 90; i++) {
      const y = next() * size;
      c.fillStyle = `rgba(70,40,20,${0.03 + next() * 0.07})`;
      c.fillRect(0, y, size, 1 + Math.round(next() * 2));
    }
    grain(c, size, 0.02, 19);
    b.fillStyle = "#7a7a7a";
    for (let i = 0; i < 40; i++) b.fillRect(0, next() * size, size, 1);
  });

/** Laminate benchtop: an even colour with a very fine speckle. */
const laminate = (colour: string) =>
  surface(256, (c, _b, size) => {
    c.fillStyle = colour;
    c.fillRect(0, 0, size, size);
    grain(c, size, 0.035, 23);
  });

/** Engineered stone: a fine speckle with soft, drifting veins. */
const stoneSlab = (colour: string) =>
  surface(1024, (c, b, size) => {
    c.fillStyle = colour;
    c.fillRect(0, 0, size, size);
    grain(c, size, 0.04, 29);
    const next = random(31);
    const dark = new THREE.Color(colour).multiplyScalar(0.62);
    const rgb = `${Math.round(dark.r * 255)},${Math.round(dark.g * 255)},${Math.round(dark.b * 255)}`;
    // A few long, gently curving veins across the slab, each softened by wider faint strokes underneath
    for (let v = 0; v < 4; v++) {
      const x0 = next() * size;
      const x1 = x0 + (next() - 0.3) * size * 0.8;
      const c1: [number, number] = [x0 + (next() - 0.5) * size * 0.5, size * 0.35];
      const c2: [number, number] = [x1 + (next() - 0.5) * size * 0.5, size * 0.7];
      for (const [width, alpha] of [
        [10, 0.06],
        [4, 0.11],
        [1.5, 0.26],
      ]) {
        c.strokeStyle = `rgba(${rgb},${alpha})`;
        c.lineWidth = width;
        c.beginPath();
        c.moveTo(x0, 0);
        c.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], x1, size);
        c.stroke();
      }
    }
    b.fillStyle = "#808080";
    b.fillRect(0, 0, size, size);
  });

/** Splashback: gloss tiles 300 × 75, laid in a stack bond, with pale grout. */
const tiles = (colour: string) =>
  surface(512, (c, b, size) => {
    c.fillStyle = colour;
    c.fillRect(0, 0, size, size);
    grain(c, size, 0.02, 37);
    const rows = 8;
    const cols = 2;
    c.fillStyle = shade(colour, 0.82);
    b.fillStyle = "#303030";
    for (let r = 0; r <= rows; r++) {
      c.fillRect(0, Math.round((r * size) / rows), size, 3);
      b.fillRect(0, Math.round((r * size) / rows), size, 4);
    }
    for (let k = 0; k <= cols; k++) {
      c.fillRect(Math.round((k * size) / cols), 0, 3, size);
      b.fillRect(Math.round((k * size) / cols), 0, 4, size);
    }
  });

/** Bathroom floor: matte 600 × 600 tiles with fine grout. */
const floorTiles = (colour: string) =>
  surface(512, (c, b, size) => {
    c.fillStyle = colour;
    c.fillRect(0, 0, size, size);
    grain(c, size, 0.03, 41);
    c.fillStyle = shade(colour, 0.85);
    b.fillStyle = "#303030";
    for (const at of [0, size / 2]) {
      c.fillRect(at, 0, 2, size);
      c.fillRect(0, at, size, 2);
      b.fillRect(at, 0, 3, size);
      b.fillRect(0, at, size, 3);
    }
  });

/**
 * Mirror: a bright, cool reflection with soft diagonal light streaks, so mirrors read as mirrors under the studio
 * light without real-time reflections.
 */
const mirrorSheen = () =>
  surface(512, (c, _b, size) => {
    const base = c.createLinearGradient(0, 0, size, size);
    base.addColorStop(0, "#f7f9f9");
    base.addColorStop(0.5, "#dfe5e7");
    base.addColorStop(1, "#c9d1d4");
    c.fillStyle = base;
    c.fillRect(0, 0, size, size);
    c.save();
    c.translate(size / 2, size / 2);
    c.rotate(-Math.PI / 4);
    for (const [at, width, alpha] of [
      [-0.18, 0.08, 0.55],
      [-0.05, 0.03, 0.4],
      [0.22, 0.12, 0.3],
    ]) {
      c.fillStyle = `rgba(255,255,255,${alpha})`;
      c.fillRect(at * size, -size, width * size, size * 2);
    }
    c.restore();
  });

/** Solar panel glass: dark cells in a fine silver grid, about one panel (1.05 m) per tile. */
const solarCells = () =>
  surface(256, (c, b, size) => {
    c.fillStyle = "#1c2430";
    c.fillRect(0, 0, size, size);
    c.fillStyle = "rgba(170,180,195,0.35)";
    for (let i = 0; i < 6; i++) c.fillRect(Math.round((i * size) / 6), 0, 1, size);
    for (let i = 0; i < 10; i++) c.fillRect(0, Math.round((i * size) / 10), size, 1);
    c.fillStyle = "#c9ccd0";
    c.fillRect(0, 0, size, 3);
    c.fillRect(0, 0, 3, size);
    b.fillStyle = "#a0a0a0";
    b.fillRect(0, 0, size, 3);
    b.fillRect(0, 0, 3, size);
  });

/** Boards with open gaps: the deck, or the floor (tighter joints, staggered ends, running down the home). */
const boards = (colour: string, count: number, gap: number, ends: boolean, seed: number, alongZ = false) =>
  surface(512, (c, b, size) => {
    // Top faces map plan x to u and z to v; turning the drawing a quarter runs the boards along z instead of x
    if (alongZ) for (const ctx of [c, b]) ctx.setTransform(0, 1, -1, 0, size, 0);
    const step = size / count;
    const next = random(seed);
    for (let i = 0; i < count; i++) {
      const y = Math.round(i * step);
      c.fillStyle = shade(colour, 0.94 + next() * 0.1);
      c.fillRect(0, y, size, Math.ceil(step));
      for (let g = 0; g < 10; g++) {
        c.fillStyle = `rgba(0,0,0,${0.02 + next() * 0.04})`;
        c.fillRect(0, y + Math.round(next() * step), size, 1);
      }
      c.fillStyle = shade(colour, 0.6);
      c.fillRect(0, y, size, gap);
      b.fillStyle = "#202020";
      b.fillRect(0, y, size, gap + 1);
      if (ends) {
        const x = Math.round(((i * 0.37) % 1) * size);
        c.fillRect(x, y, gap, Math.ceil(step));
        b.fillRect(x, y, gap + 1, Math.ceil(step));
      }
    }
  });

export interface DesignViewer {
  setHome(id: CloudHomeId): void;
  update(state: DesignState): void;
  show(view: DesignView): void;
  dispose(): void;
}

export function createDesignViewer(options: {
  host: HTMLElement;
  home: CloudHomeId;
  state: DesignState;
  view: DesignView;
  reducedMotion: boolean;
  onError(reason: string): void;
}): DesignViewer {
  const { host, reducedMotion, onError } = options;
  let state = options.state;
  let view = options.view;
  let explorer: Explorer;
  const anisotropy = 8;

  const standard = (key: string) => explorer.material(key) as THREE.MeshStandardMaterial | undefined;
  const finish = (key: string, made: Surface, tile: number, bumpScale: number) => {
    const material = standard(key);
    if (!material) return;
    material.map?.dispose();
    material.bumpMap?.dispose();
    material.map = tiled(made.map, tile, anisotropy);
    material.bumpMap = tiled(made.bump, tile, anisotropy);
    material.bumpScale = bumpScale;
    material.color.set("#ffffff");
    material.needsUpdate = true;
  };

  let solarDone = false;
  let tilesDone = false;
  const apply = () => {
    const { paint } = state;
    if (state.cladding === "boards") {
      finish("cladding", timberBoards(), 1.2, 2.5);
      standard("render")?.color.set("#8f6040");
    } else if (paint.cladding) {
      // Fibre cement sheets 1.2 m wide (sheet width from the 3 Bed set's wall detail)
      finish("cladding", fibreCement(paint.cladding), 1.2, 2);
      standard("render")?.color.set(paint.cladding);
    }
    if (paint.roof) {
      finish("roof", klipLok(paint.roof), 0.33, 1.5);
      const roof = standard("roof");
      if (roof) Object.assign(roof, { roughness: 0.62, metalness: 0.2 });
    }
    if (paint.deck) finish("deck", boards(paint.deck, 4, 4, false, 3), 0.56, 3);
    if (paint.floor) finish("floor", boards(paint.floor, 6, 1, true, 5, true), 1.08, 1);
    if (!solarDone) {
      finish("solar", solarCells(), 1.05, 0.5);
      standard("timber")?.color.set("#a88d6e"); // furniture timber, softer than the explorers' default
      const solar = standard("solar");
      if (solar) Object.assign(solar, { roughness: 0.25, metalness: 0.5 });
      solarDone = true;
    }
    if (paint.benchtop) {
      // Laminate as standard; the stone upgrade polishes it and adds veins (oak stays laminate-coloured in stone)
      const colour = state.stone && state.grain.includes("benchtop") ? "#e8e5de" : paint.benchtop;
      if (state.stone) finish("benchtop", stoneSlab(colour), 1.6, 0.2);
      else if (state.grain.includes("benchtop")) finish("benchtop", veneer(colour), 0.8, 0.3);
      else finish("benchtop", laminate(colour), 0.8, 0.1);
      const benchtop = standard("benchtop");
      if (benchtop) Object.assign(benchtop, { roughness: state.stone ? 0.12 : 0.5, metalness: 0 });
    }
    if (!tilesDone) {
      finish("mirror", mirrorSheen(), 0.9, 0);
      const mirror = standard("mirror");
      if (mirror) Object.assign(mirror, { roughness: 0.08, metalness: 0.15, emissive: new THREE.Color("#ffffff"), emissiveIntensity: 0.12 });
      finish("floorTile", floorTiles("#d8d5ce"), 1.2, 0.6);
      finish("tile", tiles("#f1f0ec"), 0.6, 0.6);
      tilesDone = true;
    }
    for (const key of ["frameDark", "fascia", "steel", "joinery"]) {
      if (!paint[key]) continue;
      if (state.grain.includes(key)) finish(key, veneer(paint[key]), 0.8, 0.3);
      else {
        const material = standard(key);
        if (!material) continue;
        material.map?.dispose();
        material.bumpMap?.dispose();
        material.map = material.bumpMap = null;
        material.color.set(paint[key]);
        material.needsUpdate = true;
      }
    }
    for (const [group, visible] of Object.entries(state.show)) explorer.setGroupVisible(group, visible);
    explorer.refresh();
  };

  const create = (home: CloudHomeId) => {
    solarDone = false;
    tilesDone = false;
    explorer = createExplorer({
      host,
      scene: sceneFor(home),
      reducedMotion,
      picking: false,
      onSelect: () => {},
      onExit: () => {},
      onError,
    });
    explorer.setMode("full");
    apply();
    explorer.setView(view.inside ? "inside" : "exterior");
    turn();
  };

  let home = options.home;
  function turn() {
    const focus = view.focus ? { target: focusPoints(home)[view.focus], zoom: view.focus === "kitchen" ? 2.5 : 2.7 } : undefined;
    explorer.turnTo(view.azimuth, view.polar, focus);
  }

  create(options.home);

  return {
    setHome(id) {
      home = id;
      explorer.dispose();
      create(id);
    },
    update(next) {
      state = next;
      apply();
    },
    show(next) {
      const changed = next.azimuth !== view.azimuth || next.polar !== view.polar || !!next.inside !== !!view.inside || next.focus !== view.focus;
      view = next;
      if (!changed) return;
      explorer.setView(view.inside ? "inside" : "exterior");
      turn();
    },
    dispose() {
      explorer.dispose();
    },
  };
}
