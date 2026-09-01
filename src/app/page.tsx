import Nav from '@/components/Nav'
import MainText from '@/components/MainText'
import ListProjects from '@/components/ListProjects';
import { executeQuery } from '@datocms/cda-client';
import { getDatoCmsToken } from '@/lib/datocms';
import { GET_PROJECTS, type GetProjectsQuery } from '@/lib/queries/queries';

export default async function Home() {

  const projects = await executeQuery<GetProjectsQuery>(GET_PROJECTS, {
    token: getDatoCmsToken(),
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