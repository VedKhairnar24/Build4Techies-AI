function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
      bg-[#151515]
      border
      border-[#262626]
      rounded-2xl
      p-6
      ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
