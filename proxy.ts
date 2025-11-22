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
        const sessionResponse = await checkServerSession();
        const setCookie = sessionResponse.headers['set-cookie'];
        const isAuthorized = sessionResponse.data?.authorized === true;

        console.log('Session check result:', {
          authorized: sessionResponse.data?.authorized,
          hasSetCookie: !!setCookie,
          status: sessionResponse.status,
        });

        if (isAuthorized && setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          const isProduction = process.env.NODE_ENV === 'production';
          
          // Створюємо response для встановлення cookies
          const nextResponse: NextResponse = isPublicRoute
            ? NextResponse.redirect(new URL('/', request.url))
            : NextResponse.next();
          
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options: Parameters<typeof cookieStore.set>[2] = {};
            if (parsed.Expires) options.expires = new Date(parsed.Expires);
            if (parsed.Path) options.path = parsed.Path;
            if (parsed['Max-Age']) options.maxAge = Number(parsed['Max-Age']);
            
            // Для cross-domain (фронтенд на Vercel, бекенд на Render) потрібні Secure та SameSite=None
            // Secure обов'язковий для SameSite=None
            options.secure = isProduction || parsed.Secure === 'true';
            // Для cross-domain використовуємо SameSite=None (обов'язково з Secure=true)
            options.sameSite = (parsed.SameSite as 'lax' | 'strict' | 'none') || (isProduction ? 'none' : 'lax');

            if (parsed.accessToken) {
              cookieStore.set('accessToken', parsed.accessToken, options);
              nextResponse.cookies.set('accessToken', parsed.accessToken, options);
            }
            if (parsed.refreshToken) {
              cookieStore.set('refreshToken', parsed.refreshToken, options);
              nextResponse.cookies.set('refreshToken', parsed.refreshToken, options);
            }
            if (parsed.sessionId) {
              cookieStore.set('sessionId', parsed.sessionId, options);
              nextResponse.cookies.set('sessionId', parsed.sessionId, options);
            }
          }
          
          return nextResponse;
        }

        if (sessionResponse.data?.authorized !== true) {
          cookieStore.delete('accessToken');
          cookieStore.delete('refreshToken');
          cookieStore.delete('sessionId');
          console.log('Session not authorized, clearing cookies');
          
          // Створюємо response для очищення cookies
          const clearResponse = isPublicRoute 
            ? NextResponse.next() 
            : NextResponse.redirect(new URL('/auth/login', request.url));
          
          clearResponse.cookies.delete('accessToken');
          clearResponse.cookies.delete('refreshToken');
          clearResponse.cookies.delete('sessionId');
          
          if (!isPublicRoute && !isPrivateRoute) {
            return clearResponse;
          }
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || error?.message || 'Unknown error';
        console.error('Error checking server session:', errorMessage);

        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        cookieStore.delete('sessionId');

        // Якщо це публічний маршрут, дозволяємо доступ з очищеними cookies
        if (isPublicRoute) {
          const clearResponse = NextResponse.next();
          clearResponse.cookies.delete('accessToken');
          clearResponse.cookies.delete('refreshToken');
          clearResponse.cookies.delete('sessionId');
          return clearResponse;
        }

        // Якщо це приватний маршрут, редіректимо на логін з очищеними cookies
        if (isPrivateRoute) {
          const clearResponse = NextResponse.redirect(new URL('/auth/login', request.url));
          clearResponse.cookies.delete('accessToken');
          clearResponse.cookies.delete('refreshToken');
          clearResponse.cookies.delete('sessionId');
          return clearResponse;
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
