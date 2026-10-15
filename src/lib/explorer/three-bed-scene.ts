import { buildHouse } from "./build-model";
import type { ExplorerScene } from "./viewer";
import { explode, threeBedVilla } from "@/data/explorer/three-bed-villa";
import { levelRank, views } from "@/data/explorer/three-bed-villa-info";

/** The 3 Bed Villa on the Seashells page: a narrow two-storey villa, front +z, camera on the front-east corner. */
export const threeBedScene: ExplorerScene = {
  label: "Interactive 3D model of the Seashells 3 Bed Villa",
  build: (options) => buildHouse(threeBedVilla, options),
  explode,
  views,
  levelRank,
  camera: { azimuth: 35 },
  stage: {
    shadowExtent: 16,
    shadowFar: 70,
    sun: [10, 22, 13],
    groundRadius: 17,
    groundStretch: 1.5,
    groundY: -0.21,
    target: [0, 2.8, 0],
    panLimit: [[-8, -0.5, -14], [8, 10, 14]],
  },
};
