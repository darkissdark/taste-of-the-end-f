import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ recipeType: string }> }
) {
  const { recipeType } = await context.params;
  return NextResponse.json({
    message: "profile recipes placeholder",
    recipeType
  });
}
