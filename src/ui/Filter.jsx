import { useSearchParams } from 'react-router-dom';

function Filter({ field, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilter = searchParams.get(field) || options.at(0).value;
  function handleFilter(value) {
    setSearchParams((params) => {
      params.set(field, value);
      params.delete('page');
      return params;
    });
  }

  return (
    <div
      className={`flex md:w-fit md:justify-center ${options.length > 3 ? 'justify-between' : 'justify-around'}   items-center gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1.5`}
    >
      {options.map((filter) => (
        <button
          disabled={activeFilter === filter.value}
          key={filter.value}
          onClick={() => handleFilter(filter.value)}
          className={`
            shrink-0 rounded-lg px-2 py-2 md:py-1.5
            text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed
            ${
              activeFilter === filter.value
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
