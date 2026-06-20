function Button({
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className="
      bg-white
      text-black
      px-5
      py-2.5
      rounded-xl
      font-medium
      hover:opacity-90
      transition
      "
    >
      {children}
    </button>
  );
}

export default Button;
