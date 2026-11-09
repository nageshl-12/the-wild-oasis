import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, House } from 'lucide-react';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
          <AlertTriangle size={38} className="text-red-500" />
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Error 404
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-500">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or doesn't exist anymore.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <House size={17} />
            Back to Home
          </button>
        </div>

        <p className="mt-12 text-xs text-gray-400">
          © 2026 Cabin Management System
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
