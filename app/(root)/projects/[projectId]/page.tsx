import SubTitle from '@/components/layout/title'
import prismadb from '@/lib/db'
import Link from 'next/link'
import React from 'react'

interface PageProps {
    params: {
        projectId: string,
    }
}

const ProjectPage = async ({ params }: PageProps) => {
    const { projectId } = params

    const project = await prismadb.projects.findUnique({ where: { id: projectId } })

    return (
        <>
            {project?.name}
        </>
    )
}

export default ProjectPage