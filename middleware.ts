import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/min-pamelding")) {
    if (!request.cookies.get("session")) {
      const url = request.nextUrl.clone();
      url.pathname = "/logginn";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/festivalsjef")) {
    if (!request.cookies.get("admin-session")) {
      const url = request.nextUrl.clone();
      url.pathname = "/festivalsjef-logginn";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/min-pamelding/:path*", "/festivalsjef", "/festivalsjef/:path*"],
};
