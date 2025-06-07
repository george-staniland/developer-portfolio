"use client"


interface Props {
    isActive: boolean;
    onCardClick: (index: number) => void;
    cardIndex: number;
    data: ProjectType;
}

type ProjectType = {
    coverImage: {
        url: string; // URL to the cover image
    };
    id: string; // Unique identifier for the project
    myRole: string; // Role in the project (e.g., "Lead Developer")
    projectTitle: string; // Title of the project
    projectWriteUp: {
        value: string; // The value of the write-up, assuming it's a string
        __typename: string; // DatoCMS metadata, typically identifies the model type
    };
    techIcons: string[] | null; // Array of tech icons (could be null if not available)
    websiteLink: string; // Website link related to the project
    _firstPublishedAt: string; // Date and time of the first publication
    _status: string; // The status of the project (e.g., "published")
};



function ProjectCard(props: Props) {

    const { isActive, onCardClick, cardIndex, data } = props;

    console.log(data)

    return (
        <article className={`project__card ${isActive ? 'active' : 'not-active'}`} role="button" onClick={() => onCardClick(cardIndex)}>
            <div className="aspectholder">
                <div className="img-wrap"></div>
                <div className="top px">
                    <p className="project-title fh4">{data.projectTitle}</p>
                    <button
                        aria-label="Toggle full project view"
                        onClick={() => onCardClick(cardIndex)}
                    >
                        {isActive ?
                            <span>-</span>
                            :
                            <span>+</span>
                        }
                    </button>
                </div>
                <div className="body px">
                    <p className="sub-title fb">Role: Lead Developer</p>
                    <p className="sub-title fb">Technologies: test</p>
                    <p className="sub-title fb" >Studio: New Territory</p>

                    <p className="paragraph fb">  </p>
                    <section className="link-wrap">
                        <a href="">View website</a>
                    </section>
                </div>
            </div>
        </article>
    )
}

export default ProjectCard