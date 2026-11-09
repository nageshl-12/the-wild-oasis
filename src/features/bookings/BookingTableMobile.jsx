import { Clock, EllipsisVertical, UserRound } from 'lucide-react';

import {
  formatCurrency,
  formatDate,
  getBookingDuration,
} from '../../utils/helpers';

import BookingActionButtonContainer from './BookingActionButtonContainer';
import ActionButton from '../../ui/ActionButton';

function BookingTableMobile({
  booking,
  showMenu,
  setOpenMenuId,
  setShowCheckout,
  setShowDelete,
}) {
  const {
    id: bookingId,
    startDate,
    endDate,
    status,
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
    <div
      onClick={() => setOpenMenuId(null)}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-bold text-gray-800">Cabin {name}</span>

        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
            statusStyles[status] || 'bg-gray-100 text-gray-600'
          }`}
        >
          {status}
        </span>
      </div>

      {/* Guest */}
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <UserRound size={19} className="text-gray-500" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-800">
            {fullName}
          </p>
          <p className="truncate text-xs text-gray-500">{email}</p>
        </div>
      </div>

      <div className="my-3 border-t border-gray-100" />

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="mb-1 text-[10px] font-medium text-gray-400">CHECK-IN</p>
          <p className="text-xs font-semibold text-gray-700">
            {formatDate(startDate)}
          </p>
        </div>

        <div>
          <p className="mb-1 text-[10px] font-medium text-gray-400">
            CHECK-OUT
          </p>
          <p className="text-xs font-semibold text-gray-700">
            {formatDate(endDate)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
        <Clock size={13} />
        <span>
          {timeAgo} · {stayDuration}-night stay
        </span>
      </div>

      <div className="my-3 border-t border-gray-100" />

      {/* Footer */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between relative"
      >
        <div className="w-full ">
          <p className="text-[10px] font-medium text-gray-400">TOTAL AMOUNT</p>
          <p className="text-base font-bold text-gray-800">
            {formatCurrency(totalPrice)}
          </p>
        </div>
        <div>
          <ActionButton
            onClick={() => setOpenMenuId(showMenu ? null : bookingId)}
          >
            <EllipsisVertical size={17} />
          </ActionButton>
        </div>

        {showMenu && (
          <div className="absolute right-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">
            <BookingActionButtonContainer
              bookingId={bookingId}
              setShowCheckout={setShowCheckout}
              status={status}
              setShowDelete={setShowDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingTableMobile;
