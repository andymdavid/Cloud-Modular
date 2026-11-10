import { site } from "@/data/site";

// Each Cloud brand on the one website: the descriptor under the CLOUD wordmark, where the logo leads, the header
// action, the menu and the footer. Pages choose one through RefreshLayout's `brand`; every brand shares the design
// system. The menu and footer for Modular are the site's existing ones.

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export interface Brand {
  /** Name for labels and the copyright line. */
  name: string;
  /** Small mono word under the wordmark; none keeps the wordmark on its own. */
  descriptor?: string;
  home: string;
  /** A contact page that stands in for the email address, which the brand doesn't show. */
  contact?: string;
  /** The link-preview image for the brand's pages; none uses the site's default. */
  image?: string;
  /** A shop's cart page: the header shows a bag with the item count, which opens the cart drawer. */
  cart?: string;
  /** Links shown inline in the header on wide screens (a shop's departments). */
  nav?: NavLink[];
  /** The header button and the menu panel's closing action. */
  cta: NavLink;
  menuPrompt: string;
  menu: NavGroup[];
  footer: {
    groups: NavGroup[];
    prompt: string;
    actions: NavLink[];
  };
}

export const brands = {
  modular: {
    name: "Cloud Modular",
    home: "/",
    cta: { label: "Get started", href: site.startHref },
    menuPrompt: "Let’s talk about your next project",
    menu: [
      {
        label: "Work",
        links: [
          { label: "Cloud Homes", href: "/cloud-homes/" },
          { label: "How Cloud Homes Work", href: "/cloud-homes/how-it-works/" },
          { label: "Our Work", href: "/our-work/" },
          { label: "Sectors", href: "/#sectors" },
        ],
      },
      {
        label: "Company",
        links: [
          { label: "Our Approach", href: "/our-approach/" },
          { label: "Manufacturing & Quality", href: "/quality/" },
          { label: "Why Cloud Modular", href: "/why-cloud-modular/" },
          { label: "About", href: "/about/" },
        ],
      },
      {
        label: "Help",
        links: [
          { label: "FAQ", href: "/faq/" },
          { label: "Contact", href: site.contactHref },
        ],
      },
    ],
    footer: {
      groups: [
        {
          label: "Company",
          links: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about/" },
            { label: "Our Work", href: "/our-work/" },
            { label: "Partner With Us", href: "/partner-with-us/" },
          ],
        },
        {
          label: "Explore",
          links: [
            { label: "Cloud Homes", href: "/cloud-homes/" },
            { label: "How Cloud Homes Work", href: "/cloud-homes/how-it-works/" },
            { label: "Projects", href: "/our-work/" },
            { label: "How It's Made", href: "/#explore" },
            { label: "Sectors", href: "/#sectors" },
          ],
        },
        {
          label: "Why Cloud Modular",
          links: [
            { label: "Manufacturing & Quality", href: "/quality/" },
            { label: "Why Cloud Modular", href: "/why-cloud-modular/" },
            { label: "Our Approach", href: "/our-approach/" },
            { label: "FAQ", href: "/faq/" },
          ],
        },
        {
          label: "Contact",
          links: [
            { label: "Contact Us", href: site.contactHref },
            { label: "LinkedIn", href: site.linkedIn, external: true },
          ],
        },
      ],
      prompt: "Have a project in mind? Tell us about it and we’ll show you how modular can deliver it.",
      actions: [
        { label: "Enquire now", href: site.contactHref },
        { label: "Partner with us", href: "/partner-with-us/" },
      ],
    },
  },
  trade: {
    name: "Cloud Trade",
    descriptor: "Trade",
    home: "/trade/",
    image: "/trade/og-image.webp",
    contact: "/trade/contact/",
    // Open an account goes to the portal's sign-up; until the portal has an address it leads to /trade/start/
    cta: { label: "Open an account", href: "/trade/start/" },
    menuPrompt: "Open an account and start your first project",
    menu: [
      {
        label: "Trade",
        links: [
          { label: "How It Works", href: "/trade/how-it-works/" },
          { label: "Quality and Compliance", href: "/trade/quality/" },
          { label: "Range", href: "/trade/#range" },
          { label: "Who We Supply", href: "/trade/#clients" },
        ],
      },
      {
        label: "Case Studies",
        links: [
          { label: "Griffin Group", href: "/trade/projects/griffin-group/" },
          { label: "Seashells Jurien Bay", href: "/trade/projects/seashells-jurien-bay/" },
          { label: "Hancock Iron Ore", href: "/trade/projects/hancock-iron-ore/" },
        ],
      },
      {
        label: "Help",
        links: [
          { label: "Get Started", href: "/trade/start/" },
          { label: "FAQ", href: "/trade/#faq" },
          { label: "Contact", href: "/trade/contact/" },
        ],
      },
    ],
    footer: {
      groups: [
        {
          label: "Cloud Trade",
          links: [
            { label: "Home", href: "/trade/" },
            { label: "How It Works", href: "/trade/how-it-works/" },
            { label: "Quality and Compliance", href: "/trade/quality/" },
            { label: "Range", href: "/trade/#range" },
            { label: "Who We Supply", href: "/trade/#clients" },
          ],
        },
        {
          label: "Case Studies",
          links: [
            { label: "Griffin Group", href: "/trade/projects/griffin-group/" },
            { label: "Seashells Jurien Bay", href: "/trade/projects/seashells-jurien-bay/" },
            { label: "Hancock Iron Ore", href: "/trade/projects/hancock-iron-ore/" },
          ],
        },
        {
          label: "Help",
          links: [
            { label: "Get Started", href: "/trade/start/" },
            { label: "FAQ", href: "/trade/#faq" },
          ],
        },
        {
          label: "Contact",
          links: [
            { label: "Contact Us", href: "/trade/contact/" },
            { label: "LinkedIn", href: site.linkedIn, external: true },
          ],
        },
      ],
      prompt: "Sourcing something for a project? Tell us what you need and our team will help you price it.",
      actions: [
        { label: "Open an account", href: "/trade/start/" },
        { label: "Talk to the team", href: "/trade/contact/" },
      ],
    },
  },
  living: {
    name: "Cloud Living",
    descriptor: "Living",
    home: "/living/",
    contact: "/living/contact/",
    cart: "/living/cart/",
    cta: { label: "Shop all", href: "/living/shop/" },
    nav: [
      { label: "Shop All", href: "/living/shop/" },
      { label: "Living", href: "/living/rooms/living/" },
      { label: "Dining", href: "/living/rooms/dining/" },
      { label: "Bedroom", href: "/living/rooms/bedroom/" },
      { label: "Kitchen", href: "/living/rooms/kitchen/" },
      { label: "Bathroom", href: "/living/rooms/bathroom/" },
      { label: "Outdoor", href: "/living/rooms/outdoor/" },
    ],
    menuPrompt: "Furniture and homewares for every room",
    menu: [
      {
        label: "Shop by room",
        links: [
          { label: "Living", href: "/living/rooms/living/" },
          { label: "Dining", href: "/living/rooms/dining/" },
          { label: "Bedroom", href: "/living/rooms/bedroom/" },
          { label: "Kitchen", href: "/living/rooms/kitchen/" },
          { label: "Bathroom", href: "/living/rooms/bathroom/" },
          { label: "Outdoor", href: "/living/rooms/outdoor/" },
        ],
      },
      {
        label: "Shop by category",
        links: [
          { label: "Sofas", href: "/living/shop/sofas/" },
          { label: "Chairs", href: "/living/shop/chairs/" },
          { label: "Tables", href: "/living/shop/tables/" },
          { label: "Beds and Mattresses", href: "/living/shop/beds/" },
          { label: "Storage", href: "/living/shop/storage/" },
          { label: "Lighting", href: "/living/shop/lighting/" },
          { label: "Linen and Rugs", href: "/living/shop/textiles/" },
          { label: "Bathroom", href: "/living/shop/bathroom/" },
          { label: "Appliances", href: "/living/shop/appliances/" },
        ],
      },
      {
        label: "Help",
        links: [
          { label: "Delivery and Returns", href: "/living/help/" },
          { label: "Contact", href: "/living/contact/" },
          { label: "Furnishing a Project", href: "/trade/" },
        ],
      },
    ],
    footer: {
      groups: [
        {
          label: "Shop",
          links: [
            { label: "Shop All", href: "/living/shop/" },
            { label: "New In", href: "/living/shop/?sort=new" },
            { label: "Sofas", href: "/living/shop/sofas/" },
            { label: "Beds and Mattresses", href: "/living/shop/beds/" },
            { label: "Lighting", href: "/living/shop/lighting/" },
          ],
        },
        {
          label: "Rooms",
          links: [
            { label: "Living", href: "/living/rooms/living/" },
            { label: "Dining", href: "/living/rooms/dining/" },
            { label: "Bedroom", href: "/living/rooms/bedroom/" },
            { label: "Kitchen", href: "/living/rooms/kitchen/" },
            { label: "Bathroom", href: "/living/rooms/bathroom/" },
            { label: "Outdoor", href: "/living/rooms/outdoor/" },
          ],
        },
        {
          label: "Help",
          links: [
            { label: "Delivery", href: "/living/help/#delivery" },
            { label: "Returns", href: "/living/help/#returns" },
            { label: "Orders and Payment", href: "/living/help/#orders" },
            { label: "Cart", href: "/living/cart/" },
          ],
        },
        {
          label: "Contact",
          links: [
            { label: "Contact Us", href: "/living/contact/" },
            { label: "Cloud Trade", href: "/trade/" },
          ],
        },
      ],
      prompt: "Need help choosing, or furnishing a whole home? Send us a message and our team will help.",
      actions: [
        { label: "Shop all", href: "/living/shop/" },
        { label: "Contact us", href: "/living/contact/" },
      ],
    },
  },
} satisfies Record<string, Brand>;

export type BrandId = keyof typeof brands;
