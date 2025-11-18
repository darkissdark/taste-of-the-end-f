export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { proxyRequest } from "../../_utils/utils";

export async function GET(request: NextRequest) {
  return proxyRequest(request, "get", "/api/users/me", undefined, {
    errorMessage: "Error proxying users/me GET request:",
  });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  return proxyRequest(request, "patch", "/api/users/me", body, {
    errorMessage: "Error proxying users/me PATCH request:",
  });
}
