import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/list/list.component').then((m) => m.ListComponent)
  },
  {
    path: 'task',
    loadComponent: () =>
      import('./pages/task/task.component').then((m) => m.TaskComponent)
  }
];
