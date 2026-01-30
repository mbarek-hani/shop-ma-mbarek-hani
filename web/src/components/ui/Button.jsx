function Button({
  variant = "success",
  size = "md",
  disabled = false,
  onClick = null,
  children,
  className = "",
  ...props
}) {
  const sizeMap = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  const sizeClasses = sizeMap[size] || sizeMap.md;
  let classes = `${sizeClasses} rounded-md disabled:opacity-50 ${!disabled ? "cursor-pointer" : ""} `;

  switch (variant) {
    case "success":
      classes += "text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 dark:focus:ring-blue-600";
      break;
    case "danger":
      classes += "text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 focus:ring-2 focus:ring-offset-1 focus:ring-red-300 dark:focus:ring-red-600";
      break;
    case "ghost":
      classes += "text-black bg-slate-400 hover:bg-slate-500 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700";
      break;
    default:
      throw new Error("variant must be 'success', 'danger' or 'ghost'");
  }

  classes = `${classes} ${className}`.trim();

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
