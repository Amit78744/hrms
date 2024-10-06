import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// List of protected paths and their required roles
const protectedRoutes = [
  { path: "/" },
  { path: "/reset-password" },
  { path: "/employee" },
];

// Middleware function to protect routes
export async function middleware(request: NextRequest) {
  // Retrieve token (user session) using NextAuth's getToken method
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  // Get the current pathname
  const { pathname } = request.nextUrl;

  // Check if the path is protected
  const route = protectedRoutes.find((route) => pathname.startsWith(route.path));

  if (route) {
    // If user is not authenticated, redirect to sign-in page
    if (!token) {
      const signInUrl = new URL("/auth", request.url);
      //signInUrl.searchParams.set("callbackUrl", pathname); // Preserve the URL the user was trying to access
      return NextResponse.redirect(signInUrl);
    }

    // Check if the user has one of the required roles
    /*if (!route.roles.includes(token.role)) {
      return NextResponse.redirect(new URL("/403", request.url)); // Redirect to 403 forbidden page
    }*/
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply the middleware only to the paths listed in the matcher
export const config = {
  matcher: ["/","/reset-password","/employee/:path*"], // Define paths to be protected
};
