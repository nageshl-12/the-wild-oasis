import { useSearchParams } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';

function SortBy({ field, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get(field) || 'name-asc';

  function handleSort(e) {
    searchParams.set(field, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="relative shrink-0">
      <ArrowUpDown
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <select
        value={sortValue}
        onChange={handleSort}
        className="
          h-10.5 cursor-pointer appearance-none
          rounded-xl border border-gray-200 bg-white
          py-2 pl-9 pr-9 text-sm font-medium text-gray-700
          outline-none transition
          hover:bg-gray-50
          focus:border-gray-400
          w-full
        "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        ▼
      </span>
    </div>
  );
}

export default SortBy;
