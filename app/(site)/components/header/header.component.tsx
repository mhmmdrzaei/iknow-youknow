
import {Settings} from '@/sanity/types/Settings'
import {SingleProject} from '@/sanity/types/Project'
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Menu from '../headerInteractive/headerInteractive.component';


export const dynamic = 'force-dynamic'

type HeaderProps = {
    set: Settings[];
    projects: SingleProject[]
   
};


export default function Header({ set, projects }: HeaderProps) {

    return (
        <>
        
             
                <>
    
                <section className='headingContainer' key={uuidv4()}>
                {set.map((setting) => ( 
                    <Link href={`/`} className='logoLink'>
                    <img src={setting.logo} />
                    </Link>
                ))}
                    <Link href={`#work`} className='webTitle'>
                    <h1>Work</h1>
                    </Link>
                    <Menu projects={projects}/>
                    <Link href={`/office`} className='webTitle'>
                    <h1>office</h1>
                    </Link>


                        

                </section>
                
                </>
               
         
        </>
    );
}