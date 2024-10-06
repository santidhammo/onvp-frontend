import { Routes } from '@angular/router';
import { ActivationComponent } from './components/route/activation/activation.component';
import { SetupDetectorComponent } from './components/setup/setup-detector.component';
import { LoginComponent } from './components/route/login/login.component';
import { LogoutComponent } from './components/route/logout/logout.component';
import { ConfigComponent } from './components/route/config/config.component';

export const routes: Routes = [
  { path: 'activation/:activationString', component: ActivationComponent },
  { path: 'setup', component: SetupDetectorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'config', component: ConfigComponent },
];
