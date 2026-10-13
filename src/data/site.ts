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

// /quality/ (Manufacturing and quality). The checks, certification and logistics copy is a best-practice draft
// for the user to review. The manufacturer is never named or described; it is "our manufacturing facility in Foshan".
export const moduleSystems = {
  body: "Every module is made up of eight systems, which are the steel structure, floor, walls, ceiling, electrical, heating and cooling, water supply and drainage, and smart systems. They are built and fitted out in our manufacturing facility in Foshan, so each module arrives with its services and interiors in place. This typical module from our Rowland Street project in Subiaco is shown separated into its systems. Turn it to see each side, or open the 3D view to take it apart and put it back together.",
} as const;

export const qualityChecks = {
  intro: "Every module passes a series of inspections before it moves to the next stage of production. Each check is recorded with photographs against the module's number, and the full record is handed over with the building.",
  items: [
    {
      title: "Materials on arrival",
      body: "Materials are checked against the approved specification when they arrive at the facility. Products that need Australian certification, such as glazing, electrical fittings and plumbing products, are checked for it before they are used. Each batch is held until its paperwork is complete.",
    },
    {
      title: "Asbestos-free materials",
      body: "We source materials from suppliers who declare them asbestos free, and samples are tested by an accredited laboratory before shipping. The test certificates travel with the modules for the customs authorities.",
    },
    {
      title: "Frame and welding",
      body: "Each steel frame is measured against the shop drawings for size, level and square before anything is fixed to it. The welds are inspected and the corrosion protection is checked before the frame is closed in.",
    },
    {
      title: "Services before the linings close",
      body: "Electrical and plumbing work is inspected while the walls and ceilings are still open. Pipework is pressure tested and the wiring is tested for continuity and insulation. Nothing is lined until these checks are signed off and photographed.",
    },
    {
      title: "Envelope and waterproofing",
      body: "Insulation, membranes and fire-rated linings are checked against the specified build-up for each wall, floor and ceiling. Windows, roofs and wet areas are water tested to confirm they are sealed.",
    },
    {
      title: "Final inspection before shipping",
      body: "An independent inspector checks each finished module against the drawings and the specification. Any defects are fixed and checked again, and the Engineer signs off the structure before the module is packed for shipping.",
    },
  ],
} as const;

// The three build-ups from the Rowland Street, Subiaco proposal, each to become its own 3D render. The floor and
// ceiling layer order is read from the doc's callouts and should be checked against the drawings.
export const buildUps = {
  body: "Each module's floor, walls and ceiling are built up in layers in our manufacturing facility, for strength, fire safety, insulation and weather protection. The models show each build-up from our Rowland Street project, with the thickness of every layer.",
  items: [
    {
      title: "Floor",
      body: "The floor is finished in 6\u00a0mm rigid-core vinyl on a 10\u00a0mm self-levelling screed and 24\u00a0mm fibre cement board. Below it, cold-formed steel joists hold 100\u00a0mm of rock wool, sealed with a waterproof breathable membrane and closed with galvanised steel sheet.",
    },
    {
      title: "Walls",
      body: "Inside, the walls are finished in a 4\u00a0mm decorative board over 13\u00a0mm fire-rated plasterboard and a vapour barrier. Light-gauge steel studs hold 125\u00a0mm of rock wool under 9\u00a0mm fibre cement board and a breathable membrane. The aluminium cladding is fixed on site.",
    },
    {
      title: "Ceiling",
      body: "The ceiling is lined with 13\u00a0mm fire-rated plasterboard below a 50\u00a0mm cavity for services. Above it, cold-formed steel joists hold 100\u00a0mm of rock wool under a 1.6\u00a0mm corrugated steel roof deck. Where modules meet, their roofs are welded together and sealed.",
    },
  ],
} as const;

export const certification = {
  intro: "Modules are designed and documented to the National Construction Code, and each building is certified in Western Australia in the same way as any other. The building surveyor reviews the design before production starts, and the builder holds the building permit.",
  items: [
    {
      title: "Structural design",
      body: "The Engineer designs the structure for the building class, the loads and the wind region of the site. This covers the module frames, the connections between modules and the hold-down to the footings. The Engineer then certifies the structure as built.",
    },
    {
      title: "Cyclone wind regions",
      body: "In cyclone regions C and D, the structure, cladding, windows and connections are designed for the higher wind loads set by the Australian wind loading standard, AS/NZS 1170.2. The modules are tied down to footings designed for the same loads.",
    },
    {
      title: "Imported products",
      body: "Products that need Australian certification are specified to it from the start. Glazing meets the Australian glass and window standards, electrical products carry the RCM mark and plumbing products are WaterMark certified.",
    },
    {
      title: "Fire safety",
      body: "Walls and ceilings use non-combustible rock wool insulation and fire-rated plasterboard. Where the National Construction Code sets a fire-resistance level, the building surveyor checks that the tested systems used meet it.",
    },
    {
      title: "Energy efficiency",
      body: "Each design is assessed for energy efficiency under the National Construction Code. The insulated walls, floors and roofs and the sealed joints between modules are designed to meet the required rating.",
    },
    {
      title: "Warranties",
      body: "Every project carries the warranties required in Western Australia, including the builder's statutory obligations and home indemnity insurance for residential work. We add a warranty on the structure and workmanship of the modules, and we pass on each product's manufacturer warranty.",
    },
  ],
} as const;

