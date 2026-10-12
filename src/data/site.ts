export const site = {
  name: "Cloud Modular",
  url: "https://cloudmodular.com.au",
  description:
    "Precision-engineered modular construction for Perth, Western Australia and nationally.",
  email: "nigel@cloudmodular.com.au",
  enquiryHref:
    "mailto:nigel@cloudmodular.com.au?subject=Cloud%20Modular%20Website%20Inquiry",
  linkedIn: "https://www.linkedin.com/company/cloudmodular",
  hours: "Monday - Friday, 9am - 5pm AWST",
  offices: [
    {
      city: "Perth, Australia",
      lines: ["311-313 Hay St", "Subiaco WA 6008"],
    },
    {
      city: "Foshan, China",
      lines: ["3F, 48L, No.26", "Lang Bao West Road", "Foshan City", "Guangdong Province", "China"],
    },
  ],
} as const;

export const qualityRows = [
  {
    index: "01",
    title: "Engineering & Compliance",
    description:
      "Each module is certified by qualified engineers and designed to meet all required Australian standards.",
    image: "/Header1.webp",
    imagePosition: "center",
    reverse: false,
  },
  {
    index: "02",
    title: "Factory-Controlled Production",
    description:
      "Modules are built in a stable, repeatable environment that supports consistent quality and precise manufacturing.",
    image: "/Factory.webp",
    imagePosition: "center",
    reverse: true,
  },
  {
    index: "03",
    title: "Independent Quality Checks",
    description:
      "Inspections at key stages verify accuracy, workmanship and readiness before modules leave the factory.",
    image: "/Checks.webp",
    imagePosition: "center 62%",
    reverse: false,
  },
] as const;

export const advantages = [
  {
    title: "Certified to Australian standards",
    points: [
      "Every module meets Australian Building Codes and state regulations before leaving the factory.",
      "Pre-certified structural engineering reduces approvals risk and speeds consent timelines.",
      "Third-party inspections during production ensure quality control at every stage.",
    ],
  },
  {
    title: "Offsite manufacturing is faster",
    points: [
      "Concurrent site prep and factory production cut total project time by months.",
      "Weather-independent assembly keeps schedules predictable year-round.",
      "Rapid on-site installation minimises disruption and accelerates handover.",
    ],
  },
  {
    title: "Precision and consistency",
    points: [
      "Controlled factory environments eliminate variability and reduce defects.",
      "Standardised processes ensure consistent quality across every module.",
      "Built-in quality checkpoints catch issues before they reach site.",
    ],
  },
  {
    title: "Tailored to specifications",
    points: [
      "Modular design adapts to unique site constraints and spatial requirements.",
      "Configurable layouts suit residential, commercial, and mixed-use needs.",
      "Scalable solutions grow with your project demands and budget.",
    ],
  },
  {
    title: "Significant cost savings",
    points: [
      "Factory efficiency reduces labour costs and material waste by up to 20%.",
      "Shorter timelines mean lower financing costs and faster revenue generation.",
      "Predictable pricing with fewer on-site surprises protects your margins.",
    ],
  },
  {
    title: "Reduced environmental impact",
    points: [
      "Offsite construction generates 70% less landfill than traditional builds.",
      "Optimised material usage and recycling programs minimise waste.",
      "Energy-efficient manufacturing processes reduce the carbon footprint of every module.",
    ],
  },
] as const;

