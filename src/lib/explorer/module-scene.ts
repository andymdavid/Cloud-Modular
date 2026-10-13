import { buildModule } from "./build-module";
import type { ExplorerScene } from "./viewer";
import { initialExplode, moduleExplode } from "@/data/explorer/module-info";

/** The typical module on /quality/. Stage values are sized for one module, separated upwards and outwards. */
export const moduleScene: ExplorerScene = {
  label: "Interactive 3D model of a typical module, showing its structure, build-ups, services and fit-out",
  build: buildModule,
  explode: moduleExplode,
  initialExplode,
  // Looks down more steeply than the home, as the proposal's exploded module does, to see inside
  camera: { polar: 50 },
  stage: {
    shadowExtent: 10,
    shadowFar: 50,
    sun: [7, 15, -9],
    groundRadius: 11,
    groundStretch: 1.3,
    groundY: -0.21,
    target: [0, 2.5, 0],
    panLimit: [[-6, -0.5, -8], [6, 9, 8]],
  },
};
