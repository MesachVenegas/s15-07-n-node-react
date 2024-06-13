import { auth } from '@/auth';
import { protectedRoutes, authRoutes, publicRoutes, apiPrefix } from '@/routes/routes';

export default auth( req =>{
  const { nextUrl } = req;
  // Verify if session user exist
  const isLoggedIn = !!req.auth;
  // flags rutes protected
  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  // if a route is a API route continue.
  if(isApiRoute) return;
  // if a route is protected and not logged in redirect to login
  if(isPublicRoute && isLoggedIn){
    return Response.redirect(new URL('/first-steps', nextUrl))
  }
  //  if user is logged in don't allow visit login and register page or recover password.
  if(isAuthRoute) return;

  // catch calls and get the route as callback to redirect before to login
  if(!isPublicRoute && !isLoggedIn){
    let callbackUrl = nextUrl.pathname;
    if(nextUrl.search) callbackUrl += nextUrl.search;

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  return;
})

// export default NextAuth(authConfig)
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}