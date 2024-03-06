import prismadb from '@/lib/db'
import React from 'react'
import { Metadata } from 'next'
import { ProjectsColumn } from './_components/columns'
import { ProjectsClient } from './_components/client'

export const metadata: Metadata = {
    title: 'Admin - Projects',
    description: '',
}

const ProjectsPage = async () => {
    const projects = await prismadb.projects.findMany({        
        orderBy: {
            name: "asc"
        }
    })

    const formattedProjects: ProjectsColumn[] = projects.map((item) => (
        {
            id: item.id,
            imageUrl: item.imageUrl || "",
            name: item.name || "",
            website: item.website || "",
            github: item.github || ""          
        }
    ))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProjectsClient data={formattedProjects} />
            </div>
        </div>
    )
}

export default ProjectsPage