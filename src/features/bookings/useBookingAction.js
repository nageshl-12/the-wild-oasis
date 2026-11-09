import { useNavigate, useSearchParams } from 'react-router-dom';

export function useBookingAction(setShowCheckout, setShowDelete) {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  function handleDetails(bookingId) {
    navigate(`/bookings/details/${bookingId}`);
  }

  function handleDelete(bookingId) {
    setShowDelete(true);
    searchParams.set('deleteBooking', bookingId);
    setSearchParams(searchParams);
  }

  function handleCheckedIn(bookingId) {
    navigate(`/checked-in/${bookingId}`);
  }
  function handleCheckOut(bookingId) {
    setShowCheckout(true);
    searchParams.set('check-out', bookingId);
    setSearchParams(searchParams);
  }
  return { handleDetails, handleCheckedIn, handleCheckOut, handleDelete };
}
