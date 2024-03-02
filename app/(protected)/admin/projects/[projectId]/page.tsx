import prismadb from "@/lib/db"
import { ProjectForm } from "./_components/project-form"

interface PageProps {
    params: {
        projectId: string,
    }
}

const page = async ({ params }: PageProps) => {
    const { projectId } = params

    const project = await prismadb.projects.findFirst({ where: { id: projectId } })
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProjectForm initialData={project} />
            </div>
        </div>
    )
}

export default page