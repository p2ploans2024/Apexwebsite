import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as Role) ?? "LEARNER";
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const role = auth?.user?.role;
      const path = nextUrl.pathname;

      const isAdmin = path.startsWith("/admin");
      const isProtected =
        path.startsWith("/dashboard") ||
        path.startsWith("/learn") ||
        path.startsWith("/checkout");

      if (isAdmin) {
        if (!isLoggedIn) return false;
        if (role !== "ADMIN") {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (isProtected && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;
