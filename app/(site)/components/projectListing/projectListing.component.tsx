import { SingleProject } from '@/sanity/types/Project';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
import Link from 'next/link';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
type HeaderProps = {
  projects: SingleProject[];
  categories: ProjectCategory[];
};

export const dynamic = 'force-dynamic'

export default function ProjectListing({ projects, categories }: HeaderProps) {
  return (
    <>
      {categories
       .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity))
      .map((category) => (
        <div key={category._id} className="singleCatListing" id={`${category.slug}`}>
          <h2>{category.name}</h2>
          <ul>
            {projects
              .filter(
                (project) =>
                  project.categorySlug === category.slug && project.visible === true
              )
              .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity)) // Sort based on the 'sort' field
              .map((project) => (
                <li key={project._id}>
                  <Link href={`/${project.slug}`}>
                    <section className="projectEach">
                    {project.projectHerovisual && (
                      project.projectHerovisual.map((hero)=> {
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
                      })
                    

                    )}
                    <section className="singleProjDetails">
                    <span>{project.shortProjectDescription}</span>
                    <span className='clientName'>
                      {project.clientName && (
                          
                          <>Client: {project.clientName} </>
                      )}
                    </span>
                    <span className='category'>
                      {project.categoryName && (
                          
                        <>  {project.categoryName}</>
                      )}
                    </span>
                    
                    </section>
                    
                    
                    </section>
                   
                    
                    </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
}

