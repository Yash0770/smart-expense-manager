import { Expense } from "@/src/types/expense";

export function getWeeklySpending(expenses: Expense[]) {
  const map: Record<string, number> = {};

  expenses.forEach((exp) => {
    const week = `Week ${Math.ceil(
      new Date(exp.date).getDate() / 7
    )}`;

    map[week] = (map[week] || 0) + exp.amount;
  });

  return Object.entries(map).map(([name, total]) => ({
    name,
    total,
  }));
}

export function compareLastMonth(expenses: Expense[]) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth - 1;

  let current = 0;
  let previous = 0;

  expenses.forEach((e) => {
    const month = new Date(e.date).getMonth();

    if (month === currentMonth) current += e.amount;
    if (month === lastMonth) previous += e.amount;
  });

  const change = previous
    ? ((current - previous) / previous) * 100
    : 0;

  return {
    current,
    previous,
    change: change.toFixed(1),
  };
}