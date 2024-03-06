import prismadb from "@/lib/db"
import Link from "next/link"
import { IconName } from "../../_components/icon-name"

interface PageProps {
    params: {
        blogId: string,
    }
}

const BlogPage = async ({ params }: PageProps) => {
    const { blogId } = params
    const blogs = await prismadb.blog.findMany({
        take: 5,
        where: {
            NOT: {
                id: blogId
            }
        }
    })
    const blog = await prismadb.blog.findUnique({ where: { id: blogId } })

    return (
        <div className="flex flex-col">
            <div className="py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">{blog?.title}</h1>
                    <p className="text-gray-600"></p>
                </div>
            </div>
            <div className="py-8">
                <div className="container mx-auto px-4 flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 px-4">
                        <img src={blog?.coverImage} alt="Blog Featured Image" className="mb-8" />
                        <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: blog?.content || "" }} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 px-4">
                        <div className="bg-gray-100 p-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h2>
                            <ul className="list-none">
                                {blogs.map((data) => (
                                    <li className="mb-2" key={data.id}>
                                        <Link
                                            href={`/company/blog/${data.id}`}
                                            className="text-gray-700 hover:text-gray-900 flex">
                                            <div className="mr-2">
                                                <IconName name={"mdi:blog"} />
                                            </div>
                                            {data.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-4 mt-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
                            <ul className="list-none">
                                <li className="mb-2">
                                    <a href="#" className="text-gray-700 hover:text-gray-900">Category 1</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BlogPage