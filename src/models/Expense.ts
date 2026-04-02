import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  userId: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  createdAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Expense ||
  mongoose.model<IExpense>("Expense", ExpenseSchema);