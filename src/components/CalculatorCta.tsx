import { navigate } from '../navigation'

export function CalculatorCta() {
  return <section className="calculator-cta">
    <div className="container calculator-cta-inner">
      <div className="calculator-cta-mark" aria-hidden="true"><span>£</span><i>→</i><span>₦</span></div>
      <div className="calculator-cta-copy">
        <div className="eyebrow">Plan before you ship</div>
        <h2>Know your estimated landed cost in minutes.</h2>
        <p>Calculate chargeable weight, air freight and estimated Nigerian import charges with a clear, step-by-step breakdown.</p>
      </div>
      <a className="button calculator-cta-button" href="/calculator" onClick={event => { event.preventDefault(); navigate('/calculator') }}>Calculate my shipment <span>→</span></a>
    </div>
  </section>
}
