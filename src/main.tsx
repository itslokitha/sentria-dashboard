import { createRoot } from 'react-dom/client';
import { AuthProvider } from './auth/AuthContext';
import { AppRouter } from './router/AppRouter';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);