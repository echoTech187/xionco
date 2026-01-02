import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
    const isAuth = await isAuthenticated();
    if (request.url.startsWith('/')) {
        if (isAuth) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if (!isAuth) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next();

}

export const config = {
    matcher: ["/(dashboard)/:path*", "/(auth)/:path*"],
}