"use client";

import { useExpenses } from "@/src/hooks/useExpenses";
import { getMonthlyData } from "@/src/lib/analytics";
import MonthlyChart from "@/src/components/charts/MonthlyChart";
import Skeleton from "@/src/components/Skeleton";

export default function MonthlyPage() {
  const { data, isLoading } = useExpenses();
  const expenses = Array.isArray(data) ? data : data?.data || [];

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Monthly Trends</h1>
      <MonthlyChart data={getMonthlyData(expenses)} />
    </div>
  );
}
