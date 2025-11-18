import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

interface ProxyOptions {
  errorMessage?: string;
  errorResponseData?: (error: any) => any;
  includeAuthorized?: boolean;
}

/**
 * Проксує запит на бекенд з обробкою cookies
 * @param request - NextRequest об'єкт
 * @param method - HTTP метод (get, post, patch, delete)
 * @param url - URL для запиту (може містити query параметри)
 * @param body - Тіло запиту (для POST, PATCH)
 * @param options - Додаткові опції для обробки помилок
 * @returns NextResponse з даними та обробленими cookies
 */
export async function proxyRequest(
  request: NextRequest,
  method: 'get' | 'post' | 'patch' | 'delete',
  url: string,
  body?: any,
  options: ProxyOptions = {}
): Promise<NextResponse> {
  try {
    // Отримуємо кукі з клієнтського запиту
    const cookies = request.headers.get('cookie') || '';

    // Виконуємо запит на бекенд
    let response: AxiosResponse;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Cookie: cookies, // Передаємо кукі з клієнта до бекенду
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

    // Створюємо нову відповідь з даними
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    // Проксуємо кукі з бекенду, видаляючи domain щоб воно встановилось для Vercel домену
    const setCookieHeaders = response.headers['set-cookie'];
    if (setCookieHeaders) {
      const cookieArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
      cookieArray.forEach((cookie) => {
        // Видаляємо domain з кукі, щоб воно встановилось для поточного домену (Vercel)
        const cookieWithoutDomain = cookie.replace(/; domain=[^;]+/gi, '');
        nextResponse.headers.append('Set-Cookie', cookieWithoutDomain);
      });
    }

    return nextResponse;
  } catch (error: any) {
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
    });
  }
}
