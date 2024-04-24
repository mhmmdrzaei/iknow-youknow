import { ProjectAssets, SingleProject } from '@/sanity/types/Project';
import ProjectImages from "../../components/projectImages/projectImages.compoent";
import { PortableText } from "@portabletext/react";
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';


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
        <section className="projectHeading">
        <h1>{project.title}</h1>
        <button>Close Project</button>
        </section>
        {project.projectHerovisual && (
          <section className={project.projectHerovisual.some(hero => hero._type === 'mobile_image') ? 'has_mobile hero_img' : 'no_mobile hero_img'}>
            {project.projectHerovisual.map((hero) => {
              switch (hero._type) {
                case 'hero_video':
                  return (
                    <div key={uuidv4()} className={`hero_Video`}>
                      <video autoPlay loop muted playsInline>
                        <source src={hero.heroImgUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  );

                case 'mobile_image':
                  return (
                    <figure key={uuidv4()} className={`mobile_image`}>
                      <Image
                        src={hero.heroImgUrl}
                        width={700}
                        height={700}
                        className="homeImg"
                        alt={`${hero.attribution} `}
                        loading="eager"
                        quality={60}
                      />
                    </figure>
                  );

                case 'hero_image':
                  return (
                    <figure key={uuidv4()} className={`hero_image`}>
                      <Image
                        src={hero.heroImgUrl}
                        width={700}
                        height={700}
                        className="homeImg"
                        alt={`${hero.attribution} `}
                        loading="eager"
                        quality={60}
                      />
                    </figure>
                  );

                default:
                  return null;
              }
            })}
          </section>
        )}
        {project.projectdescription && (
        <section className="projectDescription">
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

        <section className="images">
        
        <ProjectImages images={project.projectImages} />
        


        </section>

        
        
    </>


    )
}