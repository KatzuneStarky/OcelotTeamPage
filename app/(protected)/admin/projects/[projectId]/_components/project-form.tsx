"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation";
import { Icon } from '@iconify/react';
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { ProjectsSchema } from "@/schemas/admin-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Projects, Technologies } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/layout/heading";
import { Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";


interface ProjectFormProps {
    initialData: Projects | null,
    data: Technologies[] | null
};

export const ProjectForm: React.FC<ProjectFormProps> = ({
    initialData, data
}) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit a project' : 'Create a new project data';
    const description = initialData ? 'Edit project data' : 'Creates a new record of project data';
    const toastDescription = initialData
        ? `The project ${initialData.name} was updated`
        : `The project was created and its data was uploaded to the database`;
    const action = initialData ? 'Save Changes' : 'Create';

    const form = useForm<z.infer<typeof ProjectsSchema>>({
        resolver: zodResolver(ProjectsSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || "",
            name: initialData?.name || "",
            website: initialData?.website || "",
            github: initialData?.github || "",
            technologies: data ? data.map(item => ({ name: item?.name || "", icon: item?.icon || "" })) : [{
                name: "", icon: ""
            }]
        }
    })

    const { fields, append, remove, update } = useFieldArray({
        name: "technologies",
        control: form.control,
    })

    const onSubmit = async (values: z.infer<typeof ProjectsSchema>) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/projects/${initialData.id}`, values);
            } else {
                await axios.post(`/api/projects`, values);
            }

            router.refresh();
            router.push(`/admin/projects`);
            toast.success(toastDescription)
            router.refresh();
        } catch (error: any) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/projects/${initialData?.id}`);
            router.refresh();
            router.push(`/admin/projects`);
            toast.success('Deleted project');
            router.refresh();
        } catch (error: any) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    const addTechnologies = () => {
        append({ name: '', icon: '' });
    };

    const removeTechnology = (index: number) => {
        remove(index);
    };

    return (
        <>
            {
                !loading && (
                    <>
                        <AlertModal
                            isOpen={open}
                            onClose={() => setOpen(false)}
                            onConfirm={onDelete}
                            loading={loading}
                        />
                        <div className="flex items-center justify-between">
                            <Heading title={title} description={description} />
                            {initialData && (
                                <Button
                                    disabled={loading}
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setOpen(true)}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <Separator />
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                                <div className="md:grid md:grid-cols-3 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image url</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="URL" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Project Name</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="Ex: Ocelot Team CMS" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Website url</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="www.*********.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="github"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Github url</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="Ex: https://github.com/KatzuneStarky/OcelotTeamPage.git" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {fields.map((field, index) => (
                                        <div className="flex flex-col" key={index}>
                                            <div key={index} className="grid grid-cols-3 gap-4 items-center">
                                                <FormField
                                                    control={form.control}
                                                    key={field.id}
                                                    name={`technologies.${index}.name`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                                Technology name
                                                            </FormLabel>
                                                            <Select
                                                                disabled={loading}
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select the technology name" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="React Js">
                                                                        React Js
                                                                    </SelectItem>

                                                                    <SelectItem value="Next Js">
                                                                        Next Js
                                                                    </SelectItem>

                                                                    <SelectItem value="Tailwind Css">
                                                                        Tailwind Css
                                                                    </SelectItem>

                                                                    <SelectItem value="Shadcn UI">
                                                                        Shadcn UI
                                                                    </SelectItem>

                                                                    <SelectItem value="Prisma ORM">
                                                                        Prisma ORM
                                                                    </SelectItem>

                                                                    <SelectItem value="Radix UI">
                                                                        Radix UI
                                                                    </SelectItem>

                                                                    <SelectItem value="Axios">
                                                                        Axios
                                                                    </SelectItem>

                                                                    <SelectItem value="Framer Motion">
                                                                        Framer Motion
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    key={field.id}
                                                    name={`technologies.${index}.icon`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                                Technology icon
                                                            </FormLabel>
                                                            <Select
                                                                disabled={loading}
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select the technology icon" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="logos:react">
                                                                        <div className="flex">
                                                                            <Icon icon={"logos:react"} width="24" height="24" className="mr-2" />
                                                                            React Js
                                                                        </div>
                                                                    </SelectItem>

                                                                    <SelectItem value="logos:nextjs-icon">
                                                                        <div className="flex">
                                                                            <Icon icon={"logos:nextjs-icon"} width="24" height="24" className="mr-2" />
                                                                            Next Js
                                                                        </div>
                                                                    </SelectItem>

                                                                    <SelectItem value="devicon:tailwindcss">
                                                                        <div className="flex">
                                                                            <Icon icon={"devicon:tailwindcss"} width="24" height="24" className="mr-2" />
                                                                            Tailwind Css
                                                                        </div>
                                                                    </SelectItem>

                                                                    <SelectItem value="simple-icons:shadcnui">
                                                                        <div className="flex">
                                                                            <Icon icon={"simple-icons:shadcnui"} width="24" height="24" className="mr-2" />
                                                                            Shadcn UI
                                                                        </div>
                                                                    </SelectItem>

                                                                    <SelectItem value="simple-icons:prisma">
                                                                        <div className="flex">
                                                                            <Icon icon={"simple-icons:prisma"} width="24" height="24" className="mr-2" />
                                                                            Prisma ORM
                                                                        </div>
                                                                    </SelectItem>

                                                                    <SelectItem value="simple-icons:radixui">
                                                                        <div className="flex">
                                                                            <Icon icon={"simple-icons:radixui"} width="24" height="24" className="mr-2" />
                                                                            Radix UI
                                                                        </div>
                                                                    </SelectItem>

                                                                    <SelectItem value="logos:axios">
                                                                        <div className="flex">
                                                                            <Icon icon={"logos:axios"} width="24" height="24" className="mr-2" />
                                                                            Axios
                                                                        </div>
                                                                    </SelectItem>

                                                                    <SelectItem value="tabler:brand-framer-motion">
                                                                        <div className="flex">
                                                                            <Icon icon={"tabler:brand-framer-motion"} width="24" height="24" className="mr-2" />
                                                                            Framer motion
                                                                        </div>
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button variant={"destructive"} className="w-1/4" type="button" onClick={() => removeTechnology(index)}>
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex pt-4">
                                        <Button type="button" onClick={addTechnologies} className="mr-2">
                                            Add new technologie
                                        </Button>
                                    </div>
                                </div>
                                <Button disabled={loading} className="ml-auto" type="submit">
                                    {action}
                                </Button>
                            </form>
                        </Form>
                    </>
                )
            }

        </>
    )
}