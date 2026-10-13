import NextAuth from "next-auth";

// Edge-compatible auth config for middleware (no direct Prisma DB access in edge runtime)
export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.sub as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      
      if (isOnAdmin) {
        if (isLoggedIn && auth.user.role === 'ADMIN') return true;
        return false; // Redirect unauthenticated users to login page
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      // If they are on an auth page but logged in, redirect them
      const isAuthRoute = ['/login', '/signup', '/forgot-password', '/reset-password'].some(
        route => nextUrl.pathname.startsWith(route)
      );

      if (isAuthRoute && isLoggedIn) {
        if (auth.user.role === 'ADMIN') {
          return Response.redirect(new URL('/admin', nextUrl));
        }
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
};

const { auth } = NextAuth(authConfig);

export default auth;
export const middleware = auth;

export const config = {
  matcher: ['/((?!api|_next|images|favicon.ico|.*\\..*).*)'],
};
