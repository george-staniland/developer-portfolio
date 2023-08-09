import AnimatedText from '../../components/AnimatedText'
import Test from '../../components/Test'
import styles from './page.module.css'

export default function Home() {
  return (
    <main >
      <h1 className={styles.pb}>
        George Staniland
      </h1>
      <div className={`${styles.text_container} ${styles.pb}`}>
        <p className={styles.body_text}>Hello &#128075; Im a frontend web developer. <br /> Im inspired when making beautiful, intuitive experiences with code. <br /> Outside of this work, I like photography, seeing my dog, and travelling. </p>
      </div>
      <h2 className={styles.pb_sml} >Recent Projects</h2>
      <ul>
        <li><a href="https://www.georgestaniland.net/" target="_blank">Photography Portfolio (My own work)</a></li>
        <li><a href="https://www.lomocean.com/" target="_blank">LOMOcean Marine</a></li>
        <li><a href="https://capitalscaffolding.co.nz/" target="_blank">Capital Scaffolding</a></li>
      </ul>
      <AnimatedText />
    </main >
  )
}
