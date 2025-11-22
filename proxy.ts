import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/add-recipe'];
const publicRoutes = ['/auth/login', '/auth/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  console.log('accessToken:', accessToken, 'refreshToken:', refreshToken, 'pathname:', pathname);

  if (!accessToken) {
    if (refreshToken) {
      try {
        const response = await checkServerSession();
        const setCookie = response.headers['set-cookie'];
        const isAuthorized = response.data?.authorized === true;

        console.log('Session check result:', {
          authorized: response.data?.authorized,
          hasSetCookie: !!setCookie,
          status: response.status,
        });

        if (isAuthorized && setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options: Parameters<typeof cookieStore.set>[2] = {};
            if (parsed.Expires) options.expires = new Date(parsed.Expires);
            if (parsed.Path) options.path = parsed.Path;
            if (parsed['Max-Age']) options.maxAge = Number(parsed['Max-Age']);

            if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
          }

          if (isPublicRoute) {
            return NextResponse.redirect(new URL('/', request.url), {
              headers: {
                'Set-Cookie': cookieStore.toString(),
              },
            });
          }
          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                'Set-Cookie': cookieStore.toString(),
              },
            });
          }
        }

        if (response.data?.authorized !== true) {
          cookieStore.delete('accessToken');
          cookieStore.delete('refreshToken');
          cookieStore.delete('sessionId');
          console.log('Session not authorized, clearing cookies');
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || error?.message || 'Unknown error';
        console.error('Error checking server session:', errorMessage);

        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        cookieStore.delete('sessionId');

        // Якщо це публічний маршрут, дозволяємо доступ з очищеними cookies
        if (isPublicRoute) {
          return NextResponse.next({
            headers: {
              'Set-Cookie': cookieStore.toString(),
            },
          });
        }

        // Якщо це приватний маршрут, редіректимо на логін з очищеними cookies
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL('/auth/login', request.url), {
            headers: {
              'Set-Cookie': cookieStore.toString(),
            },
          });
        }
      }
    }

    // Якщо refreshToken або сесії немає:
    if (isPublicRoute) {
      return NextResponse.next();
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Якщо accessToken існує:
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/add-recipe/:path*', '/auth/login', '/auth/register'],
};
