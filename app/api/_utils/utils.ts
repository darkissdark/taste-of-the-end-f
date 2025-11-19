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
  try {
    // SSR-aware куки
    const cookieStore = nextCookies();
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
    const setCookieHeaders = response.headers['set-cookie'];
    if (setCookieHeaders) {
      const cookieArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        if (parsed.accessToken) (await cookieStore).set('accessToken', parsed.accessToken);
        if (parsed.refreshToken) (await cookieStore).set('refreshToken', parsed.refreshToken);
        if (parsed.sessionId) (await cookieStore).set('sessionId', parsed.sessionId);
      }
    }

    // Повертаємо відповідь з оновленими куками
    return NextResponse.json(response.data, {
      status: response.status,
      headers: {
        'set-cookie': cookieStore.toString(),
      },
    });
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
