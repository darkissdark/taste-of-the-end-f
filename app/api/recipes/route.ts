import { NextRequest } from 'next/server';
import { proxyRequest } from '../_utils/utils';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();
  const url = searchParams ? `/api/recipes?${searchParams}` : '/api/recipes';
  return proxyRequest(request, 'get', url, undefined, {
    errorMessage: 'Error proxying recipes GET request:',
  });
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';

  let body;
  if (contentType.includes('multipart/form-data')) {
    // Handle FormData for file uploads
    body = await request.formData();
  } else {
    // Handle JSON requests
    body = await request.json();
  }

  return proxyRequest(request, 'post', '/api/recipes', body, {
    errorMessage: 'Error proxying recipes POST request:',
  });
}
