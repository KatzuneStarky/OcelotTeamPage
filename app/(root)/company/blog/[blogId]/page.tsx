import prismadb from "@/lib/db"
import Link from "next/link"
import { IconName } from "../../_components/icon-name"
import { Badge } from "@/components/ui/badge";

interface PageProps {
    params: {
        blogId: string,
    }
}

async function getCategoryCounts() {
    const allBlogs = await prismadb.blog.findMany();
    const categoryCounts: { [category: string]: number } = {};

    allBlogs.forEach(blog => {
        if (blog.category) {
            if (categoryCounts[blog.category]) {
                categoryCounts[blog.category]++;
            } else {
                categoryCounts[blog.category] = 1;
            }
        }
    });

    const categoriesWithCounts = Object.keys(categoryCounts).map(category => ({
        category,
        count: categoryCounts[category],
    }));

    return categoriesWithCounts;
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
    const categories = await getCategoryCounts();

    return (
        <div className="flex flex-col">
            <div className="py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">{blog?.title}</h1>
                    <p className="text-gray-600">{blog?.category}</p>
                </div>
            </div>
            <div className="pt-4 pb-10">
                <div className="container mx-auto px-4 flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 px-4">
                        <img src={blog?.coverImage} alt="Blog Featured Image" className="mb-8" />
                        <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: blog?.content || "" }} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 px-4">
                        <div className="bg-gray-100 dark:bg-slate-700 p-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Posts</h2>
                            <ul className="list-none">
                                {blogs.length > 0 ? (
                                    blogs.map((data) => (
                                        <li className="mb-2" key={data.id}>
                                            <Link
                                                href={`/company/blog/${data.id}`}
                                                className="text-gray-700 hover:text-gray-900 dark:hover:text-white flex">
                                                <div className="mr-2">
                                                    <IconName name={"mdi:blog"} />
                                                </div>
                                                {data.title}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <div className="text-center">
                                        <h1>No blogs available</h1>
                                        <img
                                            src="https://i.pinimg.com/originals/52/4c/6c/524c6c3d7bd258cd165729ba9b28a9a2.png"
                                            alt="No blogs available"
                                        />
                                    </div>
                                )}
                            </ul>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-700 p-4 mt-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Categories</h2>
                            <ul className="list-none">
                                {categories.map((data, index) => (
                                    <li className="mb-2" key={index}>
                                        <Link
                                            href={`/company/blog/category/${data.category}`}
                                            className="flex justify-between items-center text-gray-700 dark:text-white hover:text-gray-900"
                                        >
                                            {data.category}
                                            <Badge>{data.count}</Badge>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPage