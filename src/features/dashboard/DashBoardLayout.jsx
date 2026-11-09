import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '../cabins/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from './TodayActivity';

function DashBoardLayout() {
  const { bookings, isPending } = useRecentBookings();
  const { cabins, isPending: isPending3 } = useCabins();
  const { isPending: isPending2, confirmedStays, numDays } = useRecentStays();
  if (isPending || isPending2 || isPending3) return <Spinner />;

  return (
    <div className="mt-5 space-y-5 overflow-y-auto">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />

      {/* Activity + Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
      </div>

      {/* Full-width Sales Chart */}
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashBoardLayout;
