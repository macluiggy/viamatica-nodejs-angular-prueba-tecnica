import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { MyLoginHistoryComponent } from './my-login-history/my-login-history.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserMaintenanceComponent } from './user-maintenance/user-maintenance.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'my-login-history', component: MyLoginHistoryComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-maintenance', component: UserMaintenanceComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
