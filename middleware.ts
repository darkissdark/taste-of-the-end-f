import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";

const privateRoutes = ["/profile", "/add-recipe"];
const publicRoutes = ["/login", "/register"];

async function checkServerSession(cookieStore: ReturnType<typeof cookies>) {
  // Формуємо заголовок Cookie для бекенду
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // Запит через rewrite на Vercel (/api/... буде прокситись)
  const res = await fetch(`/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    credentials: "include",
  });

  const setCookieHeader = res.headers.get("set-cookie");
  const data = await res.json();

  return { status: res.status, setCookieHeader, data };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  const refreshToken = (await cookieStore).get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      const { status, setCookieHeader } = await checkServerSession(cookieStore);

      if (setCookieHeader) {
        const cookieArray = Array.isArray(setCookieHeader)
          ? setCookieHeader
          : [setCookieHeader];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            path: parsed.Path || "/",
            maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          };
          if (parsed.accessToken)
            (await cookieStore).set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken)
            (await cookieStore).set(
              "refreshToken",
              parsed.refreshToken,
              options
            );
        }
      }

      if (status === 200) {
        if (isPublicRoute)
          return NextResponse.redirect(new URL("/", request.url));
        if (isPrivateRoute) return NextResponse.next();
      }
    }

    if (isPublicRoute) return NextResponse.next();
    if (isPrivateRoute)
      return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicRoute) return NextResponse.redirect(new URL("/", request.url));
  if (isPrivateRoute) return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/add-recipe/:path*", "/login", "/register"],
};
