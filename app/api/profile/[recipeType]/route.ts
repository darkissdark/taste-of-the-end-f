import { NextResponse } from "next/server";

type Context = {
  params: {
    recipeType: string;
  };
};

export function GET(_request: Request, context: Context) {
  return NextResponse.json({
    message: "profile recipes placeholder",
    recipeType: context.params.recipeType,
  });
}
