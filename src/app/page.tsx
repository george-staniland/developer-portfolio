import Nav from '@/components/Nav'
import MainText from '@/components/MainText'
import ListProjects from '@/components/ListProjects';
import { executeQuery } from '@datocms/cda-client';
import { GET_PROJECTS, type GetProjectsQuery } from '@/lib/queries/queries';

export default async function Home() {

  const projects = await executeQuery<GetProjectsQuery>(GET_PROJECTS, {
    token: process.env.DATOCMS_API_TOKEN,
  });

  return (
    <>
      <Nav />
      <main className="home-page" >
        <MainText />
        <ListProjects projects={projects.allProjects} />
      </main >
    </>
  )
}