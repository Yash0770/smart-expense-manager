"use client";

import { useState } from "react";
import { api } from "@/src/lib/api";
import toast from "react-hot-toast";

export default function AIInsights({ expenses }: { expenses: any[] }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    try {
      const res = await api.post("/ai/insights", { expenses });
      setInsight(res.data.insight);
    } catch {
      toast.error("Failed to generate insights");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md">
      <h2 className="font-semibold mb-3">AI Insights 🤖</h2>

      <button
        onClick={generate}
        className="mb-3 px-3 py-1 bg-black text-white rounded"
      >
        {loading ? "Generating..." : "Generate Insights"}
      </button>

      {insight && <p className="text-sm">{insight}</p>}
    </div>
  );
}
