"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md h-[300px]">
      <h2 className="mb-4 font-semibold">Monthly Spending</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}