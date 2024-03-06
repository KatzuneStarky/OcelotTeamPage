import prismadb from "@/lib/db"
import { ProjectForm } from "./_components/project-form"

interface PageProps {
    params: {
        projectId: string,
    }
}

const page = async ({ params }: PageProps) => {
    const { projectId } = params

    const project = await prismadb.projects.findFirst({ where: { id: projectId }, include: { technologies: true } })
    const technologies = await prismadb.technologies.findMany({ where: { projectId } })
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProjectForm initialData={project} data={technologies} />
            </div>
        </div>
    )
}

export default page