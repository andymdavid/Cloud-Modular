import { buildHouse } from "./build-model";
import type { ExplorerScene } from "./viewer";
import { bayView, explode } from "@/data/explorer/jurien-type-b";
import { levelRank, views } from "@/data/explorer/jurien-type-b-info";

/** The Jurien Bay Type B residence on the home page. Stage values are sized for a two-storey house. */
export const jurienScene: ExplorerScene = {
  label: "Interactive 3D model of the Jurien Bay Type B residence",
  build: (options) => buildHouse(bayView, options),
  explode,
  views,
  levelRank,
  stage: {
    shadowExtent: 24,
    shadowFar: 90,
    sun: [12, 24, -15],
    groundRadius: 26,
    groundStretch: 1.35,
    groundY: -0.21,
    target: [0, 3.6, 0],
    panLimit: [[-12, -0.5, -20], [12, 12, 20]],
  },
};
