import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { industries } from "../data";
export function IndustriesPage() {
    return (
        <>
            <PageHero
                eyebrow="Sector-specific solutions"
                title="Built around your industry."
                copy="Every sector moves differently. We pair logistics expertise with the operational understanding your business demands."
                image="https://images.unsplash.com/photo-1565619624098-cf4168a499ab?auto=format&fit=crop&w=2000&q=88"
            />
            <section className="section">
                <div className="container">
                    <div className="section-heading">
                        <div>
                            <div className="eyebrow">Industries we serve</div>
                            <h2>Experience that travels across sectors.</h2>
                        </div>
                        <p>
                            From sensitive healthcare cargo and large-scale industrial
                            equipment to fast-moving retail inventory, our solutions adapt to
                            your priorities.
                        </p>
                    </div>
                    <div className="industry-grid">
                        {industries.map((x, i) => (
                            <article className="industry-card" key={x}>
                                <span>{String(i + 1).padStart(2, "0")}</span>
                                <h3>{x}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <CtaBand />
        </>
    );
}
