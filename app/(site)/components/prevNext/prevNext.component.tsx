"use client";
import { SingleProject } from '@/sanity/types/Project';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Helper function to sort categories and projects
const sortCategoriesAndProjects = (
  categories: ProjectCategory[],
  projects: SingleProject[]
) => {
  const sortedCategories = categories.sort(
    (a, b) => (a.sort || Infinity) - (b.sort || Infinity)
  );

  const sortedProjects = sortedCategories.map((category) => ({
    ...category,
    projects: projects
      .filter(
        (project) => project.categorySlug === category.slug && project.visible === true
      )
      .sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity)),
  }));

  return { sortedCategories, sortedProjects };
};

type HeaderProps = {
  projects: SingleProject[];
  categories: ProjectCategory[];
  slug: string;
};

export default function PrevNext({ projects, categories, slug }: HeaderProps) {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 630);
    };

    const handleScroll = () => {
      setIsFixed(window.scrollY > window.innerHeight + 50); // Check if scrolled beyond 200vh
    };

    handleResize(); // Check initial screen width
    window.addEventListener('resize', handleResize); // Add event listener for resize
    window.addEventListener('scroll', handleScroll); // Add event listener for scroll

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup the resize event listener
      window.removeEventListener('scroll', handleScroll); // Cleanup the scroll event listener
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  if (!isSmallScreen) {
    return null; // If not a small screen, don't render anything
  }

  // Apply the sorting function
  const { sortedProjects } = sortCategoriesAndProjects(categories, projects);

  // Flatten sortedProjects for previous/next navigation logic
  let sortedProjectsFlat: SingleProject[] = [];
  sortedProjects.forEach((category) => {
    sortedProjectsFlat = sortedProjectsFlat.concat(category.projects);
  });

  const projectIndex = sortedProjectsFlat.findIndex(
    (project) => project.slug === slug
  );

  let previousSlug: string | null = null;
  let nextSlug: string | null = null;

  if (projectIndex > 0) {
    previousSlug = sortedProjectsFlat[projectIndex - 1].slug;
  } else {
    // If current project is the first item, set nextSlug to the second project's slug
    nextSlug = sortedProjectsFlat[1].slug;
  }

  if (projectIndex < sortedProjectsFlat.length - 1) {
    nextSlug = sortedProjectsFlat[projectIndex + 1].slug;
  } else {
    // If current project is the last item, set previousSlug to the second last project's slug
    previousSlug = sortedProjectsFlat[projectIndex - 1].slug;
  }

  const hasPrevious = !!previousSlug; // Convert to boolean
  const hasNext = !!nextSlug; // Convert to boolean
  const isSingleLink = (hasPrevious && !hasNext) || (!hasPrevious && hasNext);

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
    <div
      className={`pagination ${isFixed ? 'fixedpagenation' : ''} ${
        isSingleLink ? 'singleLink' : ''
      }`}
    >
      <button onClick={handleCloseProject} className={`close-project`}>
        Close Project
      </button>
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
