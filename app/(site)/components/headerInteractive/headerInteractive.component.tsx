"use client"
 
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react';
import Link from 'next/link';
import {SingleProject} from '@/sanity/types/Project'
import { ProjectCategory } from '@/sanity/types/ProjectCategory';

type HeaderProps = {
    projects: SingleProject[]
    categories: ProjectCategory[]
};


export default function Menu({ projects, categories }: HeaderProps) {

    const [activeMenu, setActiveMenu] = useState(false);

    // New function to explicitly open the menu


const openMenu = () => {
    setActiveMenu(prevState => !prevState);
};
// New function to explicitly close the menu
const closeMenu = () => {
    setActiveMenu(false);
};
const pathname = usePathname()

const router = useRouter()

const handleCloseOffice = () => {
    // Go back to the previous page location
    router.back()
  }

  const handleCloseProject = () => {
    // Get the current slug from the router object
    const currentSlug = pathname
    // Navigate back to the home page with the current slug appended as a hash
    router.push(`/#${currentSlug}`)
  }


    return (
        <>
            <section className={`menuItems ${activeMenu ? 'menuButtonActive' : ''}`}  >
            <Link  className={`link ${pathname === '/' ? 'active' : 'inactive'}`} href={`#work`} >
                    Work
            </Link>
            <button className={`menuButton`} onClick={openMenu} >
                View List
            </button>
            <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
            Home
            </Link>
            <Link href={`/office`} className={`link ${pathname === '/office' ? 'inactive' : ''}`}>
                    office
            </Link>
            <button onClick={handleCloseProject}>Close Project</button>
            <button onClick={handleCloseOffice}  className={`link ${pathname === '/office' ? 'active' : 'inactive'}`}>
                    closeOffice
            </button>
            <section className="menuItemsContainer">
            {categories
                .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity))
                .map((category) => (
                    
                    <ul key={category._id} className="singleCatListing" id={category.slug}>
                        {projects
                        .filter(
                            (project) => project.categorySlug === category.slug && project.visible === true
                        )
                        .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity))
                        .map((project) => (
                            <li key={project._id}>
                            <Link href={`/${project.slug}`} onClick={openMenu}>
                                <span>{project.projectDate}</span>
                                <span className="client">{project.title}</span>
                                <span>{project.categoryName}</span>
                            </Link>
                            </li>
                        ))}
                    </ul>
                   
                ))}
           


           

            </section>
           

            </section>

        
        </>
        
    );
}
