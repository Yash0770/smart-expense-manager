import { z } from "zod";

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
}

export interface ExpenseResponse {
  data: Expense[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateExpenseInput {
  title: string;
  amount: number;
  category: string;
  date: string;
}

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  date: z.string(), // ISO string
});

export type ExpenseInput = z.infer<typeof expenseSchema>;