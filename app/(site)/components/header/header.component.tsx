
"use client"
import {Settings} from '@/sanity/types/Settings'
import { usePathname, useRouter } from 'next/navigation'
import {SingleProject} from '@/sanity/types/Project'
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Menu from '../headerInteractive/headerInteractive.component';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
import { useState, useEffect, useRef } from 'react';
import router from 'next/router';


export const dynamic = 'force-dynamic'

type HeaderProps = {
    set: Settings[];
    projects: SingleProject[]
    categories: ProjectCategory[]
   
};



export default function Header({ set, projects, categories }: HeaderProps) {
    const pathname = usePathname()
    const [isActive, setIsActive] = useState<boolean>(false);
    const router = useRouter()

    const handleTop = () => {
        const header = "header"
        router.push('/');
        setTimeout(() => {
          const element = document.getElementById(header);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); 
      };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= window.innerHeight +- 1) {
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
    
                <section className={`headingContainer ${isActive ? 'headingfixed' : ''} ${pathname === '/office' ? 'officeMenu' : ''}`}  key={uuidv4()}>
                {set.map((setting) => ( 
                    <figure className='logoLink' key={uuidv4()} onClick={handleTop}>
                    <img src={setting.logo} />
                    </figure>
                ))}
                    
                    <Menu projects={projects} categories={categories}/>

                </section>
                
                </>
               
         
        </>
    );
}