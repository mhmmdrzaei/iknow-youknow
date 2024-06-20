import { SingleProject } from '@/sanity/types/Project';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
import Link from 'next/link';
import ProjectHero from '../projectHero/projectHero.compoent';
export const dynamic = 'force-dynamic'
import { v4 as uuidv4 } from 'uuid';
import RedirectToOffice from '../officeScroll/officeScroll.component';
import ScrollLink from '../categoryScroll/categoryScroll.component';



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

          <ul key={uuidv4()} className="singleCatListing" id={`${category.slug}`}>
            {projects
              .filter(
                (project) =>
                  project.categorySlug === category.slug && project.visible === true
              )
              .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity)) // Sort based on the 'sort' field
              .map((project) => (
                <li key={uuidv4()} id={project.slug} className='section keen-slider__slide' data-snap-point>
                  <Link href={`/${project.slug}`}>
                  <ProjectHero imagesHero={project.projectHerovisual} />
                  </Link>
                    <section className="singleProjDetails">
                    
                    <span><Link href={`/${project.slug}`}>{project.shortProjectDescription}</Link></span>
                    <div className="clientDetails">
                    <Link href={`/${project.slug}`}>
                    <span className='clientName'>
                    
                      {project.clientName && (
                          
                          <><div className='clientLabel'>Client</div>{project.clientName} </>
                      )}
                    
                    </span>
                    </Link>
                    <span className='category'>
                    <ScrollLink categoryName={project.categoryName} categorySlug={project.categorySlug}/>
                    </span>

                    </div>

                    
                    </section>
                    
                   
                    
                    
                </li>
              ))}
          </ul>
          
      ))}
      <RedirectToOffice/>
    </>
  );
}

