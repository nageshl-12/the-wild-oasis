import { useState } from 'react';
import { isFuture, isPast, isToday } from 'date-fns';
import supabase from '../services/supabase';
import { getBookingDuration } from '../utils/helpers';

import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';

async function deleteGuests() {
  const { error } = await supabase.from('guests').delete().gt('id', 0);
  if (error) throw error;
}

async function deleteCabins() {
  const { error } = await supabase.from('cabins').delete().gt('id', 0);
  if (error) throw error;
}

async function deleteBookings() {
  const { error } = await supabase.from('bookings').delete().gt('id', 0);
  if (error) throw error;
}

async function createGuests() {
  const { error } = await supabase.from('guests').insert(guests);
  if (error) throw error;
}

async function createCabins() {
  const { error } = await supabase.from('cabins').insert(cabins);
  if (error) throw error;
}

async function createBookings() {
  // Get actual guest IDs
  const { data: guestsIds, error: guestsError } = await supabase
    .from('guests')
    .select('id')
    .order('id');

  if (guestsError) throw guestsError;

  // Get actual cabin IDs
  const { data: cabinsIds, error: cabinsError } = await supabase
    .from('cabins')
    .select('id')
    .order('id');

  if (cabinsError) throw cabinsError;

  const allGuestIds = guestsIds.map((guest) => guest.id);
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Get cabin details using original sample cabin ID
    const cabin = cabins.at(booking.cabinId - 1);

    // Get actual booking duration
    const { stayDuration: numNights } = getBookingDuration(
      booking.startDate,
      booking.endDate,
    );

    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;

    const totalPrice = cabinPrice + extrasPrice;

    // Determine booking status
    let status;

    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    ) {
      status = 'checked-out';
    }

    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    ) {
      status = 'unconfirmed';
    }

    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    ) {
      status = 'checked-in';
    }

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  const { error } = await supabase.from('bookings').insert(finalBookings);

  if (error) throw error;
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpload(uploadFunction) {
    try {
      setIsLoading(true);
      await uploadFunction();
      console.log('Sample data uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadAll() {
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    await createGuests();
    await createCabins();
    await createBookings();
  }

  async function uploadBookings() {
    await deleteBookings();
    await createBookings();
  }

  return (
    <div className="mt-auto rounded-2xl border border-blue-200 bg-blue-50 p-3 hidden md:block">
      <h3 className="mb-3 text-center text-sm font-bold tracking-wide text-blue-600">
        SAMPLE DATA
      </h3>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleUpload(uploadAll)}
          disabled={isLoading}
          className="rounded-lg cursor-pointer bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Upload ALL
        </button>

        <button
          onClick={() => handleUpload(uploadBookings)}
          disabled={isLoading}
          className="rounded-lg cursor-pointer border border-blue-600 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Upload bookings ONLY
        </button>
      </div>
    </div>
  );
}

export default Uploader;
