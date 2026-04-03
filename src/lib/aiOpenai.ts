import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function categorizeExpense(title: string) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a finance assistant. Categorize the expense into one word like Food, Travel, Bills, Shopping, Entertainment.",
      },
      {
        role: "user",
        content: title,
      },
    ],
  });

  return response.choices[0].message.content?.trim();
}

export async function generateInsights(expenses: any[]) {
  const summary = expenses
    .map((e) => `${e.title} - ₹${e.amount} (${e.category})`)
    .join("\n");

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Analyze expenses and give short financial advice in 2-3 lines.",
      },
      {
        role: "user",
        content: summary,
      },
    ],
  });

  return response.choices[0].message.content;
}