export const factoryToSite = {
  intro: "We manage the modules from the factory floor to the crane on site, including in cyclone regions and on regional and remote sites.",
  items: [
    {
      title: "Packing and protection",
      body: "Each module is sealed in heat-shrink film with taped seams, with a desiccant and a humidity indicator card inside. Doors and windows carry protective film, and the module is braced for the voyage.",
    },
    {
      title: "Sea freight",
      body: "Modules are shipped from a port near Foshan to Fremantle, or to the regional port closest to the site. They travel on vessels suited to their size, and the shipping time is built into the programme.",
    },
    {
      title: "Customs and biosecurity",
      body: "A licensed customs broker lodges the import declarations and the asbestos test certificates. Modules are cleaned and inspected before they leave so they are free of soil and pests, and any timber packing is treated to the international standard. Biosecurity officers can then inspect them at the port.",
    },
    {
      title: "Insurance in transit",
      body: "The modules are insured from the moment they leave the facility until they are installed. The contract sets out when the risk passes to you, which is usually on installation.",
    },
    {
      title: "Road transport",
      body: "Module sizes are set during design to suit the route to site. We arrange the oversize permits, escorts and route checks, including for long journeys to regional and remote sites.",
    },
    {
      title: "Arrival and repairs",
      body: "Each module is checked on arrival against its record from the final inspection. Any damage in transit is recorded and repaired on site by our installation team, using spare materials shipped with the modules. A licensed electrician tests the connections before the building is powered.",
    },
  ],
} as const;

export const advantages = [
  {
    title: "Certified to Australian standards",
    points: [
      "Every module is designed to the National Construction Code and inspected before it leaves our manufacturing facility in Foshan.",
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
  { id: "quality", label: "Manufacturing and quality", href: "/quality/" },
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
      "Modules are built in our manufacturing facility in Foshan, China. Every module is inspected at each stage of production and signed off before it is packed and shipped to site.",
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
// Other parties are named by role, never by company.
export const approachStages = {
  items: [
    {
      index: "01",
      title: "Brief and feasibility",
      body: "We start with your site, your brief and your budget. We test the yield and the programme, and confirm whether modular is the right fit. You then decide whether to go ahead to design.",
    },
    {
      index: "02",
      title: "Design for manufacture",
      body: "The design is resolved around module sizes, transport limits and crane lifts. Our engineers design the structure for the site's wind region, including cyclone regions. You sign off the design and an updated budget.",
    },
    {
      index: "03",
      title: "Approvals and documentation",
      body: "We prepare the documents for planning and building approval, and the registered builder lodges the building permit. At the same time we produce the shop drawings the factory builds from. Production starts once the approvals are in place.",
    },
    {
      index: "04",
      title: "Manufacture in Foshan",
      body: "The modules are built in the factory in Foshan, with the structure, services and fit-out built in. While they are made, your site is prepared in Australia. We report progress to you throughout.",
    },
    {
      index: "05",
      title: "Inspection and sign-off",
      body: "Independent inspections at key stages check accuracy, workmanship and compliance. Engineering sign-off and the import documents are completed before anything leaves the factory.",
    },
    {
      index: "06",
      title: "Shipping and clearance",
      body: "The modules are shipped to the nearest suitable port and cleared through customs and biosecurity. We then plan road transport to site, including to regional and remote locations.",
    },
    {
      index: "07",
      title: "Delivery and installation",
      body: "The modules arrive in an agreed sequence and are craned onto the prepared footings. They are then joined, sealed and connected to services.",
    },
    {
      index: "08",
      title: "Completion and handover",
      body: "The builder completes the finishing works and the building surveyor carries out the final inspection. We then hand over the keys, manuals and warranties.",
    },
  ],
} as const;

// The programme line: shared stages, then the factory and site tracks side by side, then shared again.
export const approachProgramme = {
  shared: ["01", "02", "03"],
  factory: ["04", "05", "06"],
  site: ["Site establishment", "Footings and slab", "Services ready"],
  finish: ["07", "08"],
} as const;

export const engagementModels = {
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
  stages: { index: string; title: string; tasks: { task: string; lead: RoleId; with?: RoleId[] }[] }[];
} = {
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
