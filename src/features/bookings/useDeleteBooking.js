import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      navigate(-1);
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteBooking, isDeletingBooking };
}
