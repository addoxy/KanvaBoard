import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
import { SIGN_IN_REDIRECT_URL } from './lib/constants';

const { auth } = NextAuth(authConfig);

const API_AUTH_ROUTE = '/api/auth';
const AUTH_ROUTES = ['/sign-in', '/sign-up', '/auth/error'];
const PUBLIC_ROUTES = ['/'];
const PROTECTED_ROUTES = ['/dashboard'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  console.log(pathname);

  const pathStartsWith = (routes: string[]) => routes.some((route) => pathname.startsWith(route));

  // Allow all API auth routes to pass through
  if (pathname.startsWith(API_AUTH_ROUTE)) {
    return;
  }

  // Handle authentication routes
  if (pathStartsWith(AUTH_ROUTES)) {
    if (isLoggedIn) {
      return Response.redirect(new URL(SIGN_IN_REDIRECT_URL, nextUrl));
    }
    return;
  }

  // Protect routes that require authentication
  if (pathStartsWith(PROTECTED_ROUTES)) {
    if (!isLoggedIn) {
      return Response.redirect(new URL('/sign-in', nextUrl));
    }
    return;
  }

  // Allow access to public routes
  if (pathStartsWith(PUBLIC_ROUTES)) {
    return;
  }

  // For any other routes, redirect to sign-in if not logged in
  if (!isLoggedIn) {
    const signInUrl = new URL('/sign-in', nextUrl);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return Response.redirect(signInUrl);
  }

  // Allow all other requests to pass through
  return;
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
