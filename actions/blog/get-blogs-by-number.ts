import prismadb from "@/lib/db";

export const getBlogsByNumer = async(perPage: number, skip: number) => {
    const fetchedBlogs = await prismadb.blog.findMany({
        take: perPage,
        skip,
        orderBy: { createAt: "desc" },
      });

      return fetchedBlogs
}