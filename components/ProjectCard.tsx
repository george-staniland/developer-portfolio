"use client"
import { spawn } from "child_process";
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
                    <p className="paragraph fb">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et.</p>
                    <p className="paragraph fb">Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. </p>
                    <section className="link-wrap">
                        <a href="">View website</a>
                    </section>
                </div>
            </div>
        </article>
    )
}

export default ProjectCard