"use client"
import { useState } from "react"
import ProjectCard from "./ProjectCard"

function ProjectsGrid(props: any) {

    const { projects } = props;


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
        <section className="projects__grid px" >
            <h4 className="title fh4">Projects</h4>

            <section className="rows-wrap">

                <div className="row">
                    {projects.allProjects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            isActive={activeIndex === index}
                            cardIndex={index}
                            onCardClick={handleCardClick}
                            data={project}
                        />
                    ))}
                </div>

            </section>

        </section>
    )
}

export default ProjectsGrid