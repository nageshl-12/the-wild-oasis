import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Heading from '../../ui/Heading';

import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

function SalesChart({ bookings, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    const filteredBookings = bookings.filter((booking) =>
      isSameDay(date, new Date(booking.created_at)),
    );

    return {
      label: format(date, 'MMM dd'),

      totalSales: filteredBookings.reduce(
        (acc, cur) => acc + cur.totalPrice,
        0,
      ),

      extrasSales: filteredBookings.reduce(
        (acc, cur) => acc + cur.extrasPrice,
        0,
      ),
    };
  });
  return (
    <div className="bg-white px-1 py-3 rounded-md space-y-3">
      <span className="flex md:items-center md:justify-between md:flex-row flex-col -gap-1 md:gap-none">
        <Heading fieldName={`Sales`} validate={false} />
        <p className="px-2 ">{`${format(allDates.at(0), 'MMM dd, yyyy')} - ${format(allDates.at(-1), 'MMM dd, yyyy')}`}</p>
      </span>
      <ResponsiveContainer height={300} width="98%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickLine={{ stroke: '#D1D5DB' }}
          />
          <YAxis unit="$" />
          <CartesianGrid strokeDasharray="4" contentStyle={{}} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              padding: '12px',
            }}
            labelStyle={{ color: '#374151', fontWeight: 600 }}
            itemStyle={{ color: '#EA580C' }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke="#2563EB"
            fill="#93C5FD"
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />

          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke="#16A34A"
            fill="#86EFAC"
            strokeWidth={2}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
