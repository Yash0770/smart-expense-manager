"use client";

import { useExpenses } from "@/src/hooks/useExpenses";
import Skeleton from "@/src/components/Skeleton";
import CategoryChart from "@/src/components/charts/CategoryChart";
import { getCategoryData } from "@/src/lib/analytics";

export default function CategoryPage() {
  const { data, isLoading } = useExpenses();

  if (isLoading) return <Skeleton />;

  const categoryData = getCategoryData(data);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Category</h1>
      <CategoryChart data={categoryData} />
    </div>
  );
}
