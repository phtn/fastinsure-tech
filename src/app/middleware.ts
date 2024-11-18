import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const uid = req.cookies.get("fastinsure--uid")?.value;

  if (!uid) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname === "/dashboard") {
    return NextResponse.rewrite(new URL(`/${uid}`, req.url));
  }

  // if (req.nextUrl.pathname === "/signin" && uid) {
  //   return NextResponse.redirect(new URL(`/dashboard`, req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
