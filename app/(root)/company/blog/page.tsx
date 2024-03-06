import { Button } from "@/components/ui/button"
import prismadb from "@/lib/db"
import Link from "next/link"

const BlogsPage = async () => {
  const blogs = await prismadb.blog.findMany({
    take: 10
  })

  return (
    <div className="flex-col w-full h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {
            blogs.map((blog) => (
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg" key={blog.id}>
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-fill" src={blog.coverImage} alt={blog.title} />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <p className="hover:underline">Blog</p>
                    </p>
                    <div className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                      <p className="mt-3 text-base text-gray-500">
                        <div dangerouslySetInnerHTML={{ __html: blog.content ? blog.content.substring(0, 200) + "..." : "" }} />
                      </p>
                    </div>
                  </div>
                  <Link href={`/company/blog/${blog.id}`} className="m-4">
                    <Button>Read more</Button>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BlogsPage