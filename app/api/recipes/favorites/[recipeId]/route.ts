import { NextRequest } from 'next/server';
import { proxyRequest } from '../../../_utils/utils';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ recipeId: string }> }
) {
  const { recipeId } = await context.params;
  return proxyRequest(
    request,
    'post',
    `/api/recipes/favorites/${recipeId}`,
    undefined,
    {
      errorMessage: 'Error proxying add to favorites request:',
    }
  );
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ recipeId: string }> }
) {
  const { recipeId } = await context.params;
  return proxyRequest(
    request,
    'delete',
    `/api/recipes/favorites/${recipeId}`,
    undefined,
    {
      errorMessage: 'Error proxying remove from favorites request:',
    }
  );
}

