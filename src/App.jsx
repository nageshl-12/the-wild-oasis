import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import ErrorPage from './pages/ErrorPage';
import BookingDetails from './features/bookings/BookingDetails';
import Checkin from './pages/Checkin';
import Login from './pages/Login';
import ProtectedRoute from './ui/ProtectedRoute';
import Account from './pages/Account';

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'bookings',
        element: <Bookings />,
      },
      { path: 'bookings/details/:id', element: <BookingDetails /> },
      { path: 'checked-in/:id', element: <Checkin /> },
      {
        path: 'cabins',
        element: <Cabins />,
      },
      { path: 'users', element: <Users /> },
      { path: 'settings', element: <Settings /> },
      { path: 'account', element: <Account /> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
  { path: 'login', element: <Login /> },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toasterId="default"
        toastOptions={{
          error: {
            duration: 5000,
            iconTheme: {
              primary: 'red',
              secondary: 'green',
            },
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
