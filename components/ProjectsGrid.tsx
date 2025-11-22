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

    console.log(projects.allProjects.length)

    return (
        <section className="projects__grid px" >
            <h4 className="title fh5">Projects</h4>

           <section className="rows-wrap">
    {projects.allProjects
        .reduce((rows, project, index) => {
            const rowIndex = Math.floor(index / 3); // group by 3
            if (!rows[rowIndex]) rows[rowIndex] = [];
            rows[rowIndex].push(project);
            return rows;
        }, [])
        .map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
                {row.map((project, index) => {
                    const projectIndex = rowIndex * 3 + index; // actual index in list
                    return (
                        <ProjectCard
                            key={projectIndex}
                            isActive={activeIndex === projectIndex}
                            cardIndex={projectIndex}
                            onCardClick={handleCardClick}
                            data={project}
                        />
                    );
                })}
            </div>
        ))}
</section>


        </section>
    )
}

export default ProjectsGrid