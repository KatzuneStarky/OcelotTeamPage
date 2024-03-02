"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TeamMemberSchema } from "@/schemas/admin-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamMeber } from "@prisma/client";
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


interface TeamFormProps {
    initialData: TeamMeber | null
};

export const TeamForm: React.FC<TeamFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit a team member' : 'Create a new team member';
    const description = initialData ? 'Edita un equipo.' : 'Create a new record with a team members details';
    const toastDescription = initialData 
        ? `${initialData.name} member's details were updated` 
        : `The team member was created and uploaded to the database`;
    const action = initialData ? 'Save Changes' : 'Create';

    const form = useForm<z.infer<typeof TeamMemberSchema>>({
        resolver: zodResolver(TeamMemberSchema),
        defaultValues: {
            image: initialData?.image || "",
            name: initialData?.name || "",
            role: initialData?.role || "",
            description: initialData?.description || ""
        }
    })

    const onSubmit = async (values: z.infer<typeof TeamMemberSchema>) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/admin/team/${initialData.id}`, values);
            } else {
                await axios.post(`/api/admin/team`, values);
            }

            router.refresh();
            router.push(`/admin/team`);
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
            await axios.delete(`/api/admin/team/${initialData?.id}`);
            router.refresh();
            router.push(`/admin/team`);
            toast.success('Eliminated team member');
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
                                        name="image"
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
                                                <FormLabel>Team member name</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="your name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="Ex: Software Developer" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        disabled={loading}
                                                        placeholder="Describe yourself"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
