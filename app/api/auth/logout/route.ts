import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
  );
  res.cookies.set("token", "", { path: "/", expires: new Date(0) });
  return res;
}
