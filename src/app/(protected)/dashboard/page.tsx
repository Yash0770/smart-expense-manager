"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";

import AddExpenseForm from "@/src/components/forms/AddExpenseForm";
import ExpenseList from "@/src/components/ExpenseList";
import MonthlyChart from "@/src/components/charts/MonthlyChart";
import CategoryChart from "@/src/components/charts/CategoryChart";
import WeeklyChart from "@/src/components/charts/WeeklyChart";
import ComparisonCard from "@/src/components/ComparisonCard";
import Insights from "@/src/components/Insights";
import AIInsights from "@/src/components/AIInsights";
import FadeIn from "@/src/components/ui/FadeIn";

import { getMonthlyData, getCategoryData } from "@/src/lib/analytics";

import {
  getWeeklySpending,
  compareLastMonth,
} from "@/src/lib/advancedAnalytics";
import Skeleton from "@/src/components/Skeleton";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await api.get("/expenses");
      return res.data;
    },
  });

  // if (isLoading) return <p>Loading...</p>;
  if (isLoading) return <Skeleton />;

  const expenses = data?.data || [];

  const monthlyData = getMonthlyData(expenses);
  const categoryData = getCategoryData(expenses);
  const weeklyData = getWeeklySpending(expenses);
  const comparison = compareLastMonth(expenses);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#030712]">
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">
        {/* Top Form */}
        <FadeIn>
          <AddExpenseForm />
        </FadeIn>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn>
            <MonthlyChart data={monthlyData} />
          </FadeIn>

          <FadeIn>
            <WeeklyChart data={weeklyData} />
          </FadeIn>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn>
            <CategoryChart data={categoryData} />
          </FadeIn>

          <FadeIn>
            <ComparisonCard data={comparison} />
          </FadeIn>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn>
            <Insights expenses={expenses} />
          </FadeIn>

          <FadeIn>
            <AIInsights expenses={expenses} />
          </FadeIn>
        </div>

        {/* List */}
        <FadeIn>
          <ExpenseList />
        </FadeIn>
      </div>
    </div>
  );
}
