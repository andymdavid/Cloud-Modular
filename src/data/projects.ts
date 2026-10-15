/**
 * Project pages (/our-work/<slug>/). Sources, all in Design-Docs/ unless noted:
 *   - Seashells Jurien Bay: seashellsjurienbay.com (108 residences, 40,000 m² beachfront, residence types,
 *     amenities, 8-star and energy features, resort operator), the Capel submission (MVP Group develops it and
 *     Cloud Modular manufactures the modules) and the Kellett building permit sets for Types A–C (architect,
 *     residence plans). Those sets still show an earlier SIPs panel method; the residences will be modular, with
 *     modular shop drawings to follow (user, 2026-10-15). Use the sets for layout, not construction.
 *   - Capel Village: the Capel Village investment submission (Rev C, 1 Sept 2026). The user cleared its
 *     non-financial facts for the site; no figures, structure, operator or contacts are used.
 *   - 25 On Rowland and Forrest: the Doepel Marsh DA set (rev A, 17 Aug 2025) and the modular proposal.
 * Every project is still in progress (the user's wording). Images are artist's impressions.
 */

import type { TypeModelId } from "./explorer/type-models";
import { typeGroups } from "./explorer/rowland-info";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short caption shown under the image in the gallery. */
  caption?: string;
  position?: string;
}

/** Gallery rows: one large image, or a pair (the first wide, the second narrow and offset). */
export type GalleryRow = { kind: "full"; image: ProjectImage } | { kind: "pair"; images: [ProjectImage, ProjectImage] };

export interface BuildingType {
  id: string;
  name: string;
  body: string;
  /** A 3D model of this type (src/data/explorer/type-models.ts); without one the stage shows a placeholder. */
  model?: TypeModelId;
  /** With a shared model: the model's groups to highlight while this type is chosen. */
  highlight?: string[];
  facts: { value: string; label: string }[];
}

export interface Project {
  slug: string;
  name: string;
  sector: string;
  location: string;
  status: string;
  description: string;
  hero: ProjectImage;
  overview: { intro: string; stats: { value: string; label: string }[]; body: string };
  gallery: GalleryRow[];
  /** `sharedModel`: one model for every type (a whole building), with each type highlighted in it. */
  types: { label: string; title: string; intro: string; sharedModel?: TypeModelId; items: BuildingType[] };
  product?: { title: string; intro: string; tiers: { name: string; body: string }[]; common: string };
  setting: { title: string; image: ProjectImage; intro: string; items: { title: string; body: string }[] };
  delivery: { body: string; stats?: { value: string; label: string }[] };
  team: { role: string; name: string }[];
}