export const sectors = [
  {
    image: "/office.webp",
    label: "Commercial",
    title: "Commercial Modular Buildings",
    description:
      "Office buildings, retail spaces, and mixed-use commercial developments delivered with modular precision.",
  },
  {
    image: "/Resi.webp",
    label: "Multi-Residential",
    title: "Multi-Residential Modular Construction",
    description:
      "Apartments, townhouses, and residential developments delivered faster with factory-built modular construction.",
  },
  {
    image: "/aged-care.webp",
    label: "Healthcare & Aged Care",
    title: "Healthcare & Aged Care Modular Facilities",
    description:
      "Medical facilities and aged care residences built to Australian healthcare standards with modular construction methods.",
  },
  {
    image: "/school.webp",
    label: "Education & Community",
    title: "Education & Community Modular Buildings",
    description:
      "Schools, libraries, and community centres delivered with precision-engineered modular construction.",
  },
  {
    image: "/Infra.webp",
    label: "Infrastructure",
    title: "Infrastructure Modular Construction",
    description:
      "Transit facilities and public infrastructure projects built with offsite modular construction methods.",
  },
  {
    image: "/hotel.webp",
    label: "Hotels & Accommodation",
    title: "Hotels & Accommodation Modular Buildings",
    description:
      "Hotels, resorts, and short-term accommodation built faster with factory-controlled modular construction.",
  },
] as const;

// Alt home Projects grid (one row of three). Seashells Jurien Bay and Capel Village are real (Capel still
// uses a Jurien Bay render as its image); the third is a placeholder until more projects are ready.
export const projects = [
  {
    name: "Seashells Jurien Bay",
    sector: "Residential",
    location: "Jurien Bay, WA",
    image: "/projects/jurien-bay-apartments.webp",
    imageAlt: "Seashells Jurien Bay apartments with rooftop terraces at sunset",
    imagePosition: "center",
  },
  {
    name: "Capel Village",
    sector: "Residential",
    location: "Capel, WA",
    image: "/projects/jurien-bay-townhouses.webp",
    imageAlt: "Modular townhouses with timber-framed verandahs and native garden beds",
    imagePosition: "62% center",
  },
  {
    name: "Project Name",
    sector: "Residential",
    location: "Location",
    image: "/projects/jurien-bay-dusk.webp",
    imageAlt: "Modular townhouses lit at dusk",
    imagePosition: "center",
  },
] as const;

// Each question carries the page it belongs to (`topic`, also its group on /faq/) and any other pages it should
// appear on (`alsoOn`). The refresh pages show their own short set; /faq/ shows all, grouped in faqTopics order.
export const faqTopics = [
  { id: "general", label: "Projects and delivery", href: "/" },
  { id: "quality", label: "Quality, compliance & assurance", href: "/quality/" },
  { id: "why", label: "Why Cloud Modular", href: "/why-cloud-modular/" },
  { id: "approach", label: "Process and engagement", href: "/our-approach/" },
] as const;

export type FaqTopic = (typeof faqTopics)[number]["id"];

export const faqItems = [
  {
    topic: "quality",
    question: "How do your modules comply with Australian standards?",
    answer:
      "All modules are engineered to Australian standards and certified before leaving the factory. We provide full documentation and drawings for building surveyors and local authorities.",
  },
  {
    topic: "quality",
    question: "Where are the modules built?",
    alsoOn: ["general"],
    answer:
      "Modules are manufactured in controlled factory environments offshore, where the process is stable, repeatable and closely audited for accuracy and consistency.",
  },
  {
    topic: "quality",
    question: "How do you ensure quality when manufacturing offshore?",
    answer:
      "We use controlled factory settings, third-party inspections and engineering sign-off at key points in the process. Nothing ships until it meets structural, architectural and compliance requirements.",
  },
  {
    topic: "why",
    question: "What's the advantage of modular over traditional construction?",
    answer:
      "Most of the build happens offsite, which shortens timelines, reduces site disruption and improves cost certainty.",
  },
  {
    topic: "general",
    question: "Can modular buildings be customised to my project?",
    alsoOn: ["approach"],
    answer:
      "Yes. Modules are designed to suit site constraints, planning requirements and spatial needs. We adapt layouts and configurations based on project intent.",
  },
  {
    topic: "general",
    question: "What types of buildings do you deliver?",
    answer:
      "We work across commercial, multi-residential, health and aged care, education, community, infrastructure and accommodation projects.",
  },
  {
    topic: "why",
    question: "What's the typical project timeline?",
    alsoOn: ["general", "approach"],
    answer:
      "Timelines vary by scale and complexity, but offsite manufacturing means construction and site works can run concurrently, significantly reducing the overall program.",
  },
  {
    topic: "general",
    question: "How are modules transported and installed?",
    alsoOn: ["approach"],
    answer:
      "Modules are shipped, unloaded and craned into position using established lifting and transport methods. We coordinate with local contractors for foundations, services and final works.",
  },
  {
    topic: "quality",
    question: "Do modular buildings have the same lifespan as traditional buildings?",
    answer:
      "Yes. Modules are engineered as permanent structures and use materials and systems comparable to traditional builds.",
  },
  {
    topic: "why",
    question: "What are the cost benefits?",
    answer:
      "Factory production reduces waste, labour time and rework, providing more cost certainty and a more predictable project budget.",
  },
  {
    topic: "why",
    question: "Can modular buildings meet sustainability targets?",
    answer:
      "Yes. Controlled production reduces waste, and the precision of the process supports higher-performing building envelopes and reduced embodied carbon depending on specification.",
  },
] as const;

