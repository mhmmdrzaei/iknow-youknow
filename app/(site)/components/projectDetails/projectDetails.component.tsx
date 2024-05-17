import { HeroImage, ProjectAssets, SingleProject } from '@/sanity/types/Project';
import ProjectImages from "../../components/projectImages/projectImages.compoent";
import { PortableText } from "@portabletext/react";
import { v4 as uuidv4 } from 'uuid';
import ProjectHero from '../projectHero/projectHero.compoent';
import ProjectHeading from '../projectHeading/projectHeading.component';
import ScrollComponent from '../scroll/scroll.component'


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
    project: SingleProject;
    password?: string | null; 
    images: ProjectAssets[];
    imagesHero: HeroImage[];
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


export default function ProjectDetails({ project, password }: HeaderProps) {

    return (
        <>
         <ScrollComponent>
         <ProjectHeading project={project}/>
        <section className="projectHeadingContainer">
        {project.projectHerovisual && (
          <div className="section">
            <ProjectHero imagesHero={project.projectHerovisual} />

          </div>
          
        

         
        )}
        <div className="section">
        <section className="projectdescContainer">
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

        </div>


        </section>

      

        <section className="images">
        {project.projectImages && (
        
        <ProjectImages images={project.projectImages} />
        
        )}

        </section>
        </ScrollComponent>

        
        
    </>


    )
}