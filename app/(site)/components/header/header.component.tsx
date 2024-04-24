
import {Settings} from '@/sanity/types/Settings'
import {SingleProject} from '@/sanity/types/Project'
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Menu from '../headerInteractive/headerInteractive.component';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';


export const dynamic = 'force-dynamic'

type HeaderProps = {
    set: Settings[];
    projects: SingleProject[]
    categories: ProjectCategory[]
   
};


export default function Header({ set, projects, categories }: HeaderProps) {

    return (
        <>
        
             
                <>
    
                <section className='headingContainer' key={uuidv4()}>
                {set.map((setting) => ( 
                    <Link href={`/`} className='logoLink'>
                    <img src={setting.logo} />
                    </Link>
                ))}
                    
                    <Menu projects={projects} categories={categories}/>
                    


                        

                </section>
                
                </>
               
         
        </>
    );
}