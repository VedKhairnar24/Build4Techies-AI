function StatsCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-sm text-gray-400 mt-2">
        {subtitle}
      </p>
    </div>
  );
}

export default StatsCard;
