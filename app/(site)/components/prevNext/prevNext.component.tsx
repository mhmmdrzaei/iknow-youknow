"use client"
import { SingleProject } from '@/sanity/types/Project';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {useRouter } from 'next/navigation'

type HeaderProps = {
    projects: SingleProject[];
    sortedProjects: SingleProject[];
    categories: ProjectCategory[];
    slug: string;
};

export default function PrevNext({ projects, categories, slug }: HeaderProps) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 630);
        };

        const handleScroll = () => {
            setIsFixed(window.scrollY > (window.innerHeight + 50)); // Check if scrolled beyond 200vh
        };

        handleResize(); // Check initial screen width
        window.addEventListener('resize', handleResize); // Add event listener for resize
        window.addEventListener('scroll', handleScroll); // Add event listener for scroll

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup the resize event listener
            window.removeEventListener('scroll', handleScroll); // Cleanup the scroll event listener
        };
    }, []);

    if (!isSmallScreen) {
        return null; // If not a small screen, don't render anything
    }

    let sortedProjects: SingleProject[] = [];
    categories.forEach(category => {
        const categoryProjects = projects.filter(project => project.categorySlug === category.slug && project.visible === true);
        sortedProjects = sortedProjects.concat(categoryProjects);
    });

    const projectIndex = sortedProjects.findIndex(project => project.slug === slug);

    let previousSlug = null;
    let nextSlug = null;

    if (projectIndex > 0) {
        previousSlug = sortedProjects[projectIndex - 1].slug;
    } else {
        // If current project is the first item, set nextSlug to the second project's slug
        nextSlug = sortedProjects[1].slug;
    }

    if (projectIndex < sortedProjects.length - 1) {
        nextSlug = sortedProjects[projectIndex + 1].slug;
    } else {
        // If current project is the last item, set previousSlug to the second last project's slug
        previousSlug = sortedProjects[projectIndex - 1].slug;
    }

    const hasPrevious = !!previousSlug; // Convert to boolean
    const hasNext = !!nextSlug; // Convert to boolean
    const isSingleLink = (hasPrevious && !hasNext) || (!hasPrevious && hasNext);
    const router = useRouter()

    const handleCloseProject = () => {
        // Get the current slug from the router object
        const currentSlug = slug;
        const projectName = currentSlug.split('/').pop() || '';
      
        // Navigate to the home page
        router.push('/');
      
        // Scroll to the element after a brief delay
        setTimeout(() => {
          // Find the element with the ID of projectName
          const element = document.getElementById(projectName);
          if (element) {
            // Scroll to the element
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); // Adjust the delay time as needed
      };

    return (
        <div className={`pagination ${isFixed ? 'fixedpagenation' : ''} ${isSingleLink ? 'singleLink' : ''}`}>
            <button onClick={handleCloseProject} className={`close-project`}>Close Project</button>
            {previousSlug && (
                <Link href={`/${previousSlug}`}>
                    Previous
                </Link>
            )}
            {nextSlug && (
                <Link href={`/${nextSlug}`}>
                    Next
                </Link>
            )}
        </div>
    );
}

