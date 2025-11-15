// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { api } from "../../api";
// import { parse } from "cookie";
// import { isAxiosError } from "axios";
// import { logErrorResponse } from "../../_utils/utils";

// export async function POST(request: NextRequest) {
//   try {
//     const cookieStore = await cookies();
//     const refreshToken = cookieStore.get("refreshToken")?.value;
//     const next = request.nextUrl.searchParams.get("next") || "/";

//     if (refreshToken) {
//       const apiRes = await api.post("auth/refresh", {
//         headers: {
//           Cookie: cookieStore.toString(),
//         },
//       });
//       const setCookie = apiRes.headers["set-cookie"];
//       if (setCookie) {
//         const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
//         let accessToken = "";
//         let refreshToken = "";

//         for (const cookieStr of cookieArray) {
//           const parsed = parse(cookieStr);
//           if (parsed.accessToken) accessToken = parsed.accessToken;
//           if (parsed.refreshToken) refreshToken = parsed.refreshToken;
//         }

//         if (accessToken) cookieStore.set("accessToken", accessToken);
//         if (refreshToken) cookieStore.set("refreshToken", refreshToken);

//         return NextResponse.redirect(new URL(next, request.url), {
//           headers: {
//             "set-cookie": cookieStore.toString(),
//           },
//         });
//       }
//     }
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   } catch (error) {
//     if (isAxiosError(error)) {
//       logErrorResponse(error.response?.data);
//       return NextResponse.redirect(new URL("/auth/login", request.url));
//     }
//     logErrorResponse({ message: (error as Error).message });
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (accessToken) {
      return NextResponse.json({ success: true });
    }

    if (refreshToken) {
      const apiRes = await api.post("auth/refresh", {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const setCookie = apiRes.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };

          if (parsed.accessToken)
            cookieStore.set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
        return NextResponse.json({ success: true }, { status: 200 });
      }
    }
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ success: false }, { status: 200 });
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
