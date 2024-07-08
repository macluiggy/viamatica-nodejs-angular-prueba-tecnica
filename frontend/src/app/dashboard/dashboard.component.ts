import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardData: any;
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getDashboardData().subscribe({
      next: (response: any) => {
        this.dashboardData = response.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
