"use server"

import { RegisterSchema } from "@/schemas/auth-schema"
import { z } from "zod"
import bcrypt from "bcrypt"
import prismadb from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async(values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success) return { error: "Invalid Fields!" }

    const { name, email, password, image } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if(existingUser) return { error: "Email already in use" }

    await prismadb.user.create({
        data: {
            name,
            email,
            image: image || "",
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return {
        success: "Confirmation mail sent!"
    }
}