import ExpenseList from "@/src/components/ExpenseList";
import AddExpenseForm from "@/src/components/forms/AddExpenseForm";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <AddExpenseForm />
        <ExpenseList />
      </div>
    </div>
  );
}
