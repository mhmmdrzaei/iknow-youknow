"use client"
 
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {SingleProject} from '@/sanity/types/Project'
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
export const dynamic = 'force-dynamic'
import { v4 as uuidv4 } from 'uuid';

type HeaderProps = {
    projects: SingleProject[]
    categories: ProjectCategory[]
};


export default function Menu({ projects, categories }: HeaderProps) {

    const [activeMenu, setActiveMenu] = useState(false);
    const [menuButtonText, setMenuButtonText] = useState('View List');



const openMenu = () => {
    setActiveMenu(prevState => !prevState);
    setMenuButtonText(prevText => prevText === 'View List' ? 'Close List' : 'View List');
};
const closeMenu = () => {
    setActiveMenu(false);
};
const pathname = usePathname()

const router = useRouter()
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  };

  handleResize(); 
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const handleCloseOffice = () => {
  if (isMobile) {
    router.push('/');
  } else {
    router.back();
  }
};

  const handleCloseProject = () => {

    const currentSlug = pathname;
    const projectName = currentSlug.split('/').pop() || '';
 
    router.push('/');
  
    setTimeout(() => {
      const element = document.getElementById(projectName);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); 
  };




    return (
        <>
            <section  className='menuHeader'>
            <button key={uuidv4()} onClick={handleCloseProject} className={`close-project ${pathname === '/' || pathname === '/office' ? 'inactive' : 'active'}`}>Close Project</button>
            <Link key={uuidv4()} href={`/office`} className={`officeLink ${pathname === '/office' ? 'inactive' : ''}`}>
                    office
            </Link>
            <button key={uuidv4()} onClick={handleCloseOffice}  className={`link ${pathname === '/office' ? 'active' : 'inactive'}`}>
                    Close Office
            </button>
            <button key={uuidv4()} className={`menuButton`} onClick={openMenu} >
            {menuButtonText}
            </button>
            <Link key={uuidv4()} className={`worksLink ${pathname === '/' ? 'active' : 'inactive'}`} href={`#categories`} >
                    Work
            </Link>




       

            </section>
            <section key={uuidv4()} className={`menuItems ${activeMenu ? 'menuButtonActive' : ''}`} >
            {categories
                .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity))
                .map((category) => (
                    
                    <ul key={uuidv4()} className="menuCatListing">
                        {projects
                        .filter(
                            (project) => project.categorySlug === category.slug && project.visible === true
                        )
                        .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity))
                        .map((project) => (
                            <li key={uuidv4()}>
                            <Link key={uuidv4()} href={`/${project.slug}`} onClick={openMenu}>
                                <span className='date'>{project.projectDate}</span>
                                <span className="client">{project.title}</span>
                                <span className='cat'>{project.categoryName}</span>
                            </Link>
                            </li>
                        ))}
                    </ul>
                   
                ))}
           


           

            </section>

        
        </>
        
    );
}
