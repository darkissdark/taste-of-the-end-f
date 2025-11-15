import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ recipeId: string }> }
) {
  const { recipeId } = await context.params;
  return NextResponse.json({
    message: "recipe detail placeholder",
    recipeId
  });
}

