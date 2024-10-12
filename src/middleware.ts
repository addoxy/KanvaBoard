import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
import { SIGN_IN_REDIRECT_URL } from './lib/constants';

const { auth } = NextAuth(authConfig);

const API_AUTH_ROUTE = '/api/auth';
const AUTH_ROUTES = ['/sign-in', '/sign-up'];
const PUBLIC_ROUTES = ['/'];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const nextUrl = req.nextUrl;
  const pathname = nextUrl.pathname;

  const isApiAuthRoute = pathname.startsWith(API_AUTH_ROUTE);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(SIGN_IN_REDIRECT_URL, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    Response.redirect(new URL('/sign-in', nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
