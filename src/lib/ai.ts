import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 🔹 Model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// ✅ Auto Categorization
export async function categorizeExpense(title: string) {
  const prompt = `
Categorize this expense into ONE word only from:
Food, Travel, Bills, Shopping, Entertainment, Health, Other.

Expense: ${title}

Only return category name.
`;

// const prompt = `
// You are a strict classifier.

// Allowed categories:
// Food, Travel, Bills, Shopping, Entertainment, Health, Other.

// Rules:
// - Return ONLY one word
// - No explanation

// Expense: ${title}
// `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  return text.replace(/[^a-zA-Z]/g, ""); // clean output
}

// ✅ AI Insights
export async function generateInsights(expenses: {
  title: string;
  amount: number;
  category: string;
}[]) {
  const summary = expenses
    .map((e) => `${e.title} - ₹${e.amount} (${e.category})`)
    .join("\n");

  const prompt = `
Analyze the following expenses and give 2-3 short financial insights:

${summary}

Keep it concise and practical.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}