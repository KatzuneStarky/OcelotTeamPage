export const publicRoutes = [
    "/",
    "/about",
    "/company",
    "/company/ourTeam",
    "/company/blog",
    "/company/blog/[blogId]",
    "/contact",
    "/projects",
    "/projects/[projectId]",
    "/auth/new-verification",
    "/api/projects",
    "/api/team",
    "/api/blog/blogs"
]

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

export const apiAuthPrefix = "/api/auth"
export const DEFAULT_LOGIN_REDIRECT="/admin"