"use client";

import { Expense } from "@/src/types/expense";
import { getInsights } from "@/src/lib/analytics";

export default function Insights({ expenses }: { expenses: Expense[] }) {
  const insights = getInsights(expenses);

  if (!insights) return null;

  const cards = [
    {
      label: "Total Spend",
      value: `₹${Number(insights.total).toLocaleString()}`,
      sub: "across all expenses",
      color: {
        bg: "bg-indigo-50 dark:bg-indigo-500/10",
        border: "border-indigo-100 dark:border-indigo-500/20",
        icon: "text-indigo-500",
      },
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75"
          />
        </svg>
      ),
    },
    {
      label: "Top Category",
      value: insights.topCategory,
      sub: "highest spend category",
      color: {
        bg: "bg-pink-50 dark:bg-pink-500/10",
        border: "border-pink-100 dark:border-pink-500/20",
        icon: "text-pink-500",
      },
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6h.008v.008H6V6z"
          />
        </svg>
      ),
    },
    {
      label: "Highest Expense",
      value: insights.highest.title,
      sub: `₹${Number(insights.highest.amount).toLocaleString()}`,
      color: {
        bg: "bg-amber-50 dark:bg-amber-500/10",
        border: "border-amber-100 dark:border-amber-500/20",
        icon: "text-amber-500",
      },
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 shadow-sm"
        >
          {/* Icon */}
          <div
            className={`w-10 h-10 rounded-xl ${card.color.bg} border ${card.color.border} flex items-center justify-center mb-4 ${card.color.icon}`}
          >
            {card.icon}
          </div>

          {/* Value */}
          <p className="text-xl font-bold text-gray-900 dark:text-white capitalize truncate">
            {card.value}
          </p>

          {/* Label */}
          <p className="text-xs font-medium text-gray-400 dark:text-white/30 mt-1">
            {card.label}
          </p>

          {/* Sub */}
          <p className="text-xs text-gray-300 dark:text-white/20 mt-0.5">
            {card.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
