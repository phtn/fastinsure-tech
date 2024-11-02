import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/hcode") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/authed/")) {
    console.log("authed access");
  }

  const re = /^\/authed\/([^/]+)$/;
  const match = re.exec(pathname);

  if (match) {
    const uid = match[1];
    console.log("extracted uid", uid);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/authed/:uid*", "/hcode"],
};
