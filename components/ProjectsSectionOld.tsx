"use client"

import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer';
import Accordion from './Accordion';
import { PhotoPortfolioContent, LomoOceanContent, CapScaffContent, DevSiteContent } from '../content/ProjectsContent'
import styles from './styles/projects_section.module.css'

export default function ProjectsSectionOld() {
    const { ref, inView } = useInView({ threshold: 0.9 });

    const style = useSpring({
        width: inView ? '140%' : '0%',
        config: config.slow,
    }
    )

    return (
        <div>
            <div className={styles.main_title_wrap}>
                <h2 className={styles.main_title} >Recent Projects</h2>
                <animated.span className={styles.animated_underline} style={style} />
                <div ref={ref} className={styles.hidden_animation_trigger} />
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
