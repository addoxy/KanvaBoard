import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const url = request.nextUrl.clone();
  const cookies = request.cookies.getAll();
  let signInToken = null;

  cookies.map((cookie) => {
    if (cookie.name.includes(".session-token")) {
      signInToken = cookie.value;
    }
  });

  if (path === "/sign-in" && signInToken) {
    url.pathname = "/projects";
    return NextResponse.redirect(url.href);
  }

  if (path !== "/sign-in" && !signInToken) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url.href);
  }

  return;
}

export const config = {
  matcher: [
    "/sign-in",
    "/projects/:path*",
    "/preferences/:path*",
    "/templates/:path*",
  ],
};
