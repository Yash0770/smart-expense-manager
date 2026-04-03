import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  date: z.string(), // ISO string
});

export type ExpenseInput = z.infer<typeof expenseSchema>;