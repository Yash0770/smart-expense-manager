"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import { ExpenseResponse, Expense } from "@/src/types/expense";
import toast from "react-hot-toast";
import { useState } from "react";
import Skeleton from "./Skeleton";

export default function ExpenseList() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Expense>>({});

  const { data, isLoading } = useQuery<ExpenseResponse>({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await api.get("/expenses");
      return res.data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this expense?")) return;

    try {
      await api.delete(`/expenses/${id}`);
      toast.success("Deleted ✅");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await api.put(`/expenses/${id}`, form);
      toast.success("Updated ✅");
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    } catch {
      toast.error("Update failed ❌");
    }
  };

  if (isLoading) return <Skeleton />;

  return (
    <>
      {data?.data.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No expenses yet 💸</p>
          <p className="text-sm">Start by adding one</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#111827] p-4 rounded-2xl shadow-md mt-4">
          <h2 className="text-lg font-semibold mb-4">Expenses</h2>

          <div className="space-y-3">
            {data?.data.map((item) => (
              <div
                key={item._id}
                className="border p-3 rounded-lg dark:border-gray-700"
              >
                {editing === item._id ? (
                  <>
                    <input
                      className="input mb-2"
                      value={form.title || ""}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />

                    <input
                      className="input mb-2"
                      type="number"
                      value={form.amount || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          amount: Number(e.target.value),
                        })
                      }
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(item._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="px-3 py-1 bg-gray-400 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-semibold">₹{item.amount}</p>

                      <button
                        onClick={() => {
                          setEditing(item._id);
                          setForm(item);
                        }}
                        className="text-blue-500 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
