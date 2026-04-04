"use client";

import { useExpenses } from "@/src/hooks/useExpenses";
import Skeleton from "@/src/components/Skeleton";
import Insights from "@/src/components/Insights";

export default function InsightsPage() {
  const { data, isLoading } = useExpenses();

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Insights</h1>
      <Insights expenses={data} />
    </div>
  );
}
