import { useRouter } from 'next/navigation'
export const dynamic = 'force-dynamic'

type HeaderProps = {
    slug: string;

};


export default function CloseProject({ slug}: HeaderProps) {


const router = useRouter()

  const handleCloseProject = () => {
    const projectName = slug
    router.push('/');
  
    setTimeout(() => {
      const element = document.getElementById(projectName);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); 
  };

    return (

        <button onClick={handleCloseProject} className={`close-project`}>Close Project</button>
       
    );
}