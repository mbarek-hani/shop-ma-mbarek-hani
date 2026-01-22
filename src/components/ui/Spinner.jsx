function Spinner({ size = "lg", color = "blue" }) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  const colorClasses = {
    blue: "border-blue-600 border-t-transparent",
    gray: "border-gray-600 border-t-transparent",
    white: "border-white border-t-transparent",
    green: "border-green-600 border-t-transparent",
    red: "border-red-600 border-t-transparent",
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      />
    </div>
  );
}

export default Spinner;
