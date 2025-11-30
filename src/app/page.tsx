import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import MainText from '@/components/MainText'
import ProjectsGrid from '@/components/ProjectsGrid'
import { executeQuery } from '@datocms/cda-client';

const PROJECTS_QUERY = `
{
  allProjects {
    id
    projectTitle
    myRole
    studioCompletedAt
    websiteLink
    projectWriteUp {
      value
    }
    accordion {
      rowTitle
      rowContent {
        value
			}
    }
    techIcons {
      title
      reactIconMarkup
    }
    brandColour {
      hex
    }
    websiteLink
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
      <main className="home-page" >
        <HeroSection />
        <MainText />
       
        <ProjectsGrid projects={projects} />
      </main >
    </>
  )
}