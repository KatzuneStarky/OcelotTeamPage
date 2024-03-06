"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import prismadb from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import * as z from "zod";
import bcrypt from "bcrypt"
import { SettingsSchema } from "@/schemas/auth-schema";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();
    if (!user) return { error: "No autorizado" };

    const dbUser = await getUserById(user?.id || "");
    if (!dbUser) return { error: "No autorizado" };

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "El email ya esta siendo usado por otro usuario" };
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return { success: "Un email de verificacion fue enviado" };
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(
            values.password,
            dbUser.password
        )

        if (!passwordsMatch) return { error: "Contraseña invalida" }

        const hashedPassword = await bcrypt.hash(
            values.newPassword,
            10
        )
        values.password = hashedPassword
        values.newPassword = undefined
    }

    await prismadb.user.update({
        where: { id: dbUser.id },
        data: { ...values },
    });

    return { success: "Datos actualizados" };
};