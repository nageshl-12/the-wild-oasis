import Button from '../../ui/Button';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations({ setShowForm }) {
  return (
    <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-1">
      <Filter
        field="cabins"
        options={[
          { value: 'all', label: 'All' },
          { value: 'with-discount', label: 'With discount' },
          { value: 'no-discount', label: 'No discount' },
        ]}
      />
      <div className="flex items-center gap-2 justify-between">
        <SortBy
          field="sortBy"
          options={[
            { value: 'name-asc', label: 'Name (A–Z)' },
            { value: 'name-desc', label: 'Name (Z–A)' },
            { value: 'regularPrice-asc', label: 'Price (Low to High)' },
            { value: 'regularPrice-desc', label: 'Price (High to Low)' },
            { value: 'maxCapacity-asc', label: 'Capacity (Low to Hight)' },
            { value: 'maxCapacity-desc', label: 'Capacity (High to Low)' },
          ]}
        />
        <span className="md:hidden">
          <Button
            handleClick={() => setShowForm(true)}
            style="px-4 py-3 rounded-xl text-[12px]"
          >
            Add New Cabin
          </Button>
        </span>
      </div>
    </div>
  );
}

export default CabinTableOperations;
