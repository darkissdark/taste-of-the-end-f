import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";

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
      // Проксуємо запит на Render бекенд для refresh через існуючу обгортку
      const response = await api.post("/api/auth/refresh", null, {
        headers: {
          Cookie: cookies, // Передаємо кукі з клієнта до бекенду
        },
      });

      // Копіюємо Set-Cookie заголовки з відповіді бекенду
      const setCookieHeaders = response.headers["set-cookie"];

      // Створюємо нову відповідь з даними та кукі
      const nextResponse = NextResponse.json(
        { success: true },
        {
          status: response.status,
        }
      );

      // Проксуємо кукі з бекенду, видаляючи domain щоб воно встановилось для Vercel домену
      if (setCookieHeaders) {
        const cookieArray = Array.isArray(setCookieHeaders)
          ? setCookieHeaders
          : [setCookieHeaders];
        cookieArray.forEach((cookie) => {
          // Видаляємо domain з кукі, щоб воно встановилось для поточного домену (Vercel)
          const cookieWithoutDomain = cookie.replace(/; domain=[^;]+/gi, "");
          nextResponse.headers.append("Set-Cookie", cookieWithoutDomain);
        });
      }

      return nextResponse;
    }

    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error: any) {
    console.error("Error proxying session request:", error);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
