import { NextRequest } from "next/server";
import { proxyRequest } from "../_utils/utils";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();
  const url = searchParams
    ? `/api/categories?${searchParams}`
    : "/api/categories";
  return proxyRequest(request, "get", url, undefined, {
    errorMessage: "Error proxying categories request:",
  });
}

