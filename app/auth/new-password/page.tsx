"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BackButton } from "@/components/auth/back-button"
import { NewPasswordSchema } from "@/schemas/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { newPassword } from "@/actions/auth/new-password"

const NewPasswordPage = () => {
    const searchParamas = useSearchParams()
    const token = searchParamas.get("token")
    const router = useRouter()

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        startTransition(() => {
            newPassword(values, token).then((data) => {
                if (data?.success) {
                    toast.success(data.success, {
                        description: "The password was updated, returning to the login"
                    })
                    router.push("/auth/login")
                }
                if (data?.error) {
                    toast.error(data.error, {
                        description: ``
                    })
                    router.refresh()
                }
            })
        })
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full flex">
                    <div className="w-full p-5 rounded-lg lg:rounded-l-none">
                        <div className="px-8 mb-4 text-center">
                            <h3 className="pt-4 mb-2 text-2xl">New Password</h3>
                            <p className="mb-4 text-sm ">
                                Generate a new password to update your details
                            </p>
                        </div>
                        <div className="mb-4">
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-4 lg:px-0 mx-auto">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled={isPending} type="password" placeholder="****************" className="text-lg rounded-sm " />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type='submit' disabled={isPending} className="w-full px-4 py-2 mt-4 font-bold rounded-full hover:bg-orange-700 hover:text-white focus:outline-none focus:shadow-outline">
                                        Reset Password
                                    </Button>
                                </form>
                            </Form>
                        </div>
                        <hr className="mb-6 border-t" />
                        <BackButton
                            href="/auth/login"
                            label="Return to login"
                            color="black"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPasswordPage