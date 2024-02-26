"use client"

import { BackButton } from "@/components/auth/back-button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Lottie from "lottie-react"
import errorAlert from "../../../assets/lotties/error-alert.json"

const ErrorPage = () => {
    return (
        <div className="w-full h-screen items-center flex justify-center">
            <Card className="shadow-md">
                <CardHeader>
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        There was a problem,
                        <span className="text-blue-600 dark:text-blue-500">
                            {" "}return to the
                        </span>
                        {" "}login page
                    </h1>
                </CardHeader>
                <CardContent className="flex items-center justify-center stroke-none">
                    <Lottie className="w-1/4" animationData={errorAlert} />
                </CardContent>
                <CardFooter>
                    <BackButton
                        href="/auth/login"
                        label="Go back to the login page"
                        color="white"
                    />
                </CardFooter>
            </Card>
        </div>
    )
}

export default ErrorPage