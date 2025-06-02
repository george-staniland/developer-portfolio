"use client"
import { useState } from "react"
import ProjectCard from "./ProjectCard"

function ProjectsGrid() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    function handleCardClick(index: number) {
        // Toggle logic: deselect if already selected
        if (activeIndex === index) {
            setActiveIndex(null); // Deselect all
        } else {
            setActiveIndex(index); // Activate clicked
        }
    }

    return (
        <section className="projects__grid px py">
            <h4 className="title fh4">Projects</h4>

            <section className="rows-wrap">

                <div className="row">
                    {[0, 1, 2].map((_, index) => (
                        <ProjectCard
                            key={index}
                            isActive={activeIndex === index}
                            cardIndex={index}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>

            </section>

        </section>
    )
}

export default ProjectsGrid