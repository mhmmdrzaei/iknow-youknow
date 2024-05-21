import { HeroImage, ProjectAssets, SingleProject } from '@/sanity/types/Project';
import ProjectImages from "../../components/projectImages/projectImages.compoent";
import { PortableText } from "@portabletext/react";
import { v4 as uuidv4 } from 'uuid';
import ProjectHero from '../projectHero/projectHero.compoent';
import ProjectHeading from '../projectHeading/projectHeading.component';
import ScrollComponent from '../scroll/scroll.component'
import { Settings } from '@/sanity/types/Settings';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
import PrevNext from '../prevNext/prevNext.component';
import Header from '../header/header.component';


export const dynamic = 'force-dynamic'

type LinkMark = {
    blank?: boolean;
    href: string;
  };
  
  type Components = {
    marks: {
      link: (props: { value: LinkMark; children: React.ReactNode }) => React.ReactNode;
    };
  };

type HeaderProps = {
    password?: string | null; 
    images: ProjectAssets[];
    imagesHero: HeroImage[];
    project: SingleProject;
    settings: Settings[];
    projects: SingleProject[]
    categories: ProjectCategory[]
    slug: string;
    sortedProjects: SingleProject[];
}
  
  
  const components: Components = {
    marks: {
      link: ({ value, children }) => {
        const { blank, href } = value;
        return blank ? (
          <a href={href} target="_blank" rel="noopener">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        );
      },
    },
  };


export default function ProjectDetails({ project, password, projects, categories, slug,settings }: HeaderProps) {

    return (
        <>
         <ScrollComponent>

        {project.projectHerovisual && (
          <div className="projectHeadingContainer" data-snap-point>
          <ProjectHeading project={project}/>
          <ProjectHero imagesHero={project.projectHerovisual} />

          </div>
          
        

         
        )}
        <section className="projcetbodyContainer">
        <Header set={settings} projects={projects} categories={categories}/>
        <section className="section" data-snap-point>
        <section className="projectdescContainer"  >
            {project.projectdescription && (
              <section className="projectDescription" key={uuidv4()}>
                  <PortableText value={project.projectdescription} components={components as any} />
              </section>
            )}
            {project.creditsProject && (
              <section className="creditContainer">
                {project.creditsProject.map((credit)=>(
                <div className="credit" key={credit._key}>
                  <span>{credit.creditLabel}</span>
                  <span>{credit.creditName}</span>
                </div>
              ))}
              </section>
              
            )}
              
          </section>

        </section>

          <section className="imagecontainer">
          <section className="images">
            {project.projectImages && (
            
            <ProjectImages images={project.projectImages} />
            
            )}

        </section>
          <PrevNext projects={projects} categories={categories} sortedProjects={[]} slug={slug} />

          </section>


        </section>




      


        </ScrollComponent>

        
        
    </>


    )
}