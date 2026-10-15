import { buildHouse } from "./build-model";
import type { ExplorerScene } from "./viewer";
import { explode, twoBedVilla } from "@/data/explorer/two-bed-villa";
import { levelRank, views } from "@/data/explorer/two-bed-villa-info";

/** The 2 Bed Villa on the Seashells page: a narrow single-storey villa, front +z, camera on the front-east corner. */
export const twoBedScene: ExplorerScene = {
  label: "Interactive 3D model of the Seashells 2 Bed Villa",
  build: (options) => buildHouse(twoBedVilla, options),
  explode,
  views,
  levelRank,
  camera: { azimuth: 35 },
  stage: {
    shadowExtent: 15,
    shadowFar: 60,
    sun: [10, 20, 13],
    groundRadius: 16,
    groundStretch: 1.5,
    groundY: -0.21,
    target: [0, 1.6, 0],
    panLimit: [[-8, -0.5, -14], [8, 8, 14]],
  },
};
