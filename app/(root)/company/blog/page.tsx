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
                      <a href="#" className="hover:underline">Blog</a>
                    </p>
                    <a href="#" className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                      <p className="mt-3 text-base text-gray-500">
                        <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
                      </p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href="#">
                        <span className="sr-only">Roel Aufderehar</span>
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="" />                  </a>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        <a href="#" className="hover:underline">Roel Aufderehar</a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">

                        <span aria-hidden="true">·</span>
                        <span>6 min read</span>
                      </div>
                    </div>
                  </div>
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