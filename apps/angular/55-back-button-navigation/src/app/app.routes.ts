import { Routes } from '@angular/router';
import { backButtonGuard } from './guards/back-button.guard';
import { HomeComponent } from './home/home.component';
import { SensitiveActionComponent } from './sensitive-action/sensitive-action.component';
import { SimpleActionComponent } from './simple-action/simple-action.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'simple-action',
    component: SimpleActionComponent,
    canDeactivate: [backButtonGuard],
  },
  {
    path: 'sensitive-action',
    component: SensitiveActionComponent,
    canDeactivate: [backButtonGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
