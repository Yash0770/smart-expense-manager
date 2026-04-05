"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import { Expense } from "@/src/types/expense";
import toast from "react-hot-toast";
import { useState } from "react";
import Skeleton from "./Skeleton";
import DeleteDialog from "@/src/components/ui/DeleteDialog";
import Icon from "./ui/Icon/Icon";

const CATEGORY_COLORS: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  food: {
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    text: "text-indigo-600 dark:text-indigo-400",
    dot: "bg-indigo-500",
  },
  travel: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  movie: {
    bg: "bg-pink-50 dark:bg-pink-500/10",
    text: "text-pink-600 dark:text-pink-400",
    dot: "bg-pink-500",
  },
  game: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  shopping: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  health: {
    bg: "bg-teal-50 dark:bg-teal-500/10",
    text: "text-teal-600 dark:text-teal-400",
    dot: "bg-teal-500",
  },
  bills: {
    bg: "bg-orange-50 dark:bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    dot: "bg-orange-500",
  },
};

const getCategoryStyle = (category: string) =>
  CATEGORY_COLORS[category.toLowerCase()] ?? {
    bg: "bg-gray-100 dark:bg-white/5",
    text: "text-gray-600 dark:text-white/40",
    dot: "bg-gray-400",
  };

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const inputBase =
  "w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 outline-none focus:border-indigo-400 dark:focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/10 transition-all duration-200";

const PAGE_SIZE = 5;

export default function ExpenseList() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Expense>>({});
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  // dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingDeleteTitle, setPendingDeleteTitle] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await api.get("/expenses");
      return res.data;
    },
  });

  const expenses: Expense[] = Array.isArray(data) ? data : data?.data || [];
  const totalPages = Math.ceil(expenses.length / PAGE_SIZE);
  const paginated = expenses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // open dialog instead of confirm()
  const promptDelete = (id: string, title: string) => {
    setPendingDeleteId(id);
    setPendingDeleteTitle(title);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    setDeletingId(pendingDeleteId);
    try {
      await api.delete(`/expenses/${pendingDeleteId}`);
      toast.success("Deleted ✅");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      const newTotal = expenses.length - 1;
      const newTotalPages = Math.ceil(newTotal / PAGE_SIZE);
      if (page > newTotalPages) setPage(Math.max(1, newTotalPages));
    } catch {
      toast.error("Delete failed ❌");
    }
    setDeletingId(null);
    setDialogOpen(false);
    setPendingDeleteId(null);
    setPendingDeleteTitle("");
  };

  const handleUpdate = async (id: string) => {
    setSavingId(id);
    try {
      await api.put(`/expenses/${id}`, form);
      toast.success("Updated ✅");
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    } catch {
      toast.error("Update failed ❌");
    }
    setSavingId(null);
  };

  if (isLoading) return <Skeleton />;

  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm mt-4">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-gray-300 dark:text-white/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          No expenses yet
        </p>
        <p className="text-xs text-gray-400 dark:text-white/30">
          Start by adding your first expense above
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Delete dialog */}
      <DeleteDialog
        open={dialogOpen}
        title="Delete Expense"
        description={`Are you sure you want to delete "${pendingDeleteTitle}"? This action cannot be undone.`}
        loading={!!deletingId}
        onConfirm={handleDelete}
        onCancel={() => {
          setDialogOpen(false);
          setPendingDeleteId(null);
          setPendingDeleteTitle("");
        }}
      />

      <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.06] rounded-2xl shadow-sm mt-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center">
              <Icon
                name="clipboardListIcon"
                size={15}
                className="text-indigo-400"
              />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Expenses
              </h2>
              <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
                {expenses.length} total entries
              </p>
            </div>
          </div>
          {totalPages > 1 && (
            <span className="text-xs text-gray-400 dark:text-white/30">
              Page {page} of {totalPages}
            </span>
          )}
        </div>

        {/* List */}
        <div className="divide-y divide-gray-50 dark:divide-white/[0.04]">
          {paginated.map((item) => {
            const style = getCategoryStyle(item.category);
            const isEditing = editing === item._id;
            const isDeleting = deletingId === item._id;
            const isSaving = savingId === item._id;

            return (
              <div
                key={item._id}
                className="px-5 py-4 transition-colors hover:bg-gray-50/60 dark:hover:bg-white/[0.015]"
              >
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-400 dark:text-white/30 uppercase tracking-wider">
                          Title
                        </label>
                        <input
                          className={inputBase}
                          placeholder="Title"
                          value={form.title || ""}
                          onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-400 dark:text-white/30 uppercase tracking-wider">
                          Amount
                        </label>
                        <input
                          className={inputBase}
                          type="number"
                          placeholder="Amount"
                          value={form.amount || ""}
                          onChange={(e) =>
                            setForm({ ...form, amount: Number(e.target.value) })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-400 dark:text-white/30 uppercase tracking-wider">
                          Category
                        </label>
                        <input
                          className={inputBase}
                          placeholder="Category"
                          value={form.category || ""}
                          onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-400 dark:text-white/30 uppercase tracking-wider">
                          Date
                        </label>
                        <input
                          className={inputBase}
                          type="date"
                          value={
                            form.date ? form.date.toString().slice(0, 10) : ""
                          }
                          onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleUpdate(item._id)}
                        disabled={isSaving}
                        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-xs font-medium rounded-xl transition-all cursor-pointer"
                      >
                        {isSaving ? (
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Icon name="checkIcon" size={14} />
                        )}
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-white/[0.05] hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-white/50 text-xs font-medium rounded-xl transition-all cursor-pointer"
                      >
                        <Icon name="closeIcon" size={14} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl ${style.bg} flex items-center justify-center shrink-0`}
                      >
                        <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className={`inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded-md ${style.bg} ${style.text} capitalize`}
                          >
                            {item.category}
                          </span>
                          <span className="text-[11px] text-gray-400 dark:text-white/25">
                            {formatDate(item.date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        ₹{item.amount.toLocaleString()}
                      </p>

                      {/* Edit */}
                      <button
                        onClick={() => {
                          setEditing(item._id);
                          setForm(item);
                        }}
                        className="w-8 h-8 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] text-gray-400 dark:text-white/30 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all cursor-pointer"
                      >
                        <Icon name="pencilIcon" size={14} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => promptDelete(item._id, item.title)}
                        disabled={isDeleting}
                        className="w-8 h-8 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] text-gray-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-50 transition-all cursor-pointer"
                      >
                        {isDeleting ? (
                          <div className="w-3.5 h-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                        ) : (
                          <Icon name="trashTwoIcon" size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 dark:border-white/[0.05]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-white/40 hover:bg-gray-50 dark:hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Icon name="chevronLeftIcon" size={16} />
              Prev
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                    p === page
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-900/20"
                      : "text-gray-500 dark:text-white/30 hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-white/40 hover:bg-gray-50 dark:hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
              <Icon name="chevronRightIcon" size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
