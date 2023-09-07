import styles from './page.module.css'
import ThreeJsCanvas from '../../components/ThreeJsCanvas'
import Footer from '../../components/Footer'
import NavMenu from '../../components/NavMenu'
import HeroText from '../../components/HeroText'
import Accordion from '../../components/Accordion'
import { PhotoPortfolioContent, LomoOceanContent, CapScaffContent, DevSiteContent } from '../../content/ProjectsContent'



export default function Home() {
  return (
    <main >
      <NavMenu showHomeLink={false} />
      <div className={styles.section_1}>
        <HeroText />
      </div>
      <div className={styles.section_2}>
        <h2 className={`${styles.pb} ${styles.sub_title}`} >Recent Projects</h2>

        <Accordion title="Photography Portfolio" maxHeight={'300px'}>
          <PhotoPortfolioContent />
        </Accordion>

        <Accordion title="LOMOcean Marine" maxHeight={'320px'}>
          <LomoOceanContent />
        </Accordion>

        <Accordion title="Capital Scaffolding" maxHeight={'220px'}>
          <CapScaffContent />
        </Accordion>

        <Accordion title="This portfolio website" maxHeight={'200px'}>
          <DevSiteContent />
        </Accordion>

      </div>
      <div className={styles.animation_container}>
        <ThreeJsCanvas />
      </div>
      <Footer />
    </main >
  )
}