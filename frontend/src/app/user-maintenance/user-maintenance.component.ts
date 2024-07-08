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
  usersFile: any;
  searchTimeout: any;
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

  searchUsers(event: any) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.userService.getUsers(event.target.value).subscribe({
        next: (response: any) => {
          this.users = response.data;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }, 500);
  }

  onFileChange(event: any) {
    this.usersFile = event.target.files[0];
  }

  bulkCreateUsers(event: any) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', this.usersFile);
    this.userService.bulkCreateUsers(formData).subscribe({
      next: (response: any) => {
        this.getUsers();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
