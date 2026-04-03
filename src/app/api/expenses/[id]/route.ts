import { connectDB } from "@/src/lib/db";
import { getUserFromRequest } from "@/src/lib/getUser";
import Expense from "@/src/models/Expense";
import { expenseSchema } from "@/src/types/expense";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectDB();

    const { id } = await params;

    const user = getUserFromRequest(req);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = expenseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues },
        { status: 400 }
      );
    }

    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: user.userId },
      {
        ...parsed.data,
        date: new Date(parsed.data.date),
      },
      // { new: true }
      { returnDocument: "after" }
    );

    if (!expense) {
      return NextResponse.json(
        { message: "Expense not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Expense updated",
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

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const user = getUserFromRequest(req);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const expense = await Expense.findOneAndDelete({
      _id: id,
      userId: user.userId,
    });

    if (!expense) {
      return NextResponse.json(
        { message: "Expense not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Expense deleted",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}