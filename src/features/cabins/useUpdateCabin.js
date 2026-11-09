import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin as updateCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

function useUpdateCabin(setShowForm) {
  const [, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ cabinId, updatedCabinData }) =>
      updateCabinApi(cabinId, updatedCabinData),

    onSuccess: () => {
      toast.success('Cabin updated successfully');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      setSearchParams((params) => {
        params.delete('editCabin');
        return params;
      });
      setShowForm(false);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateCabin, isUpdating };
}

export default useUpdateCabin;
