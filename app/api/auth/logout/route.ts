import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { proxyRequest } from '../../_utils/utils';

export async function POST(request: NextRequest) {
  const response = await proxyRequest(request, 'post', '/api/auth/logout', null, {
    errorMessage: 'Error proxying logout request:',
    includeAuthorized: true,
  });

  // Очищаємо куки після успішного логауту
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('sessionId');

  // Видаляємо куки з response для клієнта
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  response.cookies.delete('sessionId');

  return response;
}
