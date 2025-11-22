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
      // Якщо accessToken відсутній, але є refreshToken — потрібно перевірити сесію навіть для публічного маршруту,
      // адже сесія може залишатися активною, і тоді потрібно заборонити доступ до публічного маршруту.
      try {
        const response = await checkServerSession();
        const setCookie = response.headers['set-cookie'];
        const isAuthorized = response.data?.authorized === true;

        console.log('Session check result:', {
          authorized: response.data?.authorized,
          hasSetCookie: !!setCookie,
          status: response.status,
        });

        // Перевіряємо чи сесія дійсно активна (authorized: true)
        if (isAuthorized && setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
          }
          // Якщо сесія все ще активна:
          // для публічного маршруту — виконуємо редірект на головну.
          if (isPublicRoute) {
            return NextResponse.redirect(new URL('/', request.url), {
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
          // для приватного маршруту — дозволяємо доступ
          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
        } else if (response.data?.authorized !== true) {
          // Якщо authorized: false, очищаємо cookies для синхронізації
          cookieStore.delete('accessToken');
          cookieStore.delete('refreshToken');
          cookieStore.delete('sessionId');
          console.log('Session not authorized, clearing cookies');
        }
        // Якщо authorized: false або сесія неактивна, обробляємо як відсутність авторизації
      } catch (error: any) {
        // Якщо помилка при перевірці сесії (наприклад "Session not found"), очищаємо cookies
        const errorMessage = error?.response?.data?.message || error?.message || 'Unknown error';
        console.error('Error checking server session:', errorMessage);
        
        // Очищаємо cookies при помилці сесії
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        cookieStore.delete('sessionId');
        
        // Якщо це публічний маршрут, дозволяємо доступ з очищеними cookies
        if (isPublicRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
        
        // Якщо це приватний маршрут, редіректимо на логін з очищеними cookies
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL('/auth/login', request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }
    // Якщо refreshToken або сесії немає:
    // публічний маршрут — дозволяємо доступ
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // приватний маршрут — редірект на сторінку входу
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Якщо accessToken існує:
  // публічний маршрут — виконуємо редірект на головну
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // приватний маршрут — дозволяємо доступ
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/add-recipe/:path*', '/auth/login', '/auth/register'],
};

