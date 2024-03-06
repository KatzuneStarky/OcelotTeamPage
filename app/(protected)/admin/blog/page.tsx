import prismadb from '@/lib/db'
import React from 'react'
import { Metadata } from 'next'
import { BlogClient } from './_components/client'
import { BlogColumn } from './_components/columns'

export const metadata: Metadata = {
    title: 'Admin - Blogs',
    description: '',
}

const AdminBlogPage = async () => {
    const blogs = await prismadb.blog.findMany({
        orderBy: {
            title: "asc"
        }
    })

    const formattedBlogs: BlogColumn[] = blogs.map((item) => (
        {
            id: item.id,
            title: item.title,
            content: item.content || "",
            category: item.category || "",
            coverImage: item.coverImage || "",
            isArchived: item.isArchived || false,
            isPublished: item.isPublished || false
        } 
    ))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BlogClient data={formattedBlogs} />
            </div>
        </div>
    )
}

export default AdminBlogPage