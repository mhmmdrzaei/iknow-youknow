import { getCat, getProject, getProjects, getsettings } from "@/sanity/sanity.utils";
import Header from "../components/header/header.component";
import ProjectPage from "../components/singleProjectListing/singleProjectListing.component";
import type { Metadata } from 'next';
import PrevNext from "../components/prevNext/prevNext.component";
import { v4 as uuidv4 } from 'uuid';
import CloseProject from "../components/closeProject/closeProject.component";

type Props = {
    params: { project: string }
};

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const slug = params.project;
  const settings = await getsettings();
  const project = await getProject(slug);
  const description = project?.seo?.description || settings[0]?.seoDescription || '';
  return {
    title: `${settings[0]?.title || ''} | ${project?.title || ''}`,
    description: description,

    openGraph: {
      title: `${settings[0]?.title || ''}`,
      description: description,
      url: `${settings[0]?.seoImageUrl || ''}`,
      siteName: `${settings[0]?.title || ''}`,

      images: [
        {
          url: `${settings[0]?.seoImageUrl || ''}`,
          width: 1200,
          height: 628,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function Project({ params }: Props) {
    const slug = params.project;
    const project = await getProject(slug); 
    const settings = await getsettings();
    const categories= await getCat();
    const projects = await getProjects();
    
    if (!project) {
        return (
          <main key={uuidv4()}>
            <Header set={settings} projects={projects} categories={categories}/>
            <section className="pageMain" key={uuidv4()}>
              <div className="404">Nothing found...</div>
            </section>
          </main>
        );
    }

    return (
        <main key={uuidv4()}>
          <Header set={settings} projects={projects} categories={categories}/>
          <section className="pageMain projectPage" key={uuidv4()}>
            <ProjectPage project={project} />
            <PrevNext projects={projects} categories={categories} sortedProjects={[]} slug={slug} />
          </section>
        </main>
    );
}
