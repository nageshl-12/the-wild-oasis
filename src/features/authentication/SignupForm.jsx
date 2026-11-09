import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Form from '../../ui/FormFields';
import FormInput from '../../ui/FormInput';
import { useForm } from 'react-hook-form';
import { useSignup } from './useSignup';
import SpinnerMini from '../../ui/SpinnerMini';
import SubmitButton from '../../ui/SubmitButton';
import FileInput from '../../ui/FileInput';

const passwordStyle =
  'absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700';

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { signup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit({ fullName, email, password, image }) {
    signup(
      {
        fullName,
        email,
        password,
        avatar: image?.[0] || '',
      },
      {
        onSuccess: () => reset(),
      },
    );
  }

  return (
    <div className="flex animate-fade-in-up min-h-dvh -translate-y-8 items-center justify-center px-3">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200/50 sm:max-w-md sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
            Create a new user
          </h1>

          <p className="text-xs text-gray-500 sm:text-sm">
            Join The Wild Oasis management
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Form label="Full Name" error={errors?.fullName?.message}>
            <FormInput
              id="fullName"
              type="text"
              {...register('fullName', {
                required: 'This field is required',
              })}
            />
          </Form>

          <Form label="Email Address" error={errors?.email?.message}>
            <FormInput
              id="email"
              type="email"
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please provide a valid email address',
                },
              })}
            />
          </Form>

          <Form
            label="Password (min 8 character)"
            error={errors?.password?.message}
          >
            <div className="relative">
              <FormInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 8,
                    message: 'Password needs a minimum of 8 characters',
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                className={passwordStyle}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Form>

          <Form
            label="Confirm Password"
            error={errors?.passwordConfirm?.message}
          >
            <div className="relative">
              <FormInput
                id="passwordConfirm"
                type={showRepeatPassword ? 'text' : 'password'}
                {...register('passwordConfirm', {
                  required: 'This field is required',
                  validate: (value) =>
                    value === getValues('password') || 'Password need to match',
                })}
              />

              <button
                type="button"
                onClick={() => setShowRepeatPassword((show) => !show)}
                className={passwordStyle}
              >
                {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Form>

          <Form label="Profile Image" error={errors?.image?.message}>
            <FileInput id="image" accept="image/*" {...register('image')} />
          </Form>

          <SubmitButton type="submit" disabled={isPending}>
            {isPending ? <SpinnerMini /> : 'Create New User'}
          </SubmitButton>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          THE-WILD-OASIS · Hotel Management System
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
