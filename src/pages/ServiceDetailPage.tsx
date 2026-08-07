import { CtaBand } from "../components/CtaBand";
import { services } from "../data";
import { navigate } from "../navigation";

const details: Record<string, {
  lead: string;
  overview: string;
  outcomes: string[];
  steps: { title: string; copy: string }[];
  gallery: string[];
  video?: string;
}> = {
  procurement: {
    lead: "Source with confidence, control costs and keep every purchase moving from supplier to destination.",
    overview: "Midas acts as an extension of your procurement team. We identify dependable suppliers, compare commercial terms, coordinate documentation and bring purchasing and logistics into one accountable workflow. Whether the requirement is routine stock or specialist plant and machinery, our team protects quality, timing and value at every stage.",
    outcomes: ["Verified suppliers and clearer commercial terms", "Reduced procurement and compliance risk", "Coordinated purchasing, shipping and delivery", "Better visibility across every purchase order"],
    steps: [{ title: "Define", copy: "We confirm specifications, quantities, budget, delivery dates and regulatory requirements." }, { title: "Source", copy: "We identify and vet suppliers, evaluate quotations and agree the right commercial terms." }, { title: "Deliver", copy: "We manage purchase orders, documentation, freight and final delivery through one team." }],
    gallery: ["/our-work/project-10.webp", "/our-work/project-16.webp"],
  },
  "air-freight": {
    lead: "When time matters, our air freight solutions move critical cargo quickly, securely and visibly.",
    overview: "From urgent documents and commercial samples to high-value equipment and consolidated cargo, Midas coordinates the complete air-freight journey. We select practical routes, prepare documentation, manage customs requirements and keep you informed from collection through final delivery.",
    outcomes: ["Fast routing for urgent and time-sensitive cargo", "End-to-end tracking and shipment updates", "Customs documentation and clearance support", "Secure handling for valuable or delicate goods"],
    steps: [{ title: "Assess", copy: "We review cargo dimensions, urgency, origin, destination and handling requirements." }, { title: "Route", copy: "We select the best available service and coordinate collection, uplift and documentation." }, { title: "Clear & deliver", copy: "We manage arrival formalities and arrange secure delivery to the final destination." }],
    gallery: ["/our-work/project-11.webp", "/our-work/project-14.webp"],
  },
  "sea-freight": {
    lead: "Flexible ocean freight for containers, consolidated cargo, machinery and complex international shipments.",
    overview: "Midas manages sea freight from booking and export preparation through port handling, customs clearance and inland delivery. Our FCL, LCL and project-cargo solutions balance cost, transit time and cargo protection, giving importers and exporters one reliable point of coordination.",
    outcomes: ["FCL and LCL options matched to your shipment", "Port, terminal and documentation coordination", "Support for oversized and project cargo", "Door-to-door visibility from origin to destination"],
    steps: [{ title: "Plan", copy: "We select the right equipment, sailing and routing for the cargo and timeline." }, { title: "Prepare & load", copy: "We coordinate export documentation, packaging, consolidation and container loading." }, { title: "Clear & deliver", copy: "We manage destination formalities, port release and onward transportation." }],
    gallery: ["/our-work/project-03.webp", "/our-work/project-12.webp"],
    video: "/hero-shipping.mp4",
  },
  "inland-logistics": {
    lead: "Dependable road transport and distribution that keeps cargo moving across Nigeria and beyond.",
    overview: "Our inland logistics service connects ports, airports, warehouses, project sites and final customers. We combine suitable vehicles, route planning, cargo protection and proactive coordination to support nationwide deliveries, last-mile operations and heavy-equipment movements.",
    outcomes: ["Vehicles matched to cargo type and delivery conditions", "Planned routes and coordinated delivery windows", "Careful handling from collection to handover", "Nationwide and cross-border transport support"],
    steps: [{ title: "Map", copy: "We assess the cargo, route, access conditions, timing and vehicle requirements." }, { title: "Move", copy: "Our team coordinates dispatch, tracking, documentation and delivery communication." }, { title: "Confirm", copy: "We complete secure handover and provide delivery confirmation for your records." }],
    gallery: ["/our-work/project-06.webp", "/our-work/project-08.webp"],
  },
  warehousing: {
    lead: "Secure, organised storage with inventory control and distribution built around your operation.",
    overview: "Midas provides flexible warehousing for short- and long-term requirements, project cargo and distribution programmes. Goods are received, checked, organised and prepared for onward movement with clear inventory visibility and handling procedures designed around the cargo.",
    outcomes: ["Secure storage and controlled cargo handling", "Accurate receiving and inventory visibility", "Cross-docking, picking and dispatch support", "Flexible distribution to multiple destinations"],
    steps: [{ title: "Receive", copy: "Cargo is checked, documented and assigned to the appropriate storage location." }, { title: "Control", copy: "We maintain organised inventory and coordinate any handling or preparation required." }, { title: "Dispatch", copy: "Orders are picked, prepared and released for distribution against agreed instructions." }],
    gallery: ["/our-work/project-02.webp", "/our-work/project-05.webp"],
    video: "/our-work/project-video-01.mp4",
  },
  "shipment-packaging": {
    lead: "Purpose-built protection for fragile, high-value and industrial cargo in local and international transit.",
    overview: "Good packaging is the first line of defence against impact, moisture, vibration and handling risk. Midas designs and delivers export-grade crating, palletisation and protective packaging suited to the cargo, mode of transport and destination requirements.",
    outcomes: ["Packaging designed around cargo dimensions and risk", "Custom crating for machinery and delicate equipment", "Improved protection during handling and transit", "Export-ready preparation and clear identification"],
    steps: [{ title: "Inspect", copy: "We assess dimensions, weight, fragility, handling points and transport conditions." }, { title: "Design & protect", copy: "We select suitable materials and build the crate, pallet or protective system." }, { title: "Secure", copy: "Cargo is packed, labelled and prepared for safe loading and onward movement." }],
    gallery: ["/our-work/project-18.webp", "/our-work/project-17.webp"],
    video: "/our-work/project-video-02.mp4",
  },
  "supply-chain-consultancy": {
    lead: "Practical supply-chain strategy that reduces friction, improves control and supports sustainable growth.",
    overview: "Our consultancy work turns operational challenges into clear, implementable improvements. We examine sourcing, inventory, logistics networks, supplier performance and compliance, then design a roadmap that fits your organisation, priorities and resources.",
    outcomes: ["Clear view of cost, risk and process bottlenecks", "Stronger supplier and inventory performance", "Better-aligned logistics networks and workflows", "Practical recommendations your team can implement"],
    steps: [{ title: "Diagnose", copy: "We map the current operation, data, stakeholders, risks and performance gaps." }, { title: "Design", copy: "We develop a prioritised solution covering processes, controls and network decisions." }, { title: "Improve", copy: "We support implementation, training and measurement so improvements become sustainable." }],
    gallery: ["/our-work/project-01.webp", "/our-work/project-13.webp"],
  },
};

