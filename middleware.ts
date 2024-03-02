import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    
    if(isApiRoute) {
        return null
    }

    if(isAuthRoute) {
        if(isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null 
    }

    if(!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname
        if(nextUrl.search) callbackUrl += nextUrl.search
        if(nextUrl.pathname.startsWith(`/projects/:id`)) {
            return Response.redirect(new URL(`/projects/:id`, nextUrl))
        }

        return Response.redirect(new URL(`/auth/login`, nextUrl))
    }

    return
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}