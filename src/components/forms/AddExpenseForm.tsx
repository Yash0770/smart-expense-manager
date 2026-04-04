"use client";

import { useState } from "react";
import { api } from "@/src/lib/api";
import toast from "react-hot-toast";
import { CreateExpenseInput } from "@/src/types/expense";

export default function AddExpenseForm() {
  const [form, setForm] = useState<CreateExpenseInput>({
    title: "",
    amount: 0,
    category: "",
    date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/expenses", form);

      toast.success("Expense added ✅");

      setForm({
        title: "",
        amount: 0,
        category: "",
        date: "",
      });
    } catch (error) {
      toast.error("Failed to add expense ❌");
    }
  };

  // ai
  const handleAutoCategorize = async () => {
    if (!form.title) return;

    try {
      const res = await api.post("/ai/categorize", {
        title: form.title,
      });

      setForm({ ...form, category: res.data.category });

      toast.success("Category auto-filled 🤖");
    } catch {
      toast.error("AI failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl shadow-md w-full"
    >
      <h2 className="text-lg md:text-xl font-semibold mb-4">Add Expense</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Title"
          className="input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Amount"
          type="number"
          className="input"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
        />

        <input
          placeholder="Category"
          className="input"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="date"
          className="input"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <button className="mt-4 w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded-lg cursor-pointer">
        Add Expense
      </button>
      <button
        type="button"
        onClick={handleAutoCategorize}
        className="text-sm text-blue-500 mt-1"
      >
        Auto categorize
      </button>
    </form>
  );
}
