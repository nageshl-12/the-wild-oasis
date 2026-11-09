import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';

// import { useNavigate } from 'react-router-dom';

export default function useCheckout() {
  const queryClient = useQueryClient();

  // const navigate = useNavigate();

  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} successful checked out`);
      queryClient.invalidateQueries({
        active: true,
      });

      // setTimeout(() => navigate(''), 1000);
    },
    onError: (error) => toast.error(error.message),
  });
  return { checkOut, isCheckingOut };
}
