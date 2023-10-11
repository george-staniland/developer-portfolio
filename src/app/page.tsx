import styles from './page.module.css'
import ThreeJsCanvas from '../../components/ThreeJsCanvas'
import Footer from '../../components/Footer'
import NavMenu from '../../components/NavMenu'
import HeroText from '../../components/HeroText'
import Accordion from '../../components/Accordion'
import { PhotoPortfolioContent, LomoOceanContent, CapScaffContent, DevSiteContent } from '../../content/ProjectsContent'
import HomePageAnimation from '../../components/HomePageAnimation'
import HomePageSectionTitle from '../../components/HomePageSectionTitle'



export default function Home() {
  return (
    <main >
      <NavMenu showHomeLink={false} />
      <div className={styles.section_1}>
        <HeroText />
      </div>
      <div className={styles.section_2}>

        <HomePageSectionTitle />

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

      <HomePageAnimation />

      <Footer />
    </main >
  )
}