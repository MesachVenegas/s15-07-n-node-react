export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/first-steps/:path*",
  ],
};
