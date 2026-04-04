"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CategoryChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white dark:bg-[#111827] p-4 rounded-2xl shadow-md h-[300px]">
      <h2 className="mb-4 font-semibold">Category Breakdown</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}