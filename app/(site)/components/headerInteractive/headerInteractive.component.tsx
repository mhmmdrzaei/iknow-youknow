"use client"
 
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {SingleProject} from '@/sanity/types/Project'
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
export const dynamic = 'force-dynamic'

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
    setMenuButtonText(prevText => prevText === 'View List' ? 'Close Menu' : 'View List');
};
// New function to explicitly close the menu
const closeMenu = () => {
    setActiveMenu(false);
};
const pathname = usePathname()

const router = useRouter()


const handleCloseOffice = () => {

    router.back();
    
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
            <Link  className={`link ${pathname === '/' ? 'active' : 'inactive'}`} href={`#categories`} >
                    Work
            </Link>
            <button className={`menuButton`} onClick={openMenu} >
            {menuButtonText}
            </button>
            <Link href={`/office`} className={`link ${pathname === '/office' ? 'inactive' : ''}`}>
                    office
            </Link>
            <button onClick={handleCloseProject} className={`close-project ${pathname === '/' || pathname === '/office' ? 'inactive' : 'active'}`}>Close Project</button>

            <button onClick={handleCloseOffice}  className={`link ${pathname === '/office' ? 'active' : 'inactive'}`}>
                    Close Office
            </button>
       

            </section>
            <section className={`menuItems ${activeMenu ? 'menuButtonActive' : ''}`} >
            {categories
                .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity))
                .map((category) => (
                    
                    <ul key={category._id} className="menuCatListing">
                        {projects
                        .filter(
                            (project) => project.categorySlug === category.slug && project.visible === true
                        )
                        .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity))
                        .map((project) => (
                            <li key={project._id}>
                            <Link href={`/${project.slug}`} onClick={openMenu}>
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
