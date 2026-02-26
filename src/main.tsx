import { createRoot } from 'react-dom/client';
import { AppRouter } from './router/AppRouter';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <AppRouter />
);
