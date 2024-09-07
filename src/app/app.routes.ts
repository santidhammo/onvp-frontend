import { Routes } from '@angular/router';
import { ActivationComponent } from './route/activation/activation.component';
import { OnceComponent } from './setup/once/once.component';

export const routes: Routes = [
  { path: 'activation/:activationString', component: ActivationComponent },
  { path: 'setup', component: OnceComponent },
];
