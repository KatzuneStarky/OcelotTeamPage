"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProjectsSchema, TeamMemberSchema } from "@/schemas/admin-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Projects } from "@prisma/client";
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


interface ProjectFormProps {
    initialData: Projects | null
};

export const ProjectForm: React.FC<ProjectFormProps> = ({
    initialData
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
            technologies: initialData?.technologies || "",
            github: initialData?.github || ""
        }
    })

    const onSubmit = async (values: z.infer<typeof ProjectsSchema>) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/admin/projects/${initialData.id}`, values);
            } else {
                await axios.post(`/api/admin/projects`, values);
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
            await axios.delete(`/api/admin/projects/${initialData?.id}`);
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
                                <FormField
                                        control={form.control}
                                        name="technologies"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Technologies</FormLabel>
                                                <FormDescription>
                                                    Separate each technology with a comma
                                                </FormDescription>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="Ex: React Js, Tailwind" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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