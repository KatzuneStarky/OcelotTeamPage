import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .email({ message: "A valid email must be entered" })
        .min(5, { message: "The email must be greater than 5 characters" }),
    password: z.string().min(1,
        { message: "The password is required" }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    image: z.optional(z.string()),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export const SettingsSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    isTwoFactorEnabled: z.optional(z.boolean()),
    image: z.optional(z.string()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email({ message: "A valid email must be entered" })),
    password: z.optional(z.string().min(6, {
        message: "A password of at least 6 characters is required.",
    })),
    newPassword: z.optional(z.string().min(6, {
        message: "A password of at least 6 characters is required.",
    })),
}).refine((data) => {
    if(data.password && !data.newPassword) return false
    if(data.newPassword && !data.password) return false

    return true
}, {
    message: "New password is required",
    path: ["newPassword"]
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
});

export const ResetSchema = z.object({
    email: z
        .string()
        .email({ message: "A valid email must be entered" })
        .min(1, { message: "The email must be greater than 1 character" }),
});