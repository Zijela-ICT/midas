import { navigate } from '../navigation'

const go = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
  event.preventDefault()
  navigate(path)
}

export function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-grid">
      <div><img className="footer-logo" src="/midas-nobg.png" alt="Midas Global Solutions Limited"/><p>Moving businesses forward through dependable logistics, intelligent supply chains and exceptional service.</p></div>
      <div><h4>Explore</h4><div className="footer-links"><a href="/" onClick={event => go(event, '/')}>Home</a><a href="/about" onClick={event => go(event, '/about')}>About us</a><a href="/industries" onClick={event => go(event, '/industries')}>Industries</a><a href="/calculator" onClick={event => go(event, '/calculator')}>Shipping calculator</a><a href="/posts" onClick={event => go(event, '/posts')}>Blog</a></div></div>
      <div><h4>Solutions</h4><div className="footer-links"><a href="/services" onClick={event => go(event, '/services')}>Air & sea freight</a><a href="/services" onClick={event => go(event, '/services')}>Procurement</a><a href="/services" onClick={event => go(event, '/services')}>Warehousing</a><a href="/services" onClick={event => go(event, '/services')}>Consultancy</a></div></div>
      <div className="footer-contact"><h4>Offices & contact</h4><div className="footer-office"><b>Nigeria office</b><p>24 Adegbola Street, Opposite Railway Line, Ikeja, Lagos State.</p></div><div className="footer-office"><b>United Kingdom office</b><p>98 Hope Street, Leigh WN7 1NP, Greater Manchester, United Kingdom.</p></div><div className="footer-links footer-contact-links"><a href="tel:+2348182072342">+234 818 207 2342</a><a href="tel:+2348161640774">+234 816 164 0774</a><a href="tel:+447858022086">+44 7858 022086</a><a href="mailto:info@midaslogisticssolutions.com">info@midaslogisticssolutions.com</a></div></div>
    </div>
    <div className="copyright"><span>© {new Date().getFullYear()} Midas Global Solutions Limited.</span><span>Reliable. Efficient. Trusted.</span></div>
  </div></footer>
}
