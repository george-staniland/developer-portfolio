import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import MainText from '@/components/MainText'
import ProjectsGrid from '@/components/ProjectsGrid'

export default function Home() {
  return (
    <>
      <Nav />
      <main >
        <MainText />
        <HeroSection />
        <ProjectsGrid />
      </main >
    </>
  )
}