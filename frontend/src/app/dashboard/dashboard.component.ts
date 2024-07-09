import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { SessionsService } from '../services/sessions/sessions.service';
import { TimezonePipe } from '../pipes/timezone.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TimezonePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  dashboardData: any = {};
  usersSessions: any = [];
  constructor(
    private userService: UserService,

    private sessionService: SessionsService
  ) {}

  ngOnInit(): void {
    this.getDashboardData();
    this.getSessions();
  }

  getDashboardData() {
    this.userService.getDashboardData().subscribe({
      next: (response: any) => {
        this.dashboardData = response.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getSessions() {
    this.sessionService.getSessions().subscribe({
      next: (response: any) => {
        this.usersSessions = response.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
