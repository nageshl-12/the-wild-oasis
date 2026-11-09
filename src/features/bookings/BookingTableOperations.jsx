import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function BookingTableOperations() {
  return (
    <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-1">
      <Filter
        field="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />
      <div className="flex items-center gap-2 justify-between self-end">
        <SortBy
          field="sortBy"
          options={[
            { value: 'totalPrice-asc', label: 'Amount (Low to High)' },
            { value: 'totalPrice-desc', label: 'Amount (High to Low)' },
            { value: 'startDate-asc', label: 'Date (Earlier First) ' },
            { value: 'startDate-desc', label: 'Date (Recent First)' },
          ]}
        />

        {/* <span className="md:hidden">
          <Button
            handleClick={() => setShowForm(true)}
            style="px-4 py-3.5 rounded-xl text-[11px]"
          >
            Add New Booking
          </Button>
        </span> */}
      </div>
    </div>
  );
}

export default BookingTableOperations;
