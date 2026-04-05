"use client";

import { useExpenses } from "@/src/hooks/useExpenses";
import { compareLastMonth } from "@/src/lib/advancedAnalytics";
import ComparisonCard from "@/src/components/ComparisonCard";
import Skeleton from "@/src/components/Skeleton";

export default function ComparisonPage() {
  const { data, isLoading } = useExpenses();
  const expenses = Array.isArray(data) ? data : data?.data || [];

  if (isLoading) return <Skeleton />;

  const comparison = compareLastMonth(expenses);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Comparison
        </h1>
        <p className="text-sm text-gray-400 dark:text-white/30 mt-1">
          Track how your spending changes month over month
        </p>
      </div>

      <div className="max-w-lg">
        <ComparisonCard data={comparison} />
      </div>
    </div>
  );
}
