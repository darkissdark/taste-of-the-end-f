import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";

export async function GET(request: NextRequest) {
  try {
    // Отримуємо кукі з клієнтського запиту
    const cookies = request.headers.get("cookie") || "";

    // Додаємо query параметри якщо є
    const searchParams = request.nextUrl.searchParams.toString();
    const url = searchParams
      ? `/api/profile/favorites?${searchParams}`
      : "/api/profile/favorites";

    // Проксуємо запит на Render бекенд через існуючу обгортку
    const response = await api.get(url, {
      headers: {
        Cookie: cookies, // Передаємо кукі з клієнта до бекенду
      },
    });

    // Копіюємо Set-Cookie заголовки з відповіді бекенду
    const setCookieHeaders = response.headers["set-cookie"];

    // Створюємо нову відповідь з даними та кукі
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

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
  } catch (error: any) {
    console.error("Error proxying favorites request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        response: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Отримуємо кукі з клієнтського запиту
    const cookies = request.headers.get("cookie") || "";

    // Проксуємо запит на Render бекенд через існуючу обгортку
    const response = await api.post("/api/profile/favorites", body, {
      headers: {
        Cookie: cookies, // Передаємо кукі з клієнта до бекенду
      },
    });

    // Копіюємо Set-Cookie заголовки з відповіді бекенду
    const setCookieHeaders = response.headers["set-cookie"];

    // Створюємо нову відповідь з даними та кукі
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

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
  } catch (error: any) {
    console.error("Error proxying favorites POST request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        response: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Отримуємо кукі з клієнтського запиту
    const cookies = request.headers.get("cookie") || "";

    // Додаємо query параметри якщо є (наприклад, recipeId)
    const searchParams = request.nextUrl.searchParams.toString();
    const url = searchParams
      ? `/api/profile/favorites?${searchParams}`
      : "/api/profile/favorites";

    // Проксуємо запит на Render бекенд через існуючу обгортку
    const response = await api.delete(url, {
      headers: {
        Cookie: cookies, // Передаємо кукі з клієнта до бекенду
      },
    });

    // Копіюємо Set-Cookie заголовки з відповіді бекенду
    const setCookieHeaders = response.headers["set-cookie"];

    // Створюємо нову відповідь з даними та кукі
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

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
  } catch (error: any) {
    console.error("Error proxying favorites DELETE request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        response: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}
