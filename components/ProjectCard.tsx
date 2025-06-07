"use client"
import Image from "next/image";
import { StructuredText } from "react-datocms";
import { TbBrandNextjs } from "react-icons/tb";
import { SiShopify, SiKirby, SiGreensock } from "react-icons/si";


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
    studioCompletedAt: string;
    projectWriteUp: {
        value: string; // The value of the write-up, assuming it's a string
        __typename: string; // DatoCMS metadata, typically identifies the model type
    };
    techIcons: string[] | null; // Array of tech icons (could be null if not available)
    websiteLink: string; // Website link related to the project
    _firstPublishedAt: string; // Date and time of the first publication
    _status: string; // The status of the project (e.g., "published")
};


// Mapping of icon names to React Icons
const iconMap: { [key: string]: JSX.Element } = {
    TbBrandNextjs: <TbBrandNextjs />,
    SiShopifyL: <SiShopify />,
    SiKirby: <SiKirby />,
    SiGreensock: <SiGreensock />,
    // Add other icons as needed
};



function ProjectCard(props: Props) {

    const { isActive, onCardClick, cardIndex, data } = props;

    console.log(data)

    return (
        <article className={`project__card ${isActive ? 'active' : 'not-active'}`} role="button" onClick={() => onCardClick(cardIndex)}>
            <div className="aspectholder">
                <div className="img-wrap">
                    {data.coverImage &&
                        <Image style={{ objectFit: 'cover' }} fill alt={`cover image for ${data.projectTitle}`} src={data.coverImage.url} />
                    }
                </div>
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
                    <p className="sub-title fb">Role: {data.myRole}</p>

                    {data.techIcons &&
                        <div className="tech-icons">
                            <p className="sub-title fb">Technologies:</p>
                            {data.techIcons.icons.map((iconMarkup, index) => {
                                // Clean up the icon markup to get the icon name
                                const iconName = iconMarkup

                                // Render the corresponding icon or fallback if not found
                                return (
                                    <span className="tech-icon" key={index}>
                                        {iconMap[iconName] || <span>Unknown Icon: {iconMarkup}</span>}
                                    </span>
                                );
                            })}

                        </div>
                    }

                    <p className="sub-title fb" >Studio: {data.studioCompletedAt}</p>

                    <div className="write-up fb">
                        <StructuredText data={data.projectWriteUp} />
                    </div>

                    <section className="link-wrap">
                        <a href={data.websiteLink} target="_blank" >View website</a>
                    </section>
                </div>
            </div>
        </article>
    )
}

export default ProjectCard