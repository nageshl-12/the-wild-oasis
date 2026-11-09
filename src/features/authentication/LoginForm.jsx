import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import useLogin from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
import FormInput from '../../ui/FormInput';
import Form from '../../ui/FormFields';
import SubmitButton from '../../ui/SubmitButton';

function LoginForm() {
  const [email, setEmail] = useState('demo.user@example.com');
  const [password, setPassword] = useState('Demo@1234');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-50 px-3 py-5">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200/50 sm:max-w-md sm:p-8">
        <div className="mb-5 text-center sm:mb-8">
          <h1 className="mb-2 text-xl font-bold tracking-wide text-gray-900 sm:mb-3 sm:text-3xl">
            The-Wild-Oasis
          </h1>

          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-blue-500 sm:mb-5 sm:w-16" />

          <h2 className="mb-1 text-lg font-semibold text-gray-900 sm:mb-2 sm:text-2xl">
            Welcome back
          </h2>

          <p className="text-xs text-gray-500 sm:text-sm">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <Form label="Email address">
            <FormInput
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </Form>

          <Form label="Password">
            <div className="relative">
              <FormInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
              />

              <button
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 transition hover:text-gray-700 sm:right-4"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Form>

          <SubmitButton disabled={isPending} type="submit">
            {isPending ? <SpinnerMini /> : 'Sign in'}
          </SubmitButton>
        </form>

        <p className="mt-5 text-center text-[10px] text-gray-400 sm:mt-8 sm:text-xs">
          THE-WILD-OASIS · Hotel Management System
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
