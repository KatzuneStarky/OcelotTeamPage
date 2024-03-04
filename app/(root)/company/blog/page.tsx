import prismadb from "@/lib/db"
import Link from "next/link"

const BlogsPage = async () => {
  const blogs = await prismadb.blog.findMany({
    take: 10
  })

  console.log(blogs)

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {blogs.map((blog) => (
          <Link
            href={`/company/blog/${blog.id}`}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            key={blog.id}
          >
            <img
              src={blog.coverImage || ""}
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              alt={blog.title} />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogsPage