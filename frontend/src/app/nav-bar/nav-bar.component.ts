import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { AuthService } from '../services/auth/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  title = 'frontend';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.username = this.storageService.getUser().username;
    });
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        this.storageService.clean();
        this.authService.setIsLoggedIn(false);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
