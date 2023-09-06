"use client"

import styles from './styles/accordion.module.css'
import { useState } from 'react'
import { useSpring, animated, config } from '@react-spring/web';

interface Props {
    title: string;
    maxHeight: string;
    children: React.ReactNode;
}

export default function Accordion(props: Props) {
    const { title, children, maxHeight } = props;
    const [showContent, setShowContent] = useState(false);
    const style = useSpring({
        maxHeight: showContent ? maxHeight : '0px',
        padding: showContent ? '15px 0px' : '0px 0px',
        config: config.gentle,
    })
    return (
        <div className={styles.accordion_container}>
            <div
                className={styles.accordion_title}
                onClick={() => setShowContent(!showContent)}
            >
                <div><h5>{title}</h5></div>
                <div className={styles.icon_wrap}>
                    <span>
                        {showContent ? `\u002D` : `\u002B`}
                    </span>
                </div>
            </div>
            <animated.div className={styles.accordion_content} style={style}>
                {children}
            </animated.div>
        </div>
    )
}