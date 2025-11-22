import { proxyRequest } from '@/app/api/_utils/utils';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return proxyRequest(request, 'post', `/api/recipes/favorites/${id}`, undefined, {
    errorMessage: 'Error proxying favorites detail POST request:',
  });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return proxyRequest(request, 'delete', `/api/recipes/favorites/${id}`, undefined, {
    errorMessage: 'Error proxying favorites detail DELETE request:',
  });
}
