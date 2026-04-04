import { SidebarSection } from "../types/sidebar";

export const sidebarSections: SidebarSection[] = [
  {
    title: "Dashboard",
    items: [
      { label: "Overview", icon: "dashboardIcon", path: "/dashboard" },
      { label: "Add Expense", icon: "plusIcon", path: "/add-expense" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { label: "Monthly Trends", icon: "barChartIcon", path: "/monthly" },
      { label: "Weekly Trends", icon: "barChartIcon", path: "/weekly" },
      { label: "Category Breakdown", icon: "pieChartIcon", path: "/category" },
      { label: "Comparison", icon: "compareArrowsIcon", path: "/comparison" },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Spending Insights", icon: "lightbulbIcon", path: "/insights" },
      { label: "AI Insights", icon: "brainIcon", path: "/ai-insights" },
    ],
  },
  {
    title: "Records",
    items: [
      { label: "All Expenses", icon: "listIcon", path: "/expenses" },
    ],
  },
];