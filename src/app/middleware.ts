import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const uid = req.cookies.get("fastinsure--uid")?.value;
  const secured = ["/dashboard", "/profile", "/settings"];

  if (secured.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!uid) {
      const signin = new URL("/signin", req.url);
      signin.searchParams.set("redirect", req.nextUrl.pathname);
      return NextResponse.redirect(signin);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"], // Match specific paths
};
