import { connectDB } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  return NextResponse.json({
    message: "DB Connected Successfully 🚀",
  });
}