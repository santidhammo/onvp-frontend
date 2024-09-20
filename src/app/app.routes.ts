import { Routes } from '@angular/router';
import { ActivationComponent } from './route/activation/activation.component';
import { OnceComponent } from './setup/once/once.component';
import { LoginComponent } from './route/login/login.component';
import { LogoutComponent } from './route/logout/logout.component';
import { ConfigComponent } from './route/config/config.component';
import { EditMemberComponent } from './config/edit-member/edit-member.component';

export const routes: Routes = [
  { path: 'activation/:activationString', component: ActivationComponent },
  { path: 'setup', component: OnceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'config', component: ConfigComponent },
];
