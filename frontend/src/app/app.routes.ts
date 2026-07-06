import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Login } from './features/login/login';
import {ProjectsComponent} from './features/projects/projects';
import {Contracts} from './features/contracts/contracts';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },

      { path: 'projects', component: ProjectsComponent },
      { path: 'contracts', component: Contracts }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
