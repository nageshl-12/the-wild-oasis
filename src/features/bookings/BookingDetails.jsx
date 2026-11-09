import {
  ArrowLeft,
  CalendarDays,
  Users,
  BedDouble,
  CreditCard,
  CheckCircle2,
  CircleAlert,
  CalendarCheck,
  LogOut,
  Trash2,
  ArrowBigDownDashIcon,
} from 'lucide-react';

import { useBooking } from '../bookings/useBooking';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../ui/ActionButton';
import SummeryCard from '../../ui/SummeryCard';
import Spinner from '../../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';
import Info from '../../ui/Info';
import GuestInformation from './BookingDetails/GuestInformation';
import StayInformation from './BookingDetails/StayInformation';
import PaymentSummery from './BookingDetails/PaymentSummery';
import { useState } from 'react';
import DeleteConfirmation from '../../ui/DeleteConfirmation';
import CheckoutConfirmation from '../checked-in-out/CheckoutConfirmation';

function BookingDetails() {
  const navigate = useNavigate();
  const { booking, isPending } = useBooking();
  const [showDelete, setShowDelete] = useState();
  const [showCheckout, setShowCheckout] = useState(false);

  // const { checkOut, isCheckingOut } = useCheckout();
  if (isPending) return <Spinner />;

  const {
    id: bookingId,
    cabinPrice,
    startDate,
    endDate,
    hasBreakfast,
    isPaid,
    numGuests,
    numNights,
    status,
    totalPrice,
    cabins: {
      description,
      discount,
      id: cabinId,
      image,
      maxCapacity,
      name,
      regularPrice,
    },
    guests: { countryFlag, email, fullName, nationalID, nationality },
  } = booking;

  function handleCheckout() {
    setShowCheckout(true);
  }

  function handleDelete() {
    setShowDelete(true);
  }

  function handleCheckin(bookingId) {
    navigate(`/checked-in/${bookingId}`);
  }

  return (
    <div className="space-y-6 px-3 py-4 pb-8 animate-fade-in-up">
      {/* Header */}
      {showDelete && (
        <DeleteConfirmation
          props={{ setShowDelete, field: 'Booking', id: bookingId }}
        />
      )}
      {showCheckout && (
        <CheckoutConfirmation
          setShowCheckout={setShowCheckout}
          bookingIdfromDetails={bookingId}
          bookingFromDetails={booking}
        />
      )}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-3">
          <ActionButton onClick={() => navigate(-1)}>
            <ArrowLeft size={17} /> Back to bookings
          </ActionButton>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Booking Details
            </h1>
            <p className="text-sm text-gray-500">Booking ID: #{bookingId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-green-100 px-4 py-2 sm:text-sm text-xs  font-semibold capitalize text-green-700">
            {status}
          </span>
          <button
            onClick={() => handleDelete(bookingId)}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5  sm:text-sm text-xs  font-semibold text-red-600 transition-all hover:border-red-300 hover:bg-red-100 active:scale-95"
          >
            <Trash2 size={16} />
            Delete
          </button>
          {status === 'unconfirmed' && (
            <button
              onClick={() => handleCheckin(bookingId)}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5  sm:text-sm text-xs font-semibold text-white shadow-sm transition-all hover:bg-gray-900 active:scale-95"
            >
              <ArrowBigDownDashIcon size={16} />
              Check in
            </button>
          )}

          {status === 'checked-in' && (
            <button
              onClick={() => handleCheckout(bookingId)}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5  sm:text-sm text-xs font-semibold text-white shadow-sm transition-all hover:bg-gray-900 active:scale-95"
            >
              <LogOut size={16} />
              Check out
            </button>
          )}
        </div>
      </div>
      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummeryCard
          title="Total Amount"
          value={formatCurrency(totalPrice)}
          icon={CreditCard}
        />

        <SummeryCard
          title="Total Nights"
          value={`${numNights} ${numNights > 1 ? 'Nights' : 'Night'}`}
          icon={CalendarDays}
        />

        <SummeryCard
          title="Guests"
          value={`${numGuests} Guests`}
          icon={Users}
        />

        <SummeryCard
          title="Payment"
          value={isPaid ? 'Paid' : 'Unpaid'}
          icon={isPaid ? CheckCircle2 : CircleAlert}
        />
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 xl:col-span-2">
          {/* Guest Information */}
          <GuestInformation
            props={[
              fullName,
              email,
              nationalID,
              countryFlag,
              numGuests,
              nationality,
            ]}
          />

          {/* Stay Information */}
          <StayInformation
            props={[
              startDate,
              endDate,
              image,
              description,
              maxCapacity,
              cabinId,
              hasBreakfast,
            ]}
          />
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <PaymentSummery
            props={[
              discount,
              regularPrice,
              numNights,
              cabinPrice,
              totalPrice,
              isPaid,
            ]}
          />

          {/* Booking Details */}
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-5 font-semibold text-gray-800">
              Booking Overview
            </h2>

            <div className="space-y-4">
              <Info
                icon={CalendarDays}
                label="Booking ID"
                value={`#${bookingId}`}
              />

              <Info icon={BedDouble} label="Cabin" value={name} />

              <Info
                icon={CalendarCheck}
                label="Duration"
                value={`${numNights} Nights`}
              />

              <Info icon={Users} label="Guests" value={`${numGuests} Guests`} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
