/**
 * The fact review (/review/): every customer-facing fact the team needs to confirm, grouped by section. Each item
 * points at the text on the site (`at`: a page and a phrase that appears on it), so the review page can show it in
 * place and highlight it. The review page shows them a website page at a time, bundled into cards (reviewPages, at the
 * end); feedback is stored in Cloudflare KV by functions/api/review.ts, keyed by card id.
 * When an item is settled and fixed on the site, delete it here. Started from Design-Docs/12 - Fact Review for Team.md.
 *
 * `says` and `question` take **bold** for emphasis.
 */

export type Priority = "high" | "med" | "low";

export interface ReviewTarget {
  path: string;
  /** A phrase exactly as it appears on the page, to scroll to and highlight. */
  find?: string;
}

export interface ReviewItem {
  id: string;
  priority: Priority;
  says: string;
  question: string;
  at: ReviewTarget[];
}

export interface ReviewSection {
  id: string;
  title: string;
  note?: string;
  items: ReviewItem[];
}

export const reviewUpdated = "7 November 2026";

export const pageNames: Record<string, string> = {
  "/": "Home",
  "/about/": "About",
  "/our-approach/": "Our approach",
  "/why-cloud-modular/": "Why Cloud Modular",
  "/quality/": "Manufacturing and quality",
  "/partner-with-us/": "Partner with us",
  "/contact/": "Contact",
  "/faq/": "FAQ",
  "/cloud-homes/": "Cloud Homes",
  "/cloud-homes/design/": "Design tool",
  "/cloud-homes/availability/": "Confirm availability",
  "/cloud-homes/how-it-works/": "How Cloud Homes work",
  "/our-work/seashells-jurien-bay/": "Seashells Jurien Bay",
  "/our-work/capel-village/": "Capel Village",
  "/our-work/25-on-rowland-and-forrest/": "25 On Rowland and Forrest",
  "/trade/quality/": "Cloud Trade quality and compliance",
  "/privacy-policy/": "Privacy Policy",
  "/terms/": "Terms of Use",
};

const CH = "/cloud-homes/";
const DESIGN = "/cloud-homes/design/";
const HOW = "/cloud-homes/how-it-works/";
const Q = "/quality/";
const APPROACH = "/our-approach/";
const SEASHELLS = "/our-work/seashells-jurien-bay/";
const CAPEL = "/our-work/capel-village/";
const ROWLAND = "/our-work/25-on-rowland-and-forrest/";
const TQ = "/trade/quality/";

