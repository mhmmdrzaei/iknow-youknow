"use client"
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

    return (
        <>
        
            <button className={`menuButton`} onClick={openMenu} >
                View List
            </button>
            <section className={`menuItems ${activeMenu ? 'menuButtonActive' : ''}`}  >
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
