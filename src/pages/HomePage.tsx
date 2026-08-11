import { useEffect, useRef } from "react";
import { services } from "../data";
import { navigate } from "../navigation";
import { CtaBand } from "../components/CtaBand";

const trustedPartners = [
  { name: "Lagos State Government", logo: "/partners/lagos-state.jpg" },
  { name: "Honeywell Flour Mills", logo: "/partners/honeywell-flour-mills.png" },
  { name: "Stanbic IBTC Bank", logo: "/partners/stanbic-ibtc.png" },
  { name: "Mövenpick", logo: "/partners/movenpick.png" },
  { name: "Gold Star Line", logo: "/partners/gold-star-line.webp" },
  { name: "Zijela ICT Ltd", logo: "/partners/zijela.jpg" },
  { name: "The Eagles Support Ltd", logo: "/partners/the-eagles-support.jpeg" },
];

export function HomePage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playHero = () => {
      if (!document.hidden) void heroVideoRef.current?.play().catch(() => undefined);
    };
    playHero();
    document.addEventListener("visibilitychange", playHero);
    return () => document.removeEventListener("visibilitychange", playHero);
  }, []);

  return (
    <>
      <section className="hero-home">
        <video
          ref={heroVideoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-shipping-poster.webp"
          aria-hidden="true"
        >
          <source src="/hero-shipping.mp4" type="video/mp4" />
        </video>
        <div className="container hero-copy">
          <div className="eyebrow">Global logistics • Local expertise</div>
          <h1>
            Move smarter.
            <br />
            Deliver <em>faster.</em>
          </h1>
          <p>
            Reliable air and sea freight, procurement, warehousing, inland
            transportation and supply chain solutions—tailored to keep your
            business moving.
          </p>
          <div className="hero-actions">
            <a
              className="button"
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contact");
              }}
            >
              Request a quote
            </a>
            <a
              className="button ghost"
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                navigate("/services");
              }}
            >
              Explore solutions
            </a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <strong>End-to-end</strong>
            <span>Logistics management</span>
          </div>
          <div className="hero-stat">
            <strong>Global</strong>
            <span>Freight network</span>
          </div>
          <div className="hero-stat">
            <strong>24/7</strong>
            <span>Cargo security</span>
          </div>
        </div>
      </section>
      <section className="section dark">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">What we do</div>
              <h2>Every link in your supply chain, strengthened.</h2>
            </div>
            <p>
              From sourcing products to delivering them safely to their final
              destination, we manage every step with speed, transparency and
              professionalism.
            </p>
          </div>
          <div className="services-grid services-grid-images">
            {services.map((s, i) => (
              <article className="service-card service-image-card" key={s.title} style={{ "--service-image": `url('${s.image}')` } as React.CSSProperties}>
                <div className="service-icon">0{i + 1}</div>
                <div className="service-card-content"><h3>{s.title}</h3>
                <p>{s.description}</p>
                <a
                  href={`/services/${s.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/services/${s.slug}`);
                  }}
                >
                  Discover more →
                </a></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section paper">
        <div className="container value-grid">
          <div className="value-visual">
            <div className="value-badge">
              From origin to destination, in trusted hands.
            </div>
          </div>
          <div className="intro-copy">
            <div className="eyebrow">Why Midas</div>
            <h2>Confidence at every mile.</h2>
            <p>
              Whether you’re shipping urgent cargo, importing machinery,
              managing inventory or expanding into new markets, our experienced
              team delivers solutions that keep your business moving.
            </p>
            <ul className="check-list">
              <li>End-to-end solutions</li>
              <li>Fast global shipping</li>
              <li>Smart procurement</li>
              <li>Secure warehousing</li>
              <li>Nationwide distribution</li>
              <li>Real-time tracking</li>
              <li>Customs expertise</li>
              <li>Compliance support</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="home-work"><div className="container"><div className="home-work-heading"><div><div className="eyebrow">Our work in motion</div><h2>Handled with care.<br/>Delivered with confidence.</h2></div><div><p>Real cargo. Real operations. A closer look at the crating, warehousing and container-loading work behind every successful delivery.</p><a href="/our-work" onClick={(e)=>{e.preventDefault();navigate('/our-work')}}>Explore our project gallery →</a></div></div><div className="home-work-grid"><img loading="lazy" src="/our-work/project-02.webp" alt="Organised warehouse inventory managed by MIDAS"/><img loading="lazy" src="/our-work/project-12.webp" alt="Export container fully loaded with protected cargo"/><img loading="lazy" src="/our-work/project-18.webp" alt="Technology equipment secured in protective packaging"/></div></div></section>
      <section className="trusted">
        <div className="container trusted-row">
          <span className="trusted-label">Trusted by</span>
          <div className="client-marquee">
            <div className="client-list">
              <div className="client-group">
                {trustedPartners.map((partner) => <span className="trusted-partner" key={partner.name}><img src={partner.logo} alt={`${partner.name} logo`}/><b>{partner.name}</b></span>)}
              </div>
              <div className="client-group" aria-hidden="true">
                {trustedPartners.map((partner) => <span className="trusted-partner" key={partner.name}><img src={partner.logo} alt=""/><b>{partner.name}</b></span>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
