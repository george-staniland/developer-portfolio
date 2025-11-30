"use client"
import { useState } from "react"
import ProjectCard from "./ProjectCard"
import useEmblaCarousel from 'embla-carousel-react'

function ProjectsGrid(props: any) {

    const { projects } = props;
    const [emblaRef] = useEmblaCarousel()


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
            <div className="title-wrap">
             <h4 className="title fh6">Projects</h4>
            </div>

           <section className="rows-wrap desktop">
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

            <section className="projects-mobile">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container-t">
    
                        {projects.allProjects.map((project, index) => {
                            
                            return (
                                <div className="embla__slide-t" key={project.projectTitle}>
                                    <ProjectCard
                                        key={index}
                                        isActive={activeIndex === index}
                                        cardIndex={index}
                                        onCardClick={handleCardClick}
                                        data={project}
                                    />
                                </div>
                            )

                        })}
                    </div>
                </div>
            </section>


        </section>
    )
}

export default ProjectsGrid