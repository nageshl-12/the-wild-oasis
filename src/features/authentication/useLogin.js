import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Login successful');
      navigate('/', { replace: true });
    },

    onError: (err) => {
      console.log(err);
      toast.error('Provided email or password is incorrect');
    },
  });

  return { login, isPending };
}
