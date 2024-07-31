"use client"

import { useState } from 'react';
import ProjectDetails from '../projectDetails/projectDetails.component';
import { SingleProject } from '@/sanity/types/Project';
import ProjectHeading from '../projectHeading/projectHeading.component';
import { Settings } from '@/sanity/types/Settings';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
import PrevNext from '../prevNext/prevNext.component';

export const dynamic = 'force-dynamic'

type PasswordProtectedProjectProps = {
  project: SingleProject;
  settings: Settings[];
  projects: SingleProject[]
  categories: ProjectCategory[]
  slug: string;
  sortedProjects: SingleProject[];
};

const PasswordProtectedProject: React.FC<PasswordProtectedProjectProps> = ({ project, settings, categories, projects, slug}) => {
    const [password, setPassword] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);
  
    const handlePasswordSubmit = () => {
      if (password === project.password) {
        setShowDetails(true);
      } else {
        alert('Incorrect password');
      }
    };
  
    if (project.password && !showDetails) {

      return (
        <>
        <ProjectHeading project={project}/>
        <section className='passwordProtected'>
          <h2>Password Protected</h2>
          <p>Please enter the password to access this content:</p>
          <input
            type="password"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
        </section>
        <PrevNext projects={projects} categories={categories} slug={slug} />
        </>

      );
    }

    return <ProjectDetails project={project} settings={settings} projects={projects} categories={categories} sortedProjects={[]} slug={slug} images={[]} imagesHero={[]} />;
  };
  
  export default PasswordProtectedProject;