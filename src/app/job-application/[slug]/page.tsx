import { executeQuery } from '@datocms/cda-client';
import { getDatoCmsToken } from '@/lib/datocms';
import { GET_APPLICATION } from '@/lib/queries/queries';


export default async function page ({ params,} : { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const applicationDetails:any = await executeQuery(GET_APPLICATION, {
        token: getDatoCmsToken(),
        variables: { slug },
    } );


    const { applicationPage: role } = applicationDetails;

    return (
        <section className="page__application px">
            <div className="inner">
                <h1 className="fh2">{role?.companyName}</h1>
                <p className="fh3">{role?.jobRoleTitle}</p>
                <div className="writer fb">
                    <p>para</p>
                </div>
                <section className="video-wrapper">
                    <video 
                        src={role?.applicationVideo.url} 
                        aria-label={`application video for ${role?.companyName}`}
                        controls
                    >
                    </video>
                </section>
            </div>
        </section>
    )
}