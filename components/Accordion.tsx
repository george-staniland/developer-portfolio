"use client"

import styles from './styles/accordion.module.css'
import { useState } from 'react'
import { useSpring, animated, config } from '@react-spring/web';
import { useHover } from '@use-gesture/react';

interface Props {
    title: string;
    maxHeight: string;
    children: React.ReactNode;
}

export default function Accordion(props: Props) {
    const { title, children, maxHeight } = props;
    const [showContent, setShowContent] = useState(false);
    const [titleHovered, setTitleHovered] = useState(false);

    const bind = useHover(({ hovering }) => {
        setTitleHovered(hovering && !showContent ? true : false)
    });


    const style = useSpring({
        maxHeight: showContent ? maxHeight : '0px',
        paddingTop: showContent ? '25px' : '0px',
        paddingBottom: showContent ? '15px' : '0px',
        config: config.gentle,
    })

    const styleTitle = useSpring({
        backgroundColor: !showContent && titleHovered ? '#f9f9f9' : '#f9f9f900',
    })

    return (
        <div className={styles.accordion_container}>
            <animated.div
                className={styles.accordion_title}
                onClick={() => setShowContent(!showContent)}
                {...bind()}
                style={styleTitle}
            >
                <div><h5>{title}</h5></div>
                <div className={styles.icon_wrap}>
                    <span>
                        {showContent ? `\u002D` : `\u002B`}
                    </span>
                </div>
            </animated.div>
            <animated.div className={styles.accordion_content} style={style}>
                {children}
            </animated.div>
        </div>
    )
}