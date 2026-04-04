import { SidebarSection } from "../types/sidebar";

export const sidebarSections: SidebarSection[] = [
  {
    title: "Dashboard",
    items: [
      { label: "Overview", icon: "HomeIcon", path: "/dashboard" },
      { label: "Add Expense", icon: "PlusIcon", path: "/add-expense" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { label: "Monthly Trends", icon: "BarChartIcon", path: "/monthly" },
      { label: "Weekly Trends", icon: "BarChartIcon", path: "/weekly" },
      { label: "Category Breakdown", icon: "PieChartIcon", path: "/category" },
      { label: "Comparison", icon: "CompareArrowsIcon", path: "/comparison" },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Spending Insights", icon: "LightbulbIcon", path: "/insights" },
      { label: "AI Insights", icon: "BrainIcon", path: "/ai-insights" },
    ],
  },
  {
    title: "Records",
    items: [
      { label: "All Expenses", icon: "ListIcon", path: "/expenses" },
    ],
  },
];