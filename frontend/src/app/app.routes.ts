import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'user', component: BoardUserComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
