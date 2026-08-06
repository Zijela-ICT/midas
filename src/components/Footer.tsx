import { navigate } from '../navigation'
import { regulatoryResources } from '../data'

const go = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
  event.preventDefault()
  navigate(path)
}

export function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-grid">
      <div><img className="footer-logo" src="/midas-nobg.webp" alt="Midas Global Solutions Limited"/><p>Moving businesses forward through dependable logistics, intelligent supply chains and exceptional service.</p></div>
      <div><h4>Explore</h4><div className="footer-links"><a href="/" onClick={event => go(event, '/')}>Home</a><a href="/about" onClick={event => go(event, '/about')}>About us</a><a href="/industries" onClick={event => go(event, '/industries')}>Industries we Serve</a><a href="/our-work" onClick={event => go(event, '/our-work')}>Our work</a><a href="/calculator" onClick={event => go(event, '/calculator')}>Shipping calculator</a><a href="/posts" onClick={event => go(event, '/posts')}>Blog</a></div></div>
      <div><h4>Our services</h4><div className="footer-links"><a href="/services" onClick={event => go(event, '/services')}>Air & sea freight</a><a href="/services" onClick={event => go(event, '/services')}>Procurement</a><a href="/services" onClick={event => go(event, '/services')}>Warehousing</a><a href="/services" onClick={event => go(event, '/services')}>Consultancy</a></div></div>
      <div><h4>Resources</h4><div className="footer-links footer-resources">{regulatoryResources.map(resource => <a key={resource.name} href={resource.url} target="_blank" rel="noopener noreferrer">{resource.shortName}<span aria-hidden="true">↗</span></a>)}</div></div>
      <div className="footer-contact"><h4>Offices & contact</h4><div className="footer-office"><b>Nigeria office</b><p>24 Adegbola Street, Opposite Railway Line, Ikeja, Lagos State.</p><div className="footer-office-links"><a href="tel:+2348182072342">+234 818 207 2342</a><a href="tel:+2348161640774">+234 816 164 0774</a><a href="mailto:info@midaslogisticssolutions.com">info@midaslogisticssolutions.com</a></div></div><div className="footer-office"><b>United Kingdom office</b><p>98 Hope Street, Leigh WN7 1NP, Greater Manchester, United Kingdom.</p><div className="footer-office-links"><a href="tel:+447858022086">+44 7858 022086</a><a href="mailto:info@midaslogisticssolutions.com">info@midaslogisticssolutions.com</a></div></div></div>
    </div>
    <div className="copyright"><span>© {new Date().getFullYear()} Midas Global Solutions Limited.</span><span>Reliable. Efficient. Trusted.</span><span>Site by <a href="https://www.zijela.com" target="_blank" rel="noopener noreferrer">Zijela</a></span></div>
  </div></footer>
}
