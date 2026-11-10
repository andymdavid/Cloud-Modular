// Cloud Living, the retail shop at /living. PLACEHOLDER CATALOGUE: every product, price, option and description
// here stands in until the product catalogue supplies the range, so the shop's layouts can be built and reviewed.
// Products without a studio render show a drawn placeholder (ProductArt) for their category.

export interface Category {
  slug: string;
  title: string;
  description: string;
  /** The drawn placeholder used for this category's products until they have photography. */
  art: ArtId;
}

export interface Room {
  slug: string;
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
  imagePosition?: string;
  /** The image is a styled room (not a studio shot), so product pages can show it as "in the room". */
  interior: boolean;
}

export type ArtId =
  | "sofa"
  | "chair"
  | "stool"
  | "table"
  | "side-table"
  | "bed"
  | "mattress"
  | "storage"
  | "lamp"
  | "pendant"
  | "textile"
  | "rug"
  | "tap"
  | "toilet"
  | "fridge"
  | "tv";

export interface Colour {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  rooms: string[];
  /** Price in dollars, including GST. */
  price: number;
  /** The earlier price, for a product on sale. */
  was?: number;
  badge?: "New" | "Bestseller" | "Sale";
  colours?: Colour[];
  sizes?: string[];
  /** Studio render on the catalogue backdrop; without one the card draws its category placeholder. */
  image?: { src: string; width: number; height: number };
  /** Drawn placeholder, when it differs from the category's. */
  art?: ArtId;
  summary: string;
  dimensions: string;
  materials: string;
  /** Order in the "New in" row; lower comes first. */
  added: number;
}

export const livingCategories: Category[] = [
  { slug: "sofas", title: "Sofas", description: "Two and three-seat sofas and modular corner lounges.", art: "sofa" },
  { slug: "chairs", title: "Chairs", description: "Lounge, dining and outdoor chairs, and stools for the kitchen bench.", art: "chair" },
  { slug: "tables", title: "Tables", description: "Dining, coffee and bedside tables.", art: "table" },
  { slug: "beds", title: "Beds and mattresses", description: "Bed frames and mattresses in queen and king.", art: "bed" },
  { slug: "storage", title: "Storage", description: "Sideboards and chests of drawers.", art: "storage" },
  { slug: "lighting", title: "Lighting", description: "Table lamps and pendant lights.", art: "lamp" },
  { slug: "textiles", title: "Linen and rugs", description: "Bed linen, throws and rugs.", art: "textile" },
  { slug: "bathroom", title: "Bathroom", description: "Tapware and toilet suites.", art: "tap" },
  { slug: "appliances", title: "Appliances", description: "Fridges and televisions.", art: "fridge" },
];

export const livingRooms: Room[] = [
  { slug: "living", title: "Living", description: "Sofas, lounge chairs, coffee tables, rugs and lamps.", image: "/trade/products/furniture.webp", width: 1024, height: 1024, interior: false },
  { slug: "dining", title: "Dining", description: "Dining tables, chairs, sideboards and pendant lights.", image: "/cloud-homes/generated/living.webp", width: 2560, height: 1717, imagePosition: "55% 60%", interior: true },
  { slug: "bedroom", title: "Bedroom", description: "Beds, mattresses, linen, bedside tables and lamps.", image: "/cloud-homes/generated/bedroom.webp", width: 2560, height: 1717, imagePosition: "40% 50%", interior: true },
  { slug: "kitchen", title: "Kitchen", description: "Stools, pendant lights and appliances.", image: "/interior.webp", width: 1748, height: 900, imagePosition: "30% 60%", interior: true },
  { slug: "bathroom", title: "Bathroom", description: "Tapware and toilet suites.", image: "/trade/projects/bathroom-basin.webp", width: 1920, height: 1280, imagePosition: "35% 60%", interior: true },
  { slug: "outdoor", title: "Outdoor", description: "Outdoor dining tables and lounge chairs.", image: "/cloud-homes/generated/backyard.webp", width: 2560, height: 1429, interior: true },
];

