import prismadb from "@/lib/db"
import { BlogForm } from "./_components/blog-form"

interface PageProps {
    params: {
        blogId: string,
    }
}

const page = async ({ params }: PageProps) => {
    const { blogId } = params

    const blog = await prismadb.blog.findFirst({ where: { id: blogId } })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BlogForm initialData={blog} />
            </div>
        </div>
    )
}

export default page