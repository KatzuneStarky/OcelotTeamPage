import ProjectCard from '@/components/project-card'
import prismadb from '@/lib/db'
import React from 'react'

const ProjectsPage = async () => {
  const projects = await prismadb.projects.findMany()

  return (
    <>
      <div className='pt-[5rem] pb-[3rem]'>
        <div className='text-center'>
          <p className='text-[17px] opacity-75'>Recent Works</p>
          <h1 className='mt-[0.6rem] p-2 sm:p-0 leading-[3.5rem] 
          text-[27px] sm:text-[30px] lg:text-[38px] xl:text-[45px]'>
            Our{" "}
            <span className='text-orange-500'>
              Projects
            </span>
          </h1>
        </div>
      </div>
      <section
        data-aos="fade-in"
        className="w-full max-w-sm md:max-w-5xl m-auto grid grid-cols-3 gap-5 mb-10 items-center justify-center">
        {
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              github={project.github || ""}
              imageUrl={project.imageUrl}
              website={project.website || ""}
            />
          ))
        }
      </section>
    </>
  )
}

export default ProjectsPage