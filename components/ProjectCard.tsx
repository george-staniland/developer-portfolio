"use client"
import { StructuredText } from "react-datocms";
import { TbBrandNextjs } from "react-icons/tb";
import { SiShopify, SiKirby, SiGreensock } from "react-icons/si";
import { isNullishCoalesce } from "typescript";
import { useState } from "react";

interface Props {
    isActive: boolean;
    onCardClick: (index: number) => void;
    cardIndex: number;
    data: ProjectType;
}


interface AccordionRow {
    rowTitle: string;
    rowContent: {
        value: string;
    }
};

type ProjectType = {
    id: string; // Unique identifier for the project
    myRole: string; // Role in the project (e.g., "Lead Developer")
    projectTitle: string; // Title of the project
    studioCompletedAt: string;
    projectWriteUp: {
        value: string; 
        __typename: string; // DatoCMS metadata, typically identifies the model type
    };
    accordion: AccordionRow[];
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

    const [ activeIndex, setActiveIndex] = useState<number | null>(null);

    function toggleActive (e : React.MouseEvent<HTMLButtonElement>, index: number) {
        e.stopPropagation()

        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index); 
        }
    }

    return (
        <article 
            className={`project__card ${isActive ? 'active' : 'not-active'}`} 
            onClick={() => { 
                // setActiveIndex(null)
                onCardClick(cardIndex)  
            }}
        >
            <div className="aspectholder">
                <div className="colour-overlay">
                    
                </div>
                <div className="top px">
                    <p className="project-title fh4">{data.projectTitle}</p>
                    <button
                        aria-label="Toggle full project view"
                        onClick={() => onCardClick(cardIndex)}
                        className="expand-project-btn"
                    >
                        {isActive ?
                            <span>-</span>
                            :
                            <span>+</span>
                        }
                    </button>
                </div>
                <div className="body px">

                     <div className="write-up fb">
                        <StructuredText data={data.projectWriteUp} />
                    </div>

                    <div className="accordions-outer">
                        
                        { data.accordion && data.accordion.map( (item, index) => (
                             <section 
                                className={`accordion_row ${ index == activeIndex ? 'row-active' : 'not-active' }`} 
                                key={item.rowTitle}
                                >
                                <div className="accordion_title">
                                    <button 
                                        className="fb" 
                                        onClick={ (e) => toggleActive(e, index)}
                                        >
                                             { item.rowTitle }
                                        {index == activeIndex ?
                                            <span>-</span>
                                            :
                                            <span>+</span>
                                        }
                                        </button>
                                </div>
                                <div className="accordion_body">
                                    <div className="inner fb">
                                        <StructuredText data={item.rowContent} />
                                    </div>
                                </div>
                             </section>
                            )
                        )}
                    </div>

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
                                        {iconMap[iconName] }
                                    </span>
                                );
                            })}
                           
                          

                        </div>
                    }

                    <p className="sub-title fb" >Studio: {data.studioCompletedAt}</p>

                   

                    <section className="link-wrap">
                        <a href={data.websiteLink} target="_blank" >View website</a>
                    </section>
                </div>
            </div>
        </article>
    )
}

export default ProjectCard