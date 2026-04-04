"use client";

import { useExpenses } from "@/src/hooks/useExpenses";
import AIInsights from "@/src/components/AIInsights";
import Skeleton from "@/src/components/Skeleton";

export default function AIPage() {
  const { data, isLoading } = useExpenses();

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">AI Insights</h1>
      <AIInsights expenses={data} />
    </div>
  );
}
