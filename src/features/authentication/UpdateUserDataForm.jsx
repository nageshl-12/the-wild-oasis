import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Form from '../../ui/FormFields';
import FormInput from '../../ui/FormInput';
import ProfileAvatar from '../../ui/ProfileAvatar';

import { useUpdateUser } from './useUpdateUser';
import { useUser } from './useUser';
import { logout } from '../../services/apiAuth';
import { useState } from 'react';
import FileInput from '../../ui/FileInput';

function UpdateUserDataForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [hasFile, setFile] = useState(null);
  console.log(hasFile);

  const { updateUser, isPending } = useUpdateUser();

  const {
    user: { fullName: currentFullname, email },
  } = useUser();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: currentFullname,
      email,
      password: '',
    },
  });

  function onSubmit({ fullName, password, image }) {
    const avatar = image?.[0];

    if (fullName === currentFullname && !password && !avatar) return;

    updateUser(
      { fullName, password, avatar },
      {
        onSuccess: async () => {
          if (password) {
            toast.success('Password updated. Please log in again.');
            queryClient.clear();
            logout();
            navigate('/login', { replace: true });
          } else {
            toast.success('User Account successfully updated');
            queryClient.invalidateQueries();
          }
        },
      },
    );
  }
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 animate-fade-in-up">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Update your account
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your personal information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
      >
        <span className="self-center">
          <ProfileAvatar height="100" width="100" />
        </span>

        <Form label="Email address">
          <FormInput id="email" type="email" disabled {...register('email')} />
        </Form>

        <Form
          label="Password (Min 8 characters)"
          error={errors?.password?.message}
        >
          <FormInput
            id="password"
            placeholder="Enter new password (optional)"
            type="password"
            {...register('password', {
              validate: (value) =>
                !value ||
                value.length >= 8 ||
                'Password must be at least 8 characters',
            })}
          />
        </Form>

        <Form label="Full name">
          <FormInput id="fullName" type="text" {...register('fullName')} />
        </Form>

        <Form label="Update profile avatar">
          <FileInput id="image" accept="image/*" {...register('image')} />
        </Form>
        {hasFile && (
          <p className="text-sm text-gray-500">
            Selected image: {hasFile.name}
          </p>
        )}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            disabled={isPending}
            type="button"
            onClick={() => {
              (reset(), setFile(null));
            }}
            className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            disabled={isPending}
            type="submit"
            className="cursor-pointer rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            {isPending ? 'Updating...' : 'Update account'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserDataForm;
