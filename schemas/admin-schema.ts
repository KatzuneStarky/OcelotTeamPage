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
    socialMedia: z.optional(
        z.array(
            z.object({
                name: z.string(),
                url: z.string()
            })
        )
    )
});

export const ProjectsSchema = z.object({
    imageUrl: z.optional(
        z.string()
    ),
    name: z.optional(
        z.string()
            .min(5, { message: "The name must contain more than 5 letters" })
    ),
    content: z.optional(z.string().min(5).trim()),
    website: z.optional(
        z.string()
            .min(5, { message: "The website url must be greater than 5 characters" })
    ),
    technologies: z.optional(
        z.array(
            z.object({
                name: z.string(),
                icon: z.string()
            })
        )
    ),
    github: z.optional(
        z.string()
            .min(5, { message: "The github url must be greater than 5 characters" })
    ),
});

export const BlogSchema = z.object({
    title: z.string(),
    content: z.optional(z.string().min(5).trim()),
    category: z.optional(z.string()),
    coverImage: z.string(),
    isArchived: z.optional(z.boolean()),
    isPublished: z.optional(z.boolean())        
});