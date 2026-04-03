import { Expense } from "@/src/types/expense";
import { getInsights } from "@/src/lib/analytics";

export default function Insights({
  expenses,
}: {
  expenses: Expense[];
}) {
  const insights = getInsights(expenses);

  if (!insights) return null;

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md">
      <h2 className="font-semibold mb-3">Insights</h2>

      <div className="space-y-2 text-sm">
        <p>💰 Total Spend: ₹{insights.total}</p>
        <p>🔥 Top Category: {insights.topCategory}</p>
        <p>
          🚀 Highest Expense: {insights.highest.title} (₹
          {insights.highest.amount})
        </p>
      </div>
    </div>
  );
}