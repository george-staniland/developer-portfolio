import styles from './page.module.css'
import Footer from '../../components/Footer'
import NavMenu from '../../components/NavMenu'
import HeroText from '../../components/HeroText'
import HomePageAnimation from '../../components/HomePageAnimation'
import ProjectsSection from '../../components/ProjectsSection'
import HeroSection from '../../components/HeroSection'
import MainText from '../../components/MainText'



export default function Home() {
  return (
    <main >
      <HeroSection />
      <MainText />
    </main >
  )
}