export const team = [
  {
    image: "/people/thomas.webp",
    name: "Thomas Tierney",
    role: "Co-Founder / Director",
    bio: "Thomas brings a rare combination of commercial, construction, and international development experience. With over ten years as a property developer/QS in Ireland and London, Thomas has delivered many successful residential and commercial projects, and has a strong foundation in every phase of the development lifecycle.",
    position: "center 30%",
  },
  {
    image: "/people/nigel.webp",
    name: "Nigel David",
    role: "Co-Founder / Director",
    bio: "Nigel has over thirty years of procurement experience in the building and construction industry specialising in export market development, international procurement management, compliance and logistics, and trade development.",
    position: "center 30%",
  },
  {
    image: "/people/andy.webp",
    name: "Andy David",
    role: "Co-Founder",
    bio: "Andy has extensive experience in technology, particularly artificial intelligence, and across management consulting and capital raising projects, digital transformation, growth, and business performance improvement.",
    position: "center 30%",
  },
  {
    image: "/people/mike.webp",
    name: "Mike Liang",
    role: "China Lead",
    bio: "Leading the company's China operations, Mike is an engineer with a strong technical background across architectural design, smart building systems, and environmental protection equipment, delivering practical and sustainable construction solutions.",
    position: "center 30%",
  },
] as const;

// /our-approach/. A first draft for review, shaped by industry practice rather than confirmed process detail.
// Anything with `confirm: true` shows a "To confirm" marker on the page; set it to false (or remove it) once the
// fact is checked. Partners are placeholders until confirmed.
export const partners = {
  design: { name: "Kellett Design Group", role: "Design partner", confirm: true },
  builder: { name: "MVP Group", role: "Builder partner", confirm: true },
} as const;

