import { Coffee, CheckCircle, ArrowLeft } from 'lucide-react';
import { useBooking } from '../bookings/useBooking';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { useSettings } from '../settings/useSettings';

import Spinner from '../../ui/Spinner';
import ActionButton from '../../ui/ActionButton';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import useCheckin from './useCheckin';

function CheckInBooking() {
  const { booking, isPending } = useBooking();
  const { settings, isPending: isLoadingSettings } = useSettings();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkIn, isCheckingIn } = useCheckin();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const navigate = useNavigate();
  if (isPending || isLoadingSettings) return <Spinner />;

  const {
    guests: { fullName, id: guestId },
    cabins: { name: cabinName },
    numGuests,
    numNights,
    hasBreakfast,
    totalPrice,
    cabinPrice,
    isPaid,
    id: bookingId,
    extrasPrice,
  } = booking;

  const breakfastPricePerDay = settings[0].breakfastPrice;
  const optionalBreakfastPrice = breakfastPricePerDay * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <div className="mx-auto animate-fade-in-up max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 md:mt-10">
      <ActionButton onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Back
      </ActionButton>

      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Confirm check-in #{bookingId}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Review booking details before confirming.
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="font-medium text-gray-800">Guest details #{guestId}</h3>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Guest</span>
          <span className="font-medium">{fullName}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Cabin</span>
          <span className="font-medium">Cabin {cabinName}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Guests</span>
          <span className="font-medium">{numGuests} Adults</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Duration</span>
          <span className="font-medium">{numNights} Nights</span>
        </div>
      </section>

      <hr className="border-gray-200" />

      <section className="space-y-3">
        <h3 className="font-medium text-gray-800">Breakfast</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Coffee size={17} className="text-gray-500" />
            Breakfast included
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            {hasBreakfast ? 'Yes' : 'No'}
          </span>
        </div>
      </section>

      <hr className="border-gray-200" />

      <section className="space-y-3">
        <h3 className="font-medium text-gray-800">Payment summary</h3>

        {hasBreakfast && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Breakfast and extras</span>
            <span>{formatCurrency(extrasPrice)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Cabin price</span>
          <span>{formatCurrency(cabinPrice)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Payment status</span>

          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              isPaid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
            }`}
          >
            <CheckCircle size={14} />
            {isPaid ? 'Paid' : 'Not paid'}
          </span>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-xs text-gray-500">TOTAL PAYABLE</p>
          <p className="text-2xl font-semibold text-gray-900">
            {formatCurrency(totalPrice)}
          </p>
        </div>
      </section>

      <hr className="border-gray-200" />

      {!hasBreakfast && (
        <Checkbox
          disabled={isCheckingIn}
          label={`Want to add breakfast for ${!addBreakfast ? formatCurrency(breakfastPricePerDay) : formatCurrency(optionalBreakfastPrice)}`}
          id="breakfast"
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast(!addBreakfast);
            setConfirmPaid(false);
          }}
        />
      )}

      <Checkbox
        label={`I confirm that ${fullName} has paid the total amount of ${
          !addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + optionalBreakfastPrice)
        }${addBreakfast ? ` (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})` : ''}`}
        disabled={confirmPaid || isCheckingIn}
        checked={confirmPaid}
        onChange={() => {
          setConfirmPaid(!confirmPaid);
        }}
        id="confirm"
      />

      <button
        disabled={!confirmPaid || isCheckingIn}
        onClick={handleCheckin}
        className="flex w-full cursor-pointer disabled:grayscale disabled:cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700"
      >
        <CheckCircle size={18} />
        Confirm check-in
      </button>
    </div>
  );
}

export default CheckInBooking;
