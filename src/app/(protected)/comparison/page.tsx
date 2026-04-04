"use client";

import { useExpenses } from "@/src/hooks/useExpenses";
import { compareLastMonth } from "@/src/lib/advancedAnalytics";
import ComparisonCard from "@/src/components/ComparisonCard";
import Skeleton from "@/src/components/Skeleton";

export default function ComparisonPage() {
  const { data, isLoading } = useExpenses();

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Comparison</h1>
      <ComparisonCard data={compareLastMonth(data)} />
    </div>
  );
}
