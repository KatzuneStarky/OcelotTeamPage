"use client"

import { useForm } from "react-hook-form";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Mail, Send } from "lucide-react"
import { Textarea } from "../ui/textarea"
import emailjs from '@emailjs/browser';
import { ContactSchema } from "@/schemas/contact-schema";
import { ZodError } from "zod";
import { toast } from "sonner";

type FormData = {
    name: string;
    email: string;
    message: string;
};

export const ContactForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: { name: string, email: string, message: string }) => {
        try {
            ContactSchema.parse(data);

            await emailjs.send("service_etbqumm", "template_37bmmp2", data, {
                publicKey: "p2fJQpADHS6h1KodU"
            });

            toast.success("The email was sent", {
                description: "Your email has reached us and we will review it."
            })

            reset();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.errors.map(err => err.message).join(", ");
                toast.error("Validation errors:", {
                    description: errorMessage,                    
                });
            } else {
                toast.error("Failed to send email:", {
                    description: `${error}`
                });
            }
        }
    }

    return (
        <section className="body-font relative text-gray-400">
            <div className="container mx-auto px-5 py-24">
                <div className="mb-12 flex w-full flex-col text-center">
                    <h1 className="title-font mb-4 text-2xl font-medium  sm:text-3xl">Contact Us</h1>
                    <p className="mx-auto text-base leading-relaxed lg:w-2/3">Feel free to reach out to us! Whether you have a question,
                        feedback, or a collaboration proposal, we&apos;d love to hear from you.
                    </p>
                </div>

                <div className="mx-auto md:w-2/3 lg:w-1/2">
                    <form className="-m-2 flex flex-wrap" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-1/2 p-2">
                            <div className="relative">
                                <Input
                                    type="text"
                                    id="name"
                                    {...register("name")}
                                    className="peer w-full rounded border py-1 px-3 text-base leading-8 
                                               placeholder-transparent outline-none transition-colors
                                               duration-200 ease-in-out focus:ring-2"
                                />
                                <Label
                                    htmlFor="name"
                                    className="absolute left-3 -top-6 bg-transparent text-sm leading-7 
                                            text-indigo-500 transition-all peer-placeholder-shown:left-3 
                                              peer-placeholder-shown:top-2
                                            peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 
                                              peer-focus:text-sm peer-focus:text-indigo-500"
                                >
                                    Name
                                </Label>
                                {errors.name && (
                                    <div
                                        className="mb-4 rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
                                        role="alert">
                                        {errors.name.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-1/2 p-2">
                            <div className="relative">
                                <Input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    className="peer w-full rounded border py-1 px-3 text-base leading-8 
                                               placeholder-transparent outline-none transition-colors
                                               duration-200 ease-in-out focus:ring-2"
                                />
                                <Label
                                    htmlFor="email"
                                    className="absolute left-3 -top-6 bg-transparent text-sm leading-7 
                                            text-indigo-500 transition-all peer-placeholder-shown:left-3 
                                              peer-placeholder-shown:top-2
                                            peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 
                                              peer-focus:text-sm peer-focus:text-indigo-500">
                                    Email
                                </Label>
                                {errors.email && (
                                    <div
                                        className="mb-4 rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
                                        role="alert">
                                        {errors.email.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 w-full p-2">
                            <div className="relative">
                                <Textarea
                                    id="message"
                                    {...register("message")}
                                    className="peer w-full rounded border py-1 px-3 text-base leading-8 
                                               placeholder-transparent outline-none transition-colors
                                               duration-200 ease-in-out focus:ring-2 resize-none"
                                />
                                <Label
                                    htmlFor="message"
                                    className="absolute left-3 -top-6 bg-transparent text-sm leading-7 
                                            text-indigo-500 transition-all peer-placeholder-shown:left-3 
                                              peer-placeholder-shown:top-2
                                            peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 
                                              peer-focus:text-sm peer-focus:text-indigo-500"
                                >
                                    Message
                                </Label>
                                {errors.message && (
                                    <div
                                        className="mb-4 rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
                                        role="alert">
                                        {errors.message.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full p-2">
                            <button
                                type="submit"
                                className="mx-auto flex items-center justify-center rounded border-0 bg-indigo-500 py-2 px-8 text-lg 
                            text-white hover:bg-indigo-600 focus:outline-none"
                            >
                                <Send className="mr-2 h-4 w-4" />
                                Send
                            </button>
                        </div>


                        <div className="mt-8 w-full border-t border-gray-800 p-2 pt-8 text-center">
                            <a className="text-indigo-400">owozondev@gmail.com</a>
                            <p className="my-5 leading-normal">México City<br />México</p>
                            <span className="inline-flex">
                                <a className="text-gray-500">
                                </a>
                                <a className="ml-4 text-gray-500">
                                </a>
                                <a className="ml-4 text-gray-500">
                                </a>
                                <a className="ml-4 text-gray-500">
                                </a>
                            </span>
                        </div>

                    </form>
                </div>

            </div>

        </section>
    )
}