export const reviewSections: ReviewSection[] = [
  {
    id: "pricing",
    title: "Cloud Homes pricing",
    note: `All three prices are **placeholders** taken from published Perth granny flat cost guides, and need replacing before launch.`,
    items: [
      { id: "P1", priority: "high", says: `**1 Bed from $150,000**`, question: `What is the real from price?`, at: [{ path: CH, find: "From $150,000" }, { path: DESIGN, find: "From $150,000" }] },
      { id: "P2", priority: "high", says: `**2 Bed from $190,000**`, question: `What is the real from price?`, at: [{ path: CH, find: "From $190,000" }, { path: DESIGN, find: "From $190,000" }] },
      { id: "P3", priority: "high", says: `**4 Bed from $350,000**`, question: `What is the real from price?`, at: [{ path: CH, find: "From $350,000" }, { path: DESIGN, find: "From $350,000" }] },
      { id: "P4", priority: "high", says: `Hero line: "One, two and four bedroom homes **from $150,000**, delivered across Australia"`, question: `Follows P1. Does "delivered across Australia" hold at that price, or is delivery extra? (See P6.)`, at: [{ path: CH, find: "One, two and four bedroom homes from" }] },
      { id: "P5", priority: "high", says: `"The from price is for the home with its **standard inclusions**."`, question: `What does the from price cover? Does it include GST? Design and approvals? Engineering? Footings? Crane? Installation and connection?`, at: [{ path: "/faq/", find: "The from price is for the home with its standard inclusions" }] },
      { id: "P6", priority: "high", says: `"**Delivery, site works and any extras** depend on your site and your choices, so your proposal sets out the full price."`, question: `Confirm that delivery is excluded from the from price. Can we give a typical range for delivery and site works so buyers aren't surprised?`, at: [{ path: CH, find: "Delivery, site works and any extras depend on your site" }, { path: "/faq/", find: "Delivery, site works and any extras depend on your site" }] },
      { id: "P7", priority: "med", says: `Extras are priced in the proposal with no listed price: stone benchtops, roller blinds, plantation shutters, ceiling fans, accessible bathroom fittings`, question: `Do we offer all five? Should any carry a listed price?`, at: [{ path: DESIGN, find: "Tell us what you would like, and we will price it" }, { path: CH, find: "Options and extras" }] },
      { id: "P8", priority: "med", says: `Solar panels and a home battery are shown as **options**, not inclusions`, question: `Confirm they are options. The 1 and 2 Bed drawings show solar, a battery and air conditioning as drawn.`, at: [{ path: CH, find: "Options and extras" }] },
      { id: "P9", priority: "med", says: `The design tool shows the same price whatever the buyer picks (no price for cladding, colours, solar, battery and so on)`, question: `Are all the choices really the same price? If solar, battery or timber-look cladding cost more, we should show it or say so.`, at: [{ path: DESIGN, find: "Price breakdown for your Cloud Home" }] },
      { id: "P10", priority: "med", says: `Disclaimer: "Homes, finishes, options and prices shown here are indicative and may change … Nothing on this page is an offer."`, question: `Is this wording acceptable, or does it need a legal review?`, at: [{ path: DESIGN, find: "Nothing on this page is an offer" }] },
      { id: "P11", priority: "low", says: `"Share your site address so we can … **refine the estimate** for your home."`, question: `Do we call it an estimate, a from price or a quote? Keep the language consistent.`, at: [{ path: "/cloud-homes/availability/", find: "refine the estimate for your home" }] },
    ],
  },
  {
    id: "product",
    title: "Cloud Homes product",
    note: `The sizes come from the Casuarina Crescent drawings. The design choices are a starting list and still need the team to confirm them.`,
    items: [
      { id: "H2", priority: "med", says: `1 Bed: 1 bedroom, 1 bathroom, **49.45 m²** inside plus a **6.52 m²** deck, single storey`, question: `Confirm.`, at: [{ path: DESIGN, find: "49.45 m² inside" }] },
      { id: "H3", priority: "med", says: `2 Bed: 2 bedrooms, 1 bathroom and a powder room, **64.07 m²** plus a **5.38 m²** deck, single storey`, question: `Confirm.`, at: [{ path: DESIGN, find: "64.07 m² inside" }] },
      { id: "H4", priority: "high", says: `4 Bed: 4 bedrooms, 2 bathrooms, two storeys, **117.49 m²** plus a **6.52 m²** deck`, question: `Confirm. The 4 Bed drawings (Casuarina, rev C17) still show the SIPs panel method on a Mod-Deck slab, not modules. Will a modular set follow?`, at: [{ path: DESIGN, find: "117.49 m² inside" }] },
      { id: "H5", priority: "high", says: `**Standard in every home:** double-glazed aluminium windows and doors, a steel louvred vergola over the deck, heat pump hot water, an EV charger point`, question: `Confirm all four. Is the EV item a charger or only a charger-ready point?`, at: [{ path: CH, find: "Electric vehicle charger point" }] },
      { id: "H6", priority: "high", says: `Air conditioning isn't mentioned anywhere for Cloud Homes`, question: `Is AC included, optional or not offered? Buyers will ask.`, at: [{ path: CH, find: "Heat pump hot water" }] },
      { id: "H7", priority: "med", says: `Cladding: **fibre cement panels** or **timber-look boards**. Fibre cement in 5 colours (Natural white, Warm grey, Stone, Graphite, Black).`, question: `Do we offer both claddings and these colours? Is the timber-look cladding the aluminium product used elsewhere?`, at: [{ path: DESIGN, find: "Smooth painted panels with fine vertical joints" }] },
      { id: "H8", priority: "med", says: `Roof: "**Klip-Lok** steel roofing … shown in **Colorbond** colours" (Shale Grey, Surfmist, Basalt, Woodland Grey, Monument)`, question: `Is the roof genuine Lysaght Klip-Lok in genuine Colorbond, or an equivalent made in China? If it's an equivalent, we shouldn't use the brand names.`, at: [{ path: DESIGN, find: "Klip-Lok steel roofing" }] },
      { id: "H9", priority: "low", says: `Frames and vergola in Black, Charcoal or White`, question: `Confirm.`, at: [{ path: DESIGN, find: "Window and door frames, the vergola and its posts" }] },
      { id: "H10", priority: "med", says: `Deck: Spotted gum, Weathered grey, Charcoal composite`, question: `Is the deck timber, composite, or both? Is spotted gum real timber?`, at: [{ path: DESIGN, find: "The deck under the vergola" }] },
      { id: "H11", priority: "med", says: `Floors: "**Rigid-core vinyl planks in an oak look**" in Light oak, Natural oak or Smoked oak. Changed from "oak" floors to match the plans.`, question: `The Casuarina drawings don't name a floor finish. The only plans that do (the Rowland proposal) specify **6 mm SPC rigid-core vinyl**, so the tool now says that. Confirm this is the Cloud Homes floor and that the three colours are available.`, at: [{ path: DESIGN, find: "Rigid-core vinyl planks in an oak look" }] },
      { id: "H12", priority: "med", says: `Kitchen: 4 cabinet and benchtop pairings, including "**oak** benchtops". Robes and vanity match the cabinets.`, question: `Confirm the range. Is the oak benchtop real timber or laminate?`, at: [{ path: DESIGN, find: "Cabinets and benchtops together" }] },
      { id: "H13", priority: "high", says: `Extra: "Stone benchtops, **polished engineered stone** with a thicker edge"`, question: `Engineered stone has been banned in Australia since 1 July 2024, and its import since 1 January 2025. What permitted material do we offer instead (natural stone, porcelain or a silica-free product)?`, at: [{ path: DESIGN, find: "Polished engineered stone with a thicker edge" }] },
      { id: "H14", priority: "med", says: `"A 1 or 2 Bed in the backyard gives parents, grown children or a carer a home of their own"`, question: `Do the 1 and 2 Bed fit the ancillary dwelling rules (in WA, the R-Codes cap ancillary dwellings at 70 m²)? Does the 2 Bed with its deck still qualify? Do the rules differ by state?`, at: [{ path: CH, find: "gives parents, grown children or a carer" }] },
      { id: "H15", priority: "med", says: `"A second home on your block can be **rented out**, where your council allows it"`, question: `Is this wording safe for every state we sell into?`, at: [{ path: CH, find: "can be rented out, where your council allows it" }] },
      { id: "H16", priority: "low", says: `"The 4 Bed is a two-storey family home for a new block, a knockdown or a regional site"`, question: `Confirm.`, at: [{ path: CH, find: "two-storey family home for a new block" }] },
      { id: "H17", priority: "high", says: `"We bring it to your site **ready to move in**." "Your home is **ready to live in**."`, question: `Is a Cloud Home turnkey? This sits awkwardly with site works and delivery being excluded from the price (P6).`, at: [{ path: CH, find: "ready to move in" }, { path: HOW, find: "your home is ready to live in" }] },
    ],
  },
  {
    id: "delivery",
    title: "Cloud Homes process, delivery and approvals",
    items: [
      { id: "D2", priority: "med", says: `Are Cloud Homes designed for **cyclone regions** C and D? The general site says we deliver in cyclone regions.`, question: `Can a buyer in Broome or Karratha order the standard home, or does it need upgrading at extra cost?`, at: [{ path: Q, find: "In cyclone regions C and D" }] },
      { id: "D3", priority: "med", says: `"Like any new home it needs a **building permit**, and some sites also need planning approval. **We provide the drawings and documents** your approvals need."`, question: `Confirm. Who pays the approval fees, and are they in the price?`, at: [{ path: "/faq/", find: "Like any new home it needs a building permit" }] },
      { id: "D4", priority: "high", says: `"The **registered builder** lodges the building permit." "The builder completes the finishing works."`, question: `Who is the registered builder on a Cloud Home: Cloud Modular, a partner builder, or the buyer's own? Who does the buyer sign the contract with? This affects home indemnity insurance and statutory warranties (see Q10).`, at: [{ path: HOW, find: "the registered builder lodges the building permit" }] },
      { id: "D5", priority: "high", says: `The four steps: design yours, then site review and proposal, then approvals and manufacture, then delivery and handover`, question: `Is this the real sales flow? Is there a **deposit**, and at what stage? When is the price fixed?`, at: [{ path: CH, find: "Your Cloud Home in four steps" }, { path: "/cloud-homes/availability/", find: "What happens next" }] },
      { id: "D6", priority: "med", says: `"Once you accept it, we get started."`, question: `What does acceptance involve: a contract, a deposit or a design fee?`, at: [{ path: HOW, find: "Once you accept it, we get started" }] },
      { id: "D7", priority: "med", says: `Shipping: "to the nearest suitable port and cleared through customs and biosecurity. It then travels by road to your site."`, question: `Confirm for single homes. Are they shipped one at a time or consolidated? That affects lead time.`, at: [{ path: HOW, find: "It then travels by road to your site" }] },
      { id: "D8", priority: "med", says: `"Your home arrives … and is **craned onto its footings**." "Including access for delivery and the crane."`, question: `Is every Cloud Home craned? What site access does a buyer need? Can we reach a typical suburban backyard behind a house?`, at: [{ path: HOW, find: "is craned onto its footings" }, { path: HOW, find: "including access for delivery and the crane" }] },
      { id: "D9", priority: "high", says: `No durations are given anywhere for Cloud Homes`, question: `Can we give a typical time from order to keys? Buyers will ask first.`, at: [{ path: HOW, find: "From your design to your keys" }] },
      { id: "D10", priority: "low", says: `Design enquiry thank-you: "We will check your site and come back to you to talk through your design."`, question: `Who responds, and how quickly?`, at: [{ path: "/cloud-homes/availability/" }] },
      { id: "X5", priority: "med", says: `"Ready to move in" against site works and delivery being excluded from the price`, question: `Settled by the answers to H17 and P6.`, at: [{ path: CH, find: "ready to move in" }] },
    ],
  },
  {
    id: "company",
    title: "Company and capability claims",
    items: [
      { id: "C1", priority: "med", says: `"Our production capability gives us access to **more than 450,000 square metres** of dedicated manufacturing facilities"`, question: `Confirm. This is from the 2026 Capability Statement.`, at: [{ path: Q, find: "more than 450,000 square metres" }] },
      { id: "C2", priority: "high", says: `"That capability has delivered projects from design to installation in **Shenzhen, Hong Kong, Melbourne, Saipan and Auckland**." Also the stat "**5** markets with delivered projects".`, question: `These are the manufacturer's projects, not Cloud Modular's. Are we happy with the wording, given that a customer may read them as our own track record? Can we back them up if asked?`, at: [{ path: Q, find: "Shenzhen, Hong Kong, Melbourne, Saipan and Auckland" }] },
      { id: "C3", priority: "low", says: `"Established procurement and production relationships help us control lead times, certification and quality"`, question: `Confirm.`, at: [{ path: Q, find: "Established procurement and production relationships" }] },
      { id: "C4", priority: "high", says: `"**2** Offices: Perth and Foshan". The Foshan address is listed as an office: 3F, 48L, No. 26 Lang Bao West Road, Foshan.`, question: `Is this Cloud Modular's own office or the factory's address? If it's the factory's, it may conflict with keeping the manufacturer confidential.`, at: [{ path: "/why-cloud-modular/", find: "Offices: Perth and Foshan" }, { path: "/contact/", find: "Lang Bao West Road" }] },
      { id: "C5", priority: "med", says: `"Perth-led modular construction." Based at **10 Davenport Street, Karrinyup WA 6018**.`, question: `Confirm the address and whether visitors can come to it.`, at: [{ path: "/contact/", find: "10 Davenport Street" }] },
      { id: "C6", priority: "low", says: `Hours: **Monday to Friday, 9am to 5pm AWST**`, question: `Confirm.`, at: [{ path: "/contact/", find: "9am - 5pm AWST" }] },
      { id: "C7", priority: "med", says: `All enquiries go to **nigel@cloudmodular.com.au**, shown on the site and the default for the forms`, question: `Do we want a shared address (hello@ or enquiries@) instead of a personal one?`, at: [{ path: "/contact/", find: "nigel@cloudmodular.com.au" }] },
      { id: "C8", priority: "low", says: `LinkedIn: linkedin.com/company/cloudmodular`, question: `Confirm it's ours and active.`, at: [{ path: "/contact/", find: "Cloud Modular on LinkedIn" }] },
      { id: "C9", priority: "med", says: `"We deliver nationally, with **no minimum project size**."`, question: `Confirm there's no minimum project size.`, at: [{ path: "/partner-with-us/", find: "with no minimum project size" }] },
      { id: "C10", priority: "med", says: `"**6** sectors we design and build for": commercial, multi-residential, healthcare and aged care, education and community, infrastructure, hotels and accommodation`, question: `Our projects are residential, over-55s and mixed use. Are we comfortable claiming the other sectors? "Built to **Australian healthcare standards**" and infrastructure "transit facilities" are the riskiest.`, at: [{ path: "/why-cloud-modular/", find: "Sectors we design and build for" }, { path: "/", find: "One system, many sectors" }] },
      { id: "C11", priority: "high", says: `"**One accountable team** across Perth and Foshan." "One team **carries the risk**." "Cloud Modular is your **one point of contact**."`, question: `These are contractual claims. Do our contracts actually put the delivery risk on Cloud Modular?`, at: [{ path: APPROACH, find: "One accountable team across Perth and Foshan" }, { path: APPROACH, find: "one team carries the risk" }] },
    ],
  },
  {
    id: "process",
    title: "Process and who does what",
    note: `The process copy was written as a **first draft shaped by industry practice**, not from a confirmed process. The whole Our approach page needs a team pass.`,
    items: [
      { id: "A1", priority: "med", says: `Eight stages: brief and feasibility, design for manufacture, approvals, manufacture in Foshan, inspection and sign-off, shipping and clearance, delivery and installation, completion and handover`, question: `Do these match how we actually run projects?`, at: [{ path: APPROACH, find: "Factory and site, at the same time" }] },
      { id: "A2", priority: "med", says: `"**Production starts once the approvals are in place.**"`, question: `Is that always true, or do we start on long-lead items earlier?`, at: [{ path: HOW, find: "Production starts once the approvals are in place" }] },
      { id: "A3", priority: "med", says: `"The building surveyor **reviews the design before production starts**."`, question: `Confirm.`, at: [{ path: Q, find: "reviews the design before production starts" }] },
      { id: "A5", priority: "low", says: `"We report progress to you throughout."`, question: `How do we report: photos, reports, a portal?`, at: [{ path: APPROACH, find: "Manufacture in Foshan" }] },
      { id: "A6", priority: "high", says: `Design and deliver: "we **appoint and manage** the architect, engineer, building surveyor and builder"`, question: `Confirm the contract model. In WA, the party contracting to deliver building work generally has to be a registered building contractor. Who is the head contractor?`, at: [{ path: APPROACH, find: "we appoint and manage the architect, engineer, building surveyor and builder" }] },
      { id: "A7", priority: "med", says: `Early involvement, Supply to your builder and Tender response are offered as routes`, question: `Do we offer all four routes today?`, at: [{ path: APPROACH, find: "Start where it suits you" }] },
      { id: "A8", priority: "high", says: `"Who holds the building permit? The registered builder."`, question: `Same question as D4 and A6.`, at: [{ path: "/faq/", find: "Who holds the building permit?" }] },
      { id: "A9", priority: "med", says: `Who-does-what matrix (about 20 tasks): for example the **engineer** leads the "site survey and soil report", the **architect** leads planning approval, the **building surveyor** leads design compliance and "final inspection and occupancy", Cloud Modular leads crane lifts and installation, and the builder leads service connections`, question: `Go through it line by line. Some assignments are guesses (a land surveyor and a geotechnical engineer normally do the survey and soil report).`, at: [{ path: APPROACH, find: "Every role, stage by stage" }] },
      { id: "A10", priority: "med", says: `Steps after an enquiry: we get back to you, then a first conversation, then a site and brief review, then a **proposal with an indicative cost** and programme`, question: `Confirm. Is there a fee for feasibility or the proposal?`, at: [{ path: "/partner-with-us/", find: "From first call to proposal" }] },
      { id: "A11", priority: "low", says: `"We read every enquiry and come back to you."`, question: `Do we commit to a response time?`, at: [{ path: "/partner-with-us/", find: "We read every enquiry" }] },
    ],
  },
  {
    id: "quality",
    title: "Quality, certification, warranties and insurance",
    note: `This section was written as a **best-practice draft for review**. It's the part a careful buyer or their lawyer is most likely to hold us to.`,
    items: [
      { id: "Q1", priority: "med", says: `"Every module passes a series of inspections … each check is **recorded with photographs against the module's number**. The **full record is handed over** with the building."`, question: `Do we actually do this and hand it over?`, at: [{ path: Q, find: "recorded with photographs against the module" }] },
      { id: "Q2", priority: "low", says: `Materials are checked on arrival. Products needing Australian certification are checked. "Each batch is **held until its paperwork is complete**."`, question: `Confirm.`, at: [{ path: Q, find: "Each batch is held until its paperwork is complete" }] },
      { id: "Q3", priority: "high", says: `Asbestos: suppliers declare their materials asbestos free, and "samples are **tested by an accredited laboratory before shipping**". "The test certificates travel with the modules."`, question: `Australian Border Force takes this seriously. Confirm the testing regime and who does it.`, at: [{ path: Q, find: "tested by an accredited laboratory before shipping" }] },
      { id: "Q4", priority: "low", says: `Every frame is measured for size, level and square, the **welds are inspected** and the corrosion protection is checked`, question: `Confirm.`, at: [{ path: Q, find: "The welds are inspected" }] },
      { id: "Q5", priority: "med", says: `Pipework is **pressure tested** and the wiring is tested for continuity and insulation before the linings close`, question: `Confirm, including who does it. Is it an Australian-licensed person?`, at: [{ path: Q, find: "Pipework is pressure tested" }] },
      { id: "Q6", priority: "low", says: `Windows, roofs and wet areas are **water tested**`, question: `Confirm.`, at: [{ path: Q, find: "water tested to confirm they are sealed" }] },
      { id: "Q7", priority: "med", says: `"An **independent inspector** checks each finished module" and "the Engineer signs off the structure before the module is packed"`, question: `Who is the independent inspector? Is the sign-off on every module?`, at: [{ path: Q, find: "An independent inspector checks each finished module" }] },
      { id: "Q9", priority: "med", says: `Imported products: glazing to the Australian standards, electrical products with the **RCM** mark, plumbing products **WaterMark** certified`, question: `Confirm for every product, including what goes into Cloud Homes.`, at: [{ path: Q, find: "electrical products carry the RCM mark" }] },
      { id: "Q10", priority: "high", says: `Warranties: "the warranties required in WA, including the builder's statutory obligations and **home indemnity insurance** for residential work. **We add a warranty on the structure and workmanship** of the modules, and we pass on each product's manufacturer warranty."`, question: `What is our own warranty: its length, its scope, and who stands behind it? Who takes out the home indemnity insurance (see D4)?`, at: [{ path: Q, find: "We add a warranty on the structure and workmanship" }] },
      { id: "Q11", priority: "med", says: `Fire safety: **non-combustible rock wool** and fire-rated plasterboard, "tested systems"`, question: `Confirm. Do we hold fire test reports for the wall and floor systems?`, at: [{ path: Q, find: "non-combustible rock wool insulation" }] },
      { id: "Q12", priority: "med", says: `Energy: "each design is assessed … designed to meet the required rating"`, question: `Confirm. Is it 7-star NatHERS as standard? (Capel's spec tiers say 7 and 8 star.)`, at: [{ path: Q, find: "Each design is assessed for energy efficiency" }] },
      { id: "Q13", priority: "med", says: `Build-ups (floor, walls, ceiling) with exact layer thicknesses: 6 mm vinyl, 10 mm screed, 24 mm fibre cement, 100 mm rock wool, 13 mm fire-rated plasterboard, 150 mm studs, 125 mm rock wool, 9 mm fibre cement, 1.6 mm corrugated steel roof deck, 0.8 mm galvanised underside`, question: `These come from the Rowland proposal, and the layer order still needs checking against the drawings. Are they **typical for all our modules**, Cloud Homes included, or Rowland only?`, at: [{ path: Q, find: "The models show each build-up" }] },
      { id: "Q14", priority: "med", says: `"Every module is made up of **eight systems**", including an integral bathroom pod, a ducted fan coil above the bathroom with a roof condenser, and a smart system (control panel, sensors, door lock)`, question: `These describe a Rowland apartment module. Are they typical? Does a Cloud Home have a smart system and a bathroom pod?`, at: [{ path: Q, find: "Every module is made up of eight systems" }] },
      { id: "Q15", priority: "low", says: `Steel frame sizes in the 3D module panel: RHS 150 × 150 × 6 columns, RHS 250 × 100 × 5 floor beams and so on`, question: `These are Rowland-specific. Fine to show?`, at: [{ path: Q, find: "Every module is made up of eight systems" }] },
      { id: "Q16", priority: "low", says: `"Where modules meet, their **roofs are welded together** and sealed." Aluminium cladding, membrane and battens are "**fixed on site**".`, question: `Confirm the site process.`, at: [{ path: Q, find: "their roofs are welded together and sealed" }] },
    ],
  },
  {
    id: "logistics",
    title: "Logistics, factory to site",
    items: [
      { id: "L1", priority: "low", says: `Each module is sealed in **heat-shrink film** with taped seams, a **desiccant and a humidity indicator card**, and braced for the voyage`, question: `Confirm.`, at: [{ path: Q, find: "Each module is sealed in heat-shrink film" }] },
      { id: "L2", priority: "med", says: `Shipped "from a port near Foshan **to Fremantle**, or to the regional port closest to the site"`, question: `Confirm. Which ports have we actually used or priced?`, at: [{ path: Q, find: "Modules are shipped from a port near Foshan" }] },
      { id: "L3", priority: "med", says: `A **licensed customs broker** lodges the declarations. Modules are cleaned and inspected to be free of soil and pests, and timber packing is treated to the international standard.`, question: `Confirm, and name the broker or logistics partner if useful. (Capel lists Prime Global Logistics.)`, at: [{ path: Q, find: "A licensed customs broker lodges" }] },
      { id: "L4", priority: "high", says: `"The modules are **insured from the moment they leave the facility until they are installed**. The contract sets out when the risk passes to you, which is **usually on installation**."`, question: `Confirm the insurance cover and when risk transfers.`, at: [{ path: Q, find: "insured from the moment they leave the facility" }] },
      { id: "L5", priority: "med", says: `"We arrange the **oversize permits, escorts and route checks**"`, question: `Confirm it's us, not the builder or the transport company.`, at: [{ path: Q, find: "We arrange the oversize permits" }] },
      { id: "L6", priority: "med", says: `Damage in transit is "repaired on site by **our installation team**, using **spare materials shipped with the modules**"`, question: `Do we have our own installation team? Do we ship spares?`, at: [{ path: Q, find: "repaired on site by our installation team" }] },
      { id: "L7", priority: "low", says: `"A **licensed electrician** tests the connections before the building is powered."`, question: `Confirm.`, at: [{ path: Q, find: "A licensed electrician tests the connections" }] },
      { id: "L8", priority: "med", says: `"We manage the modules from the factory floor to the crane on site, including in **cyclone regions** and on **regional and remote** sites."`, question: `Confirm our experience in cyclone regions.`, at: [{ path: Q, find: "We manage the modules from the factory floor to the crane" }] },
    ],
  },
  {
    id: "trade-quality",
    title: "Cloud Trade quality and compliance",
    note: `The certification, inspection and warranty copy is a **draft from what the site already says**, with the usual Australian requirements for each category. Correct anything that isn't how we work.`,
    items: [
      { id: "TQ1", priority: "high", says: `Tapware and toilets are **WaterMark certified** and carry **WELS** ratings, "with 5-star ratings across the range"`, question: `Confirm both, and that every tapware and sanitary product we supply is 5-star rated.`, at: [{ path: TQ, find: "WaterMark certified" }] },
      { id: "TQ2", priority: "high", says: `Windows and doors are made to **AS 2047**, with glazing to **AS 1288**, and come with their **energy performance ratings**`, question: `Confirm the standards and that the ratings (WERS or similar) come with each product.`, at: [{ path: TQ, find: "made to AS 2047" }] },
      { id: "TQ3", priority: "med", says: `Flooring "is supplied with its specification and **test reports** for each product"`, question: `Which test reports do we provide (slip resistance, for example)?`, at: [{ path: TQ, find: "test reports for each product" }] },
      { id: "TQ4", priority: "med", says: `Benchtops are made "in a stone and finish you approve from samples"; cabinetry and furniture are made to your specification`, question: `Confirm. When are furniture samples available (you mentioned after the first order)?`, at: [{ path: TQ, find: "approve from samples" }] },
      { id: "TQ5", priority: "high", says: `Every order is inspected before it leaves the factory for **dimensions, finish, function, markings and certification, and packing**, and "the inspection report, **with photographs**, comes to you"`, question: `Is this what is checked? Who inspects: our Foshan team or a third-party inspector? Is the report with photos sent for every order?`, at: [{ path: TQ, find: "The inspection report, with photographs" }] },
      { id: "TQ6", priority: "med", says: `"We clear your order through customs, so you have **nothing to arrange at the port**"`, question: `Confirm we handle customs clearance and delivery from the port for every order.`, at: [{ path: TQ, find: "nothing to arrange at the port" }] },
      { id: "TQ7", priority: "high", says: `"Every order comes with **warranty and after-sales support** from our team and our after-sales partners"`, question: `What are the warranty terms (length and scope, by category), and who are the after-sales partners?`, at: [{ path: TQ, find: "warranty and after-sales support" }] },
      { id: "TQ8", priority: "low", says: `"We work with **established manufacturers who make to Australian Standards**, and our office in Foshan follows every order through production"`, question: `Confirm the wording.`, at: [{ path: TQ, find: "established manufacturers" }] },
    ],
  },
  {
    id: "seashells",
    title: "Projects: Seashells Jurien Bay",
    note: `Every project is shown as **In progress** and its images are artist's impressions. The team, and possibly each client, should sign off each project page.`,
    items: [
      { id: "S1", priority: "high", says: `"**108** modular residences", "developed by **MVP Group** and **manufactured by Cloud Modular**". "Every residence is built as modules in our manufacturing facility in Foshan."`, question: `The building permit sets still show the earlier SIPs panel method, with modular shop drawings to follow. Is it confirmed and contracted as modular? Is MVP happy to be named?`, at: [{ path: SEASHELLS, find: "every residence is built as modules" }] },
      { id: "S2", priority: "low", says: `**40,000 m²** beachfront site with direct ocean frontage, "about two hours north of Perth" and "about 200 kilometres north"`, question: `Confirm. Jurien Bay is about 220 km by road.`, at: [{ path: SEASHELLS, find: "about two hours north of Perth" }] },
      { id: "S3", priority: "med", says: `"**8-star** energy rating for every residence", double glazing, solar, battery, EV charging, embedded energy network`, question: `Confirm.`, at: [{ path: SEASHELLS, find: "designed for an 8-star energy rating" }] },
      { id: "S4", priority: "low", says: `"The estate has **four residence types**, from two-bedroom detached villas to four-bedroom villas." Further down, the page also mentions "**four one-bedroom apartments**".`, question: `The four types shown add up to 104 homes (27 four-bed + 77 tourism villas), and the 4 apartments make up the 108. Do we add the apartments as a fifth type, or say "four villa types, plus four apartments"?`, at: [{ path: SEASHELLS, find: "The estate has four residence types" }, { path: SEASHELLS, find: "four one-bedroom apartments" }] },
      { id: "S5", priority: "med", says: `**27** four-bedroom homes and **77** tourism villas. Villas are "sold fully furnished and let through the resort's on-site management".`, question: `Confirm the numbers and the sales model.`, at: [{ path: SEASHELLS, find: "Four residence types" }] },
      { id: "S6", priority: "low", says: `Unit sizes: Bay View **252 m²**, Hasting Street **223 m²**, 3-bed **93.5 m²**, 2-bed **65 m²**, plus room sizes, garage sizes and roof pitches in the 3D panels`, question: `Taken from the drawings. Confirm they're current.`, at: [{ path: SEASHELLS, find: "Four residence types" }] },
      { id: "S7", priority: "low", says: `Resort facilities: café, reception, adult and children's pools, spa, sauna, playground, sports court, barbecues, herb garden`, question: `Confirm.`, at: [{ path: SEASHELLS, find: "Residents and guests share a beachfront café" }] },
      { id: "S8", priority: "med", says: `Resort operator: **Accommodation West**. Architect: **Kellett Design Group**.`, question: `Do we have permission to name both?`, at: [{ path: SEASHELLS, find: "Accommodation West" }] },
    ],
  },
  {
    id: "capel",
    title: "Projects: Capel Village",
    items: [
      { id: "V1", priority: "high", says: `An over-55s village of **52** single-storey residences at **96 Capel Drive**, "manufactured by Cloud Modular", developed by MVP Group`, question: `Confirm, and confirm MVP is happy with it being public.`, at: [{ path: CAPEL, find: "96 Capel Drive" }] },
      { id: "V2", priority: "low", says: `"Received **regional development assessment panel approval on 5 March 2026**"`, question: `Confirm the date.`, at: [{ path: CAPEL, find: "approval on 5 March 2026" }] },
      { id: "V3", priority: "low", says: `5 configurations: 8 × 29.3 m², 21 × 76.8 m², 18 × 92.4 m², 4 × 104.0 m², 1 × 112.0 m². **4,038 m²** GFA. Clubhouse of about **300 m²**.`, question: `The numbers add up. Confirm they're current.`, at: [{ path: CAPEL, find: "Five configurations, one standard" }] },
      { id: "V4", priority: "low", says: `"25 minutes from Bunbury and ten from the coast", backs onto the Capel River reserve`, question: `Confirm.`, at: [{ path: CAPEL, find: "25 minutes from Bunbury" }] },
      { id: "V5", priority: "med", says: `**Cloud by MVP** spec tiers. **Silver** (NCC 7-star): single-glazed windows, soft-close joinery, stone benchtops, ceramic induction cooktop, painted fibre cement. **Gold** (NCC 8-star): double glazing, two-pac joinery, **40 mm silica-free stone** benchtops, a **Bosch** induction cooktop, timber-look cladding.`, question: `Confirm. Make sure Silver's stone benchtops are not engineered stone (see H13). Can we name Bosch?`, at: [{ path: CAPEL, find: "Cloud Silver, NCC 7-star" }] },
      { id: "V6", priority: "med", says: `Each module is **14.0 × 3.9 m and 3.6 m high**, with insulated steel stud walls, a **Colorbond** roof, **2,700 mm** ceilings, **ducted reverse-cycle AC** and **electric storage hot water**`, question: `Confirm. (Cloud Homes say heat pump hot water. That's fine if the products really differ.)`, at: [{ path: CAPEL, find: "Each module is 14.0 by 3.9 metres" }] },
      { id: "V7", priority: "low", says: `Secure gated entry with an intercom to every home, buggy paths, bollard lighting`, question: `Confirm.`, at: [{ path: CAPEL, find: "secure gated entry" }] },
      { id: "V8", priority: "low", says: `Solar, battery and an embedded microgrid "available across the village, delivered with **Geniux**"`, question: `Confirm.`, at: [{ path: CAPEL, find: "delivered with Geniux" }] },
      { id: "V9", priority: "med", says: `"Every module passes a **hold-point inspection** before it leaves the factory, and manufacture carries on through a wet South West winter"`, question: `Confirm.`, at: [{ path: CAPEL, find: "hold-point inspection" }] },
      { id: "V10", priority: "high", says: `Delivery stats: **12 weeks** of factory manufacture, **28 to 34 weeks** from order to handover, **6 to 8 months faster** than a traditional build`, question: `Confirm. These are the only programme figures on the site, so customers will treat them as typical.`, at: [{ path: CAPEL, find: "28–34 weeks" }] },
      { id: "V11", priority: "med", says: `The project team names **13 companies**: MVP Group, Kellett, Planning Horizons, KDLA, Decobu, Geniux, Porter Consulting Engineers, Acoustic Engineering Solutions, Resolve Group, Vision Surveys Consulting, Blue Rock Projects, Prime Global Logistics`, question: `Do we have permission to name them all?`, at: [{ path: CAPEL, find: "Planning Horizons" }] },
    ],
  },
  {
    id: "rowland",
    title: "Projects: 25 On Rowland and Forrest",
    items: [
      { id: "R1", priority: "high", says: `"A mixed-use building of **18 modular apartments** … designed by **Doepel Marsh Architects** and **manufactured by Cloud Modular**"`, question: `The source is a DA set and a modular proposal. Are we engaged on this project, or is it a proposal? Is the DA approved? Is Doepel Marsh happy to be named?`, at: [{ path: ROWLAND, find: "designed by Doepel Marsh Architects" }] },
      { id: "R2", priority: "low", says: `**6** levels of apartments, **5** types (A 53 m², B 47 m² accessible, C 47 m², D 51 to 53 m², E 86 m² two-level loft)`, question: `Confirm.`, at: [{ path: ROWLAND, find: "Levels of apartments" }] },
      { id: "R3", priority: "low", says: `88 m² of ground-floor commercial, a basement, a stretcher lift, 19 condensers and three 400 L hot water units on a services deck`, question: `Confirm.`, at: [{ path: ROWLAND, find: "Air-conditioning condensers and hot water units" }] },
      { id: "R4", priority: "low", says: `The basement, ground floor and first-floor slab are built on site, and the modules are craned above them`, question: `Confirm.`, at: [{ path: ROWLAND, find: "The basement, ground floor and first-floor slab are built on site" }] },
    ],
  },
  {
    id: "team",
    title: "Team and partners",
    items: [
      { id: "T1", priority: "med", says: `**Thomas Tierney**, Co-Founder and Director: "delivered many successful residential and commercial projects in Ireland, the UK and Australia"`, question: `Thomas to approve.`, at: [{ path: "/about/", find: "delivered many successful residential" }] },
      { id: "T2", priority: "med", says: `**Nigel David**, Co-Founder and Director: "**over thirty years** of procurement experience …"`, question: `Nigel to approve.`, at: [{ path: "/about/", find: "over thirty years of procurement" }] },
      { id: "T3", priority: "med", says: `**Andy David**, Co-Founder: technology, AI, consulting, capital raising`, question: `Andy to approve.`, at: [{ path: "/about/", find: "Andy has extensive experience" }] },
      { id: "T4", priority: "med", says: `**Mike Liang**, China Lead: "an engineer with a strong technical background across architectural design, smart building systems, and environmental protection equipment"`, question: `Mike to approve.`, at: [{ path: "/about/", find: "Leading the company" }] },
      { id: "T5", priority: "low", says: `Team intro: "**Designers, engineers, product specialists and project leads**"`, question: `Four people are shown. Does this overstate the team?`, at: [{ path: "/about/", find: "Designers, engineers, product specialists and project leads" }] },
      { id: "T6", priority: "high", says: `15 partner logos under "Who we partner with": Kellett, MVP Group, MVP Consultants, CDI Group, Buildsource, Decobu, Hart & Co., Perth Building and Maintenance, Steadfast Roofing, Geniux, Peerless Finance, Seashells, Jurien Bay Resort, Artificial Intelligence Group, Other Stuff`, question: `Is each one a real delivery partner, and have they agreed to their logo being shown? "Artificial Intelligence Group" and "Other Stuff" look out of place among delivery partners.`, at: [{ path: "/about/", find: "Who we partner with" }, { path: "/partner-with-us/", find: "Who we deliver with" }] },
    ],
  },
  {
    id: "legal",
    title: "Privacy Policy and Terms of Use",
    note: `Both pages are new. The privacy policy follows the structure of Modscape's and describes only what our site really does. The forms are emailed through Resend, the site runs on Cloudflare, fonts load from Google, and there are no analytics or advertising cookies. Modscape publishes no terms, so ours are a standard Australian website terms of use, built around the Cloud Homes design tool.`,
    items: [
      { id: "LG1", priority: "high", says: `**Review the Privacy Policy**`, question: `Read it in full, ideally with a lawyer. Is it right that we share project information with our team in Foshan, with partners and with US-based email and hosting providers? Do we want marketing use (with opt-out) in there? Is "reply within 30 days" to complaints a commitment we can keep?`, at: [{ path: "/privacy-policy/", find: "This policy explains how we collect" }] },
      { id: "LG2", priority: "high", says: `**Review the Terms of Use**`, question: `Read them in full, ideally with a lawyer, especially prices and proposals, liability and governing law (WA). They need to line up with the wording of our proposals and contracts.`, at: [{ path: "/terms/", find: "This website is run by Cloud Modular" }] },
      { id: "LG3", priority: "med", says: `Privacy requests go to nigel@cloudmodular.com.au`, question: `Do we want a named Privacy Officer or a shared address? (See C7.)`, at: [{ path: "/privacy-policy/", find: "For any privacy question" }] },
      { id: "LG4", priority: "med", says: `Neither page gives an ABN or a registered company name`, question: `Should we add them, here and in the footer?`, at: [{ path: "/privacy-policy/", find: "Cloud Modular respects your privacy" }] },
      { id: "LG5", priority: "low", says: `The policy says we use **no analytics or advertising cookies**`, question: `If we add Google Analytics, a pixel or similar later, the policy must be updated first. Noted for the record.`, at: [{ path: "/privacy-policy/", find: "does not use analytics or advertising cookies" }] },
    ],
  },
];

