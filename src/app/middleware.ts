import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const uid = req.cookies.get("fastinsure--uid")?.value;
  const secured = ["/dashboard"];
  const isSecured = secured.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isSecured && !uid) {
    const home = new URL("/", req.url);
    home.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(home);
  }

  // if (req.nextUrl.pathname === "/signin") {
  //   if (uid) {
  //     const dashboard = new URL("/dashboard", req.url);
  //     return NextResponse.redirect(dashboard);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
