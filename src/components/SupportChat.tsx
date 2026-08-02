import { useEffect, useMemo, useState } from 'react'

const faqs = [
  { q: 'What logistics services do you offer?', a: 'MIDAS Global Solutions LTD provides comprehensive logistics and supply chain solutions, including local and interstate transportation, freight forwarding, warehousing, inventory management, last-mile delivery, procurement support, customs documentation and clearance, and supply chain consulting.' },
  { q: 'Which locations do you serve?', a: 'We provide logistics services across Nigeria and beyond through our global partnerships with leading industry providers.' },
  { q: 'How long does delivery take?', a: 'Delivery timelines depend on the destination, shipment type and mode of transportation. Local deliveries are typically completed within 24 hours, while interstate and international deliveries vary. We provide an estimated delivery time when your shipment is booked.' },
  { q: 'How much does shipping cost?', a: 'Shipping costs depend on the size, weight, destination, urgency and nature of the goods. Share your shipment details with us for a personalised quotation, or try our shipping calculator for an indicative estimate.' },
  { q: 'Can I get a quote before booking?', a: 'Yes. We provide free, no-obligation quotations. Share your shipment details and our team will prepare a competitive estimate.' },
  { q: 'How can I track my shipment?', a: 'You can track your shipment by contacting our customer support team or using our shipment tracking platform. We also provide regular status updates throughout the delivery process.' },
  { q: 'What types of goods do you transport?', a: 'We handle a wide range of non-prohibited cargo, including consumer goods, industrial equipment, retail products, pharmaceuticals, agricultural products, office supplies and automobiles.' },
  { q: 'Do you transport fragile or sensitive items?', a: 'Yes. We use appropriate packaging, handling procedures and specialised transportation methods to help fragile or sensitive items arrive safely.' },
  { q: 'Do you offer same-day or express delivery?', a: 'Yes. Same-day and express delivery services are available for selected locations, subject to availability and booking time.' },
  { q: 'Is my cargo insured?', a: 'Insurance options are available on request to protect your shipment against unforeseen circumstances. We recommend insurance for high-value or sensitive goods.' },
  { q: 'What happens if my shipment is delayed?', a: 'If there is an unexpected delay, our team will promptly notify you, explain the reason and provide an updated delivery schedule while working to minimise the impact.' },
  { q: 'What happens if my goods are lost or damaged?', a: 'We take every precaution to ensure safe delivery. In the rare event of loss or damage, we will investigate promptly and resolve the incident in line with company policy and industry best practice.' },
  { q: 'Do you provide warehousing services?', a: 'Yes. We offer secure and bespoke warehousing solutions with inventory management for businesses requiring short-term or long-term storage.' },
  { q: 'Do you handle customs clearance?', a: 'Yes. We professionally handle customs documentation and clearance for imports, exports and exports for re-importation, helping ensure regulatory compliance and timely delivery.' },
  { q: 'Can you manage my company’s supply chain?', a: 'Absolutely. We offer customised end-to-end supply chain solutions, including procurement support, transportation, warehousing, inventory management, distribution, delivery and hands-on personnel to manage internal supply chain processes.' },
  { q: 'What industries do you serve?', a: 'We serve manufacturing, hospitality, retail, healthcare, agriculture, e-commerce, power, oil and gas, construction, education and FMCG organisations.' },
  { q: 'Do you offer services for businesses and individuals?', a: 'Yes. We provide logistics solutions for corporate organisations, SMEs, government agencies and individual customers.' },
  { q: 'How do I book a shipment?', a: 'You can book by calling us, sending a WhatsApp message, emailing our customer service team or completing the contact form on our website.' },
  { q: 'What payment methods do you accept?', a: 'We accept bank transfers, online payments and other approved payment methods in different currencies.' },
  { q: 'Why should I choose MIDAS?', a: 'MIDAS Global Solutions LTD delivers reliable, safe and cost-effective logistics solutions. Our experienced team, customer-focused approach, timely delivery, transparent communication and professional service make us a trusted partner for businesses and individuals.' },
]

const whatsappUrl = 'https://wa.me/2348182072342?text=Hello%20MIDAS%20Global%20Solutions%2C%20I%20need%20help%20with%20a%20logistics%20enquiry.'

export function SupportChat() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return term ? faqs.filter(item => `${item.q} ${item.a}`.toLowerCase().includes(term)) : faqs
  }, [query])

  return <div className={'support-widget '+(open ? 'is-open' : '')}>
    {open && <section className="support-panel" role="dialog" aria-modal="false" aria-label="MIDAS help centre">
      <header className="support-header"><div className="support-brand"><img src="/midas-nobg.png" alt=""/><div><strong>MIDAS Help Centre</strong><span><i/> Online support</span></div></div><button type="button" onClick={() => setOpen(false)} aria-label="Close help centre">×</button></header>
      <div className="support-welcome"><span>Hello there</span><h2>How can we help?</h2><p>Find a quick answer below. If you still need us, our team is one tap away.</p></div>
      <div className="support-search"><span aria-hidden="true">⌕</span><input value={query} onChange={event => { setQuery(event.target.value); setActive(null) }} placeholder="Search for an answer…" aria-label="Search frequently asked questions"/>{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}</div>
      <div className="support-content"><div className="support-section-title"><span>Frequently asked questions</span><small>{filtered.length} {filtered.length === 1 ? 'answer' : 'answers'}</small></div>{filtered.length > 0 ? <div className="support-faqs">{filtered.map(item => { const index = faqs.indexOf(item); const expanded = active === index; return <article className={expanded ? 'expanded' : ''} key={item.q}><button type="button" aria-expanded={expanded} onClick={() => setActive(expanded ? null : index)}><span>{item.q}</span><i>{expanded ? '−' : '+'}</i></button>{expanded && <div><p>{item.a}</p><div className="support-helpful"><span>Need more detail?</span><a href={whatsappUrl} target="_blank" rel="noreferrer">Ask us on WhatsApp →</a></div></div>}</article>})}</div> : <div className="support-empty"><b>No exact match found</b><p>Try a shorter search, or speak directly with our team.</p></div>}</div>
      <footer className="support-footer"><div><span>Still need help?</span><p>Chat with a logistics specialist.</p></div><a href={whatsappUrl} target="_blank" rel="noreferrer"><i aria-hidden="true">◔</i> Continue on WhatsApp</a></footer>
    </section>}
    <button className="support-launcher" type="button" aria-expanded={open} aria-label={open ? 'Close help centre' : 'Open help centre'} onClick={() => setOpen(current => !current)}><span className="support-launcher-label"><b>Need help?</b><small>Browse our FAQs</small></span><i aria-hidden="true">{open ? '×' : '?'}</i></button>
  </div>
}
