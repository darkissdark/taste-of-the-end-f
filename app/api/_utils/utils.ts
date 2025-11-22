import { NextRequest, NextResponse } from 'next/server';
import { cookies as nextCookies } from 'next/headers';
import { api } from '../api';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { parse } from 'cookie';

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

/**
 * Оновлює cookies з set-cookie headers відповіді
 */
function updateCookiesFromHeaders(
  cookieStore: Awaited<ReturnType<typeof nextCookies>>,
  setCookieHeaders: string | string[] | undefined
): void {
  if (!setCookieHeaders) return;

  const cookieArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);
    if (Object.prototype.hasOwnProperty.call(parsed, 'accessToken')) {
      if (parsed.accessToken) {
        cookieStore.set('accessToken', parsed.accessToken);
      } else {
        cookieStore.delete('accessToken');
      }
    }

    if (Object.prototype.hasOwnProperty.call(parsed, 'refreshToken')) {
      if (parsed.refreshToken) {
        cookieStore.set('refreshToken', parsed.refreshToken);
      } else {
        cookieStore.delete('refreshToken');
      }
    }

    if (Object.prototype.hasOwnProperty.call(parsed, 'sessionId')) {
      if (parsed.sessionId) {
        cookieStore.set('sessionId', parsed.sessionId);
      } else {
        cookieStore.delete('sessionId');
      }
    }
  }
}

interface ProxyOptions {
  errorMessage?: string;
  errorResponseData?: (error: any) => any;
  includeAuthorized?: boolean;
}

/**
 * Проксує запит на бекенд з обробкою cookies (SSR/Edge-friendly)
 */
export async function proxyRequest(
  request: NextRequest,
  method: 'get' | 'post' | 'patch' | 'delete',
  url: string,
  body?: any,
  options: ProxyOptions = {}
): Promise<NextResponse> {
  // SSR-aware куки (винесено за межі try блоку для доступу в catch)
  const cookieStore = await nextCookies();
  
  try {
    const cookiesHeader = cookieStore.toString();

    // Виконуємо запит на бекенд
    let response: AxiosResponse;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Cookie: cookiesHeader,
      },
    };

    switch (method) {
      case 'get':
        response = await api.get(url, requestConfig);
        break;
      case 'post':
        response = await api.post(url, body ?? null, requestConfig);
        break;
      case 'patch':
        response = await api.patch(url, body ?? null, requestConfig);
        break;
      case 'delete':
        response = await api.delete(url, requestConfig);
        break;
    }

    // Проксіруємо куки з бекенду через cookieStore
    updateCookiesFromHeaders(cookieStore, response.headers['set-cookie']);

    // Повертаємо відповідь з оновленими куками

    if (response.status === 204) {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'set-cookie': cookieStore.toString(),
        },
      });
    }

    return NextResponse.json(response.data, {
      status: response.status,
      headers: {
        'set-cookie': cookieStore.toString(),
      },
    });
  } catch (error: any) {
    // Якщо отримали 401 і це не запит на refresh, спробуємо оновити токен і повторити запит
    if (error.response?.status === 401 && url !== '/api/auth/refresh') {
      // Перевіряємо, чи є refresh token перед спробою оновлення
      const refreshToken = cookieStore.get('refreshToken')?.value;
      if (!refreshToken) {
        // Якщо немає refresh token, повертаємо помилку 401
        console.error('No refresh token available for token refresh');
        const errorResponseData = options.errorResponseData
          ? options.errorResponseData(error)
          : {
              ...(options.includeAuthorized ? { authorized: false } : {}),
              error: 'Unauthorized',
              response: error.response?.data,
            };

        return NextResponse.json(errorResponseData, {
          status: 401,
          headers: {
            'set-cookie': cookieStore.toString(),
          },
        });
      }

      try {
        // Спробуємо оновити токен
        const refreshResponse = await api.post('/api/auth/refresh', null, {
          headers: {
            Cookie: cookieStore.toString(),
          },
        });

        // Оновлюємо cookies з refresh response
        updateCookiesFromHeaders(cookieStore, refreshResponse.headers['set-cookie']);

        // Повторюємо оригінальний запит з оновленими cookies
        const retryConfig: AxiosRequestConfig = {
          headers: {
            Cookie: cookieStore.toString(),
          },
        };

        let retryResponse: AxiosResponse;
        switch (method) {
          case 'get':
            retryResponse = await api.get(url, retryConfig);
            break;
          case 'post':
            retryResponse = await api.post(url, body ?? null, retryConfig);
            break;
          case 'patch':
            retryResponse = await api.patch(url, body ?? null, retryConfig);
            break;
          case 'delete':
            retryResponse = await api.delete(url, retryConfig);
            break;
        }

        // Оновлюємо cookies з retry response
        updateCookiesFromHeaders(cookieStore, retryResponse.headers['set-cookie']);

        // Якщо retry також повернув 401, повертаємо помилку (захист від циклу)
        if (retryResponse.status === 401) {
          console.error('Retry request still returned 401 after token refresh');
          const errorResponseData = options.errorResponseData
            ? options.errorResponseData(error)
            : {
                ...(options.includeAuthorized ? { authorized: false } : {}),
                error: 'Unauthorized',
                response: retryResponse.data,
              };

          return NextResponse.json(errorResponseData, {
            status: 401,
            headers: {
              'set-cookie': cookieStore.toString(),
            },
          });
        }

        // Повертаємо успішну відповідь з оновленими cookies
        if (retryResponse.status === 204) {
          return new NextResponse(null, {
            status: 204,
            headers: {
              'set-cookie': cookieStore.toString(),
            },
          });
        }

        return NextResponse.json(retryResponse.data, {
          status: retryResponse.status,
          headers: {
            'set-cookie': cookieStore.toString(),
          },
        });
      } catch (refreshError: any) {
        // Якщо refresh не вдався, повертаємо оригінальну помилку
        console.error('Token refresh failed:', refreshError?.response?.data || refreshError?.message || refreshError);
        
        // Очищаємо cookies якщо refresh не вдався
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        cookieStore.delete('sessionId');
        
        // Продовжуємо до обробки помилки нижче
      }
    }

    console.error(options.errorMessage || `Error proxying ${method.toUpperCase()} request:`, error);

    const errorResponseData = options.errorResponseData
      ? options.errorResponseData(error)
      : {
          ...(options.includeAuthorized ? { authorized: false } : {}),
          error: 'Internal server error',
          response: error.response?.data,
        };

    return NextResponse.json(errorResponseData, {
      status: error.response?.status || 500,
      headers: {
        'set-cookie': cookieStore.toString(),
      },
    });
  }
}
