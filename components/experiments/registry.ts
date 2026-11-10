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
    },
    {
        slug: "claude-experiment",
        title: "Claude Model API Experiment",
        load: () => import("./ClaudeApiExperiment"),
    },
    {
        slug: "halftone-canvas",
        title: "Halftone Canvas",
        load: () => import("./ExperimentHalftoneCanvas"),
    },
];

export function getExperiment(slug: string) {
    return experiments.find((e) => e.slug === slug);
}
