"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyChart({ data }: { data: any[] }) {
  return (
    <div className="card p-4 h-[300px]">
      <h2 className="mb-4 font-semibold">Weekly Trend</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Line type="monotone" dataKey="total" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}