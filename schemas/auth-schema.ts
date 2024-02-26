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
    email: z.optional(z.string().email({ message: "Se debe ingresar un correo valido" })),
    password: z.optional(z.string().min(6, {
        message: "Se requiere una contraseña de minimo 6 caracteres",
    })),
    newPassword: z.optional(z.string().min(6, {
        message: "Se requiere una contraseña de minimo 6 caracteres",
    })),
}).refine((data) => {
    if(data.password && !data.newPassword) return false
    if(data.newPassword && !data.password) return false

    return true
}, {
    message: "La nueva contraseña es requerida",
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
        .email({ message: "Se debe ingresar un correo valido" })
        .min(1, { message: "El correo debe ser mayor a 1 caracter" }),
});

{/**role: z.enum([UserRole.ADMIN, UserRole.USER]), */}