import { generateInsights } from "@/src/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { expenses } = await req.json();

    const insight = await generateInsights(expenses);

    return NextResponse.json({ insight });
  } catch {
    return NextResponse.json(
      { message: "AI Error" },
      { status: 500 }
    );
  }
}