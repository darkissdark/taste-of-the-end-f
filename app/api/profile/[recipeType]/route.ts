import { NextRequest } from "next/server";
import { proxyRequest } from "../../_utils/utils";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ recipeType: string }> }
) {
  const { recipeType } = await context.params;
  const searchParams = request.nextUrl.searchParams.toString();
  const url =
    recipeType === "personal"
      ? searchParams
        ? `/api/recipes/personal?${searchParams}`
        : `/api/recipes/personal`
      : searchParams
        ? `/api/recipes/favorites?${searchParams}`
        : `/api/recipes/favorites`;
  return proxyRequest(request, "get", url, undefined, {
    errorMessage: "Error proxying profile recipes request:",
  });
}
