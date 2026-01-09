import type { NextAuthConfig } from 'next-auth';
import { UserRole } from '@/lib/enums';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const role = auth?.user?.role;

            const isAdminRoute = nextUrl.pathname.startsWith('/admin');
            const isAgentRoute = nextUrl.pathname.startsWith('/agent');
            const isPartnerRoute = nextUrl.pathname.startsWith('/portal');

            if (isAdminRoute || isAgentRoute || isPartnerRoute) {
                if (isLoggedIn) {
                    // Role-based redirection prevention
                    if (isAdminRoute && role !== UserRole.ADMIN) return Response.redirect(new URL('/', nextUrl));
                    if (isAgentRoute && role !== UserRole.AGENT) return Response.redirect(new URL('/', nextUrl));
                    if (isPartnerRoute && role !== UserRole.PARTNER) return Response.redirect(new URL('/', nextUrl));
                    return true;
                }
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id || '';
            }
            return token;
        },
        session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    providers: [], // Configured in main auth.ts
} satisfies NextAuthConfig;
