function Button({
  variant = "success",
  disabled = false,
  onClick = null,
  children,
}) {
  let classes = `text-white text-sm px-3 py-1 rounded-md disabled:opacity-50 ${!disabled ? "cursor-pointer" : ""} `;
  switch (variant) {
    case "success":
      classes += "bg-blue-600 hover:bg-blue-700";
      break;
    case "danger":
      classes += "bg-red-600 hover:bg-red-700";
      break;
    default:
      throw new Error("variant can be either success or danger");
  }
  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
