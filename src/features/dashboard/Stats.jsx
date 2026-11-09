import {
  Banknote,
  BriefcaseIcon,
  CalendarRange,
  ChartNoAxesCombined,
} from 'lucide-react';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkIns = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat
        title={'Bookings'}
        icon={BriefcaseIcon}
        color={'blue'}
        value={numBookings}
      />
      <Stat
        title={'Check ins'}
        icon={CalendarRange}
        color={'indigo'}
        value={checkIns}
      />
      <Stat
        title={'Sales'}
        icon={Banknote}
        color={'green'}
        value={formatCurrency(sales)}
      />

      <Stat
        title={'Occupancy rate'}
        icon={ChartNoAxesCombined}
        color={'red'}
        value={Math.round(occupation * 100)}
      />
    </div>
  );
}

export default Stats;
