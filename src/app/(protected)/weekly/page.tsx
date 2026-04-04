"use client";

import { useExpenses } from "@/src/hooks/useExpenses";
import { getWeeklySpending } from "@/src/lib/advancedAnalytics";
import WeeklyChart from "@/src/components/charts/WeeklyChart";
import Skeleton from "@/src/components/Skeleton";

export default function WeeklyPage() {
  const { data, isLoading } = useExpenses();
  const expenses = Array.isArray(data) ? data : data?.data || [];

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Weekly Trends</h1>
      <WeeklyChart data={getWeeklySpending(expenses)} />
    </div>
  );
}
