import { connectDB } from "@/src/lib/db";
import Expense from "@/src/models/Expense";
import { NextResponse } from "next/server";
import { expenseSchema } from "@/src/types/expense";
import { getUserFromRequest } from "@/src/lib/getUser";

interface ExpenseQuery {
  userId: string;
  category?: string;
  date?: {
    $gte: Date;
    $lte: Date;
  };
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);    

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Validate input
    const parsed = expenseSchema.safeParse(body);    

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues },
        { status: 400 }
      );
    }

    const expense = await Expense.create({
      ...parsed.data,
      userId: user.userId,
      date: new Date(parsed.data.date),
    });    

    return NextResponse.json({
      message: "Expense created",
      data: expense,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}

// GET
export async function GET(req: Request) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const query: ExpenseQuery = { userId: user.userId };

    if (category) query.category = category;

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Expense.countDocuments(query);

    return NextResponse.json({
      data: expenses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}