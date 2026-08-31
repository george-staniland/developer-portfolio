import { type Project } from '@/lib/queries/queries';

type ListProjectProps = {
    projects: Project[];
}

export default function ListProjects({ projects }: ListProjectProps) {
    return (
        <div className="list-projects px ">
            <p className="fb projects-title">Projects</p>
            {projects.map ( (project) => (
                <div className="row" key={project._firstPublishedAt} >
                <a className="project-link" target="_blank" href={project.websiteLink}> 
                    <p className="fb">{project.projectTitle}</p>
                    <p className="fb">{project.studioCompletedAt}</p>
                    <p className="view-text fb">View Site</p>
                </a>
            </div>
            ))}


         
        </div>
    )
}