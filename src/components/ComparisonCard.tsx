"use client";

export default function ComparisonCard({ data }: any) {
  const change = Number(data.change);
  const isIncrease = change > 0;
  const isNeutral = change === 0;

  const currentWidth =
    data.current + data.previous > 0
      ? (data.current / Math.max(data.current, data.previous)) * 100
      : 0;
  const previousWidth =
    data.current + data.previous > 0
      ? (data.previous / Math.max(data.current, data.previous)) * 100
      : 0;

  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 shadow-sm w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center shrink-0">
            <svg
              className="w-[18px] h-[18px] text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.5l4-4 4 4 4-5 4 3"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Monthly Comparison
            </h2>
            <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
              This month vs last month
            </p>
          </div>
        </div>

        {/* Change badge */}
        <div
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold ${
            isNeutral
              ? "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/40"
              : isIncrease
                ? "bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400"
                : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {isNeutral ? (
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          ) : isIncrease ? (
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          ) : (
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6L9 12.75l4.306-4.307a11.95 11.95 0 015.814 5.519l2.74 1.22m0 0l-5.94 2.28m5.94-2.28l-2.28-5.941"
              />
            </svg>
          )}
          {isNeutral ? "No change" : `${Math.abs(change)}%`}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Current month */}
        <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05] rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <p className="text-xs text-gray-400 dark:text-white/30 font-medium">
              This Month
            </p>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{Number(data.current).toLocaleString()}
          </p>
        </div>

        {/* Last month */}
        <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05] rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20" />
            <p className="text-xs text-gray-400 dark:text-white/30 font-medium">
              Last Month
            </p>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{Number(data.previous).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Visual bar comparison */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-white/30">
              This Month
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-white/50">
              ₹{Number(data.current).toLocaleString()}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 dark:bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${currentWidth}%` }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-white/30">
              Last Month
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-white/50">
              ₹{Number(data.previous).toLocaleString()}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 dark:bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-300 dark:bg-white/20 rounded-full transition-all duration-700"
              style={{ width: `${previousWidth}%` }}
            />
          </div>
        </div>
      </div>

      {/* Insight footer */}
      <div
        className={`mt-5 flex items-start gap-2.5 p-3.5 rounded-xl border text-xs ${
          isNeutral
            ? "bg-gray-50 dark:bg-white/[0.02] border-gray-100 dark:border-white/[0.05] text-gray-500 dark:text-white/30"
            : isIncrease
              ? "bg-red-50 dark:bg-red-500/[0.07] border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400"
              : "bg-emerald-50 dark:bg-emerald-500/[0.07] border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
        }`}
      >
        {isNeutral ? (
          <svg
            className="w-3.5 h-3.5 shrink-0 mt-0.5"
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
        ) : isIncrease ? (
          <svg
            className="w-3.5 h-3.5 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        ) : (
          <svg
            className="w-3.5 h-3.5 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <p className="leading-relaxed">
          {isNeutral
            ? "Your spending is the same as last month."
            : isIncrease
              ? `You've spent ${Math.abs(change)}% more than last month. Consider reviewing your recent expenses.`
              : `Great job! You've reduced spending by ${Math.abs(change)}% compared to last month.`}
        </p>
      </div>
    </div>
  );
}
