"use server"

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import * as z from "zod";
import bcrypt from "bcrypt"
import prismadb from "@/lib/db";
import { NewPasswordSchema } from "@/schemas/auth-schema";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: "Lost token" }
    }

    const validatedFiels = NewPasswordSchema.safeParse(values)

    if (!validatedFiels.success) return { error: "Invalid fields" }

    const { password } = validatedFiels.data
    const existingToken = await getPasswordResetTokenByToken(token)
    if (!existingToken) return { error: "Invalid Token" }

    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) return { error: "The token has expired" }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) return { error: "The email does not exist" }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prismadb.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await prismadb.passwordResetToken.delete({
        where: { id: existingToken.id }
    });

    return { success: "The password has been updated" }
}
