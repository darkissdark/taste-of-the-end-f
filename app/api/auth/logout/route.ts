import { NextRequest } from 'next/server';
import { proxyRequest } from '../../_utils/utils';

export async function POST(request: NextRequest) {
  return proxyRequest(request, 'post', '/api/auth/logout', null, {
    errorMessage: 'Error proxying logout request:',
    includeAuthorized: true,
  });
}
