import { useMutation } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isPending };
}
