import {  Component } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        debugger
        console.log('Login successful!', response);
        this.router.navigate(['/dashboard']); // Adjust route as needed

        // window.location.reload(); // This will reload the entire page

      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
  }

}
