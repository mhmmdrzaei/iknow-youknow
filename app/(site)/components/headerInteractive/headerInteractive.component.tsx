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

    // New function to explicitly open the menu


const openMenu = () => {
    setActiveMenu(prevState => !prevState);
    setMenuButtonText(prevText => prevText === 'View List' ? 'Close List' : 'View List');
};
// New function to explicitly close the menu
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

  handleResize(); // Check on initial load
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
    // Get the current slug from the router object
    const currentSlug = pathname;
    const projectName = currentSlug.split('/').pop() || '';
  
    // Navigate to the home page
    router.push('/');
  
    // Scroll to the element after a brief delay
    setTimeout(() => {
      // Find the element with the ID of projectName
      const element = document.getElementById(projectName);
      if (element) {
        // Scroll to the element
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Adjust the delay time as needed
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
