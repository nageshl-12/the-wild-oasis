import { AlertTriangle, RefreshCw, House } from 'lucide-react';

function ErrorFallback({ error, resetErrorBoundary }) {
  
  function handleDashboard() {
    window.location.replace('/');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
          <AlertTriangle size={38} className="text-red-500" />
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Application Error
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Oops! Something went wrong.
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-500">
          An unexpected error occurred while loading this page. Please try again
          or return to your dashboard.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={resetErrorBoundary}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <RefreshCw size={17} />
            Try Again
          </button>

          <button
            onClick={handleDashboard}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <House size={17} />
            Back to Dashboard
          </button>
        </div>

        <details className="mx-auto mt-10 max-w-md rounded-xl border border-gray-200 bg-white p-4 text-left">
          <summary className="cursor-pointer text-sm font-semibold text-gray-600">
            Technical details
          </summary>

          <p className="mt-3 wrap-break-word text-xs leading-5 text-red-500">
            {error?.message || 'Unknown application error'}
          </p>
        </details>

        <p className="mt-10 text-xs text-gray-400">
          © 2026 Cabin Management System
        </p>
      </div>
    </div>
  );
}

export default ErrorFallback;
