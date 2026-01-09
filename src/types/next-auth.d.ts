import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
import { UserRole } from '@/lib/enums';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: UserRole;
            email: string;
            name: string;
        } & DefaultSession['user'];
    }

    interface User extends DefaultUser {
        role: UserRole;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        role: UserRole;
        id: string;
    }
}
