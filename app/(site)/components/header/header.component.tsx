
"use client"
import {Settings} from '@/sanity/types/Settings'
import {SingleProject} from '@/sanity/types/Project'
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Menu from '../headerInteractive/headerInteractive.component';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
import { useState, useEffect } from 'react';


export const dynamic = 'force-dynamic'

type HeaderProps = {
    set: Settings[];
    projects: SingleProject[]
    categories: ProjectCategory[]
   
};


export default function Header({ set, projects, categories }: HeaderProps) {
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= window.innerHeight) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
        
             
                <>
    
                <section className={`headingContainer ${isActive ? 'headingfixed' : ''}`} key={uuidv4()}>
                {set.map((setting) => ( 
                    <Link href={`/`} className='logoLink' key={setting._id}>
                    <img src={setting.logo} />
                    </Link>
                ))}
                    
                    <Menu projects={projects} categories={categories}/>

                </section>
                
                </>
               
         
        </>
    );
}