const oat = { name: "Oat", hex: "#D9CFC0" };
const charcoal = { name: "Charcoal", hex: "#4A4A4C" };
const sage = { name: "Sage", hex: "#B7C0AE" };
const oak = { name: "Natural oak", hex: "#C9A27A" };
const walnut = { name: "Walnut", hex: "#6E4C35" };
const black = { name: "Black", hex: "#1E1E20" };
const white = { name: "White", hex: "#F4F3F0" };
const rust = { name: "Rust", hex: "#9C4A26" };
const chrome = { name: "Chrome", hex: "#C8CACD" };

const render = (name: string) => ({ src: `/trade/products/${name}.webp`, width: 1024, height: 1024 });

export const livingProducts: Product[] = [
  { slug: "three-seat-sofa", name: "Three-seat sofa", category: "sofas", rooms: ["living"], price: 1890, badge: "New", colours: [oat, charcoal, sage], summary: "A deep, low three-seater with feather-wrapped cushions and a solid timber frame.", dimensions: "W 220 × D 95 × H 78 cm", materials: "Linen blend upholstery, kiln-dried hardwood frame, feather and foam cushions.", added: 1 },
  { slug: "modular-corner-sofa", name: "Modular corner sofa", category: "sofas", rooms: ["living"], price: 3250, colours: [oat, charcoal], summary: "Four modules that join as a corner lounge or stand apart as single seats.", dimensions: "W 290 × D 290 × H 76 cm", materials: "Performance fabric, hardwood frame, high-resilience foam.", added: 9 },
  { slug: "two-seat-sofa", name: "Two-seat sofa", category: "sofas", rooms: ["living"], price: 1490, badge: "Bestseller", colours: [oat, sage], summary: "A compact two-seater sized for apartments and smaller living rooms.", dimensions: "W 170 × D 90 × H 78 cm", materials: "Linen blend upholstery, kiln-dried hardwood frame.", added: 14 },
  { slug: "oak-lounge-chair", name: "Oak lounge chair", category: "chairs", rooms: ["living"], price: 690, badge: "Bestseller", colours: [oat, charcoal], image: render("furniture"), summary: "A solid oak frame with loose linen cushions, low enough to sink into.", dimensions: "W 72 × D 78 × H 74 cm", materials: "Solid oak, linen blend cushions.", added: 6 },
  { slug: "upholstered-dining-chair", name: "Upholstered dining chair", category: "chairs", rooms: ["dining"], price: 189, colours: [oat, charcoal], summary: "A padded dining chair with a high back and oak legs.", dimensions: "W 46 × D 56 × H 92 cm", materials: "Linen blend upholstery, oak legs.", added: 11 },
  { slug: "oak-bar-stool", name: "Oak bar stool", category: "chairs", rooms: ["kitchen", "dining"], price: 165, colours: [oak, black], art: "stool", summary: "A bench-height stool with a round padded seat and a footrest.", dimensions: "Ø 40 × H 75 cm", materials: "Solid oak, upholstered seat.", added: 4 },
  { slug: "outdoor-lounge-chair", name: "Outdoor lounge chair", category: "chairs", rooms: ["outdoor"], price: 420, colours: [oak, charcoal], summary: "A slatted lounge chair with weatherproof cushions.", dimensions: "W 70 × D 80 × H 72 cm", materials: "FSC acacia, outdoor fabric cushions.", added: 16 },
  { slug: "oak-dining-table", name: "Oak dining table", category: "tables", rooms: ["dining"], price: 1290, badge: "New", colours: [oak, walnut], summary: "A six-seat dining table with a solid oak top and tapered legs.", dimensions: "W 180 × D 90 × H 75 cm", materials: "Solid oak top, oak veneer base, hardwax oil finish.", added: 2 },
  { slug: "round-coffee-table", name: "Round coffee table", category: "tables", rooms: ["living"], price: 540, colours: [oak, black], summary: "A low round table with a lower shelf for books and trays.", dimensions: "Ø 90 × H 40 cm", materials: "Oak veneer, powder-coated steel.", added: 12 },
  { slug: "oak-bedside-table", name: "Oak bedside table", category: "tables", rooms: ["bedroom"], price: 290, badge: "Bestseller", colours: [oak, walnut], art: "side-table", summary: "A bedside table with one soft-close drawer.", dimensions: "W 50 × D 40 × H 55 cm", materials: "Solid oak and oak veneer.", added: 7 },
  { slug: "outdoor-dining-table", name: "Outdoor dining table", category: "tables", rooms: ["outdoor"], price: 1150, colours: [oak], summary: "A slatted six-seat table for the deck or courtyard.", dimensions: "W 200 × D 95 × H 75 cm", materials: "FSC acacia, outdoor oil finish.", added: 18 },
  { slug: "upholstered-bed", name: "Upholstered bed", category: "beds", rooms: ["bedroom"], price: 1390, badge: "New", colours: [oat, charcoal], sizes: ["Queen", "King"], summary: "A low bed frame with a tall padded bedhead and a slatted base.", dimensions: "Queen W 163 × L 213 × H 120 cm", materials: "Linen blend upholstery, hardwood frame, sprung slats.", added: 3 },
  { slug: "pocket-spring-mattress", name: "Pocket spring mattress", category: "beds", rooms: ["bedroom"], price: 990, badge: "Bestseller", sizes: ["Queen", "King"], art: "mattress", summary: "A medium-firm mattress with individually pocketed springs and a pillow top.", dimensions: "Queen W 153 × L 203 × H 30 cm", materials: "Pocket springs, latex and foam comfort layers, knitted cover.", added: 8 },
  { slug: "oak-sideboard", name: "Oak sideboard", category: "storage", rooms: ["dining", "living"], price: 1250, colours: [oak, walnut], summary: "A long sideboard with three doors and adjustable shelves.", dimensions: "W 180 × D 45 × H 75 cm", materials: "Oak veneer, solid oak legs.", added: 13 },
  { slug: "chest-of-drawers", name: "Chest of drawers", category: "storage", rooms: ["bedroom"], price: 890, colours: [oak, white], summary: "Six soft-close drawers in a low, wide chest.", dimensions: "W 140 × D 45 × H 80 cm", materials: "Oak veneer, lacquered drawer fronts.", added: 17 },
  { slug: "ceramic-table-lamp", name: "Ceramic table lamp", category: "lighting", rooms: ["bedroom", "living"], price: 149, badge: "New", colours: [oat, white], summary: "A rounded ceramic base with a linen drum shade.", dimensions: "Ø 30 × H 45 cm", materials: "Glazed ceramic, linen shade.", added: 5 },
  { slug: "linear-pendant-light", name: "Linear pendant light", category: "lighting", rooms: ["kitchen", "dining"], price: 229, colours: [black, white], art: "pendant", summary: "A slim LED pendant for over a bench or dining table.", dimensions: "W 120 × H 4 cm, drop adjustable", materials: "Powder-coated aluminium, diffused LED.", added: 15 },
  { slug: "linen-quilt-cover-set", name: "Linen quilt cover set", category: "textiles", rooms: ["bedroom"], price: 219, colours: [oat, white, sage], sizes: ["Queen", "King"], summary: "A stonewashed linen quilt cover with two pillowcases.", dimensions: "Queen 210 × 210 cm", materials: "100% French flax linen.", added: 10 },
  { slug: "linen-throw", name: "Linen throw", category: "textiles", rooms: ["bedroom", "living"], price: 119, badge: "Sale", was: 149, colours: [rust, oat], summary: "A heavy stonewashed throw for the end of the bed or the sofa.", dimensions: "130 × 180 cm", materials: "100% linen.", added: 19 },
  { slug: "jute-rug", name: "Jute rug", category: "textiles", rooms: ["living", "bedroom"], price: 490, colours: [oat], sizes: ["160 × 230 cm", "200 × 300 cm"], art: "rug", summary: "A hand-woven jute rug with a chunky texture.", dimensions: "160 × 230 cm or 200 × 300 cm", materials: "Natural jute.", added: 20 },
  { slug: "basin-mixer", name: "Basin mixer", category: "bathroom", rooms: ["bathroom"], price: 249, colours: [chrome, black], image: render("basin-mixer"), summary: "A single-lever basin mixer with a ceramic cartridge.", dimensions: "H 16 cm, spout reach 11 cm", materials: "Solid brass, chrome or matte black finish.", added: 21 },
  { slug: "wall-hung-toilet-suite", name: "Wall-hung toilet suite", category: "bathroom", rooms: ["bathroom"], price: 690, colours: [white], image: render("toilet-suite"), art: "toilet", summary: "A rimless wall-hung pan with an in-wall cistern and a soft-close seat.", dimensions: "W 36 × D 52 cm", materials: "Vitreous china, soft-close seat.", added: 22 },
  { slug: "french-door-fridge", name: "French door fridge", category: "appliances", rooms: ["kitchen"], price: 1990, colours: [black, chrome], summary: "A 600 litre French door fridge with a bottom freezer drawer.", dimensions: "W 83 × D 73 × H 178 cm", materials: "Stainless or black steel finish.", added: 23 },
  { slug: "55-inch-4k-tv", name: "55-inch 4K TV", category: "appliances", rooms: ["living"], price: 899, badge: "Sale", was: 1099, colours: [black], art: "tv", summary: "A 55-inch 4K smart TV with a slim bezel.", dimensions: "W 123 × H 71 × D 6 cm", materials: "Aluminium frame.", added: 24 },
];

