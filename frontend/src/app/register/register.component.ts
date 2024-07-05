import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form = {
    email: '',
    password: '',
    username: '',
    fullName: '',
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.signUp(this.form).subscribe({
      next: (response: any) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}
