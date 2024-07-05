import { Component, OnInit } from '@angular/core';
import { LoginHistoryService } from '../services/login-history/login-history.service';
import { StorageService } from '../services/storage/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-login-history',
  standalone: true,
  // import so i can use pipe
  imports: [CommonModule],
  templateUrl: './my-login-history.component.html',
  styleUrl: './my-login-history.component.scss',
})
export class MyLoginHistoryComponent implements OnInit {
  loginHistory: any[];
  user: any;
  constructor(
    private loginHistoryService: LoginHistoryService,
    private storageService: StorageService
  ) {
    this.loginHistory = [];
    this.user = this.storageService.getUser();
  }

  ngOnInit(): void {
    this.getMyLoginHistory();
  }

  getMyLoginHistory() {
    if (!this.user.id) {
      return;
    }

    this.loginHistoryService.getUserLoginHistory(this.user.id).subscribe({
      next: (response: any) => {
        console.log(response.data);

        this.loginHistory = response.data;
      },
      error: (error) => {
        // console.error(error);
      },
    });
  }
}
