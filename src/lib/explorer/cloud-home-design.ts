import * as THREE from "three";
import { buildHouse } from "./build-model";
import { stripeTexture, tiled } from "./geometry";
import { createExplorer, type Explorer, type ExplorerScene } from "./viewer";
import { cloudHomeModels, explode, levelRank, type CloudHomeId } from "@/data/explorer/cloud-homes";

/**
 * The 3D home in the Cloud Homes "Design yours" tool: one of the three homes, painted with the chosen finishes,
 * turning to each section's view. Loaded on demand by /cloud-homes/design/.
 */

export interface DesignView {
  azimuth: number;
  polar: number;
  inside?: boolean;
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
  camera: { azimuth: 35, polar: 62 },
  stage: {
    shadowExtent: 15,
    shadowFar: 60,
    sun: [10, 20, 13],
    groundRadius: 15,
    groundStretch: 1.4,
    groundY: -0.21,
    fit: 0.86,
    target: [0, 1.6, 0],
    panLimit: [[-8, -0.5, -12], [8, 8, 12]],
  },
});

/** Textured materials keep their boards or panel joints: the texture is redrawn in the new colour. */
const STRIPES: Record<string, { tile: number; count: number; vertical: boolean; width: number }> = {
  cladding: { tile: 0.72, count: 4, vertical: false, width: 3 },
  deck: { tile: 0.56, count: 4, vertical: false, width: 3 },
};

export interface DesignViewer {
  setHome(id: CloudHomeId): void;
  paint(colours: Record<string, string>): void;
  show(view: DesignView): void;
  dispose(): void;
}

export function createDesignViewer(options: {
  host: HTMLElement;
  home: CloudHomeId;
  colours: Record<string, string>;
  view: DesignView;
  reducedMotion: boolean;
  onError(reason: string): void;
}): DesignViewer {
  const { host, reducedMotion, onError } = options;
  let colours = { ...options.colours };
  let view = options.view;
  let explorer: Explorer;

  const applyColours = () => {
    for (const [key, colour] of Object.entries(colours)) {
      const material = explorer.material(key) as THREE.MeshStandardMaterial | undefined;
      if (!material) continue;
      const stripes = STRIPES[key];
      if (stripes) {
        const base = new THREE.Color(colour);
        const line = base.clone().multiplyScalar(0.86);
        material.map?.dispose();
        material.map = tiled(stripeTexture(256, `#${base.getHexString()}`, `#${line.getHexString()}`, stripes.count, stripes.vertical, stripes.width), stripes.tile, 8);
        material.color.set("#ffffff");
      } else {
        material.color.set(colour);
      }
      material.needsUpdate = true;
    }
    explorer.refresh();
  };

  const create = (home: CloudHomeId) => {
    explorer = createExplorer({
      host,
      scene: sceneFor(home),
      reducedMotion,
      onSelect: () => {},
      onExit: () => {},
      onError,
    });
    explorer.setMode("full");
    applyColours();
    explorer.setView(view.inside ? "inside" : "exterior");
    explorer.turnTo(view.azimuth, view.polar);
  };

  create(options.home);

  return {
    setHome(id) {
      explorer.dispose();
      create(id);
    },
    paint(next) {
      colours = { ...colours, ...next };
      applyColours();
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
