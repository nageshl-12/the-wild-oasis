import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';

export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} successful checked in`);
      queryClient.invalidateQueries({
        active: true,
      });

      setTimeout(() => navigate('/'), 1000);
    },
    onError: (error) => toast.error(error.message),
  });
  return { checkIn, isCheckingIn };
}
