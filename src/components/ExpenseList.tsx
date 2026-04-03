"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";

export default function ExpenseList() {
  const { data, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await api.get("/expenses");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (!data?.data?.length)
    return <p className="text-gray-500">No expenses found</p>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-4">Expenses</h2>

      <div className="space-y-3">
        {data.data.map((item: any) => (
          <div
            key={item._id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">
                {item.category}
              </p>
            </div>

            <p className="font-semibold">₹{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}