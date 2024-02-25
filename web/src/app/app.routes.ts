import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./user/register/register-user.component').then(
            (m) => m.RegisterUserComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./user/list-users/list-users.component').then(
            (m) => m.ListUsersComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'register'
      },
      {
        path: '**',
        redirectTo: 'register',
      },
    ],
  },
];
