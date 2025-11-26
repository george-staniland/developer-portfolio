"use client"
import { StructuredText } from "react-datocms";
import { TbBrandNextjs } from "react-icons/tb";
import { BsFiletypeScss } from "react-icons/bs";
import { SiShopify, SiKirby, SiGreensock , SiSanity} from "react-icons/si";
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

interface Icon {
    title: string;
    reactIconMarkup: string;
}

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
    techIcons: Icon[];
    brandColour: {
        hex: string;
    };
    websiteLink: string; // Website link related to the project
    _firstPublishedAt: string; // Date and time of the first publication
    _status: string; // The status of the project (e.g., "published")
};


// Mapping of icon names to React Icons
const iconMap: { [key: string]: JSX.Element } = {
    TbBrandNextjs: <TbBrandNextjs />,
    SiShopify: <SiShopify />,
    SiKirby: <SiKirby />,
    SiGreensock: <SiGreensock />,
    SiSanity: <SiSanity/>,
    BsFiletypeScss: <BsFiletypeScss/>
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
            const selectedAccordionBody = e.currentTarget.parentElement?.nextElementSibling 
            const selectedAccordionBodyInner = e.currentTarget.parentElement?.nextElementSibling?.firstChild
            if(selectedAccordionBodyInner && selectedAccordionBodyInner instanceof HTMLElement && selectedAccordionBody && selectedAccordionBody instanceof HTMLElement) {
               const innerHeight = selectedAccordionBodyInner.offsetHeight
               selectedAccordionBody.style.setProperty("--natural-height", `${innerHeight}px`);
            }
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
                <div 
                    className="colour-overlay"
                    style= {{
                        '--brand_colour' : data.brandColour?.hex ?? '#6961ff'
                    }}
                >
                      
                        <div id="blob1"></div>
                        <div id="blob2"></div>
                        <div id="blob3"></div>
                        <div id="noiseLayer"></div>
                    <svg viewBox='0 0 500 500' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'>
 
                        <filter id='noiseFilter'>
                            <feTurbulence
                                type='fractalNoise'
                                baseFrequency='9'
                                numOctaves='1'
                                stitchTiles='stitch' />
                        </filter>
                    </svg>
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
                                onClick={ (e) => toggleActive(e, index)}
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
                                    <div className="inner fb-small">
                                        <StructuredText data={item.rowContent} />
                                    </div>
                                </div>
                             </section>
                            )
                        )}
                    </div>

                    <p className="sub-title fd">Role: {data.myRole}</p>

                    <p className="sub-title fd" >Studio: {data.studioCompletedAt}</p>

                    {data.techIcons &&
                        <div className="tech-icons">
                             <p className="sub-title fd">Technologies:</p> 
                            { data.techIcons.map((icon, index) => {
                             
                                return (
                                    <div className="icon_wrap" key={icon.title} >
                                        {iconMap[icon.reactIconMarkup]}
                                        <p className="fb">{icon.title}</p>
                                    </div>
                                );
                            })}
                        
                        </div>
                    }

                    <section className="link-wrap">
                        <a className="fb" href={data.websiteLink} target="_blank" >View website</a>
                    </section>
                </div>
            </div>
        </article>
    )
}

export default ProjectCard