import { executeQuery } from '@datocms/cda-client';
import { getDatoCmsToken } from '@/lib/datocms';
import { GET_APPLICATION } from '@/lib/queries/queries';
import { StructuredText, VideoPlayer } from 'react-datocms';
import Nav from '@/components/Nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    robots: {
      index: false,
      follow: false,
      noarchive: true,
    },
  };

export default async function page ({ params,} : { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const applicationDetails:any = await executeQuery(GET_APPLICATION, {
        token: getDatoCmsToken(),
        variables: { slug },
    } );


    const { applicationPage: role } = applicationDetails;
 

    return (
        <section className="page__application px">
            <Nav/>
            <div className="inner">
                <h1 className="fh2">{role?.companyName}</h1>
                <p className="fh3"> - {role?.jobRoleTitle}</p>
                <div className="writer fb">
                    <StructuredText data={role?.paragraph} />
                </div>

                 {role?.applicationVideo && 

                    <section className="video-wrapper">
                        <VideoPlayer data={role.applicationVideo.video}  />
                    </section>

                }
                
            </div>
        </section>
    )
}