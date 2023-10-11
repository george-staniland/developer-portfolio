"use client"

import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer';
import Accordion from './Accordion';
import { PhotoPortfolioContent, LomoOceanContent, CapScaffContent, DevSiteContent } from '../content/ProjectsContent'
import styles from './styles/homepage_title.module.css'

export default function ProjectsSection() {
    const { ref, inView } = useInView({ threshold: 1 });

    const style = useSpring({
        width: inView ? '140%' : '0%',
        config: config.slow,
    }
    )

    return (
        <div ref={ref}>
            <div
                className={styles.projects_title_wrap}

            >
                <h2 className={styles.section_title} >Recent Projects</h2>
                <animated.span className={styles.animated_underline} style={style} />
            </div>
            <div>
                <Accordion title="Photo Portfolio" maxHeight={'400px'}>
                    <PhotoPortfolioContent />
                </Accordion>

                <Accordion title="LOMOcean Marine" maxHeight={'400px'}>
                    <LomoOceanContent />
                </Accordion>

                <Accordion title="Capital Scaffolding" maxHeight={'300px'}>
                    <CapScaffContent />
                </Accordion>

                <Accordion title="This Website" maxHeight={'420px'}>
                    <DevSiteContent />
                </Accordion>
            </div>
        </div>
    )
}
