import Table from '../../ui/Table';
import { Clock } from 'lucide-react';
import {
  formatCurrency,
  formatDate,
  getBookingDuration,
} from '../../utils/helpers';

import BookingActionButtonContainer from './BookingActionButtonContainer';

function BookingTableDesktop({ booking, setShowCheckout, setShowDelete }) {
  const {
    id: bookingId,
    startDate,
    status,
    endDate,
    guests: { fullName, email },
    cabins: { name },
    totalPrice,
  } = booking;

  const statusStyles = {
    unconfirmed: 'bg-blue-100 text-blue-700',
    'checked in': 'bg-green-100 text-green-700',
    'checked out': 'bg-gray-100 text-gray-600',
  };

  const { timeAgo, stayDuration } = getBookingDuration(startDate, endDate);

  return (
    <Table.Row>
      {/* Cabin */}
      <Table.Cell>
        <span className="font-semibold text-gray-800">{name}</span>
      </Table.Cell>

      {/* Guest */}
      <Table.Cell>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-800">{fullName}</span>
          <span className="text-sm text-gray-500">{email}</span>
        </div>
      </Table.Cell>

      {/* Dates */}
      <Table.Cell>
        <div className="flex flex-col gap-1">
          <span className="text-sm flex-wrap font-medium text-gray-800 flex gap-1 items-center">
            <Clock size={12} />
            <span>{timeAgo} ·</span>
            <span>{stayDuration}-night stay</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-500">
            {formatDate(startDate)} - {formatDate(endDate)}
          </span>
        </div>
      </Table.Cell>

      {/* Status */}
      <Table.Cell>
        <span
          className={`inline-flex items-center rounded-full px-3 -translate-x-1.5 py-1 text-xs font-semibold capitalize ${
            statusStyles[status] || 'bg-gray-100 text-gray-600'
          }`}
        >
          {status}
        </span>
      </Table.Cell>

      {/* Amount */}
      <Table.Cell>
        <span className="font-semibold text-gray-800">
          {formatCurrency(totalPrice)}
        </span>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center ">
          <BookingActionButtonContainer
            bookingId={bookingId}
            status={status}
            setShowCheckout={setShowCheckout}
            setShowDelete={setShowDelete}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export default BookingTableDesktop;
