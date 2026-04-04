"use client";

import ExpenseList from "@/src/components/ExpenseList";

export default function ExpensesPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">All Expenses</h1>
      <ExpenseList />
    </div>
  );
}
