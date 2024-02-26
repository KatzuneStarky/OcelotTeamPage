"use server"

import { RegisterSchema } from "@/schemas/auth-schema"
import { z } from "zod"
import bcrypt from "bcryptjs"
import prismadb from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"

export const register = async(values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success) return { error: "Invalid Fields!" }

    const { name, email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if(existingUser) return { error: "Email already in use" }

    await prismadb.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)

    return {
        success: "User Created!"
    }
}