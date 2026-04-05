"use client";

import { useExpenses } from "@/src/hooks/useExpenses";
import Skeleton from "@/src/components/Skeleton";
import Insights from "@/src/components/Insights";

export default function InsightsPage() {
  const { data, isLoading } = useExpenses();

  if (isLoading) return <Skeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Insights
        </h1>
        <p className="text-sm text-gray-400 dark:text-white/30 mt-1">
          A summary of your spending patterns
        </p>
      </div>
      <Insights expenses={data} />
    </div>
  );
}
