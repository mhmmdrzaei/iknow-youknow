"use client"
import { SingleProject } from '@/sanity/types/Project';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type HeaderProps = {
    projects: SingleProject[];
    sortedProjects: SingleProject[];
    categories: ProjectCategory[];
    slug: string;
};

export default function PrevNext({ projects, categories, slug }: HeaderProps) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 630);
        };

        handleResize(); // Check initial screen width
        window.addEventListener('resize', handleResize); // Add event listener for resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup the event listener
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

    return (
        <div className="pagination">
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
