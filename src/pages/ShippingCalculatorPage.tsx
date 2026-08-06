import { useMemo, useState } from 'react'
import { navigate } from '../navigation'
import { regulatoryResources } from '../data'

const defaults = {
  length: 85,
  width: 100,
  height: 120,
  weight: 75,
  divisor: 6000,
  freightRate: 5,
  exchangeRate: 2000,
  goodsValue: 500,
  insurance: 0,
  dutyRate: 30,
  localCharges: 0,
}

type Field = keyof typeof defaults
type Values = { [Key in Field]: number | '' }

function CalculatorInput({ field, label, unit, values, onChange, step = '1' }: { field: Field; label: string; unit: string; values: Values; onChange: (field: Field, raw: string) => void; step?: string }) {
  return <label className="calc-field"><span>{label}</span><div><input type="number" min="0" step={step} value={values[field]} onChange={event => onChange(field, event.target.value)} /><b>{unit}</b></div></label>
}

const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 })
const ngn = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 })

export function ShippingCalculatorPage() {
  const [values, setValues] = useState<Values>(defaults)
  const set = (field: Field, raw: string) => setValues(current => ({ ...current, [field]: raw === '' ? '' : Math.max(0, Number(raw)) }))
  const numericValues = useMemo(() => Object.fromEntries(
    Object.entries(values).map(([field, value]) => [field, value === '' ? 0 : value])
  ) as Record<Field, number>, [values])

  const result = useMemo(() => {
    const volumetricWeight = numericValues.divisor ? (numericValues.length * numericValues.width * numericValues.height) / numericValues.divisor : 0
    const chargeableWeight = Math.max(numericValues.weight, volumetricWeight)
    const freightGbp = chargeableWeight * numericValues.freightRate
    const freightNgn = freightGbp * numericValues.exchangeRate
    const cifGbp = numericValues.goodsValue + numericValues.insurance + freightGbp
    const cifNgn = cifGbp * numericValues.exchangeRate
    const dutyNgn = cifNgn * (numericValues.dutyRate / 100)
    const shippingAndImportCharges = freightNgn + dutyNgn + numericValues.localCharges
    const totalLandedValue = (numericValues.goodsValue + numericValues.insurance) * numericValues.exchangeRate + shippingAndImportCharges
    return { volumetricWeight, chargeableWeight, freightGbp, freightNgn, cifGbp, cifNgn, dutyNgn, shippingAndImportCharges, totalLandedValue }
  }, [numericValues])

  return <>
    <section className="calc-hero"><div className="container"><div className="eyebrow">Plan with confidence</div><h1>Shipping & landed<br/><em>cost calculator.</em></h1><p>Estimate air freight, customs duty and the total cost of moving goods from the United Kingdom to Nigeria.</p></div></section>
    <section className="calculator-section"><div className="container calculator-shell">
      <div className="calculator-inputs">
        <div className="calc-panel-heading"><div><span>01</span><h2>Shipment details</h2></div><button type="button" onClick={() => setValues(defaults)}>Reset sample</button></div>
        <p className="calc-intro">Enter the package size and commercial details. The sample values below reproduce the 85 × 100 × 120 cm tool shipment.</p>
        <div className="calc-group"><h3>Package dimensions</h3><div className="calc-fields three"><CalculatorInput field="length" label="Length" unit="cm" values={values} onChange={set}/><CalculatorInput field="width" label="Width" unit="cm" values={values} onChange={set}/><CalculatorInput field="height" label="Height" unit="cm" values={values} onChange={set}/></div><div className="calc-fields two"><CalculatorInput field="weight" label="Actual weight" unit="kg" step="0.1" values={values} onChange={set}/><CalculatorInput field="divisor" label="Air freight divisor" unit="cm³/kg" values={values} onChange={set}/></div></div>
        <div className="calc-group"><h3>Rates & shipment value</h3><div className="calc-fields two"><CalculatorInput field="freightRate" label="Freight rate" unit="£ / kg" step="0.01" values={values} onChange={set}/><CalculatorInput field="exchangeRate" label="Exchange rate" unit="₦ / £" values={values} onChange={set}/></div><div className="calc-fields two"><CalculatorInput field="goodsValue" label="Invoice value of goods" unit="£" step="0.01" values={values} onChange={set}/><CalculatorInput field="insurance" label="Insurance" unit="£" step="0.01" values={values} onChange={set}/></div><div className="calc-fields two"><CalculatorInput field="dutyRate" label="Duty, VAT & taxes estimate" unit="%" step="0.1" values={values} onChange={set}/><CalculatorInput field="localCharges" label="Local handling & other charges" unit="₦" values={values} onChange={set}/></div></div>
      </div>
      <aside className="calculator-results">
        <div className="results-top"><span>Live estimate</span><small>UK → Nigeria · Air freight</small></div>
        <div className="weight-result"><span>Chargeable weight</span><strong>{number.format(result.chargeableWeight)} <small>kg</small></strong><p>{result.volumetricWeight > numericValues.weight ? 'Volumetric weight applies because it exceeds actual weight.' : 'Actual weight applies because it exceeds volumetric weight.'}</p></div>
        <div className="result-lines">
          <div><span>Volumetric weight</span><b>{number.format(result.volumetricWeight)} kg</b></div>
          <div><span>Freight charge</span><b>{ngn.format(result.freightNgn)}</b><small>{gbp.format(result.freightGbp)}</small></div>
          <div><span>CIF value</span><b>{ngn.format(result.cifNgn)}</b><small>{gbp.format(result.cifGbp)}</small></div>
          <div><span>Estimated duty & taxes</span><b>{ngn.format(result.dutyNgn)}</b><small>{number.format(numericValues.dutyRate)}% of CIF</small></div>
          {numericValues.localCharges > 0 && <div><span>Local & other charges</span><b>{ngn.format(numericValues.localCharges)}</b></div>}
        </div>
        <div className="result-total"><span>Freight + import charges</span><strong>{ngn.format(result.shippingAndImportCharges)}</strong><small>Excluding the purchase value of goods</small></div>
        <div className="result-landed"><span>Estimated total landed value</span><b>{ngn.format(result.totalLandedValue)}</b><small>Goods + insurance + freight + estimated import/local charges</small></div>
        <button className="button calc-quote" onClick={() => navigate('/contact')}>Get an accurate quote</button>
      </aside>
    </div></section>
    <section className="calculator-resources"><div className="container"><div className="calculator-resources-heading"><div><div className="eyebrow">Official resources</div><h2>Check before you ship.</h2></div><p>Use these official Nigerian regulatory resources to confirm classifications, rates and import requirements.</p></div><div className="calculator-resource-grid">{regulatoryResources.map((resource, index) => <a key={resource.name} href={resource.url} target="_blank" rel="noopener noreferrer"><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{resource.name}</h3><p>{resource.description}</p></div><b aria-hidden="true">↗</b></a>)}</div><small className="resource-disclaimer">External government services may change without notice. Midas can help confirm which requirements apply to your shipment.</small></div></section>
    <section className="calc-explainer"><div className="container"><div className="section-heading"><div><div className="eyebrow">How it works</div><h2>Clear numbers, step by step.</h2></div><p>Air freight is charged against whichever is greater: the shipment’s actual weight or its volumetric weight.</p></div><div className="formula-grid"><article><span>01</span><h3>Volumetric weight</h3><p>Length × width × height ÷ freight divisor</p><b>{number.format(numericValues.length)} × {number.format(numericValues.width)} × {number.format(numericValues.height)} ÷ {number.format(numericValues.divisor)} = {number.format(result.volumetricWeight)} kg</b></article><article><span>02</span><h3>Freight charge</h3><p>Chargeable weight × freight rate × exchange rate</p><b>{number.format(result.chargeableWeight)} kg × {gbp.format(numericValues.freightRate)} × ₦{number.format(numericValues.exchangeRate)} = {ngn.format(result.freightNgn)}</b></article><article><span>03</span><h3>Estimated duty</h3><p>Duty estimate × CIF value (goods + insurance + freight)</p><b>{number.format(numericValues.dutyRate)}% × {ngn.format(result.cifNgn)} = {ngn.format(result.dutyNgn)}</b></article></div><div className="calc-notice"><strong>Important estimate notice</strong><p>This calculator provides an indicative estimate only. Nigerian Customs assessments depend on the correct HS code, official customs exchange rate, product classification, applicable levies and documentation. It excludes storage, demurrage and agency fees unless entered as local charges. Contact Midas for a formal quotation and customs assessment.</p></div></div></section>
  </>
}
