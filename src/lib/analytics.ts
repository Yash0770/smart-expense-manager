import { Expense } from "../types/expense";

export function getMonthlyData(expenses: Expense[]) {
  const map: Record<string, number> = {};

  expenses.forEach((exp) => {
    const month = new Date(exp.date).toLocaleString("default", {
      month: "short",
    });

    map[month] = (map[month] || 0) + exp.amount;
  });

  return Object.keys(map).map((key) => ({
    name: key,
    total: map[key],
  }));
}

export function getCategoryData(expenses: Expense[]) {
  const map: Record<string, number> = {};

  expenses.forEach((exp) => {
    map[exp.category] = (map[exp.category] || 0) + exp.amount;
  });

  return Object.keys(map).map((key) => ({
    name: key,
    value: map[key],
  }));
}

export function getInsights(expenses: Expense[]) {
  if (!expenses.length) return null;

  let total = 0;
  let highest = expenses[0];

  const categoryMap: Record<string, number> = {};

  expenses.forEach((exp) => {
    total += exp.amount;

    if (exp.amount > highest.amount) highest = exp;

    categoryMap[exp.category] =
      (categoryMap[exp.category] || 0) + exp.amount;
  });

  const topCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return {
    total,
    highest,
    topCategory: topCategory?.[0],
  };
}