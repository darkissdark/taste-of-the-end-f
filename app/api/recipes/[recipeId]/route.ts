import { NextResponse } from "next/server";

type Context = {
  params: {
    recipeId: string;
  };
};

export function GET(_request: Request, context: Context) {
  return NextResponse.json({
    message: "recipe detail placeholder",
    recipeId: context.params.recipeId
  });
}

