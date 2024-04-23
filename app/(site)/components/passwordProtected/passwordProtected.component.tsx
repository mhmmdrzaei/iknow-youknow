"use client"

import { useState } from 'react';
import ProjectDetails from '../projectDetails/projectDetails.component';
import { Project } from '@/sanity/types/Project';

export const dynamic = 'force-dynamic'

type PasswordProtectedProjectProps = {
  project: Project;
};

const PasswordProtectedProject: React.FC<PasswordProtectedProjectProps> = ({ project }) => {
    const [password, setPassword] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);
  
    const handlePasswordSubmit = () => {
      // Check if the entered password matches the project password
      if (password === project.password) {
        // If passwords match, set showDetails to true
        setShowDetails(true);
      } else {
        // If passwords do not match, show an alert
        alert('Incorrect password');
      }
    };
  
    // Check if the password field is filled out
    if (project.password && !showDetails) {

      return (
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
      );
    }

    return <ProjectDetails project={project} />;
  };
  
  export default PasswordProtectedProject;