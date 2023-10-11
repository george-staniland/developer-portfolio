"use client"

import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer';
import styles from './styles/homepage_title.module.css'

export default function HomePageSectionTitle() {
    const { ref, inView } = useInView({ threshold: 1, delay: 200 });

    const style = useSpring({
        width: inView ? '150%' : '0%',
        config: config.slow,
    }
    )

    return (
        <div
            className={styles.projects_title_wrap}
            ref={ref}
        >
            <h2 className={styles.section_title} >Recent Projects</h2>
            <animated.span ref={ref} className={styles.animated_underline} style={style} />
        </div>
    )
}
