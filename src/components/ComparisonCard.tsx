export default function ComparisonCard({ data }: any) {
  const positive = Number(data.change) > 0;

  return (
    <div className="card p-4">
      <h2 className="font-semibold mb-2">Monthly Comparison</h2>

      <p className="text-sm text-gray-500">
        Current: ₹{data.current}
      </p>

      <p className="text-sm text-gray-500">
        Last: ₹{data.previous}
      </p>

      <p
        className={`mt-2 font-semibold ${
          positive ? "text-red-500" : "text-green-500"
        }`}
      >
        {positive ? "⬆" : "⬇"} {data.change}%
      </p>
    </div>
  );
}