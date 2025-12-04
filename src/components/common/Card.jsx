const Card = ({
  children,
  className = "",
  hover = false,
  padding = true,
  shadow = true,
  onClick,
  ...props
}) => {
  const baseClasses = "bg-white rounded-card border border-gray-200";
  const hoverClasses = hover ? "card-hover-effect cursor-pointer" : "";
  const paddingClasses = padding ? "p-6" : "";
  const shadowClasses = shadow ? "shadow-card" : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${paddingClasses} ${shadowClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
