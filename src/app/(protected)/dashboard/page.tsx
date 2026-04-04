"use client";

import { useExpenses } from "@/src/hooks/useExpenses";
import { getMonthlyData } from "@/src/lib/analytics";
import MonthlyChart from "@/src/components/charts/MonthlyChart";
import Skeleton from "@/src/components/Skeleton";

export default function DashboardPage() {
  const { data, isLoading } = useExpenses();
  const expenses = Array.isArray(data) ? data : data?.data || [];

  if (isLoading) return <Skeleton />;

  const monthlyData = getMonthlyData(expenses);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Overview</h1>

      <MonthlyChart data={monthlyData} />
    </div>
  );
}
