import { type Project } from '@/lib/queries/queries';

type ListProjectProps = {
    projects: Project[];
}

export default function ListProjects({ projects }: ListProjectProps) {
    return (
        <div className="list-projects px ">

            {projects.map ( (project, index) => (
                <div className="row" key={project._firstPublishedAt} >
                    { index == 0 &&
                        <p className="fb projects-title fade-text">Projects</p>
                    }
                    <a className="project-link" target="_blank" href={project.websiteLink}> 
                        <p className="fb">{project.projectTitle}</p>
                        <p className="fb fade-text ">{project.studioCompletedAt}</p>
                        <p className="view-text fb">View Site</p>
                    </a>
                </div>
            ))}


         
        </div>
    )
}