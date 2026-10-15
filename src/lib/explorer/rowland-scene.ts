import { buildHouse } from "./build-model";
import type { ExplorerScene } from "./viewer";
import { explode, rowland } from "@/data/explorer/rowland";
import { levelRank, views } from "@/data/explorer/rowland-info";

/** 25 On Rowland and Forrest: the whole building, with Forrest Street (+z) and Rowland Street (+x) in view. */
export const rowlandScene: ExplorerScene = {
  label: "Interactive 3D model of 25 On Rowland and Forrest, showing its apartment modules level by level",
  build: (options) => buildHouse(rowland, options),
  explode,
  views,
  levelRank,
  camera: { azimuth: 30 },
  stage: {
    shadowExtent: 34,
    shadowFar: 120,
    sun: [16, 34, 20],
    groundRadius: 30,
    groundStretch: 0.8,
    groundY: -0.27,
    target: [0, 10, 0],
    panLimit: [[-20, -4, -14], [20, 36, 14]],
    groundMinRank: 1,
  },
};
