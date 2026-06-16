function EmptyState({
  title,
  description,
}) {
  return (
    <div className="bg-white border rounded-xl p-8 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;
