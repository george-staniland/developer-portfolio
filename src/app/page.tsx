import styles from './page.module.css'
import ThreeJsCanvas from '../../components/ThreeJsCanvas'
import Footer from '../../components/Footer'

export default function Home() {
  return (
    <main >
      <div className={styles.section_1}>
        <div className={styles.section_1_inner}>
          <h2 className={`${styles.pb} ${styles.sub_title}`} >About</h2>
          <h1 className={styles.hero_text}>
            Hello  &#128075;  my name is George. I&apos;m a front-end software developer inspired when making beautiful, intuitive experiences with code. Outside of work, I enjoy photography, seeing my dog, and traveling.
          </h1>
        </div>
      </div>
      <div className={styles.section_2}>
        <div className={styles.projects_section}>
          <h2 className={`${styles.pb} ${styles.sub_title}`} >Recent Projects</h2>
          <ul className={styles.projects_list}>
            <li><a href="https://www.georgestaniland.net/" target="_blank">Photography Portfolio</a> for my art photography</li>
            <li><a href="https://www.lomocean.com/" target="_blank">LOMOcean Marine</a>, developed will working with The Web Guys</li>
            <li><a href="https://capitalscaffolding.co.nz/" target="_blank">Capital Scaffolding</a> - migrated to a new platform while ironing out UI issues</li>
          </ul>
        </div>
        <div className={styles.experience_section}>
        </div>
      </div>
      <div className={styles.animation_container}>
        <ThreeJsCanvas />
      </div>
      <Footer />
    </main >
  )
}
