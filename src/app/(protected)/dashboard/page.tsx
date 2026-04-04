"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";

import AddExpenseForm from "@/src/components/forms/AddExpenseForm";
import ExpenseList from "@/src/components/ExpenseList";
import MonthlyChart from "@/src/components/charts/MonthlyChart";
import CategoryChart from "@/src/components/charts/CategoryChart";
import Insights from "@/src/components/Insights";

import { getMonthlyData, getCategoryData } from "@/src/lib/analytics";
import AIInsights from "@/src/components/AIInsights";
import FadeIn from "@/src/components/ui/FadeIn";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await api.get("/expenses");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const expenses = data?.data || [];

  const monthlyData = getMonthlyData(expenses);
  const categoryData = getCategoryData(expenses);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <FadeIn>
          <AddExpenseForm />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn>
            <MonthlyChart data={monthlyData} />
          </FadeIn>

          <FadeIn>
            <CategoryChart data={categoryData} />
          </FadeIn>
        </div>

        <FadeIn>
          <Insights expenses={expenses} />
          {/* <AIInsights expenses={expenses} /> */}
        </FadeIn>

        <FadeIn>
          <ExpenseList />
        </FadeIn>
      </div>
    </div>
  );
}
