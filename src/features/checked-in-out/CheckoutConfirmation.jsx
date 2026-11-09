import { CalendarDays, House, LogOut, Wallet } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import useCheckout from './useCheckout';
import Modal from '../../ui/Modal';
import { formatCurrency, formatDate } from '../../utils/helpers';

function CheckoutConfirmation({
  setShowCheckout,
  bookings,
  bookingIdfromDetails,
  bookingFromDetails,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { checkOut, isCheckingOut } = useCheckout();

  const checkOutId = searchParams.get('check-out') || bookingIdfromDetails;

  const booking =
    bookingFromDetails ||
    bookings.find((el) => String(el.id) === String(checkOutId));

  // Reusable modal closing and URL cleanup
  function handleClose() {
    if (isCheckingOut) return;

    setShowCheckout(false);

    setSearchParams(
      (params) => {
        const updatedParams = new URLSearchParams(params);
        updatedParams.delete('check-out');
        return updatedParams;
      },
      { replace: true },
    );
  }

  if (!booking) return null;

  const {
    id: bookingId,
    guests: { fullName },
    cabins: { name },
    startDate,
    endDate,
    totalPrice,
    numNights,
  } = booking;

  function handleConfirm() {
    checkOut(bookingId, {
      onSuccess: () => {
        setShowCheckout(false);

        setSearchParams(
          (params) => {
            const updatedParams = new URLSearchParams(params);
            updatedParams.delete('check-out');
            return updatedParams;
          },
          { replace: true },
        );
      },
    });
  }

  return (
    <Modal onClose={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md animate-duration-300 animate-fade-in-down rounded-2xl bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-gray-100 p-3">
            <LogOut size={22} className="text-gray-700" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Confirm Checkout
            </h2>
            <p className="text-sm text-gray-500">Booking #{bookingId}</p>
          </div>
        </div>

        <p className="mb-5 text-sm leading-6 text-gray-500">
          Are you sure you want to check out this guest? Please review the
          booking details before proceeding.
        </p>

        {/* Guest Information */}
        <div className="mb-4 space-y-3 rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Guest Information
          </p>

          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-gray-500">Guest</span>
            <span className="font-semibold text-gray-800">{fullName}</span>
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <House size={15} />
              Cabin
            </span>
            <span className="font-semibold text-gray-800">{name}</span>
          </div>
        </div>

        {/* Stay Information */}
        <div className="mb-4 space-y-3 rounded-xl border border-gray-100 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Stay Information
          </p>

          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <CalendarDays size={15} />
              Check-in
            </span>
            <span className="font-medium text-gray-800">
              {formatDate(startDate)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <CalendarDays size={15} />
              Check-out
            </span>
            <span className="font-medium text-gray-800">
              {formatDate(endDate)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3 text-sm">
            <span className="text-gray-500">Stay duration</span>
            <span className="font-semibold text-gray-800">
              {numNights} nights
            </span>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="mb-6 rounded-xl bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <Wallet size={14} />
                Total Amount
              </p>

              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(totalPrice)}
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Checked in
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={isCheckingOut}
            className="cursor-pointer rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isCheckingOut}
            onClick={handleConfirm}
            className="cursor-pointer rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCheckingOut ? 'Checking out...' : 'Confirm Checkout'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CheckoutConfirmation;
