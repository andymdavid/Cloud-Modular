/**
 * The floor, wall and ceiling build-up samples on /quality/ (the Floor, walls and ceiling cards). Layers and
 * thicknesses are from the Rowland Street modular proposal (3.3), as in the module model (./module.ts), listed
 * from the inside (or the bottom) outwards. Names and details show when a visitor hovers or taps a layer.
 *
 * Walls follow the proposal's wall drawing, which puts the breathable membrane outside the fibre cement board and
 * fixes it on site with the battens and cladding. The proposal's schedule table lists the membrane inside the
 * board instead.
 */

import type { MaterialKey } from "./module";

export type SampleKind = "floor" | "walls" | "ceiling";

export interface SampleLayer {
  id: string;
  name: string;
  /** Thickness or size, shown under the name. */
  detail: string;
  material: MaterialKey;
}

export const sampleLayers: Record<SampleKind, SampleLayer[]> = {
  // Bottom up
  floor: [
    { id: "base", name: "Galvanised steel sheet", detail: "0.8 mm, closing the underside", material: "galv" },
    { id: "joists", name: "Cold-formed steel joists", detail: "C160 at 400 mm centres", material: "steel" },
    { id: "insulation", name: "Rock wool insulation", detail: "100 mm", material: "rockwool" },
    { id: "membrane", name: "Waterproof breathable membrane", detail: "0.35 mm", material: "membrane" },
    { id: "board", name: "Fibre cement board", detail: "24 mm", material: "fibreCement" },
    { id: "screed", name: "Self-levelling screed", detail: "10 mm", material: "screed" },
    { id: "vinyl", name: "Rigid-core vinyl flooring", detail: "6 mm", material: "vinyl" },
  ],
  // Inside out
  walls: [
    { id: "finish", name: "Decorative finish board", detail: "4 mm", material: "finishBoard" },
    { id: "plasterboard", name: "Fire-rated plasterboard", detail: "13 mm", material: "plasterboard" },
    { id: "vapour", name: "PE vapour barrier", detail: "0.35 mm", material: "vapour" },
    { id: "studs", name: "Light-gauge steel studs", detail: "150 mm", material: "galv" },
    { id: "insulation", name: "Rock wool insulation board", detail: "125 mm, at least 100 kg/m³", material: "rockwool" },
    { id: "board", name: "Fibre cement board", detail: "9 mm", material: "fibreCement" },
    { id: "membrane", name: "Breathable membrane", detail: "0.35 mm, fixed on site", material: "membrane" },
    { id: "battens", name: "Battens", detail: "Fixed on site", material: "batten" },
    { id: "cladding", name: "Aluminium cladding", detail: "2 mm, fluorocarbon coated, fixed on site", material: "cladding" },
  ],
  // Bottom (the room) up
  ceiling: [
    { id: "plasterboard", name: "Fire-rated plasterboard", detail: "13 mm", material: "plasterboard" },
    { id: "cavity", name: "Ceiling battens", detail: "In a 50 mm cavity for services", material: "galv" },
    { id: "joists", name: "Cold-formed steel roof joists", detail: "C140 at 1200 mm centres", material: "steel" },
    { id: "insulation", name: "Rock wool insulation", detail: "100 mm", material: "rockwool" },
    { id: "deck", name: "Corrugated steel roof deck", detail: "1.6 mm", material: "roofDeck" },
  ],
};