export const categoryOf = (product: Product) => livingCategories.find((category) => category.slug === product.category)!;
export const artOf = (product: Product): ArtId => product.art ?? categoryOf(product).art;
export const productBySlug = (slug: string) => livingProducts.find((product) => product.slug === slug)!;

export const formatPrice = (dollars: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(dollars);

/** Price bands for the shop filter. */
export const priceBands = [
  { id: "under-250", label: "Under $250", min: 0, max: 250 },
  { id: "250-1000", label: "$250 to $1,000", min: 250, max: 1000 },
  { id: "over-1000", label: "Over $1,000", min: 1000, max: Infinity },
];

export const livingHero = {
  title: "Furniture and homewares for every room",
  lead: "A curated range for the home, delivered across Perth.",
};

/** The bedroom in the hero, with its products marked (positions as % of the image). */
export const shopTheRoom = {
  image: "/cloud-homes/generated/bedroom.webp",
  width: 2560,
  height: 1717,
  alt: "A bedroom with an upholstered bed in linen, a rust throw, a ceramic lamp, an oak bedside table and a jute rug",
  spots: [
    { product: "upholstered-bed", x: 56, y: 30 },
    { product: "ceramic-table-lamp", x: 36, y: 37 },
    { product: "linen-throw", x: 30, y: 66 },
    { product: "oak-bedside-table", x: 87, y: 63 },
    { product: "jute-rug", x: 80, y: 93 },
  ],
};

/** The help topics on /living/help/. Placeholder answers until delivery and returns are set. */
export const livingHelp = [
  {
    id: "delivery",
    label: "Delivery",
    items: [
      { title: "Where do you deliver", body: "We deliver across the Perth metropolitan area to begin with. Delivery to the rest of Western Australia and other states will follow." },
      { title: "How much does delivery cost", body: "The delivery cost is shown in your cart before you pay. It depends on the size of the items and where they are going." },
      { title: "When will my order arrive", body: "Each product page shows when the item is expected to be ready to deliver. We will contact you to book a delivery time." },
      { title: "Can you assemble furniture", body: "Larger furniture is delivered to the room of your choice. Ask our team if you would like assembly and the removal of packaging." },
    ],
  },
  {
    id: "returns",
    label: "Returns",
    items: [
      { title: "Can I return an item", body: "Contact our team and we will arrange the return. Items need to be unused and in their original packaging." },
      { title: "What if something arrives damaged", body: "Let us know within a few days of delivery, with a photograph, and we will repair or replace it." },
    ],
  },
  {
    id: "orders",
    label: "Orders and payment",
    items: [
      { title: "How do I pay", body: "You pay by card at checkout. Your order confirmation comes by email." },
      { title: "Do I need an account", body: "No. You can check out as a guest, or create a Cloud account to track your orders and reorder." },
      { title: "I am furnishing a whole project", body: "Builders, developers and investors furnishing several homes can buy through Cloud Trade, which quotes the whole schedule at trade prices." },
    ],
  },
];
