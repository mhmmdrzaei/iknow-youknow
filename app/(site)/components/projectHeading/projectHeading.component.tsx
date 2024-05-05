"use client"
import { useRouter } from 'next/navigation'
import {SingleProject} from '@/sanity/types/Project'
export const dynamic = 'force-dynamic'

type HeaderProps = {
    project: SingleProject

};


export default function ProjectHeading({ project}: HeaderProps) {


const router = useRouter()

  const handleCloseProject = () => {
    const projectName = project.slug
    router.push('/');
  
    setTimeout(() => {
      const element = document.getElementById(projectName);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); 
  };

    return (
        <section className="projectHeading" key={project._id}>
        <h1>{project.title}</h1>
        <button onClick={handleCloseProject}>Close Project</button>
        </section>
       
    );
}
