"use client";

import { useExpenses } from "@/src/hooks/useExpenses";
import AIInsights from "@/src/components/AIInsights";
import Skeleton from "@/src/components/Skeleton";

export default function AIPage() {
  const { data, isLoading } = useExpenses();

  if (isLoading) return <Skeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          AI Insights
        </h1>
        <p className="text-sm text-gray-400 dark:text-white/30 mt-1">
          Let AI analyze your spending and give you smart suggestions
        </p>
      </div>
      <AIInsights expenses={data} />
    </div>
  );
}
