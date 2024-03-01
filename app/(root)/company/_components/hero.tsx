import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Image } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
    return (
        <div className="py-20 flex flex-col items-center justify-center">
            <div className="xl:w-1/2 w-11/12">
                <h1 role="heading" tabIndex={0} className="text-6xl font-bold text-center text-gray-800 dark:text-white/80">
                    Ocelot Team: Developing Together, Welcoming Everyone
                </h1>
                <h2 role="contentinfo" tabIndex={0} className="text-base leading-normal text-center text-gray-600 dark:text-white/80 mt-5">
                    At Ocelot Team, we fuse excellence in software development with an inclusive community where everyone can explore their furry side.
                    Join us and discover a digital world where every voice counts and every queue is welcome
                </h2>
            </div>
            <div className="2xl:px-20 lg:px-12 px-4 flex flex-wrap items-start mt-4">
                <div className="mt-24">
                    <div className="flex items-end ">
                        <HoverCard>
                            <HoverCardTrigger>
                                <img
                                    tabIndex={0}
                                    src="https://i.quotev.com/4uc7ng2maaaa.jpg"
                                    alt="Haru Beastars"
                                    className="w-20 h-20 rounded-lg mr-6"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent className="text-center">
                                <p className="mb-2">
                                    The image belongs to another artist, here you can find it
                                </p>
                                <div className="flex items-center justify-center">
                                    <Image className="h-4 w-4 mr-2" />
                                    <Link href="https://i.quotev.com/4uc7ng2maaaa.jpg" target="_blank">
                                        Original image
                                    </Link>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                            <HoverCardTrigger>
                                <img
                                    tabIndex={0}
                                    src="https://d.furaffinity.net/art/zhearun/1601308579/1601308579.zhearun_nick_lineless.jpg"
                                    alt="Nick Wilde"
                                    className="w-48 h-36 rounded-lg"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent className="text-center">
                                <p className="mb-2">
                                    The image belongs to another artist, here you can find it
                                </p>
                                <div className="flex items-center justify-center">
                                    <Image className="h-4 w-4 mr-2" />
                                    <Link
                                        href="https://d.furaffinity.net/art/zhearun/1601308579/1601308579.zhearun_nick_lineless.jpg"
                                        target="_blank"
                                    >
                                        Original image
                                    </Link>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    <div className="flex items-center justify-end my-6">
                        <HoverCard>
                            <HoverCardTrigger>
                                <img
                                    tabIndex={0}
                                    src="https://static.zerochan.net/Hiwatashi.Nazuna.full.3352290.jpg"
                                    alt="Nazuna Hiwatashi"
                                    className="w-48 h-48 rounded-lg"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent className="text-center">
                                <p className="mb-2">
                                    The image belongs to another artist, here you can find it
                                </p>
                                <div className="flex items-center justify-center">
                                    <Image className="h-4 w-4 mr-2" />
                                    <Link
                                        href="https://static.zerochan.net/Hiwatashi.Nazuna.full.3352290.jpg"
                                        target="_blank"
                                    >
                                        Original image
                                    </Link>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    <div className="flex items-start">
                        <HoverCard>
                            <HoverCardTrigger>
                                <img
                                    tabIndex={0}
                                    src="https://64.media.tumblr.com/a801e3433a9f77574747d247e38ada5c/fff972d41b76f903-2e/s1280x1920/f1b439f9007766a1b26653619eba865aed52605c.jpg"
                                    alt="Legoshi Beastars"
                                    className="w-48 h-48 rounded-lg"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent className="text-center">
                                <p className="mb-2">
                                    The image belongs to another artist, here you can find it
                                </p>
                                <div className="flex items-center justify-center">
                                    <Image className="h-4 w-4 mr-2" />
                                    <Link
                                        href="https://64.media.tumblr.com/a801e3433a9f77574747d247e38ada5c/fff972d41b76f903-2e/s1280x1920/f1b439f9007766a1b26653619eba865aed52605c.jpg"
                                        target="_blank"
                                    >
                                        Original image
                                    </Link>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                            <HoverCardTrigger>
                                <img
                                    tabIndex={0}
                                    src="https://64.media.tumblr.com/4b9147dce9860081729d3dd3f6e6e7e8/3015e092087fd143-99/s400x600/bf096e88adbe93698f6a34cdcec6ed56a84d3cb7.png"
                                    alt="Loona"
                                    className="w-20 h-20 rounded-lg ml-6 flex-shrink-0 object-cover object-fit"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent className="text-center">
                                <p className="mb-2">
                                    The image belongs to another artist, here you can find it
                                </p>
                                <div className="flex items-center justify-center">
                                    <Image className="h-4 w-4 mr-2" />
                                    <Link
                                        href="https://64.media.tumblr.com/4b9147dce9860081729d3dd3f6e6e7e8/3015e092087fd143-99/s400x600/bf096e88adbe93698f6a34cdcec6ed56a84d3cb7.png"
                                        target="_blank"
                                    >
                                        Original image
                                    </Link>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
                <div className="ml-6 mt-32">
                    <HoverCard>
                        <HoverCardTrigger>
                            <img
                                tabIndex={0}
                                src="https://i.pinimg.com/736x/6a/0a/b9/6a0ab9c8f31e0c45572792d7b4a107bb.jpg"
                                className="w-72 h-80 rounded-lg"
                                alt="michiru kagemori"
                            />
                        </HoverCardTrigger>
                        <HoverCardContent className="text-center">
                            <p className="mb-2">
                                The image belongs to another artist, here you can find it
                            </p>
                            <div className="flex items-center justify-center">
                                <Image className="h-4 w-4 mr-2" />
                                <Link
                                    href="https://i.pinimg.com/736x/6a/0a/b9/6a0ab9c8f31e0c45572792d7b4a107bb.jpg"
                                    target="_blank"
                                >
                                    Original image
                                </Link>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                    <div className="flex items-start mt-6">
                        <HoverCard>
                            <HoverCardTrigger>
                                <img
                                    tabIndex={0}
                                    src="https://i.pinimg.com/originals/d6/b0/c1/d6b0c15e2808622514fb607c738f7db7.jpg"
                                    alt="Retsuko"
                                    className="w-48 h-48 rounded-lg"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent className="text-center">
                                <p className="mb-2">
                                    The image belongs to another artist, here you can find it
                                </p>
                                <div className="flex items-center justify-center">
                                    <Image className="h-4 w-4 mr-2" />
                                    <Link
                                        href="https://i.pinimg.com/originals/d6/b0/c1/d6b0c15e2808622514fb607c738f7db7.jpg"
                                        target="_blank"
                                    >
                                        Original image
                                    </Link>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                            <HoverCardTrigger>
                                <img
                                    tabIndex={0}
                                    src="https://d.furaffinity.net/art/geeswest/1583516634/1583516634.geeswest_belle.jpg"
                                    alt="Isabelle Animal Crossing"
                                    className="w-20 h-20 rounded-lg ml-6 object-cover object-fit"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent className="text-center">
                                <p className="mb-2">
                                    The image belongs to another artist, here you can find it
                                </p>
                                <div className="flex items-center justify-center">
                                    <Image className="h-4 w-4 mr-2" />
                                    <Link
                                        href="https://d.furaffinity.net/art/geeswest/1583516634/1583516634.geeswest_belle.jpg"
                                        target="_blank"
                                    >
                                        Original image
                                    </Link>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
                <div className="mt-14 ml-6">
                    <div className="lg:flex ">
                        <div>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <img
                                        tabIndex={0}
                                        src="https://i.pinimg.com/originals/42/db/9b/42db9b219795fe978f571860cf6049e8.jpg"
                                        alt="Ralsei"
                                        className="w-96 h-72 rounded-lg object-center object-fit"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent className="text-center">
                                    <p className="mb-2">
                                        The image belongs to another artist, here you can find it
                                    </p>
                                    <div className="flex items-center justify-center">
                                        <Image className="h-4 w-4 mr-2" />
                                        <Link
                                            href="https://i.pinimg.com/originals/42/db/9b/42db9b219795fe978f571860cf6049e8.jpg"
                                            target="_blank"
                                        >
                                            Original image
                                        </Link>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div>
                            <div className="flex ml-6">
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <img
                                            tabIndex={0}
                                            src="https://i.pinimg.com/originals/f2/c6/d8/f2c6d80ac98571e49c244b077dfb043d.jpg"
                                            className="w-20 h-20 rounded-lg mt-14"
                                            alt="Haida" />
                                    </HoverCardTrigger>
                                    <HoverCardContent className="text-center">
                                        <p className="mb-2">
                                            The image belongs to another artist, here you can find it
                                        </p>
                                        <div className="flex items-center justify-center">
                                            <Image className="h-4 w-4 mr-2" />
                                            <Link
                                                href="https://i.pinimg.com/originals/f2/c6/d8/f2c6d80ac98571e49c244b077dfb043d.jpg"
                                                target="_blank"
                                            >
                                                Original image
                                            </Link>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>

                                <HoverCard>
                                    <HoverCardTrigger>
                                        <img
                                            tabIndex={0}
                                            src="https://d.furaffinity.net/art/moonlightpen/1491955934/1491955934.moonlightpen_asriel_icon.jpg"
                                            className="w-20 h-24 rounded-lg ml-6"
                                            alt="Asriel Dreemurr"
                                        />
                                    </HoverCardTrigger>
                                    <HoverCardContent className="text-center">
                                        <p className="mb-2">
                                            The image belongs to another artist, here you can find it
                                        </p>
                                        <div className="flex items-center justify-center">
                                            <Image className="h-4 w-4 mr-2" />
                                            <Link
                                                href="https://d.furaffinity.net/art/moonlightpen/1491955934/1491955934.moonlightpen_asriel_icon.jpg"
                                                target="_blank"
                                            >
                                                Original image
                                            </Link>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <img
                                        tabIndex={0}
                                        src="https://i.pinimg.com/originals/f2/38/e2/f238e203bcb28007b4c278b5c35bfdba.jpg"
                                        alt="Toriel"
                                        className="ml-6 mt-6 w-48 h-32 rounded-lg object-fill"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent className="text-center">
                                    <p className="mb-2">
                                        The image belongs to another artist, here you can find it
                                    </p>
                                    <div className="flex items-center justify-center">
                                        <Image className="h-4 w-4 mr-2" />
                                        <Link
                                            href="https://i.pinimg.com/originals/f2/38/e2/f238e203bcb28007b4c278b5c35bfdba.jpg"
                                            target="_blank"
                                        >
                                            Original image
                                        </Link>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                    <div className="mt-6 flex">
                        <HoverCard>
                            <HoverCardTrigger>
                                <img
                                    tabIndex={0}
                                    className="w-48 h-48 rounded-lg"
                                    src="https://d.furaffinity.net/art/tokugawo/1679285239/1679285239.tokugawo_20221010_200642.jpg"
                                    alt="Fox McCloud" />
                            </HoverCardTrigger>
                            <HoverCardContent className="text-center">
                                <p className="mb-2">
                                    The image belongs to another artist, here you can find it
                                </p>
                                <div className="flex items-center justify-center">
                                    <Image className="h-4 w-4 mr-2" />
                                    <Link
                                        href="https://d.furaffinity.net/art/tokugawo/1679285239/1679285239.tokugawo_20221010_200642.jpg"
                                        target="_blank"
                                    >
                                        Original image
                                    </Link>
                                </div>
                            </HoverCardContent>
                        </HoverCard>

                        <HoverCard>
                            <HoverCardTrigger>
                                <img
                                    tabIndex={0}
                                    className="w-72 h-56 rounded-lg ml-6"
                                    src="https://d.furaffinity.net/art/snowwingedwolf/1586562569/1586562569.snowwingedwolf_finalshirou.jpg"
                                    alt="Shirou Ogami"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent className="text-center">
                                <p className="mb-2">
                                    The image belongs to another artist, here you can find it
                                </p>
                                <div className="flex items-center justify-center">
                                    <Image className="h-4 w-4 mr-2" />
                                    <Link
                                        href="https://d.furaffinity.net/art/snowwingedwolf/1586562569/1586562569.snowwingedwolf_finalshirou.jpg "
                                        target="_blank"
                                    >
                                        Original image
                                    </Link>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
            </div>
        </div>
    )
}
