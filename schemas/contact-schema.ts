import * as z from "zod";

export const ContactSchema = z.object({
    name: z
        .string()
        .min(5, { message: "The name must contain more than 5 letters" }),
    email: z
        .string()
        .email({ message: "A valid email must be entered" })
        .min(5, { message: "The email must be greater than 5 characters" }),
    message: z.string().min(10,
        { message: "The content of the message must contain more than 10 letters" }),
});