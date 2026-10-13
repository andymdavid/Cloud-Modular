import { buildSample } from "./build-sample";
import type { ExplorerScene } from "./viewer";
import { sampleLayers, type SampleKind } from "@/data/explorer/build-ups";

const GAP = 0.025; // separation between neighbouring layers, in metres

const labels: Record<SampleKind, string> = {
  floor: "Interactive 3D sample of the floor build-up",
  walls: "Interactive 3D sample of the wall build-up",
  ceiling: "Interactive 3D sample of the ceiling build-up",
};

/** A build-up sample for the Floor, walls and ceiling cards, with its layers slightly apart. */
export function sampleScene(kind: SampleKind): ExplorerScene {
  // Floor and ceiling layers lift apart; wall layers move outwards, towards the camera
  const direction = kind === "walls" ? [0, 0, -1] : [0, 1, 0];
  const explode = Object.fromEntries(
    sampleLayers[kind].map((layer, index) => [layer.id, direction.map((axis) => axis * index * GAP) as [number, number, number]]),
  );
  return {
    label: labels[kind],
    build: (options) => buildSample(kind, options),
    explode,
    initialExplode: 1,
    camera: { polar: kind === "walls" ? 68 : 56 },
    stage: {
      shadowExtent: 1,
      shadowFar: 12,
      sun: [1.2, 2.6, -1.5],
      groundRadius: 0.9,
      groundStretch: 1,
      groundY: -0.01,
      target: [0, 0.2, 0],
      panLimit: [[-1, -0.1, -1], [1, 1.2, 1]],
      shadowNormalBias: 0.002,
    },
  };
}
