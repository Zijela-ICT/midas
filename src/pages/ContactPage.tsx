import { PageHero } from "../components/PageHero";
export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Midas"
        title="Let’s move forward."
        copy="Tell us where your business needs to go. Our team will design the right logistics solution to get it there."
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=88"
      />
      <section className="section paper">
        <div className="container contact-grid">
          <div className="contact-card">
            <h3>Talk to our team</h3>
            <div className="contact-item">
              <small>Nigeria office</small>
              <p>
                24 Adegbola Street, Opposite Railway Line, Ikeja, Lagos State.
              </p>
              <a href="tel:+2348182072342">+234 818 207 2342</a><br/>
              <a href="tel:+2348161640774">+234 816 164 0774</a><br/>
              <a href="mailto:info@shipwithmidas.com">info@shipwithmidas.com</a><br/>
              <a href="mailto:tayo@shipwithmidas.com">tayo@shipwithmidas.com</a>
            </div>
            <div className="contact-item">
              <small>United Kingdom office</small>
              <p>
                98 Hope Street, Leigh WN7 1NP, Greater Manchester, United
                Kingdom.
              </p>
              <a href="tel:+447858022086">+44 7858 022086</a>
              <br/><a href="mailto:info@shipwithmidas.com">info@shipwithmidas.com</a>
              <br/><a href="mailto:tayo@shipwithmidas.com">tayo@shipwithmidas.com</a>
            </div>
          </div>
          <div className="intro-copy">
            <div className="eyebrow">Request a quote</div>
            <h2>What can we move for you?</h2>
            <p>
              Share a few details and a member of our team will be in touch.
            </p>
            <form
              className="form"
              action="mailto:info@shipwithmidas.com"
              method="post"
              encType="text/plain"
            >
              <div className="form-row">
                <input
                  required
                  name="name"
                  placeholder="Your name"
                  aria-label="Your name"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email address"
                  aria-label="Email address"
                />
              </div>
              <div className="form-row">
                <input
                  name="company"
                  placeholder="Company"
                  aria-label="Company"
                />
                <input
                  name="phone"
                  placeholder="Phone number"
                  aria-label="Phone number"
                />
              </div>
              <input
                name="service"
                placeholder="Service required"
                aria-label="Service required"
              />
              <textarea
                required
                name="message"
                placeholder="Tell us about your shipment or project"
                aria-label="Project details"
              />
              <button className="button" type="submit">
                Send enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="office-maps">
        <div className="container">
          <div className="office-maps-heading">
            <div>
              <div className="eyebrow">Find us</div>
              <h2>Our offices.<br/>Your global connection.</h2>
            </div>
            <p>Visit our teams in Lagos or Greater Manchester. Use the interactive maps below to explore each location and plan your route.</p>
          </div>
          <div className="office-map-grid">
            <article className="office-map-card">
              <div className="office-map-frame">
                <iframe
                  title="MIDAS Nigeria office on Google Maps"
                  src="https://www.google.com/maps?q=24+Adegbola+Street,+Ikeja,+Lagos,+Nigeria&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="office-map-details">
                <span>01 · Nigeria</span>
                <h3>Lagos office</h3>
                <p>24 Adegbola Street, Opposite Railway Line, Ikeja, Lagos State.</p>
                <a href="https://www.google.com/maps/search/?api=1&query=24+Adegbola+Street,+Ikeja,+Lagos,+Nigeria" target="_blank" rel="noreferrer">Open in Google Maps <b>↗</b></a>
              </div>
            </article>
            <article className="office-map-card">
              <div className="office-map-frame">
                <iframe
                  title="MIDAS United Kingdom office on Google Maps"
                  src="https://www.google.com/maps?q=98+Hope+Street,+Leigh+WN7+1NP,+United+Kingdom&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="office-map-details">
                <span>02 · United Kingdom</span>
                <h3>Greater Manchester office</h3>
                <p>98 Hope Street, Leigh WN7 1NP, Greater Manchester, United Kingdom.</p>
                <a href="https://www.google.com/maps/search/?api=1&query=98+Hope+Street,+Leigh+WN7+1NP,+United+Kingdom" target="_blank" rel="noreferrer">Open in Google Maps <b>↗</b></a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
