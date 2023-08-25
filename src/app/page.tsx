import styles from './page.module.css'
import ThreeJsCanvas from '../../components/ThreeJsCanvas'
import Footer from '../../components/Footer'

export default function Home() {
  return (
    <main >
      <div className={styles.main_content_container}>
        <div className={`${styles.content_inner} ${styles.pb}`}>
          <div className={styles.bio_section}>
            <h2 className={`${styles.pb} ${styles.sub_title}`} >About</h2>
            <h1 className={styles.hero_text}>
              <span>Hello  &#128075;  my name is George. </span> I&apos;m a front-end software developer inspired when making beautiful, intuitive experiences with code. Outside of work, I enjoy photography, seeing my dog, and traveling.
            </h1>
          </div>
          <div className={styles.projects_section}>
            <h2 className={`${styles.pb} ${styles.sub_title}`} >Recent Projects</h2>
            <ul className={styles.projects_list}>
              <li><a href="https://www.georgestaniland.net/" target="_blank">Photography Portfolio</a> for my art photography</li>
              <li><a href="https://www.lomocean.com/" target="_blank">LOMOcean Marine</a>, developed will working with The Web Guys</li>
              <li><a href="https://capitalscaffolding.co.nz/" target="_blank">Capital Scaffolding</a> - migrated to a new platform while ironing out UI issues</li>
            </ul>
          </div>
          <div className={styles.experience_section}>
            <h2 className={`${styles.pb} ${styles.sub_title}`} >Work Experience</h2>
            <p><a href="/resume.pdf" target="_blank" className={styles.body_copy}>View my resume</a></p>
          </div>
        </div>
      </div>
      <div className={styles.animation_container}>
        <ThreeJsCanvas />
      </div>

    </main >
  )
}
