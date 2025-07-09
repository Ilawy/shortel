import { Routes } from '@angular/router';
import { Index } from './routes/index';

export const routes: Routes = [
  {
    path: '',
    component: Index,
  },
  {
    path: 'auth',
    loadComponent: () => import('./routes/auth/auth').then((m) => m.Auth),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./routes/dashboard/dashboard').then((m) => m.Dashboard),
  },
];
