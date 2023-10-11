"use client"

import { useSpring, animated, config } from '@react-spring/web'
import { useEffect, useRef, useState, useMemo, RefObject } from 'react';
import styles from './styles/homepage_title.module.css'

export default function HomePageSectionTitle() {
    const ref = useRef(null)
    const titleInView = useIsInViewport(ref);

    const style = useSpring({
        width: titleInView ? '100%' : '0%',
        config: config.gentle,
    }
    )

    return (
        <div className={styles.projects_title_wrap}>
            <h2 className={styles.section_title} >Recent Projects</h2>
            <animated.span ref={ref} className={styles.animated_underline} style={style} />
        </div>
    )
}

function useIsInViewport(ref: HTMLSpanElement) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
        () =>
            new IntersectionObserver(([entry]) =>
                setIsIntersecting(entry.isIntersecting),
                { rootMargin: '-40px' }
            ),
        [],
    );

    useEffect(() => {
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isIntersecting;
}