function StatCard({ title, value, className, children }) {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm p-5 ${className || ""}`}>
      <div className="text-sm text-slate-500 dark:text-slate-400">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {children && <div className="mt-3 text-sm text-slate-400">{children}</div>}
    </div>
  );
}

export default StatCard;