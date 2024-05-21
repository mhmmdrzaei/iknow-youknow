import { SingleProject } from "@/sanity/types/Project";
import PasswordProtectedProject from "../passwordProtected/passwordProtected.component";
import {Settings} from '@/sanity/types/Settings';
import { ProjectCategory } from "@/sanity/types/ProjectCategory";

export const dynamic = 'force-dynamic'

type HeaderProps = {
    project: SingleProject;
    settings: Settings[];
    projects: SingleProject[]
    categories: ProjectCategory[]
    slug: string;
    sortedProjects: SingleProject[];
}

export default function ProjectPage({ project, settings , projects, categories, slug, sortedProjects}: HeaderProps) {
    return (
        <PasswordProtectedProject project={project} settings={settings} projects={projects} categories={categories} slug={slug} sortedProjects={[]}  />

    )

}