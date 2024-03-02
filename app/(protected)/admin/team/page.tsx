import prismadb from '@/lib/db'
import React from 'react'
import { Metadata } from 'next'
import { TeamMemberColumn } from './_components/columns'
import { TeamMemberClient } from './_components/client'

export const metadata: Metadata = {
    title: 'Admin - Team Members',
    description: '',
}

const TeamPage = async () => {
    const teamMember = await prismadb.teamMeber.findMany({
        include: {
            socialMedia: true
        },
        orderBy: {
            name: "asc"
        }
    })

    const formattedMembers: TeamMemberColumn[] = teamMember.map((item) => (
        {
            id: item.id,
            image: item.image || "",
            name: item.name || "",
            description: item.description || "",
            role: item.role || ""
        }
    ))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TeamMemberClient data={formattedMembers} />
            </div>
        </div>
    )
}

export default TeamPage