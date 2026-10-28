import type { ComponentType } from "react";

export type Experiment = {
    slug: string;
    title: string;
    description?: string;
    load: () => Promise<{ default: ComponentType }>;
};

export const experiments: Experiment[] = [
    {
        slug: "html-popover",
        title: "HTML Popover",
        load: () => import("./ExperimentHtmlPopover"),
    }
];

export function getExperiment(slug: string) {
    return experiments.find((e) => e.slug === slug);
}
