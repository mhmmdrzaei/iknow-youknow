"use client";
import { SingleProject } from "@/sanity/types/Project";
import { ProjectCategory } from "@/sanity/types/ProjectCategory";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";

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
        (project) =>
          project.categorySlug === category.slug && project.visible === true
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
      setIsFixed(window.scrollY > window.innerHeight + 50);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isSmallScreen) {
    return null;
  }

  const { sortedProjects } = sortCategoriesAndProjects(categories, projects);

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
    nextSlug = sortedProjectsFlat[1].slug;
  }

  if (projectIndex < sortedProjectsFlat.length - 1) {
    nextSlug = sortedProjectsFlat[projectIndex + 1].slug;
  } else {
    previousSlug = sortedProjectsFlat[projectIndex - 1].slug;
  }

  const hasPrevious = !!previousSlug;
  const hasNext = !!nextSlug;
  const isSingleLink = (hasPrevious && !hasNext) || (!hasPrevious && hasNext);

  const handleCloseProject = () => {
    const currentSlug = slug;
    const projectName = currentSlug.split("/").pop() || "";

    router.push("/");

    setTimeout(() => {
      const element = document.getElementById(projectName);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div
      className={`pagination ${isFixed ? "fixedpagenation" : ""} ${
        isSingleLink ? "singleLink" : ""
      }`}
    >
      <button onClick={handleCloseProject} className={`close-project`}>
        Close Project
      </button>
      {previousSlug && <Link href={`/${previousSlug}`}>Next</Link>}
      {nextSlug && <Link href={`/${nextSlug}`}>Previous</Link>}
    </div>
  );
}
