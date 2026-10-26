import * as THREE from "three";
import { buildHouse } from "./build-model";
import { boardTexture, stripeTexture, tiled } from "./geometry";
import { createExplorer, type Explorer, type ExplorerScene } from "./viewer";
import { cloudHomeModels, explode, levelRank, type CloudHomeId } from "@/data/explorer/cloud-homes";

/**
 * The 3D home in the Cloud Homes "Design yours" tool: one of the three homes, finished with the chosen cladding and
 * colours, with solar and the battery shown or hidden, turning to each section's view. Loaded on demand by the
 * design and availability pages. Parts can't be picked here: the tool is about choices, not the specification.
 */

export interface DesignView {
  azimuth: number;
  polar: number;
  inside?: boolean;
}

export interface DesignState {
  paint: Record<string, string>;
  cladding: "panels" | "boards";
  show: Record<string, boolean>;
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
    sun: [10, 20, 13],
    groundRadius: 15,
    groundStretch: 1.4,
    groundY: -0.21,
    fit: 0.72,
    target: [0, 1.6, 0],
    panLimit: [[-8, -0.5, -12], [8, 8, 12]],
  },
});

const hex = (colour: THREE.Color) => `#${colour.getHexString()}`;
const shade = (colour: string, by: number) => hex(new THREE.Color(colour).multiplyScalar(by));

/** Timber-look boards: warm tones with a dark joint, 150 mm wide. */
const TIMBER = ["#9a6a45", "#a6754e", "#8f6040", "#ad7c55", "#9e6e49", "#93643f"];

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
  const setMap = (material: THREE.MeshStandardMaterial, map: THREE.Texture) => {
    material.map?.dispose();
    material.map = map;
    material.color.set("#ffffff");
    material.needsUpdate = true;
  };

  const apply = () => {
    for (const [key, colour] of Object.entries(state.paint)) {
      const material = standard(key);
      if (!material) continue;
      if (key === "cladding") {
        // Fibre cement sheets 1.2 m wide with a fine vertical joint (sheet width from the 3 Bed set's wall detail)
        if (state.cladding === "panels") setMap(material, tiled(stripeTexture(256, colour, shade(colour, 0.84), 1, true, 2), 1.2, anisotropy));
      } else if (key === "roof") {
        // Klip-Lok pans between the ribs, with a faint line at each rib
        setMap(material, tiled(stripeTexture(128, colour, shade(colour, 0.8), 1, true, 3), 0.33, anisotropy));
      } else if (key === "deck") {
        setMap(material, tiled(stripeTexture(256, colour, shade(colour, 0.86), 4, false, 3), 0.56, anisotropy));
      } else {
        material.color.set(colour);
        material.needsUpdate = true;
      }
    }
    if (state.cladding === "boards") {
      const cladding = standard("cladding");
      if (cladding) setMap(cladding, tiled(boardTexture(512, TIMBER, "#4d3322", 8, 3), 1.2, anisotropy));
      standard("render")?.color.set("#8f6040");
    }
    for (const [group, visible] of Object.entries(state.show)) explorer.setGroupVisible(group, visible);
    explorer.refresh();
  };

  const create = (home: CloudHomeId) => {
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
    explorer.turnTo(view.azimuth, view.polar);
  };

  create(options.home);

  return {
    setHome(id) {
      explorer.dispose();
      create(id);
    },
    update(next) {
      state = next;
      apply();
    },
    show(next) {
      const changed = next.azimuth !== view.azimuth || next.polar !== view.polar || !!next.inside !== !!view.inside;
      view = next;
      if (!changed) return;
      explorer.setView(view.inside ? "inside" : "exterior");
      explorer.turnTo(view.azimuth, view.polar);
    },
    dispose() {
      explorer.dispose();
    },
  };
}
