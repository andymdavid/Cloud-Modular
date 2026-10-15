import { buildHouse } from "./build-model";
import type { ExplorerScene } from "./viewer";
import { explode, hastingStreet } from "@/data/explorer/hasting-street";
import { levelRank, views } from "@/data/explorer/hasting-street-info";

/** The Hasting Street Villa on the Seashells page. Its front faces +z, so the camera starts on the front-east corner. */
export const hastingScene: ExplorerScene = {
  label: "Interactive 3D model of the Seashells Hasting Street Villa",
  build: (options) => buildHouse(hastingStreet, options),
  explode,
  views,
  levelRank,
  camera: { azimuth: 35 },
  stage: {
    shadowExtent: 20,
    shadowFar: 80,
    sun: [12, 24, 15],
    groundRadius: 22,
    groundStretch: 1.25,
    groundY: -0.21,
    target: [0, 3.4, 0],
    panLimit: [[-12, -0.5, -16], [12, 12, 16]],
  },
};
