import { categorizeExpense } from "@/src/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title required" },
        { status: 400 }
      );
    }

    const category = await categorizeExpense(title);

    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json(
      { message: "AI Error" },
      { status: 500 }
    );
  }
}