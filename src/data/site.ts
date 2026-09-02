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
      lines: [
        "3F, 48L, No.26 Lang Bao West Road",
        "Foshan City, Guangdong Province",
        "China",
      ],
    },
  ],
} as const;

export const navigation = [
  { label: "About Us", href: "/about/" },
  { label: "What We Do", href: "/#quality-compliance-assurance" },
] as const;

export const footerNavigation = [
  { label: "Home", href: "/" },
  ...navigation,
] as const;

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
    title: "Commercial Modular Buildings",
    description:
      "Office buildings, retail spaces, and mixed-use commercial developments delivered with modular precision.",
  },
  {
    image: "/Resi.webp",
    title: "Multi-Residential Modular Construction",
    description:
      "Apartments, townhouses, and residential developments delivered faster with factory-built modular construction.",
  },
  {
    image: "/aged-care.webp",
    title: "Healthcare & Aged Care Modular Facilities",
    description:
      "Medical facilities and aged care residences built to Australian healthcare standards with modular construction methods.",
  },
  {
    image: "/school.webp",
    title: "Education & Community Modular Buildings",
    description:
      "Schools, libraries, and community centres delivered with precision-engineered modular construction.",
  },
  {
    image: "/Infra.webp",
    title: "Infrastructure Modular Construction",
    description:
      "Transit facilities and public infrastructure projects built with offsite modular construction methods.",
  },
  {
    image: "/hotel.webp",
    title: "Hotels & Accommodation Modular Buildings",
    description:
      "Hotels, resorts, and short-term accommodation built faster with factory-controlled modular construction.",
  },
] as const;

export const faqItems = [
  {
    question: "How do your modules comply with Australian standards?",
    answer:
      "All modules are engineered to Australian standards and certified before leaving the factory. We provide full documentation and drawings for building surveyors and local authorities.",
  },
  {
    question: "Where are the modules built?",
    answer:
      "Modules are manufactured in controlled factory environments offshore, where the process is stable, repeatable and closely audited for accuracy and consistency.",
  },
  {
    question: "How do you ensure quality when manufacturing offshore?",
    answer:
      "We use controlled factory settings, third-party inspections and engineering sign-off at key points in the process. Nothing ships until it meets structural, architectural and compliance requirements.",
  },
  {
    question: "What's the advantage of modular over traditional construction?",
    answer:
      "Most of the build happens offsite, which shortens timelines, reduces site disruption and improves cost certainty.",
  },
  {
    question: "Can modular buildings be customised to my project?",
    answer:
      "Yes. Modules are designed to suit site constraints, planning requirements and spatial needs. We adapt layouts and configurations based on project intent.",
  },
  {
    question: "What types of buildings do you deliver?",
    answer:
      "We work across commercial, multi-residential, health and aged care, education, community, infrastructure and accommodation projects.",
  },
  {
    question: "What's the typical project timeline?",
    answer:
      "Timelines vary by scale and complexity, but offsite manufacturing means construction and site works can run concurrently, significantly reducing the overall program.",
  },
  {
    question: "How are modules transported and installed?",
    answer:
      "Modules are shipped, unloaded and craned into position using established lifting and transport methods. We coordinate with local contractors for foundations, services and final works.",
  },
  {
    question: "Do modular buildings have the same lifespan as traditional buildings?",
    answer:
      "Yes. Modules are engineered as permanent structures and use materials and systems comparable to traditional builds.",
  },
  {
    question: "What are the cost benefits?",
    answer:
      "Factory production reduces waste, labour time and rework, providing more cost certainty and a more predictable project budget.",
  },
  {
    question: "Can modular buildings meet sustainability targets?",
    answer:
      "Yes. Controlled production reduces waste, and the precision of the process supports higher-performing building envelopes and reduced embodied carbon depending on specification.",
  },
] as const;

export const team = [
  {
    image: "/Thomas_Tierney.webp",
    name: "Thomas Tierney",
    role: "Director",
    bio: "Thomas brings a rare combination of commercial, construction, and international development experience. With over ten years as a property developer/QS in Ireland and London, Thomas has delivered many successful residential and commercial projects, and has a strong foundation in every phase of the development lifecycle.",
    position: "center",
  },
  {
    image: "/Nigel_David_Alt.webp",
    name: "Nigel David",
    role: "Co-Founder / Director",
    bio: "Nigel has over thirty years of procurement experience in the building and construction industry specialising in export market development, international procurement management, compliance and logistics, and trade development.",
    position: "center",
  },
  {
    image: "/Andy_David_Alt.webp",
    name: "Andy David",
    role: "Co-Founder",
    bio: "Andy has extensive experience in technology, particularly artificial intelligence, and across management consulting and capital raising projects, digital transformation, growth, and business performance improvement.",
    position: "center 18%",
  },
  {
    image: "/Mike_Liang_Alt.webp",
    name: "Mike Liang",
    role: "China Lead",
    bio: "Leading the company's China operations, Mike is an engineer with a strong technical background across architectural design, smart building systems, and environmental protection equipment, delivering practical and sustainable construction solutions.",
    position: "center 24%",
  },
] as const;
