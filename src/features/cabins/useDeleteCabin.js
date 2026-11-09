import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isPending: isDeletingCabin } = useMutation({
    mutationFn: (cabinId) => deleteCabinApi(cabinId),
    onSuccess: (data) => {
      toast.success(`Cabin #${data.id} deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { deleteCabin, isDeletingCabin };
}
