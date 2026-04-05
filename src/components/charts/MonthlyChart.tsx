"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1f2937] border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-gray-400 dark:text-white/40 mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function MonthlyChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.06] p-5 rounded-2xl shadow-sm">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Monthly Spending
        </h2>
        <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
          Total spend per month
        </p>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="35%">
            <CartesianGrid
              vertical={false}
              stroke="currentColor"
              strokeOpacity={0.06}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "currentColor", opacity: 0.4 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "currentColor", opacity: 0.4 }}
              tickFormatter={(v) => `₹${v}`}
              width={48}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "currentColor", opacity: 0.04, radius: 8 }}
            />
            <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={index === data.length - 1 ? "#6366f1" : "#e0e7ff"}
                  className="dark:[&:not(:last-child)]:fill-white/10 dark:[&:last-child]:fill-indigo-500"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
