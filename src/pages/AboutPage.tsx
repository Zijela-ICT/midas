import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The Midas standard"
        title="Global reach. Personal care."
        copy="We simplify complexity, protect every shipment and create supply chains businesses can rely on."
        image="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=2000&q=88"
      />
      <section className="section paper">
        <div className="container about-grid">
          <div className="intro-copy">
            <div className="eyebrow">Who we are</div>
            <h2>Your trusted logistics and supply chain partner.</h2>
            <p>
              Midas Global Solutions Limited brings freight, procurement,
              warehousing, distribution and consultancy together under one
              accountable team. We coordinate every detail with transparency and
              professional care—so our clients can grow confidently.
            </p>
          </div>
          <div className="principles">
            <article className="principle">
              <h3>Reliable</h3>
              <p>
                Promises kept, timelines respected and cargo handled with
                uncompromising care.
              </p>
            </article>
            <article className="principle">
              <h3>Efficient</h3>
              <p>
                Smarter planning, stronger networks and less friction at every
                handoff.
              </p>
            </article>
            <article className="principle">
              <h3>Transparent</h3>
              <p>
                Clear communication and complete visibility from origin to
                destination.
              </p>
            </article>
            <article className="principle">
              <h3>Solutions-led</h3>
              <p>
                Every engagement shaped around the practical needs of your
                business.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section dark">
        <div className="container section-heading">
          <div>
            <div className="eyebrow">Our promise</div>
            <h2>We don’t just move cargo. We move businesses forward.</h2>
          </div>
          <p>
            Our role is to make complex operations feel simple—solving problems
            early, protecting value in transit and building lasting partnerships
            along the way.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
