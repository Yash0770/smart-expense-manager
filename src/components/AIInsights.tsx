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
    <div className="space-y-4">
      {/* Generate card */}
      <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-violet-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              AI Spending Analysis
            </h2>
            <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
              Powered by AI — analyzes{" "}
              {Array.isArray(expenses)
                ? expenses.length
                : ((expenses as any)?.data?.length ?? 0)}
              expenses
            </p>
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-200 shadow-sm shadow-violet-900/20"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing your expenses...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              Generate AI Insights
            </>
          )}
        </button>
      </div>

      {/* Result card */}
      {insight && (
        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold text-gray-500 dark:text-white/40 uppercase tracking-wider">
              Analysis Result
            </span>
          </div>

          {/* Insight text — split by newline for paragraphs */}
          <div className="space-y-3">
            {insight
              .split("\n")
              .filter(Boolean)
              .map((line, i) => (
                <p
                  key={i}
                  className="text-sm text-gray-700 dark:text-white/70 leading-relaxed"
                >
                  {line}
                </p>
              ))}
          </div>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-gray-50 dark:border-white/[0.04] flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-gray-300 dark:text-white/20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p className="text-xs text-gray-300 dark:text-white/20">
              AI-generated analysis based on your expense data
            </p>
          </div>
        </div>
      )}

      {/* Empty state — before generating */}
      {!insight && !loading && (
        <div className="bg-white dark:bg-[#111827] border border-dashed border-gray-200 dark:border-white/[0.06] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05] flex items-center justify-center mb-3">
            <svg
              className="w-5 h-5 text-gray-300 dark:text-white/20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-400 dark:text-white/30">
            No insights yet
          </p>
          <p className="text-xs text-gray-300 dark:text-white/20 mt-1">
            Hit the button above to analyze your expenses
          </p>
        </div>
      )}
    </div>
  );
}
