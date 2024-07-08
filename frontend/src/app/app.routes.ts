import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authGuard } from './guards/auth.guard';
import { MyLoginHistoryComponent } from './my-login-history/my-login-history.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'my-login-history', component: MyLoginHistoryComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
