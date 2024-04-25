import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ["en", "fi", "sv"],

    // Used when no locale matches
    defaultLocale: "fi",
    localePrefix: "always",
});

export async function middleware(request: NextRequest) {
     return intlMiddleware(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - _next/icons icons
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|img|icons).*)",
    ],
};
