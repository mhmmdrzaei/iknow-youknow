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
    // Get the current slug from the router object
    const projectName = project.slug
    // Navigate back to the home page with the project name appended as a hash
    router.push(`/#${projectName}`);
  }


    return (
        <section className="projectHeading">
        <h1>{project.title}</h1>
        <button onClick={handleCloseProject}>Close Project</button>
        </section>
       
    );
}
