"use client"
import { use, useState } from "react";

interface Props {
    isActive: boolean;
    onCardClick: (index: number) => void;
    cardIndex: number;
}

function ProjectCard(props: Props) {

    const { isActive, onCardClick, cardIndex } = props;

    return (
        <article className={`project__card ${isActive ? 'active' : 'not-active'}`} role="button" onClick={() => onCardClick(cardIndex)}>
            <div className="aspectholder">
                <div className="img-wrap"></div>
                <div className="top px">
                    <p className="project-title fh4">Atmos</p>
                    <button
                        aria-label="View full project"
                        onClick={() => onCardClick(cardIndex)}
                    >
                        +
                    </button>
                </div>
                <div className="body px">
                    <p className="sub-title fb">Role: Lead Developer</p>
                    <p className="sub-title fb">Technologies: test</p>
                    <p className="sub-title fb" >Studio: New Territory</p>
                    <p className="paragraph fb">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
                    <a href="">View website</a>
                </div>
            </div>
        </article>
    )
}

export default ProjectCard