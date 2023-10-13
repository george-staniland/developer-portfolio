import styles from './page.module.css'
import Footer from '../../components/Footer'
import NavMenu from '../../components/NavMenu'
import HeroText from '../../components/HeroText'
import HomePageAnimation from '../../components/HomePageAnimation'
import ProjectsSection from '../../components/ProjectsSection'



export default function Home() {
  return (
    <main >
      <NavMenu showHomeLink={false} />
      <div className={styles.section_1}>
        <HeroText />
      </div>
      <div className={styles.section_2}>
        <ProjectsSection />
        <HomePageAnimation />
      </div>
      <Footer />
    </main >
  )
}