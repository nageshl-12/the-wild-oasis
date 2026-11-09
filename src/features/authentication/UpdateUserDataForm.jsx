import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import Form from '../../ui/FormFields';
import FormInput from '../../ui/FormInput';
import ProfileAvatar from '../../ui/ProfileAvatar';
import { useUpdateUser } from './useUpdateUser';
import { useUser } from './useUser';
import FileInput from '../../ui/FileInput';

function UpdateUserDataForm() {
  const queryClient = useQueryClient();

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
    },
  });

  function onSubmit({ fullName, image }) {
    const avatar = image?.[0];

    if (fullName === currentFullname && !avatar) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          toast.success('User account successfully updated');
          queryClient.invalidateQueries();
        },
      },
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl animate-fade-in-up px-4 py-8 sm:px-6">
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

        <Form label="Full name" error={errors?.fullName?.message}>
          <FormInput
            id="fullName"
            type="text"
            {...register('fullName', {
              required: 'Full name is required',
            })}
          />
        </Form>

        <Form label="Update profile avatar">
          <FileInput id="image" accept="image/*" {...register('image')} />
        </Form>

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            disabled={isPending}
            type="button"
            onClick={() => reset()}
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
