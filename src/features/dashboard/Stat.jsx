function Stat({ title, icon: Icon, color, value }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="flex w-full items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5">
      <div
        className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl ${colors[color]}`}
      >
        <Icon size={26} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <p className="truncate text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default Stat;
