import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { fetchWrapper } from './app/lib/fetchWrapper';

async function loginUser(email: string, password: string): Promise<User | undefined> {
  try {
    const result = await fetchWrapper.post("account/login", { name: email, password })
    let claims = JSON.parse(atob(result.token.split('.')[1]));
    let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    let userId = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const user: User = {
      id: userId,
      name: email,
      email: email,
      access_token: result.token,
      roles: roles,
    }
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await loginUser(email, password)
          return user || null;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],

});
