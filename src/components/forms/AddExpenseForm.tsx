"use client";

import { useState } from "react";
import { api } from "@/src/lib/api";
import toast from "react-hot-toast";
import { CreateExpenseInput } from "@/src/types/expense";
import Icon from "@/src/components/ui/Icon/Icon";

export default function AddExpenseForm() {
  const [form, setForm] = useState<CreateExpenseInput>({
    title: "",
    amount: 0,
    category: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/expenses", form);
      toast.success("Expense added ✅");
      setForm({ title: "", amount: 0, category: "", date: "" });
    } catch {
      toast.error("Failed to add expense ❌");
    }
    setLoading(false);
  };

  const handleAutoCategorize = async () => {
    if (!form.title) return;
    setAiLoading(true);
    try {
      const res = await api.post("/ai/categorize", { title: form.title });
      setForm({ ...form, category: res.data.category });
      toast.success("Category auto-filled 🤖");
    } catch {
      toast.error("AI failed");
    }
    setAiLoading(false);
  };

  const inputBase =
    "w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 outline-none focus:border-indigo-400 dark:focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/10 transition-all duration-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.06] p-5 md:p-7 rounded-2xl shadow-sm w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center shrink-0 mb-2">
          <Icon name="bankNoteDownIcon" size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
            Add Expense
          </h2>
          <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
            Fill in the details below
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 dark:text-white/40 uppercase tracking-wider">
            Title
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/25 pointer-events-none">
              <Icon name="titleIcon" size={15} />
            </div>
            <input
              placeholder="e.g. Grocery shopping"
              className={`${inputBase} pl-9`}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 dark:text-white/40 uppercase tracking-wider">
            Amount
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/25 pointer-events-none">
              <Icon name="amountIcon" size={15} />
            </div>
            <input
              placeholder="0.00"
              type="number"
              min="0"
              step="0.01"
              className={`${inputBase} pl-9`}
              value={form.amount || ""}
              onChange={(e) =>
                setForm({ ...form, amount: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 dark:text-white/40 uppercase tracking-wider">
            Category
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/25 pointer-events-none">
              <Icon name="pieChartIcon" size={15} />
            </div>
            <input
              placeholder="e.g. Food, Travel..."
              className={`${inputBase} pl-9 pr-24`}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            {/* AI badge inside field */}
            <button
              type="button"
              onClick={handleAutoCategorize}
              disabled={aiLoading || !form.title}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
            >
              {aiLoading ? (
                <div className="w-3 h-3 border border-indigo-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Icon name="brainIcon" size={12} />
              )}
              AI
            </button>
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 dark:text-white/40 uppercase tracking-wider">
            Date
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/25 pointer-events-none">
              <Icon name="calendarIcon" size={15} />
            </div>
            <input
              type="date"
              className={`${inputBase} pl-9`}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-white/[0.05] my-5" />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-200 shadow-sm shadow-indigo-900/20 cursor-pointer"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <Icon name="plusIcon" size={16} />
            Add Expense
          </>
        )}
      </button>
    </form>
  );
}
