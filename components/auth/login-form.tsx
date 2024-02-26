"use client"

import { LoginSchema } from '@/schemas/auth-schema'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Button } from '../ui/button'
import loginLottie from '../../assets/lotties/login.json'
import Lottie from 'lottie-react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { login } from '@/actions/auth/login'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'

const LoginForm = () => {
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const router = useRouter()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "The email is already used with another provider" : ""

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values).then((data) => {
                if(data.success) {
                    toast.success(data.success, {
                        description: "A confirmation email has been sent"
                    })
                }
                if(data.error) {
                    toast.error(data.error, {
                        description: `${"Error in the data, check that everything is correct" || urlError}`
                    })
                }
            })
        })
    }

    return (
        <section className="h-screen">
            <div className="w-full h-full">
                <div
                    className="gap-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div
                        className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <Lottie
                            animationData={loginLottie}
                            className="w-full h-full"
                        />
                    </div>

                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div
                                    className="flex flex-row items-center justify-center lg:justify-start">
                                    <p className="mb-0 mr-4 text-lg">Sign in with</p>
                                    <button
                                        type="button"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                        <FcGoogle className="mx-auto h-3.5 w-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                        <FaGithub className="mx-auto h-3.5 w-3.5 text-black" />
                                    </button>
                                    <button
                                        type="button"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normalshadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                        <FaFacebook className="mx-auto h-3.5 w-3.5 text-blue-500" />
                                    </button>
                                </div>

                                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p className="mx-4 mb-0 text-center font-semibold dark:text-white">Or</p>
                                </div>

                                <div className="relative mb-6" data-te-input-wrapper-init>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder='**********@****.com'
                                                        type='email'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="relative mb-6" data-te-input-wrapper-init>
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder='**************'
                                                        type='password'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="text-center lg:text-left">
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm 
                                            font-medium uppercase leading-normal 
                                            shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out 
                                            hover:bg-primary-600 
                                            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                            focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                            focus:outline-none focus:ring-0 active:bg-primary-700 
                                            active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                            dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
                                            dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                                            dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                                            dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        data-te-ripple-init
                                        data-te-ripple-color="light">
                                        Login
                                    </Button>
                                </div>

                                <div className="my-6 flex flex-col items-center justify-center w-full">
                                    <Link href="/auth/forgot-password" className='text-orange-400'>Forgot password?</Link>
                                    <Link href="/auth/register">
                                        Don't have an account?{" "}
                                        <span className='hover:text-orange-400 transition-all'>Register</span>
                                    </Link>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm