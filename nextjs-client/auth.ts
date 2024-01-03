import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { authConfig } from './auth.config';
import { fetchWrapper } from './app/lib/fetchWrapper';

async function loginUser(email: string,password : string): Promise<User | undefined> {
  try {
    const result = await fetchWrapper.post("account/login",{name:email,password})
    const user: User = {
      id: result.token,
      name: email,
      email: email,
      password: password
    }
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut, handlers: { GET, POST }, update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await loginUser(email,password)
          return user || null;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
