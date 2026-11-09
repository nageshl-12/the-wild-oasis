function SummeryCard({ value, title, icon }) {
  const Icon = icon;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        <Icon size={19} className="text-gray-400" />
      </div>
      <p className="mt-3 text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  );
}

export default SummeryCard;