const seashells: Project = {
  slug: "seashells-jurien-bay",
  name: "Seashells Jurien Bay",
  sector: "Residential and tourism",
  location: "Jurien Bay, WA",
  status: "In progress",
  description:
    "A beachfront resort community of 108 modular residences on Western Australia's Turquoise Coast, developed by MVP Group and manufactured by Cloud Modular.",
  hero: {
    src: "/projects/seashells-jurien-bay/aerial.webp",
    alt: "Aerial view of the Seashells Jurien Bay masterplan at sunset, with rows of residences between the bush and the ocean",
    width: 2400,
    height: 1340,
  },
  overview: {
    intro:
      "Seashells Jurien Bay is a beachfront resort community of 108 residences on Western Australia's Turquoise Coast, about two hours north of Perth. It is being developed by MVP Group, and every residence is built as modules in our manufacturing facility in Foshan.",
    stats: [
      { value: "108", label: "Residences across the estate" },
      { value: "40,000 m²", label: "Beachfront site with direct ocean frontage" },
      { value: "8-star", label: "Energy rating for every residence" },
      { value: "4", label: "Residence types" },
    ],
    body: "Each residence leaves the factory with its kitchen, bathrooms, fixtures, flooring and internal finishes in place. The residences are designed for an 8-star energy rating, with double glazing, solar generation, battery storage and EV charging.",
  },
  gallery: [
    {
      kind: "full",
      image: {
        src: "/projects/seashells-jurien-bay/street.webp",
        alt: "Two-storey residences with louvred upper windows, timber-framed verandahs and planted front gardens",
        width: 1672,
        height: 941,
        caption: "Residences along a planted street",
      },
    },
    {
      kind: "pair",
      images: [
        {
          src: "/projects/seashells-jurien-bay/twilight.webp",
          alt: "The residences at twilight, lit from inside, with garden lighting along the front path",
          width: 1672,
          height: 941,
          caption: "At twilight",
        },
        {
          src: "/projects/seashells-jurien-bay/sunset.webp",
          alt: "Two-storey villas with roof terraces at sunset, seen from a path across the lawn",
          width: 1055,
          height: 1491,
          caption: "Villas with roof terraces",
        },
      ],
    },
    {
      kind: "full",
      image: {
        src: "/projects/seashells-jurien-bay/path.webp",
        alt: "A garden path running past the residences, lined with lavender and olive trees",
        width: 1672,
        height: 941,
        caption: "Gardens between the residences",
      },
    },
    {
      kind: "pair",
      images: [
        {
          src: "/projects/seashells-jurien-bay/villa.webp",
          alt: "Front elevation of a two-storey villa with a pergola-covered roof terrace and a stair tower",
          width: 1536,
          height: 1024,
          caption: "A two-storey villa",
        },
        {
          src: "/projects/seashells-jurien-bay/terraces.webp",
          alt: "A row of two-storey villas with glass balustrades and roof terraces beside a lawn",
          width: 1054,
          height: 1492,
          caption: "Balconies and roof terraces",
        },
      ],
    },
  ],
  types: {
    label: "Residences",
    title: "Four residence types",
    intro: "The estate has four residence types, from two-bedroom detached villas to four-bedroom villas.",
    items: [
      {
        id: "bay-view",
        name: "Bay View Villa",
        body: "A two-storey villa with four bedrooms, a balcony inside a white frame and an optional roof terrace reached by a spiral stair. Together with the Hasting Street villas there are 27 four-bedroom homes. The model is built from the villa's design drawings.",
        model: "jurien-type-b",
        facts: [
          { value: "4", label: "Bedrooms" },
          { value: "2", label: "Storeys, plus a roof terrace" },
          { value: "252 m²", label: "House area over two floors" },
        ],
      },
      {
        id: "hasting-street",
        name: "Hasting Street Villa",
        body: "A two-storey villa with four bedrooms, a double garage, a balcony inside a white frame and a roof terrace reached by a spiral stair. Owners can live in it, use it as a holiday home, lease it or let it as a short stay. The model is built from the villa's design drawings.",
        model: "hasting-street",
        facts: [
          { value: "4", label: "Bedrooms" },
          { value: "2", label: "Storeys, plus a roof terrace" },
          { value: "223 m²", label: "House area over two floors" },
        ],
      },
      {
        id: "three-bed",
        name: "Three-bedroom detached villa",
        body: "A two-storey detached villa with two bedrooms downstairs and the master suite upstairs, over a living room open to the roof and a louvred vergola at the front. It is sold fully furnished and let through the resort's on-site management, and there are 77 tourism villas on the estate. The model is built from the villa's design drawings.",
        model: "three-bed-villa",
        facts: [
          { value: "3", label: "Bedrooms" },
          { value: "2", label: "Storeys" },
          { value: "93.5 m²", label: "House area over two floors" },
        ],
      },
      {
        id: "two-bed",
        name: "Two-bedroom detached villa",
        body: "A single-storey detached villa with two bedrooms, a bathroom and laundry, a powder room, and an open living room that slides onto a deck under a louvred vergola. It is sold fully furnished. The model is built from the villa's design drawings.",
        model: "two-bed-villa",
        facts: [
          { value: "2", label: "Bedrooms" },
          { value: "1", label: "Storey" },
          { value: "65 m²", label: "House area" },
        ],
      },
    ],
  },
  setting: {
    title: "On the Turquoise Coast",
    image: {
      src: "/projects/seashells-jurien-bay/aerial.webp",
      alt: "Aerial view of the estate beside the beach at Jurien Bay",
      width: 2400,
      height: 1340,
      position: "38% center",
    },
    intro: "The resort sits on 40,000 square metres with direct ocean frontage, about 200 kilometres north of Perth.",
    items: [
      {
        title: "Resort facilities",
        body: "Residents and guests share a beachfront café, an on-site reception, adult and children's pools, a spa and sauna, a playground and an all-weather sports court. Barbecue shelters, a herb garden and landscaped open space run through the estate.",
      },
      {
        title: "Energy",
        body: "Solar generation and battery storage feed an embedded energy network across the estate. Every residence is designed for an 8-star energy rating and has double glazing and EV charging.",
      },
      {
        title: "How the residences are used",
        body: "The four-bedroom villas can be a permanent home, a holiday house, a long-term lease or a short-stay rental. The tourism villas and four one-bedroom apartments are let through the resort's on-site management.",
      },
    ],
  },
  delivery: {
    body: "The residences are manufactured while the site works, roads and services are built, so the estate and its homes move forward together. Each residence arrives with its interiors finished and is placed in an agreed sequence as the resort opens in stages.",
  },
  team: [
    { role: "Developer", name: "MVP Group" },
    { role: "Modular manufacture", name: "Cloud Modular" },
    { role: "Architect", name: "Kellett Design Group" },
    { role: "Resort operator", name: "Accommodation West" },
  ],
};

