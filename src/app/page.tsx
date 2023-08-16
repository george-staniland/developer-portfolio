import styles from './page.module.css'
import ThreeJsCanvas from '../../components/ThreeJsCanvas'

export default function Home() {
  return (
    <main >
      <div className={styles.main_content_container}>
        <div className={`${styles.content_inner} ${styles.pb}`}>
          <h1 className={styles.hero_text}>
            <span>Hello  &#128075;  my name is George. </span> I&apos;m a front-end software developer inspired when making beautiful, intuitive experiences with code. Outside of work, I enjoy photography, seeing my dog, and traveling.
          </h1>
          <div className={styles.section}>
            <h2 className={styles.pb} >Recent Projects</h2>
            <ul>
              <li><a href="https://www.georgestaniland.net/" target="_blank">Photography Portfolio (My own work)</a></li>
              <li><a href="https://www.lomocean.com/" target="_blank">LOMOcean Marine</a></li>
              <li><a href="https://capitalscaffolding.co.nz/" target="_blank">Capital Scaffolding</a></li>
            </ul>
          </div>
          <div className={styles.section}>
            <h2 className={styles.pb} >Work Experience</h2>
            <p><a href="/resume.pdf" target="_blank">View my resume</a></p>
          </div>
        </div>
      </div>

      <div className={styles.animation_container}>
        <ThreeJsCanvas />
      </div>
    </main >
  )
}
