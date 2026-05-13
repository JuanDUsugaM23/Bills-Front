import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./feature/auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: '', 
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard], // Protegemos el layout entero con el Guard
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./feature/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
      /*{
        path: 'accounts',
        loadComponent: () => import('./feature/accounts/accounts.component').then(m => m.AccountsComponent)
      }*/
    ]
  }
];