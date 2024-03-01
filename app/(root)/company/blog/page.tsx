import Featured from '@/components/blog/featured'
import React from 'react'

const BlogsPage = () => {
  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Featured />
      </div>
    </div>
  )
}

export default BlogsPage