const go = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
  event.preventDefault();
  navigate(path);
};

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = services.find((item) => item.slug === slug);
  const detail = details[slug];

  if (!service || !detail) return <section className="service-not-found"><div className="container"><div className="eyebrow">Service not found</div><h1>Let’s get you back on course.</h1><a className="button" href="/services" onClick={(event) => go(event, "/services")}>View all services</a></div></section>;

  const related = services.filter((item) => item.slug !== slug).slice(0, 3);
  return <>
    <section className="service-page-hero" style={{ "--service-hero": `url('${service.image}')` } as React.CSSProperties}>
      <div className="container service-page-hero-inner"><a href="/services" onClick={(event) => go(event, "/services")}>← All services</a><div className="eyebrow">{service.tagline}</div><h1>{service.title}</h1><p>{detail.lead}</p><a className="button" href="/contact" onClick={(event) => go(event, "/contact")}>Discuss your shipment</a></div>
    </section>
    <section className="service-overview"><div className="container service-overview-grid"><div><div className="eyebrow">What we deliver</div><h2>Built around your cargo.<br/>Managed around your goals.</h2></div><div><p className="service-lead">{detail.overview}</p><div className="service-outcomes">{detail.outcomes.map((outcome) => <div key={outcome}><span>✓</span>{outcome}</div>)}</div></div></div></section>
    <section className="service-capabilities"><div className="container"><div className="service-section-heading"><div><div className="eyebrow">Core capabilities</div><h2>Everything this service covers.</h2></div><span>{String(service.items.length).padStart(2, "0")} capabilities</span></div><div className="service-capability-grid">{service.items.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></article>)}</div></div></section>
    <section className="service-media"><div className="container"><div className={`service-media-grid ${detail.video ? "has-video" : ""}`}><figure><img loading="lazy" src={detail.gallery[0]} alt={`${service.title} operation`} /></figure>{detail.video ? <figure className="service-media-video"><video controls muted playsInline preload="metadata" poster={detail.gallery[1]}><source src={detail.video} type="video/mp4" /></video><figcaption>{service.title} in motion</figcaption></figure> : <figure><img loading="lazy" src={detail.gallery[1]} alt={`${service.title} cargo handling`} /></figure>}</div></div></section>
    <section className="service-process"><div className="container"><div className="section-heading"><div><div className="eyebrow">How we work</div><h2>A clear path from brief to delivery.</h2></div><p>One accountable team coordinates the detail, communicates progress and keeps your priorities in view.</p></div><div className="service-process-grid">{detail.steps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></div></section>
    <section className="related-services"><div className="container"><div className="service-section-heading"><div><div className="eyebrow">Connected solutions</div><h2>Explore related services.</h2></div><a href="/services" onClick={(event) => go(event, "/services")}>View all services →</a></div><div className="related-service-grid">{related.map((item) => <a key={item.slug} href={`/services/${item.slug}`} onClick={(event) => go(event, `/services/${item.slug}`)} style={{ "--related-image": `url('${item.image}')` } as React.CSSProperties}><span>{item.tagline}</span><h3>{item.title}</h3><b>Discover more →</b></a>)}</div></div></section>
    <CtaBand />
  </>;
}
