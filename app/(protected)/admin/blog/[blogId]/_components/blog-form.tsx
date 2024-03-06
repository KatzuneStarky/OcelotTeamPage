"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BlogSchema } from "@/schemas/admin-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Blog } from "@prisma/client";
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
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/layout/heading";
import { Trash } from "lucide-react";
import TipTap from "@/components/tiptap";
import { Switch } from "@/components/ui/switch";

interface BlogFormProps {
    initialData: Blog | null,
};

export const BlogForm: React.FC<BlogFormProps> = ({
    initialData
}) => {

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const title = initialData ? 'Edit a blog' : 'Create a new blog';
    const description = initialData ? 'Edit a blog data' : 'Create a new record with a blog details';
    const toastDescription = initialData
        ? `${initialData.title} blog details were updated`
        : `The blog was created and uploaded to the database`;
    const action = initialData ? 'Save Changes' : 'Create';

    const form = useForm<z.infer<typeof BlogSchema>>({
        resolver: zodResolver(BlogSchema),
        defaultValues: {
            title: initialData?.title || "",
            content: initialData?.content || "",
            coverImage: initialData?.coverImage || "",
            isArchived: initialData?.isArchived || false,
            isPublished: initialData?.isPublished || false
        }
    })

    const onSubmit = async (values: z.infer<typeof BlogSchema>) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/blog/${initialData.id}`, values);
            } else {
                await axios.post(`/api/blog`, values);
            }

            router.refresh();
            router.push(`/admin/blog`);
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
            await axios.delete(`/api/blog/${initialData?.id}`);
            router.refresh();
            router.push(`/admin/blog`);
            toast.success('Blog eliminated');
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
                    <div className="md:grid md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Blog title</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Ex: new update" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cover image</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="image url" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Archived blog?</FormLabel>
                                        <FormDescription>
                                            Mark as true if you want the blog to be archived
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={loading}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isPublished"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Published blog?</FormLabel>
                                        <FormDescription>
                                            Check true to show this blog, otherwise leave it like this
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={loading}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Blog content</FormLabel>
                                <FormControl>
                                    <TipTap description={field.value || ""} onChange={field.onChange} />
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