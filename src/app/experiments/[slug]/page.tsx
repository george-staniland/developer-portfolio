import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { experiments, getExperiment } from "@/components/experiments/registry";

export const dynamicParams = false;

export function generateStaticParams() {
    return experiments.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return { title: getExperiment(slug)?.title ?? "Experiment" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const experiment = getExperiment(slug);
    if (!experiment) notFound();

    const { default: Experiment } = await experiment.load();

    return (
        <section className="page__experiment px">
            <Experiment />
        </section>
    )
}