// ---------------------------------------------------------------------------------------------------
// How the review is presented: one page of the website at a time, its facts bundled into cards that are answered as
// a whole. Every item above belongs to exactly one card (checked below), and answers are stored by card id.

export interface ReviewCard {
  id: string;
  title: string;
  note?: string;
  items: string[];
}

export interface ReviewPage {
  id: string;
  path: string;
  title: string;
  cards: ReviewCard[];
}

export const reviewPages: ReviewPage[] = [
  {
    id: "cloud-homes",
    path: CH,
    title: "Cloud Homes",
    cards: [
      { id: "ch-prices", title: "Prices", note: `All three prices are **placeholders** taken from published Perth granny flat cost guides, and need replacing before launch.`, items: ["P1", "P2", "P3", "P4", "P5", "P6"] },
      { id: "ch-inclusions", title: "What's included", items: ["H5", "H6", "P7", "P8"] },
      { id: "ch-uses", title: "Who the homes are for", items: ["H14", "H15", "H16"] },
      { id: "ch-ready", title: "Ready to move in", items: ["H17", "X5"] },
    ],
  },
  {
    id: "design",
    path: DESIGN,
    title: "Design tool",
    cards: [
      { id: "design-sizes", title: "Home sizes", note: `The sizes come from the Casuarina Crescent drawings.`, items: ["H2", "H3", "H4"] },
      { id: "design-outside", title: "Outside finishes", note: `The design choices are a starting list and still need the team to confirm them.`, items: ["H7", "H8", "H9", "H10"] },
      { id: "design-inside", title: "Inside finishes", items: ["H11", "H12", "H13"] },
      { id: "design-price", title: "Prices in the tool", items: ["P9", "P10"] },
    ],
  },
  {
    id: "how-it-works",
    path: HOW,
    title: "How Cloud Homes work",
    cards: [
      { id: "how-steps", title: "The steps to a Cloud Home", items: ["D5", "D6", "A2"] },
      { id: "how-builder", title: "Approvals and the builder", items: ["D3", "D4", "A8"] },
      { id: "how-delivery", title: "Getting the home to site", items: ["D7", "D8", "D2"] },
      { id: "how-time", title: "How long it takes", items: ["D9"] },
    ],
  },
  {
    id: "availability",
    path: "/cloud-homes/availability/",
    title: "Confirm availability",
    cards: [{ id: "availability-next", title: "After someone sends their design", items: ["P11", "D10"] }],
  },
  {
    id: "approach",
    path: APPROACH,
    title: "Our approach",
    cards: [
      { id: "approach-stages", title: "The stages of a project", note: `The process copy was written as a **first draft shaped by industry practice**, not from a confirmed process. The whole page needs a team pass.`, items: ["A1", "A5"] },
      { id: "approach-model", title: "How we contract and carry the risk", items: ["A6", "A7", "C11"] },
      { id: "approach-matrix", title: "Who does what", items: ["A9"] },
    ],
  },
  {
    id: "quality",
    path: Q,
    title: "Manufacturing and quality",
    cards: [
      { id: "quality-capability", title: "Our manufacturing capability", items: ["C1", "C2", "C3"] },
      { id: "quality-checks", title: "Checks in the factory", items: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
      { id: "quality-certification", title: "Certification and warranties", items: ["A3", "Q9", "Q10"] },
      { id: "quality-build", title: "How the modules are built", items: ["Q11", "Q12", "Q13", "Q14", "Q15", "Q16"] },
      { id: "quality-shipping", title: "Packing, shipping and customs", items: ["L1", "L2", "L3", "L4"] },
      { id: "quality-site", title: "On the road and on site", items: ["L5", "L6", "L7", "L8"] },
    ],
  },
  {
    id: "why",
    path: "/why-cloud-modular/",
    title: "Why Cloud Modular",
    cards: [{ id: "why-claims", title: "Offices and sectors", items: ["C4", "C10"] }],
  },
  {
    id: "partner",
    path: "/partner-with-us/",
    title: "Partner with us",
    cards: [{ id: "partner-enquiries", title: "Working with us", items: ["C9", "A10", "A11"] }],
  },
  {
    id: "about",
    path: "/about/",
    title: "About",
    cards: [
      { id: "about-team", title: "The team", items: ["T1", "T2", "T3", "T4", "T5"] },
      { id: "about-partners", title: "Partner logos", items: ["T6"] },
    ],
  },
  {
    id: "contact",
    path: "/contact/",
    title: "Contact",
    cards: [{ id: "contact-details", title: "Contact details", items: ["C5", "C6", "C7", "C8"] }],
  },
  {
    id: "seashells",
    path: SEASHELLS,
    title: "Seashells Jurien Bay",
    cards: [
      { id: "seashells-project", title: "The project", items: ["S1", "S2", "S5", "S8"] },
      { id: "seashells-homes", title: "Homes and features", items: ["S3", "S4", "S6", "S7"] },
    ],
  },
  {
    id: "capel",
    path: CAPEL,
    title: "Capel Village",
    cards: [
      { id: "capel-project", title: "The project", items: ["V1", "V2", "V4", "V11"] },
      { id: "capel-homes", title: "Homes and specification", items: ["V3", "V5", "V6", "V7", "V8"] },
      { id: "capel-delivery", title: "Manufacture and delivery", items: ["V9", "V10"] },
    ],
  },
  {
    id: "rowland",
    path: ROWLAND,
    title: "25 On Rowland and Forrest",
    cards: [{ id: "rowland-project", title: "The project", items: ["R1", "R2", "R3", "R4"] }],
  },
  {
    id: "trade-quality",
    path: TQ,
    title: "Cloud Trade quality and compliance",
    cards: [
      { id: "trade-quality-standards", title: "Standards and samples", items: ["TQ1", "TQ2", "TQ3", "TQ4", "TQ8"] },
      { id: "trade-quality-inspection", title: "Inspection, delivery and warranty", items: ["TQ5", "TQ6", "TQ7"] },
    ],
  },
  {
    id: "legal",
    path: "/privacy-policy/",
    title: "Privacy Policy and Terms",
    cards: [
      { id: "legal-privacy", title: "Privacy Policy", items: ["LG1", "LG3", "LG5"] },
      { id: "legal-terms", title: "Terms of Use", items: ["LG2", "LG4"] },
    ],
  },
];

export const reviewItems = new Map(reviewSections.flatMap((section) => section.items).map((item) => [item.id, item]));

{
  const used = reviewPages.flatMap((page) => page.cards.flatMap((card) => card.items));
  const missing = [...reviewItems.keys()].filter((id) => !used.includes(id));
  const unknown = used.filter((id) => !reviewItems.has(id));
  const twice = used.filter((id, index) => used.indexOf(id) !== index);
  if (missing.length || unknown.length || twice.length) throw new Error(`Review cards: missing ${missing}, unknown ${unknown}, twice ${twice}`);
}
