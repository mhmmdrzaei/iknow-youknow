import { getCat, getProject, getProjects, getsettings } from "@/sanity/sanity.utils";
import { SingleProject } from '@/sanity/types/Project'
import Header from "../components/header/header.component";
import ProjectPage from "../components/singleProjectListing/singleProjectListing.component";
import type { Metadata, ResolvingMetadata } from 'next'
export const dynamic = 'force-dynamic'

type Props = {
    params: { project: string }
}


 
// export async function generateMetadata(
//   { params }: Props
// ): Promise<Metadata> {
//   const slug = params.project;
//   const settings = await getsettings()
//   const project = await getProject(slug);

//   return {
//     title: `${settings[0].seoTitle} | ${project.title}` ,
//     description: settings[0].seoDescription,

//     openGraph: {
//       title: `${settings[0].seoTitle}` ,
//       description: settings[0].seoDescription,
//       url: 'https://cdn.sanity.io/images/k6c4sqei/production/da9bab630e1b88eaa72e1768026f467a701b7ea3-1200x627.png',
//       siteName: 'CHADHA RANCH',

//       images: [
//         {
//           url: `${settings[0].seoImageUrl}`,
//           width: 1200,
//           height: 627,
//         },
        
        
//       ],
//       locale: 'en_US',
//     type: 'website',
//     },
//   }
// }

export default async function Project({ params }: Props) {
    const slug = params.project;
    const project = await getProject(slug); // Expecting a single project
    const settings = await getsettings();
    const categories= await getCat()
    const projects = await getProjects()


    if (!project) {
        return (

        <main>
          <Header set={settings} projects={projects}/>
        <section className="pageMain">
        <div className="404">Nothing found...</div>

        </section>
      </main>
    )
    }

    return (
        <main>
        <Header set={settings} projects={projects}/>
        <section className="pageMain projectPage">
          <ProjectPage project={project} />

        </section>
        
      </main>
    )
    
}
