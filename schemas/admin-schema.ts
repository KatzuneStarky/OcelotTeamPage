import * as z from "zod";

export const TeamMemberSchema = z.object({
    image: z.optional(
        z.string()
    ),
    name: z.optional(
        z.string()
            .min(5, { message: "The name must contain more than 5 letters" })
    ),
    role: z.optional(
        z.string()
            .min(5, { message: "The role must be greater than 5 characters" })
    ),
    description: z.optional(
        z.string()
            .min(10, { message: "The description must contain more than 10 letters" })
            .max(150, { message: "The description cannot exceed 150 characters" })
    ),
});