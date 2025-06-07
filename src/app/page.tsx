import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import MainText from '@/components/MainText'
import ProjectsGrid from '@/components/ProjectsGrid'
import { performRequest } from '@/lib/datocms'
import { executeQuery } from '@datocms/cda-client';

const PROJECTS_QUERY = `
{
  allProjects {
    id
    projectTitle
    myRole
    techIcons
    websiteLink
    projectWriteUp {
      value
      __typename
    }
    websiteLink
    coverImage {
      url
    }
    _status
    _firstPublishedAt
  }
  _allProjectsMeta {
    count
  }
}
`


export default async function Home() {

  const projects = await executeQuery(PROJECTS_QUERY, {
    token: process.env.DATOCMS_API_TOKEN,
  });

  return (
    <>
      <Nav />

      <main >
        <MainText />
        <HeroSection />
        <ProjectsGrid projects={projects} />
      </main >
    </>
  )
}