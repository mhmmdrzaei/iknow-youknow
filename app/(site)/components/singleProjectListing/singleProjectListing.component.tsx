import { SingleProject } from "@/sanity/types/Project";
import PasswordProtectedProject from "../passwordProtected/passwordProtected.component";

export const dynamic = 'force-dynamic'

type HeaderProps = {
    project: SingleProject;
}

export default function ProjectPage({ project}: HeaderProps) {
    return (
        <PasswordProtectedProject project={project} />

    )

}