export const approachStages = [
  {
    index: "01",
    title: "Brief and feasibility",
    summary: "We start with your site, yield, programme and budget, and test whether modular is the right fit.",
    points: ["Site review and constraints", "Early module layout and yield", "Indicative cost range and programme"],
    signOff: "Go-ahead to design",
    duration: "TBC",
    confirm: true,
  },
  {
    index: "02",
    title: "Design for manufacture",
    summary: `Working with ${partners.design.name} or your own architect, we resolve the design around module sizes, transport limits and lifting.`,
    points: ["Plans, elevations and finishes", "Structural engineering, including wind region for cyclone sites", "Updated estimate"],
    signOff: "Design and budget",
    duration: "TBC",
    confirm: true,
  },
  {
    index: "03",
    title: "Approvals and documentation",
    summary: "Planning, building approval and the detailed drawings the factory builds from, prepared in parallel where we can.",
    points: ["Development approval where required", "Building permit, lodged by the registered builder", "Shop drawings for every module"],
    signOff: "Approved drawings and contract",
    duration: "TBC",
    confirm: true,
  },
  {
    index: "04",
    title: "Manufacture in Foshan",
    summary: "Modules are built in the factory in Foshan while the site is prepared. The two run at the same time.",
    points: ["Structure, services and fit-out built in", "Progress reporting to the client", "Site works and footings under way in parallel"],
    signOff: "Production progress",
    duration: "TBC",
    confirm: true,
  },
  {
    index: "05",
    title: "Inspection and factory sign-off",
    summary: "Independent checks at key stages confirm accuracy, workmanship and compliance before anything ships.",
    points: ["Staged quality inspections", "Engineering sign-off", "Compliance documentation for import"],
    signOff: "Modules accepted for shipping",
    duration: "TBC",
    confirm: true,
  },
  {
    index: "06",
    title: "Shipping and clearance",
    summary: "Modules are shipped to the nearest suitable port and cleared through customs and biosecurity.",
    points: ["Sea freight from China", "Customs and biosecurity clearance", "Road transport planned to site, including regional and remote routes"],
    signOff: "Delivery schedule",
    duration: "TBC",
    confirm: true,
  },
  {
    index: "07",
    title: "Delivery and installation",
    summary: "Modules arrive in sequence and are craned onto prepared footings, then joined and connected.",
    points: ["Crane lifts in an agreed sequence", "Modules joined and made weathertight", "Services connected"],
    signOff: "Installation complete",
    duration: "TBC",
    confirm: true,
  },
  {
    index: "08",
    title: "Completion and handover",
    summary: "Final finishes, inspections and certification, then the keys, manuals and warranties.",
    points: ["Final inspections and certification", "Defects walk-through", "Handover documents and warranties"],
    signOff: "Practical completion",
    duration: "TBC",
    confirm: true,
  },
] as const;

// Parallel programme: shared phases, then factory and site tracks side by side, then shared again. Columns are
// phases, not to scale, until real durations are confirmed.
export const approachTimeline = {
  start: { title: "Brief, design and approvals", cols: 3 },
  factory: ["Manufacture", "Inspection", "Shipping and clearance"],
  site: ["Site establishment", "Footings and slab", "Services ready"],
  end: [{ title: "Installation" }, { title: "Handover" }],
  confirm: true,
} as const;

export const engagementModels = [
  {
    title: "Design and deliver",
    suits: "Developers who want one team from brief to handover.",
    summary: `We lead design, manufacture, shipping and installation. ${partners.builder.name} holds the building permit and runs site works.`,
    confirm: true,
  },
  {
    title: "Early involvement",
    suits: "Developers and government clients with a consultant team in place.",
    summary: "We join at feasibility so the design suits manufacture before it's fixed, then carry it through to supply.",
    confirm: true,
  },
  {
    title: "Supply to your builder",
    suits: "Builders and head contractors.",
    summary: "We design for manufacture, build, ship and deliver the modules. Your builder handles the site, permit and connections.",
    confirm: true,
  },
  {
    title: "Tender response",
    suits: "Projects already in procurement.",
    summary: "You have a design. We price it, adapt it for modular and show where it gains time or cost.",
    confirm: true,
  },
] as const;

// Who does what under "Design and deliver". "lead" or "support" per party; omitted means no role.
export type Role = "lead" | "support";
export const responsibilities: { item: string; cloud?: Role; builder?: Role; client?: Role }[] = [
  { item: "Brief, budget and site information", client: "lead", cloud: "support" },
  { item: "Design for manufacture", cloud: "lead", client: "support" },
  { item: "Structural engineering and certification", cloud: "lead" },
  { item: "Planning approval", client: "lead", cloud: "support" },
  { item: "Building permit", builder: "lead", cloud: "support" },
  { item: "Survey and soil report", client: "lead" },
  { item: "Manufacture and quality checks", cloud: "lead" },
  { item: "Shipping, customs and biosecurity", cloud: "lead" },
  { item: "Transport to site and crane", cloud: "lead", builder: "support" },
  { item: "Site works, footings and services", builder: "lead" },
  { item: "Installation", cloud: "lead", builder: "support" },
  { item: "Finishing, connections and handover", builder: "lead", cloud: "support" },
];

export const paymentMilestones = [
  "Engagement and design",
  "Production start",
  "Factory sign-off",
  "Shipping",
  "Delivery and installation",
  "Practical completion",
] as const;
