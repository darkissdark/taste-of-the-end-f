import { NextRequest } from 'next/server';
import { proxyRequest } from '../../_utils/utils';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return proxyRequest(request, 'post', '/api/auth/login', body, {
    errorMessage: 'Error proxying login request:',
    includeAuthorized: true,
  });
}
