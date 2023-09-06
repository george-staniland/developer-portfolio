import styles from './page.module.css'
import ThreeJsCanvas from '../../components/ThreeJsCanvas'
import Footer from '../../components/Footer'
import NavMenu from '../../components/NavMenu'
import HeroText from '../../components/HeroText'
import Accordion from '../../components/Accordion'

export default function Home() {
  return (
    <main >
      <NavMenu showHomeLink={false} />
      <div className={styles.section_1}>
        <HeroText />
      </div>
      <div className={styles.section_2}>
        <h2 className={`${styles.pb} ${styles.sub_title}`} >Recent Projects</h2>
        <Accordion title="Photography Portfolio" maxHeight={'120px'}>
          <p>To add<a href="https://www.georgestaniland.net/" target="_blank">View</a></p>
        </Accordion>
        <Accordion title="LOMOcean Marine" maxHeight={'120px'}>
          <p>To add<a href="https://www.georgestaniland.net/" target="_blank">View</a></p>
        </Accordion>
        <Accordion title="Capital Scaffolding" maxHeight={'120px'}>
          <p>To add <a href="https://www.georgestaniland.net/" target="_blank">View</a></p>
        </Accordion>
        <Accordion title="This portfolio website" maxHeight={'120px'}>
          <p>To add <a href="https://www.georgestaniland.net/" target="_blank">View</a></p>
        </Accordion>
      </div>
      <div className={styles.animation_container}>
        {/* <ThreeJsCanvas /> */}
      </div>
      <Footer />
    </main >
  )
}