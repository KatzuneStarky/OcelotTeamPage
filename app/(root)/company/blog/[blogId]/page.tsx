import prismadb from "@/lib/db"

interface PageProps {
    params: {
        blogId: string,
    }
}

const BlogPage = async ({ params }: PageProps) => {
    const { blogId } = params
    const blog = await prismadb.blog.findUnique({ where: { id: blogId } })

    return (
        <div>{JSON.stringify(blog)}</div>
    )
}

export default BlogPage