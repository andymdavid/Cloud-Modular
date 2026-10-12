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
// While a set has `confirm: true`, its section shows a "To confirm" marker; set it to false once checked.
// Other parties are named by role, never by company.
export const approachStages = {
  confirm: true,
  items: [
    {
      index: "01",
      title: "Brief and feasibility",
      summary: "Your site, yield, programme and budget, and whether modular is the right fit.",
      signOff: "Go-ahead to design",
      image: "/approach/site-aerial.webp",
      width: 1054,
      height: 1492,
      alt: "Aerial view of a coastal modular development beside the ocean",
    },
    {
      index: "02",
      title: "Design for manufacture",
      summary: "The design resolved around module sizes, transport limits and lifting, with engineering for the site's wind region.",
      signOff: "Design and budget",
      image: "/approach/module-design.webp",
      width: 1100,
      height: 734,
      alt: "A two-storey modular home with a rooftop pergola, shown on its own",
    },
    {
      index: "03",
      title: "Approvals and documentation",
      summary: "Planning and building approvals, and the shop drawings the factory builds from.",
      signOff: "Approved drawings",
      image: "/approach/approved-design.webp",
      width: 1054,
      height: 1492,
      alt: "Render of modular apartments with rooftop terraces",
    },
    {
      index: "04",
      title: "Manufacture in Foshan",
      summary: "Modules are built in the factory while the site is prepared. The two run at the same time.",
      signOff: "Production progress",
      image: "/Factory-1.webp",
      width: 1672,
      height: 941,
      alt: "Inside a modular manufacturing facility",
    },
    {
      index: "05",
      title: "Inspection and sign-off",
      summary: "Independent checks at key stages confirm accuracy, workmanship and compliance before anything ships.",
      signOff: "Modules accepted",
      image: "/Checks.webp",
      width: 1456,
      height: 816,
      alt: "Quality inspection of a finished module",
    },
    {
      index: "06",
      title: "Shipping and clearance",
      summary: "Sea freight to the nearest suitable port, then customs and biosecurity clearance.",
      signOff: "Delivery schedule",
      image: "/approach/shipping.webp",
      width: 1100,
      height: 620,
      alt: "A wrapped module carrying the Cloud Modular mark",
    },
    {
      index: "07",
      title: "Delivery and installation",
      summary: "Modules arrive in sequence, are craned onto prepared footings, then joined, sealed and connected.",
      signOff: "Installation complete",
      image: "/approach/delivery.webp",
      width: 1100,
      height: 1100,
      alt: "A wrapped module on a truck under a clear sky",
    },
    {
      index: "08",
      title: "Completion and handover",
      summary: "Final finishes, inspections and certification, then the keys, manuals and warranties.",
      signOff: "Practical completion",
      image: "/projects/jurien-bay-dusk.webp",
      width: 1254,
      height: 1254,
      alt: "Modular townhouses lit at dusk",
    },
  ],
} as const;

// The programme line: shared stages, then the factory and site tracks side by side, then shared again.
export const approachProgramme = {
  confirm: true,
  shared: ["01", "02", "03"],
  factory: ["04", "05", "06"],
  site: ["Site establishment", "Footings and slab", "Services ready"],
  finish: ["07", "08"],
} as const;

export const engagementModels = {
  confirm: true,
  intro: "Come to us with a site, a design or a tender. We deliver nationally, with no minimum project size, and the route you choose sets who does what.",
  items: [
    {
      title: "Design and deliver",
      body: "We take your project from feasibility to handover as one team. We lead the design, manufacture, shipping and installation, and we appoint and manage the architect, engineer, building surveyor and builder. You give us the brief and budget and sign off each stage. This suits developers and organisations who want one point of contact.",
    },
    {
      title: "Early involvement",
      body: "We join your architect and consultants at feasibility, so the design suits manufacture before it is fixed. We advise on yield, cost and programme as the design develops. When the design is ready, we can supply the modules or deliver the whole project. This suits developers and government clients who already have a consultant team.",
    },
    {
      title: "Supply to your builder",
      body: "We work with your team to resolve the design for manufacture. We then build, inspect, ship and deliver the modules to your site. Your builder holds the building permit and looks after the site works, footings, services and connections. This suits builders and head contractors.",
    },
    {
      title: "Tender response",
      body: "Send us the tender documents and we will price the project for modular construction. We will show where changes to the design could save time or cost, and set out the programme. This suits projects that are already in procurement.",
    },
  ],
} as const;

// Who does what on a design-and-deliver project, stage by stage. Roles are jobs, not companies. Partner roles are
// appointed and managed by Cloud Modular, so wherever a partner leads, Cloud Modular shows as managing the task.
export const roles = [
  { id: "cloud", label: "Cloud Modular", partner: false },
  { id: "architect", label: "Architect", partner: true },
  { id: "engineer", label: "Engineer", partner: true },
  { id: "surveyor", label: "Building surveyor", partner: true },
  { id: "builder", label: "Builder", partner: true },
  { id: "client", label: "You", partner: false },
] as const;

export type RoleId = (typeof roles)[number]["id"];

export const responsibilities: {
  confirm: boolean;
  stages: { index: string; title: string; tasks: { task: string; lead: RoleId; with?: RoleId[] }[] }[];
} = {
  confirm: true,
  stages: [
    {
      index: "01",
      title: "Brief and feasibility",
      tasks: [
        { task: "Brief, budget and site information", lead: "client", with: ["cloud"] },
        { task: "Feasibility, yield and indicative cost", lead: "cloud", with: ["architect"] },
      ],
    },
    {
      index: "02",
      title: "Design for manufacture",
      tasks: [
        { task: "Architectural design", lead: "architect", with: ["cloud", "client"] },
        { task: "Module layout and manufacturing detail", lead: "cloud", with: ["architect"] },
        { task: "Structural engineering, including wind region", lead: "engineer", with: ["cloud"] },
      ],
    },
    {
      index: "03",
      title: "Approvals and documentation",
      tasks: [
        { task: "Site survey and soil report", lead: "engineer", with: ["client"] },
        { task: "Planning approval", lead: "architect", with: ["client"] },
        { task: "Design compliance certification", lead: "surveyor", with: ["engineer"] },
        { task: "Building permit", lead: "builder", with: ["surveyor"] },
        { task: "Shop drawings", lead: "cloud", with: ["engineer"] },
      ],
    },
    {
      index: "04",
      title: "Manufacture",
      tasks: [
        { task: "Module manufacture", lead: "cloud" },
        { task: "Site establishment, footings and services", lead: "builder", with: ["engineer"] },
      ],
    },
    {
      index: "05",
      title: "Inspection and sign-off",
      tasks: [{ task: "Factory quality inspections", lead: "cloud", with: ["engineer"] }],
    },
    {
      index: "06",
      title: "Shipping and clearance",
      tasks: [
        { task: "Shipping, customs and biosecurity", lead: "cloud" },
        { task: "Transport to site", lead: "cloud", with: ["builder"] },
      ],
    },
    {
      index: "07",
      title: "Delivery and installation",
      tasks: [
        { task: "Crane lifts and installation", lead: "cloud", with: ["builder"] },
        { task: "Service connections", lead: "builder" },
      ],
    },
    {
      index: "08",
      title: "Completion and handover",
      tasks: [
        { task: "Finishing works", lead: "builder", with: ["cloud"] },
        { task: "Final inspection and occupancy", lead: "surveyor", with: ["builder"] },
        { task: "Handover and warranties", lead: "cloud", with: ["builder", "client"] },
      ],
    },
  ],
};
