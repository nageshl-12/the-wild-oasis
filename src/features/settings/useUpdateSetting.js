import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending } = useMutation({
    mutationKey: ['settings'],
    mutationFn: ({ id, newSetting }) => updateSettings(id, newSetting),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });

      toast.success('Settings updated successfully');
    },

    onError: (error) => toast.error(error.message),
  });

  return { updateSetting, isPending };
}
