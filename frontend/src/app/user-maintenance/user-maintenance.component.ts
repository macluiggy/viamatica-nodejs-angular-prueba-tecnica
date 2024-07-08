import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-maintenance',
  standalone: true,
  imports: [],
  templateUrl: './user-maintenance.component.html',
  styleUrl: './user-maintenance.component.scss',
})
export class UserMaintenanceComponent {
  users: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
