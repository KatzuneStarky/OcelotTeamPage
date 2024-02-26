import DotsSvg from '@/assets/svg/dots'
import Link from 'next/link'
import React from 'react'

const AboutPage = () => {
  return (
    <section className="overflow-hidden">
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center justify-between -mx-4">
        <div className="w-full px-4 lg:w-6/12">
          <div className="flex items-center -mx-3 sm:-mx-4">
            <div className="w-full px-3 sm:px-4 xl:w-1/2">
              <div className="py-3 sm:py-4">
                <img
                  src="https://i.ibb.co/gFb3ns6/image-1.jpg"
                  alt=""
                  className="w-full rounded-2xl"
                />
              </div>
              <div className="py-3 sm:py-4">
                <img
                  src="https://i.ibb.co/rfHFq15/image-2.jpg"
                  alt=""
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:px-4 xl:w-1/2">
              <div className="relative z-2 my-4">
                <img
                  src="https://i.ibb.co/9y7nYCD/image-3.jpg"
                  alt=""
                  className="w-full rounded-2xl"
                />
                <span className="absolute -right-7 -bottom-7 z-[-1]">
                  <DotsSvg />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
          <div className="mt-10 lg:mt-0">
            <span className="block mb-4 text-lg font-semibold text-primary">
              Why Choose Us
            </span>
            <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
              Master your presence on the web and increase your sales with our specialized service! 🐾🌟
            </h2>
            <p className="mb-5 text-base text-body-color dark:text-dark-6">
            Optimize your online presence in the furry fandom with our unique service! From publishing to sales, we offer you specialized tools so you have complete control.
            </p>
            <p className="mb-8 text-base text-body-color dark:text-dark-6">
            Maximize your reach and boost your income with our platform designed specifically for the furry fandom. Join us and make your brand stand out in the community!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center py-3 text-base font-medium text-center border border-transparent rounded-md px-7 bg-black hover:bg-opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default AboutPage