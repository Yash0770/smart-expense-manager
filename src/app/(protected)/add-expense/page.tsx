"use client";

import AddExpenseForm from "@/src/components/forms/AddExpenseForm";

export default function AddPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Add Expense</h1>
      <AddExpenseForm />
    </div>
  );
}
