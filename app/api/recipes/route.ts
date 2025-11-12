import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "recipes list placeholder" });
}

export async function POST() {
  return NextResponse.json({ message: "create recipe placeholder" });
}

