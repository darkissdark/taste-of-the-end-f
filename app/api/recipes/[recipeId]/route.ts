import { NextRequest } from 'next/server';
import { proxyRequest } from '../../_utils/utils';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ recipeId: string }> }
) {
  const { recipeId } = await context.params;
  return proxyRequest(request, 'get', `/api/recipes/${recipeId}`, undefined, {
    errorMessage: 'Error proxying recipe detail request:',
  });
}
