import Nav from '@/components/Nav'
import HeroSectionWrap from '@/components/HeroSectionWrap'
import MainText from '@/components/MainText'
import ProjectsGrid from '@/components/ProjectsGrid'
import { executeQuery } from '@datocms/cda-client';
import { GET_PROJECTS } from '@/lib/queries/queries';

export default async function Home() {

  const projects = await executeQuery(GET_PROJECTS, {
    token: process.env.DATOCMS_API_TOKEN,
  });

  return (
    <>
      <Nav />
      <main className="home-page" >
        <MainText />
      </main >
    </>
  )
}