/**
 * Typical module: part labels, facts and how far each piece moves when the module is separated.
 * Geometry lives in ./module.ts. Edit copy here without touching the model or renderer.
 */

import type { ExplorerPart } from "@/lib/explorer/parts";
import type { GroupId, Vec3 } from "./module";

const PROPOSAL = "Rowland Street modular proposal";

/** The eight systems first, then the fit-out, in the order of the part list. */
export const moduleParts: (ExplorerPart & { id: GroupId })[] = [
  {
    id: "structure",
    name: "Steel structure",
    summary: "A welded steel frame of columns and beams, braced across its long walls, carries the module and the modules stacked above it.",
    facts: [
      { label: "Columns", value: "RHS 150 × 150 × 6", source: PROPOSAL },
      { label: "Floor beams, long sides", value: "RHS 250 × 100 × 5", source: PROPOSAL },
      { label: "Floor beams, ends, and roof beams", value: "RHS 150 × 100 × 4", source: PROPOSAL },
      { label: "Floor joists", value: "C160 at 400 mm centres", source: PROPOSAL },
      { label: "Roof joists", value: "C140 at 1200 mm centres", source: PROPOSAL },
    ],
  },
  {
    id: "floor",
    name: "Floor system",
    summary: "Rigid-core vinyl on a self-levelling screed and fibre cement board, over insulated steel joists closed underneath with galvanised steel sheet.",
    facts: [
      { label: "Finish", value: "6 mm rigid-core vinyl" },
      { label: "Screed", value: "10 mm self-levelling" },
      { label: "Board", value: "24 mm fibre cement" },
      { label: "Insulation", value: "100 mm rock wool" },
      { label: "Underside", value: "0.8 mm galvanised steel sheet" },
    ],
  },
  {
    id: "walls",
    name: "Wall system",
    summary: "Light-gauge steel studs filled with rock wool, lined inside with fire-rated plasterboard and sheathed outside in fibre cement board. The breathable membrane, battens and cladding are fixed on site.",
    facts: [
      { label: "Lining", value: "4 mm finish board on 13 mm fire-rated plasterboard" },
      { label: "Framing", value: "150 mm light-gauge steel studs" },
      { label: "Insulation", value: "125 mm rock wool board" },
      { label: "Sheathing", value: "9 mm fibre cement board" },
      { label: "Fixed on site", value: "Breathable membrane, battens and 2 mm aluminium cladding" },
    ],
  },
  {
    id: "ceiling",
    name: "Ceiling system",
    summary: "Fire-rated plasterboard below a cavity for services, with rock wool between the roof joists under a corrugated steel deck.",
    facts: [
      { label: "Lining", value: "13 mm fire-rated plasterboard" },
      { label: "Service cavity", value: "50 mm" },
      { label: "Insulation", value: "100 mm rock wool" },
      { label: "Roof deck", value: "1.6 mm corrugated steel" },
    ],
  },
  {
    id: "electrical",
    name: "Electrical system",
    summary: "Wiring runs in conduit through the walls and ceiling from the switchboard by the entry. Circuits join the next module's at the joints between modules.",
    facts: [],
  },
  {
    id: "hvac",
    name: "Heating and cooling",
    summary: "A ducted fan coil unit sits above the bathroom, piped to a condenser on the roof.",
    facts: [],
  },
  {
    id: "plumbing",
    name: "Water supply and drainage",
    summary: "Hot and cold water and the waste pipes are fitted in the factory and brought to one connection point, where they join the building's services on site.",
    facts: [],
  },
  {
    id: "smart",
    name: "Smart system",
    summary: "The control panel, sensors and door lock are wired in the factory with the rest of the electrical system.",
    facts: [],
  },
  {
    id: "bathroom",
    name: "Integral bathroom",
    summary: "The bathroom is a complete pod with its waterproof floor, wall linings and fixtures, set into the module in the factory.",
    facts: [],
  },
  {
    id: "joinery",
    name: "Fixed joinery",
    summary: "The kitchen and wardrobe are built in and finished in the factory.",
    facts: [],
  },
  {
    id: "furniture",
    name: "Loose furniture",
    summary: "Furniture is shown to give a sense of scale and layout.",
    facts: [],
  },
];

/**
 * Offsets at full separation, in metres. The floor layers stay low and everything else rises, so nothing drops
 * below the ground: the floor layers, then the frame with its fit-out and services, the walls pulled out on all
 * four sides (and lower), each wall in three layers, then the ceiling layers above, as in the proposal's exploded module.
 */
const FRAME_LIFT = 1.6;
const WALL_LIFT = 0.7; // lower than the frame, so the walls pulled towards the viewer don't hide the interior

/** A wall's three layers move outwards by increasing distances: lining nearest the frame, then studs, then skin. */
function wallLayers(wall: string, [dx, , dz]: Vec3, [lining, frame, skin]: [number, number, number]): Record<string, Vec3> {
  const at = (distance: number): Vec3 => [dx * distance, WALL_LIFT, dz * distance];
  return { [`${wall}-lining`]: at(lining), [`${wall}-frame`]: at(frame), [`${wall}-skin`]: at(skin) };
}
export const moduleExplode: Record<string, Vec3> = {
  structure: [0, FRAME_LIFT, 0],
  floor: [0, 0, 0],
  walls: [0, WALL_LIFT, 0],
  ceiling: [0, 3.4, 0],
  electrical: [0, FRAME_LIFT, 0],
  hvac: [0, 2.25, 0],
  plumbing: [0, FRAME_LIFT, 0],
  smart: [0, FRAME_LIFT, 0],
  bathroom: [0, FRAME_LIFT, 0],
  joinery: [0, FRAME_LIFT, 0],
  furniture: [0, FRAME_LIFT, 0],
  "floor-base": [0, 0, 0],
  "floor-insulation": [0, 0.55, 0],
  "floor-deck": [0, 1.05, 0],
  ...wallLayers("wall-west", [-1, 0, 0], [1.3, 2.1, 2.9]),
  ...wallLayers("wall-east", [1, 0, 0], [1.3, 2.1, 2.9]),
  ...wallLayers("wall-front", [0, 0, -1], [1.2, 1.9, 2.6]),
  ...wallLayers("wall-back", [0, 0, 1], [1.2, 1.9, 2.6]),
  "ceiling-lining": [0, 3.4, 0],
  "ceiling-insulation": [0, 4.2, 0],
  "ceiling-deck": [0, 5.0, 0],
};

/** How far the module is separated when the section first shows (0 assembled, 1 fully separated). */
export const initialExplode = 0.75;
