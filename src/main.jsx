import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './pages/ErrorFallback.jsx';

createRoot(document.getElementById('root')).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>,
);
