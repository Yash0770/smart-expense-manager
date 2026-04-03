export default function Skeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 bg-gray-300 dark:bg-gray-700 rounded-lg" />
      ))}
    </div>
  );
}
