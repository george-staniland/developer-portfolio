import styles from './page.module.css'
import ThreeJsCanvas from '../../components/ThreeJsCanvas'
import Footer from '../../components/Footer'
import NavMenu from '../../components/NavMenu'

export default function Home() {
  return (
    <main >
      <NavMenu showHomeLink={false} />
      <div className={styles.section_1}>
        <div className={styles.section_1_inner}>
          {/* <h2 className={`${styles.pb} ${styles.sub_title}`} >About</h2> */}
          <div className={styles.hero_text}>
            Hello, my name is George
            <span className={styles.inline_gif_wrap}>
              <img src="/test.gif" className={styles.inline_gif} alt="Gif from Giphy"></img>
            </span>
            <br></br>
            I&apos;m a front-end developer. <br />
            I&apos;m inspired <span className={styles.inline_gif_wrap}>
              <img src="/fireworks.webp" className={styles.inline_gif} alt="Gif from Giphy"></img>
            </span> when making beautiful, intuitive things with code. I also enjoy
            photography
            <span className={styles.inline_gif_wrap}>
              <img src="/photo.gif" className={styles.inline_gif} alt="Gif from Giphy"></img>
            </span>
            , seeing my dog <span className={styles.inline_gif_wrap}>
              <img src="/dog.gif" className={styles.inline_gif} alt="Gif from Giphy"></img>
            </span>, and traveling             <span className={styles.inline_gif_wrap}>
              <img src="/travel.gif" className={styles.inline_gif} alt="Gif from Giphy"></img>
            </span>
          </div>
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
