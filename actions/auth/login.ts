"use server"

import { LoginSchema } from "@/schemas/auth-schema"
import { z } from "zod"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) return { error: "Invalid Fields!" }

    const { email, password } = validatedFields.data
    const existringUser = await getUserByEmail(email)

    if (!existringUser || !existringUser?.email || !existringUser.password) {
        return { error: "Email does not exist!" };
    }

    if(!existringUser.emailVerified){
        const verificactionToken = await generateVerificationToken(existringUser.email)

        return {
            success: "Confirmation email sent!"
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }

    return {
        success: "Email sent!"
    }
}