const capel: Project = {
  slug: "capel-village",
  name: "Capel Village",
  sector: "Over-55s living",
  location: "Capel, WA",
  status: "In progress",
  description:
    "An approved over-55s lifestyle village of 52 single-storey modular residences in Western Australia's South West, developed by MVP Group and manufactured by Cloud Modular.",
  hero: {
    src: "/projects/capel-village/bush.webp",
    alt: "Single-storey residences set among tall gum trees along a winding gravel path",
    width: 1800,
    height: 1004,
  },
  overview: {
    intro:
      "Capel Village is an over-55s lifestyle community at 96 Capel Drive in Western Australia's South West, 25 minutes from Bunbury and ten from the coast. Its 52 single-storey residences are manufactured by Cloud Modular and placed on prepared footings while the village is built around them.",
    stats: [
      { value: "52", label: "Single-storey residences" },
      { value: "5", label: "Residence configurations" },
      { value: "4,038 m²", label: "Gross floor area" },
      { value: "300 m²", label: "Two-storey clubhouse, approximately" },
    ],
    body: "The masterplan keeps the mature marri and jarrah canopy and threads the residences through it. Streets read as landscaped walks, and every residence opens onto planted ground rather than a fence line. The village received regional development assessment panel approval on 5 March 2026.",
  },
  gallery: [
    {
      kind: "full",
      image: {
        src: "/projects/capel-village/arbour.webp",
        alt: "A central pedestrian walk under a timber arbour, with gabled residences and native planting on either side",
        width: 1500,
        height: 837,
        caption: "The central pedestrian spine and arbour",
      },
    },
    {
      kind: "pair",
      images: [
        {
          src: "/projects/capel-village/residence-1.webp",
          alt: "A pair of gabled residences with stone and timber-batten fronts and residents on the verandah",
          width: 1100,
          height: 614,
          caption: "One-bedroom residences",
        },
        {
          src: "/projects/capel-village/residence-2.webp",
          alt: "Residents walking past a two-bedroom residence with a timber deck and a buggy on the path",
          width: 1100,
          height: 614,
          caption: "Two-bedroom residences",
        },
      ],
    },
    {
      kind: "full",
      image: {
        src: "/projects/capel-village/clubhouse.webp",
        alt: "Aerial oblique view of the village and clubhouse among the trees",
        width: 1600,
        height: 892,
        caption: "The village and clubhouse",
      },
    },
    {
      kind: "pair",
      images: [
        {
          src: "/projects/capel-village/residence-3.webp",
          alt: "A residence with a deep roof overhang, a raised planter and a timber deck under the gum trees",
          width: 1100,
          height: 614,
          caption: "Larger two-bedroom residences",
        },
        {
          src: "/projects/capel-village/residence-4.webp",
          alt: "A three-bedroom residence with a wide verandah opening onto native gardens",
          width: 1100,
          height: 614,
          caption: "Three-bedroom residences",
        },
      ],
    },
  ],
  types: {
    label: "Residences",
    title: "Five configurations, one standard",
    intro: "Every residence is single storey and built to the same Cloud by MVP specification.",
    items: [
      {
        id: "2c-2d",
        name: "Type 2C / 2D",
        body: "A compact one-bedroom residence. There are eight in the village.",
        facts: [
          { value: "1", label: "Bedroom" },
          { value: "1", label: "Bathroom" },
          { value: "29.3 m²", label: "Floor area" },
        ],
      },
      {
        id: "3a-3b",
        name: "Type 3A / 3B",
        body: "The most common residence in the village, with two bedrooms and two bathrooms. There are 21.",
        facts: [
          { value: "2", label: "Bedrooms" },
          { value: "2", label: "Bathrooms" },
          { value: "76.8 m²", label: "Floor area" },
        ],
      },
      {
        id: "3c-3d",
        name: "Type 3C / 3D",
        body: "A larger two-bedroom residence with two bathrooms. There are 18.",
        facts: [
          { value: "2", label: "Bedrooms" },
          { value: "2", label: "Bathrooms" },
          { value: "92.4 m²", label: "Floor area" },
        ],
      },
      {
        id: "4a-4b",
        name: "Type 4A / 4B",
        body: "A three-bedroom residence with two bathrooms. There are four.",
        facts: [
          { value: "3", label: "Bedrooms" },
          { value: "2", label: "Bathrooms" },
          { value: "104.0 m²", label: "Floor area" },
        ],
      },
      {
        id: "5",
        name: "Type 5",
        body: "The penthouse, a single three-bedroom residence with three bathrooms.",
        facts: [
          { value: "3", label: "Bedrooms" },
          { value: "3", label: "Bathrooms" },
          { value: "112.0 m²", label: "Floor area" },
        ],
      },
    ],
  },
  product: {
    title: "Cloud by MVP",
    intro: "Every residence has the same structure, envelope, services and certification. The two tiers differ in finish and energy performance, not in how the building is made.",
    tiers: [
      {
        name: "Cloud Silver, NCC 7-star",
        body: "Single-glazed powder-coated aluminium windows, soft-close joinery, stone benchtops, a ceramic induction cooktop and painted fibre cement cladding.",
      },
      {
        name: "Cloud Gold, NCC 8-star",
        body: "Double glazing throughout, two-pac painted joinery, 40 mm silica-free stone benchtops, a Bosch induction cooktop and feature timber-look cladding.",
      },
    ],
    common:
      "Each module is 14.0 by 3.9 metres and 3.6 metres high, with fully insulated steel stud walls, a Colorbond roof and 2,700 mm ceilings to the living areas and bedrooms. Every residence has ducted reverse-cycle air conditioning and electric storage hot water.",
  },
  setting: {
    title: "Built into the bush",
    image: {
      src: "/projects/capel-village/aerial.webp",
      alt: "Aerial view of the approved masterplan looking east to the Capel River reserve",
      width: 1800,
      height: 1004,
    },
    intro: "Capel sits between Bunbury and Busselton, with hospital, retail and services within 25 minutes and the coast within ten. The village backs onto the Capel River reserve.",
    items: [
      {
        title: "Clubhouse and common grounds",
        body: "A two-storey clubhouse of about 300 square metres holds lounge, dining and activity spaces. A landscaped pedestrian spine links every residence to the clubhouse and visitor parking.",
      },
      {
        title: "Getting around",
        body: "The village has a secure gated entry with an intercom to every home. Bollard-lit walkways and buggy paths run throughout, with native planting, stone mulch and steel edging.",
      },
      {
        title: "Village energy",
        body: "Solar generation, battery storage and an embedded microgrid are available across the village, delivered with Geniux.",
      },
    ],
  },
  delivery: {
    body: "Modules are manufactured while civil works and footings go ahead on site, which is where the time is saved. Every module passes a hold-point inspection before it leaves the factory, and manufacture carries on through a wet South West winter.",
    stats: [
      { value: "12 weeks", label: "Factory manufacture" },
      { value: "28–34 weeks", label: "From order to handover" },
      { value: "6–8 months", label: "Faster than a traditional build" },
    ],
  },
  team: [
    { role: "Developer", name: "MVP Group" },
    { role: "Modular manufacture", name: "Cloud Modular" },
    { role: "Architect", name: "Kellett Design Group" },
    { role: "Town planning", name: "Planning Horizons" },
    { role: "Landscape architect", name: "KDLA" },
    { role: "Mechanical, hydraulic and electrical", name: "Decobu" },
    { role: "Solar and microgrid", name: "Geniux" },
    { role: "Traffic engineer", name: "Porter Consulting Engineers" },
    { role: "Acoustics", name: "Acoustic Engineering Solutions" },
    { role: "Building surveyor", name: "Resolve Group" },
    { role: "Survey", name: "Vision Surveys Consulting" },
    { role: "Superintendent", name: "Blue Rock Projects" },
    { role: "Logistics", name: "Prime Global Logistics" },
  ],
};

