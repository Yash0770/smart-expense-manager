"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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

export default function WeeklyChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.06] p-5 rounded-2xl shadow-sm">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Weekly Trend
        </h2>
        <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
          Day-by-day spending pattern
        </p>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="weeklyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              cursor={{
                stroke: "#6366f1",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#weeklyGradient)"
              dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
