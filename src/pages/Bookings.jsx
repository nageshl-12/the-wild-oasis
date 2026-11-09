import Heading from '../ui/Heading';
import { useBookings } from '../features/bookings/useBookings';
import Spinner from '../ui/Spinner';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import BookingTable from '../features/bookings/BookingTable';
import Pagination from '../ui/Pagination';
import ResourceNotFound from '../ui/ResourceNotFound';

function Bookings() {
  const { bookings, isPending, count } = useBookings();

  if (!bookings?.length && !isPending)
    return <ResourceNotFound resource="Booking" />;

  return (
    <div className="flex animate-fade-in-up  h-[calc(100dvh-9.625rem)] md:h-dvh flex-col overflow-hidden bg-white px-2 relative">
      <div className="shrink-0 space-y-3 py-3">
        <Heading fieldName="Bookings" count={count} />
        <BookingTableOperations />
      </div>
      {isPending ? (
        <Spinner />
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <BookingTable bookings={bookings} />
          <Pagination count={count} />
        </div>
      )}
    </div>
  );
}
export default Bookings;
