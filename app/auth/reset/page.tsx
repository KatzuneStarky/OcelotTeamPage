"use client"

import { reset } from '@/actions/auth/reset'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ResetSchema } from '@/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const ResetPage = () => {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        startTransition(() => {
            reset(values).then((data) => {
                if(data?.success) {
                    toast.success(data.success, {
                        description: "Check your inbox to update your password"
                    })
                }
                if(data?.error) {
                    toast.error(data.error, {
                        description: ``
                    })
                }
            })
        })
    }

  return (
    <div className="h-screen flex items-center justify-center">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full flex">                    
                    <div className="w-full p-5 rounded-lg lg:rounded-l-none">
                        <div className="px-8 mb-4 text-center">
                            <h3 className="pt-4 mb-2 text-2xl">Forgot your password?</h3>
                            <p className="mb-4 text-sm ">
                                Just enter the email you log in with and we will send you a password recovery email.
                            </p>
                        </div>
                        <div className="mb-4">
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-4 lg:px-0 mx-auto">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled={isPending} type="email" placeholder="***********@*****.com" className="text-lg rounded-sm " />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type='submit' disabled={isPending} className="w-full px-4 py-2 mt-4 font-bold rounded-full hover:bg-orange-700 hover:text-white focus:outline-none focus:shadow-outline">
                                        Send email
                                    </Button>
                                </form>
                            </Form>
                        </div>
                        <hr className="mb-6 border-t" />
                        <div className="text-center">
                            <Link
                                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                href="/auth/register"
                            >
                                Create an account
                            </Link>
                        </div>
                        <div className="text-center">
                            <Link
                                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                href="/auth/login"
                            >
                                Do you already have an account? Please log in.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ResetPage