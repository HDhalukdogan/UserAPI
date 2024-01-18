import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
        } & DefaultSession['user']
    }
    interface User {
        access_token?: string
        roles: string[]
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        access_token?: string
        roles: string[]
    }
}