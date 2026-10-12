import Link from "next/link";
import { experiments } from "@/components/experiments/registry";

export default function ListExperiments() {
    return (
        <div className="component__list-experiments px ">
            <section className="inner grid-12">
                <p className="fb fade-text">Experiments</p>
                <section className="experi-container">
                    {experiments.map((e) => (
                        <Link key={e.slug} href={`/experiments/${e.slug}`}>
                            {e.title}
                        </Link>
                    ))}
                </section>
            </section>
        </div>
    )
}
