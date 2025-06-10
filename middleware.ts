import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const routeConfig = {
    public: ['/', '/login', '/register', '/system', '/contact'],
    
    auth: ['/account'],
    
    admin: ['/admin'],
    
    roleBased: {
        admin: ['/admin', '/account'],
        user: ['/account']
    }
};

export async function middleware(request: NextRequest) {
    console.log('Middleware is running!');
    const token = await getToken({ req: request });
    const path = request.nextUrl.pathname;

    const isPublicPath = routeConfig.public.some(publicPath => path.startsWith(publicPath));
    const isAuthPath = routeConfig.auth.some(authPath => path.startsWith(authPath));
    const isAdminPath = routeConfig.admin.some(adminPath => path.startsWith(adminPath));

    if (!token) {
        if (!isPublicPath) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    const userRole = token.role as string;

    if (isAdminPath && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const allowedPaths = routeConfig.roleBased[userRole as keyof typeof routeConfig.roleBased] || [];
    const hasAccess = allowedPaths.some(allowedPath => path.startsWith(allowedPath));
    
    if (!isPublicPath && !hasAccess) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (token && (path === '/login' || path === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
} 