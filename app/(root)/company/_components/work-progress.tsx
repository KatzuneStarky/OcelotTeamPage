import { Laugh, Layers, LayoutPanelTop, Store } from 'lucide-react'
import React from 'react'

export const WorkProgress = () => {
    return (
        <div className="">
            <section className="mx-auto container py-20 ">
                <div className="flex justify-center items-center flex-col">
                    <div className="lg:text-6xl md:text-5xl text-4xl font-black leading-10 text-center text-gray-800 dark:text-white">
                        <h1>How we work</h1>
                    </div>
                    <div className="pt-24 grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center xl:gap-y-16 gap-y-20 gap-x-16 lg:gap-x-20 xl:gap-x-0 lg:px-10 xl:px-0">

                        <div className="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
                            <div className="mb-6">
                                <Laugh className='w-8 h-8' />
                            </div>
                            <div className="text-gray-800 dark:text-white text-2xl font-semibold text-center">
                                <h2>User friendly</h2>
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 mt-2 text-lg text-center">
                                <p>We try to make our software intuitive so that anyone can use it</p>
                            </div>
                        </div>

                        <div className="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
                            <div className="mb-6">
                                <Store className='w-8 h-8' />
                            </div>
                            <div className="text-gray-800 dark:text-white text-2xl font-semibold text-center">
                                <h2>One Place</h2>
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 mt-2 text-lg text-center ">
                                <p>Your own online store and your social networks in one place</p>
                            </div>
                        </div>

                        <div className="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
                            <div className="mb-6">
                                <Layers className='w-8 h-8' />
                            </div>
                            <div className="text-gray-800 dark:text-white text-2xl font-semibold text-center">
                                <h2>Well organised</h2>
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 mt-2 text-lg text-center">
                                <p>Everything in one place, no need to worry</p>
                            </div>
                        </div>                        
                    </div>
                </div>
            </section>
        </div>
    )
}
