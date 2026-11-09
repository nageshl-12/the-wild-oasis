import { useNavigate } from 'react-router-dom';
import ActivityActionButton from './ActivityActionButton';
import useCheckout from '../features/checked-in-out/useCheckout';

function ActivityList({ activity = {} }) {
  const { checkOut, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  const {
    guests: { fullName, countryFlag } = {},
    status,
    id: bookingId,
    numNights,
    cabins: { name: cabinName } = {},
  } = activity;

  const statusType =
    status === 'unconfirmed'
      ? 'Check In'
      : status === 'checked-in'
        ? 'Check Out'
        : 'Checked out';

  function handleClick() {
    switch (status) {
      case 'unconfirmed':
        return navigate(`/checked-in/${bookingId}`);
      case 'checked-in':
        return checkOut(bookingId);
      default:
        return;
    }
  }
  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          ↙
        </div>

        <div>
          <span className="flex items-center gap-2">
            <img className="h-4" src={countryFlag} alt="" />
            <h3 className="font-medium text-gray-800">{fullName}</h3>
          </span>
          <p className="text-sm text-gray-500">
            Cabin {cabinName} · {numNights} nights
          </p>
        </div>
      </div>

      <ActivityActionButton
        status={status}
        onClick={handleClick}
        disabled={status === 'checked-in' && isCheckingOut}
      >
        {statusType}
      </ActivityActionButton>
    </div>
  );
}

export default ActivityList;
