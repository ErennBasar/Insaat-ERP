import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Login } from './features/login/login';
import {ProjectsComponent} from './features/projects/projects';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      // İleride buraya: { path: 'hakedis', component: HakedisComponent } vb. eklenecek
      { path: 'projeler', component: ProjectsComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
