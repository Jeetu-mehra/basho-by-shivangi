import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET || "fallback-secret-key-change-me";
const encodedKey = new TextEncoder().encode(secretKey);

export async function middleware(req) {
  const sessionCookie = req.cookies.get("basho_session")?.value;
  const { pathname } = req.nextUrl;

  // 1. If trying to access Admin routes
  if (pathname.startsWith("/admin")) {
    if (!sessionCookie) {
      // Not logged in -> Go to Login
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.url));
    }

    try {
      // Verify Token & Check Role
      const { payload } = await jwtVerify(sessionCookie, encodedKey, { algorithms: ["HS256"] });
      
      if (payload.role !== "ADMIN") {
        // Logged in but not Admin -> Go to Home
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      // Invalid token
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Apply only to admin routes
};