const rowland: Project = {
  slug: "25-on-rowland-and-forrest",
  name: "25 On Rowland and Forrest",
  sector: "Mixed use",
  location: "Subiaco, WA",
  status: "In progress",
  description:
    "A mixed-use building of 18 modular apartments on a corner site in central Subiaco, designed by Doepel Marsh Architects and manufactured by Cloud Modular.",
  hero: {
    src: "/projects/25-on-rowland-and-forrest/night.webp",
    alt: "Render of the building at dusk on its Subiaco corner, with timber-look cladding, dark framed windows and lit balconies",
    width: 2400,
    height: 1350,
    position: "center 35%",
  },
  overview: {
    intro:
      "25 On Rowland and Forrest is a mixed-use building on a corner site in central Subiaco, designed by Doepel Marsh Architects. Its apartments are built as modules in our manufacturing facility in Foshan and stacked above a ground floor and basement built on site.",
    stats: [
      { value: "18", label: "Apartments" },
      { value: "6", label: "Levels of apartments" },
      { value: "5", label: "Apartment types" },
      { value: "47–53 m²", label: "One-bedroom apartments" },
    ],
    body: "Most apartments have one bedroom and a balcony, and the top floors hold two-level loft apartments with their own decks. Solar panels cover the roofs, with the building's services screened on a deck above.",
  },
  gallery: [
    {
      kind: "full",
      image: {
        src: "/projects/25-on-rowland-and-forrest/axonometric.webp",
        alt: "Axonometric view of the building on its corner, showing the timber-look façade, balconies and the two loft blocks with solar panels on the roof",
        width: 2400,
        height: 1436,
        caption: "The building on its corner",
      },
    },
    {
      kind: "pair",
      images: [
        {
          src: "/projects/25-on-rowland-and-forrest/street.webp",
          alt: "The building seen from the street, with shopfronts at ground level and planting on the upper terraces",
          width: 705,
          height: 804,
          caption: "From the street",
        },
        {
          src: "/projects/25-on-rowland-and-forrest/apartments.webp",
          alt: "Apartments with full-height glazing, glass balconies and timber soffits above a garden",
          width: 527,
          height: 746,
          caption: "Apartments and balconies",
        },
      ],
    },
  ],
  types: {
    label: "Apartments",
    title: "Five apartment types",
    intro: "Four one-bedroom types fill the middle levels, with two-level loft apartments at the top. Choose a type to see where it sits in the building.",
    sharedModel: "rowland",
    items: [
      {
        id: "a",
        highlight: typeGroups.A,
        name: "Type A",
        body: "The largest of the one-bedroom apartments.",
        facts: [
          { value: "1", label: "Bedroom" },
          { value: "53 m²", label: "Floor area" },
        ],
      },
      {
        id: "b",
        highlight: typeGroups.B,
        name: "Type B",
        body: "A one-bedroom apartment designed to an accessible standard.",
        facts: [
          { value: "1", label: "Bedroom" },
          { value: "47 m²", label: "Floor area" },
        ],
      },
      {
        id: "c",
        highlight: typeGroups.C,
        name: "Type C",
        body: "A one-bedroom apartment on the middle levels.",
        facts: [
          { value: "1", label: "Bedroom" },
          { value: "47 m²", label: "Floor area" },
        ],
      },
      {
        id: "d",
        highlight: typeGroups.D,
        name: "Type D",
        body: "A one-bedroom apartment, slightly larger on the lower levels than the upper ones.",
        facts: [
          { value: "1", label: "Bedroom" },
          { value: "51–53 m²", label: "Floor area" },
        ],
      },
      {
        id: "e",
        highlight: typeGroups.E,
        name: "Type E",
        body: "A two-bedroom loft apartment over the top two levels, with its own deck.",
        facts: [
          { value: "2", label: "Bedrooms" },
          { value: "2", label: "Bathrooms" },
          { value: "86 m²", label: "Floor area over two levels" },
        ],
      },
    ],
  },
  setting: {
    title: "Central Subiaco",
    image: {
      src: "/projects/25-on-rowland-and-forrest/site.webp",
      alt: "Aerial photograph of central Subiaco with the building's roof plan shown on its corner site",
      width: 2400,
      height: 1436,
      position: "48% center",
    },
    intro: "The building sits on the corner of Rowland and Forrest in central Subiaco, among the town centre's shops, cafés and public car parks.",
    items: [
      {
        title: "Built on site and in the factory",
        body: "The basement, ground floor and first-floor slab are built on site. The apartment modules are made in our manufacturing facility at the same time, then craned into place above them.",
      },
      {
        title: "On the roof",
        body: "Solar panels cover the roofs of the loft apartments. Air-conditioning condensers and hot water units sit on a screened services deck, reached by a ladder.",
      },
    ],
  },
  delivery: {
    body: "The site works and the apartment modules run at the same time. While the basement and ground floor are built in Subiaco, the modules are made, inspected and shipped, ready to be installed level by level.",
  },
  team: [
    { role: "Architect", name: "Doepel Marsh Architects" },
    { role: "Modular manufacture", name: "Cloud Modular" },
  ],
};

export const projectPages: Project[] = [seashells, capel, rowland];
