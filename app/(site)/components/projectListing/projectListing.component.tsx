import { SingleProject } from '@/sanity/types/Project';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
import Link from 'next/link';
import ProjectHero from '../projectHero/projectHero.compoent';
export const dynamic = 'force-dynamic'

type HeaderProps = {
  projects: SingleProject[];
  categories: ProjectCategory[];
};



export default function ProjectListing({ projects, categories }: HeaderProps) {
  return (
    <>
      {categories
       .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity))
      .map((category) => (

          <ul key={category._id} className="singleCatListing" id={`${category.slug}`}>
            {projects
              .filter(
                (project) =>
                  project.categorySlug === category.slug && project.visible === true
              )
              .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity)) // Sort based on the 'sort' field
              .map((project) => (
                <li key={project._id} id={project.slug}>
                  <Link href={`/${project.slug}`}>
                  <ProjectHero imagesHero={project.projectHerovisual} />

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
                    
                   
                    
                    </Link>
                </li>
              ))}
          </ul>
      ))}
    </>
  );
}

