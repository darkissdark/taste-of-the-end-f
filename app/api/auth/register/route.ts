import { NextRequest } from "next/server";
import { proxyRequest } from "../../_utils/utils";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return proxyRequest(request, "post", "/api/auth/register", body, {
    errorMessage: "Error proxying register request:",
    includeAuthorized: true,
  });
}
