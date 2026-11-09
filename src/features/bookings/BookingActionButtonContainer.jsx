import ActionButton from '../../ui/ActionButton';
import { useBookingAction } from './useBookingAction';
import {
  ArrowBigDownDashIcon,
  ArrowBigRightDashIcon,
  Eye,
  Trash2,
} from 'lucide-react';

function BookingActionButtonContainer({
  bookingId,
  status,
  setShowCheckout,
  setShowDelete,
}) {
  const { handleCheckedIn, handleDetails, handleCheckOut, handleDelete } =
    useBookingAction(setShowCheckout, setShowDelete);
  return (
    <>
      <ActionButton
        variant="info"
        onClick={() => handleDetails(bookingId)}
        label="details"
      >
        <Eye size={17} color="#3b82f6" />
      </ActionButton>

      <ActionButton
        variant="warning"
        onClick={() => handleDelete(bookingId)}
        label="delete"
      >
        <Trash2 size={17} />
      </ActionButton>

      {status === 'checked-in' && (
        <ActionButton
          onClick={() => handleCheckOut(bookingId)}
          label="checked-out"
          variant="warning"
        >
          <ArrowBigRightDashIcon size={17} color="#f97316" />
        </ActionButton>
      )}
      {status === 'unconfirmed' && (
        <ActionButton
          label="checked-in"
          variant="check"
          onClick={() => handleCheckedIn(bookingId)}
        >
          <ArrowBigDownDashIcon size={17} color="#10b981" />
        </ActionButton>
      )}
    </>
  );
}

export default BookingActionButtonContainer;
