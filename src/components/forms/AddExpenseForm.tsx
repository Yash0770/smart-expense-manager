"use client";

import { useState } from "react";
import { api } from "@/src/lib/api";

export default function AddExpenseForm() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await api.post("/expenses", {
      ...form,
      amount: Number(form.amount),
    });

    alert("Expense added ✅");

    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full"
    >
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Add Expense
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Title"
          className="input"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Amount"
          type="number"
          className="input"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <input
          placeholder="Category"
          className="input"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          type="date"
          className="input"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />
      </div>

      <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">
        Add Expense
      </button>
    </form>
  );
}