import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      } else if (!auth?.user.roles.includes("admin") && isOnAdmin) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account) console.log('account', account)
      if (profile) console.log('profile', profile)
      if (token && user) {
        token.access_token = user.access_token
        token.roles = user.roles
      }
      return token
    },
    async session({ session, user, token }: any) {
      if (user) console.log('user', user)
      if (session && token) {
        session.user.id = token.sub;
        session.user.roles = token.roles
      }
      return session
    },
  },
} satisfies NextAuthConfig;
