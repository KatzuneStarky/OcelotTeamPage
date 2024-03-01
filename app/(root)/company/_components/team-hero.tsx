const teamMebers = [
    {
        image: "https://cdn.discordapp.com/attachments/1144462878678724710/1213232878285103144/photo_2022-10-25_18-12-41.jpg?ex=65f4ba2a&is=65e2452a&hm=c49f00fba4d3dfcd8c1e3575e00508378a3548d1347680a4309851d25b256fce&",
        alt: "Katzune Starky"
    },
    {
        image: "https://cdn.pixabay.com/photo/2013/07/13/12/33/man-159847_1280.png",
        alt: "Team Member"
    },
    {
        image: "https://cdn.pixabay.com/photo/2013/07/13/12/33/man-159847_1280.png",
        alt: "Team Member"
    },
    {
        image: "https://cdn.pixabay.com/photo/2013/07/13/12/33/man-159847_1280.png",
        alt: "Team Member"
    },
    {
        image: "https://cdn.pixabay.com/photo/2013/07/13/12/33/man-159847_1280.png",
        alt: "Team Member"
    },
    {
        image: "https://cdn.pixabay.com/photo/2013/07/13/12/33/man-159847_1280.png",
        alt: "Team Member"
    },
    {
        image: "https://cdn.pixabay.com/photo/2013/07/13/12/33/man-159847_1280.png",
        alt: "Team Member"
    },
    {
        image: "https://cdn.pixabay.com/photo/2013/07/13/12/33/man-159847_1280.png",
        alt: "Team Member"
    },
    {
        image: "https://cdn.pixabay.com/photo/2013/07/13/12/33/man-159847_1280.png",
        alt: "Team Member"
    },  
]

export const TeamHero = () => {
    return (
        <div>
            <div className="container mx-auto h-full">
                <div className="flex flex-col lg:flex-row justify-center items-center py-12 mx-4 md:mx-6 ">
                    <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start">
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white text-center lg:text-left">Meet our team</h1>
                        <p className="text-base leading-normal mt-4 md:w-8/12 lg:w-11/12 text-center lg:text-left">
                            All our collaborators are at the forefront, increasing their knowledge to create the best projects
                        </p>
                    </div>
                    <div role="list" aria-label="Team members" className="lg:w-1/2 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-3 gap-x-12 gap-y-12 md:gap-x-12 mt-10 lg:mt-0 sm:w-auto w-full">
                        {teamMebers.map((item, index) => (
                            <div key={index} role="listitem" className="flex justify-center items-center ">
                                <img src={item.image} className="w-32 h-32 rounded-full object-center" alt={item.alt} role="img" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
