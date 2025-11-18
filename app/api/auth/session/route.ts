import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "../../_utils/utils";

export async function GET(request: NextRequest) {
  try {
    // Отримуємо кукі з клієнтського запиту
    const cookies = request.headers.get("cookie") || "";

    // Перевіряємо наявність accessToken в кукі
    if (cookies.includes("accessToken")) {
      return NextResponse.json({ success: true });
    }

    // Якщо немає accessToken, але є refreshToken, спробуємо оновити сесію
    if (cookies.includes("refreshToken")) {
      const response = await proxyRequest(
        request,
        "post",
        "/api/auth/refresh",
        null,
        {
          errorMessage: "Error proxying session refresh request:",
          includeAuthorized: true,
        }
      );

      // Якщо refresh успішний, повертаємо success: true з cookies з response
      if (response.status === 200) {
        // Копіюємо cookies з response
        const setCookieHeaders = response.headers.getSetCookie();
        const nextResponse = NextResponse.json({ success: true }, { status: 200 });
        
        // Копіюємо cookies з оригінального response
        setCookieHeaders.forEach((cookie) => {
          nextResponse.headers.append("Set-Cookie", cookie);
        });
        
        return nextResponse;
      }

      return NextResponse.json({ success: false }, { status: 200 });
    }

    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error: any) {
    console.error("Error proxying session request:", error);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
