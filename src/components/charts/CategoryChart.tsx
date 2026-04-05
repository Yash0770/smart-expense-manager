"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const CATEGORY_COLORS: Record<string, string> = {
  food: "#6366f1",
  travel: "#f59e0b",
  movie: "#ec4899",
  game: "#10b981",
  shopping: "#3b82f6",
  health: "#14b8a6",
  education: "#8b5cf6",
  bills: "#f97316",
  other: "#94a3b8",
};

const getFallbackColor = (index: number) => {
  const palette = [
    "#6366f1",
    "#f59e0b",
    "#ec4899",
    "#10b981",
    "#3b82f6",
    "#14b8a6",
    "#8b5cf6",
    "#f97316",
    "#ef4444",
    "#06b6d4",
  ];
  return palette[index % palette.length];
};

const getColor = (name: string, index: number) =>
  CATEGORY_COLORS[name.toLowerCase()] ?? getFallbackColor(index);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-white dark:bg-[#1f2937] border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: payload[0].payload.fill }}
          />
          <p className="text-xs text-gray-400 dark:text-white/40 capitalize">
            {name}
          </p>
        </div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          ₹{value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
    {payload.map((entry: any, index: number) => (
      <div key={index} className="flex items-center gap-1.5">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: entry.payload.fill }}
        />
        <span className="text-xs text-gray-500 dark:text-white/40 capitalize">
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

export default function CategoryChart({ data }: { data: any[] }) {
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: getColor(item.name, index),
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.06] p-5 rounded-2xl shadow-sm">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Category Breakdown
        </h2>
        <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
          Spending by category
        </p>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={coloredData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={3}
              strokeWidth={0}
            >
              {coloredData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Total in center — positioned over the donut hole */}
      <div className="relative -mt-[168px] mb-[110px] flex flex-col items-center justify-center pointer-events-none">
        <p className="text-xs text-gray-400 dark:text-white/30">Total</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          ₹{total.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
