import styles from './page.module.css'
import ThreeJsCanvas from '../../components/ThreeJsCanvas'
import Footer from '../../components/Footer'
import NavMenu from '../../components/NavMenu'
import HeroText from '../../components/HeroText'

export default function Home() {
  return (
    <main >
      <NavMenu showHomeLink={false} />
      <div className={styles.section_1}>
        <HeroText />
      </div>
      <div className={styles.section_2}>
        <h2 className={`${styles.pb} ${styles.sub_title}`} >Recent Projects</h2>
        <ul className={styles.projects_list}>
          <li><a href="https://www.georgestaniland.net/" target="_blank">Photography Portfolio</a> for my art photography</li>
          <li><a href="https://www.lomocean.com/" target="_blank">LOMOcean Marine</a>, developed will working with The Web Guys</li>
          <li><a href="https://capitalscaffolding.co.nz/" target="_blank">Capital Scaffolding</a> - migrated to a new platform while ironing out UI issues</li>
        </ul>
      </div>
      <div className={styles.animation_container}>
        <ThreeJsCanvas />
      </div>
      <Footer />
    </main >
  )
}
