import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth.service'; 
import { Register } from '../../Models/register.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ CommonModule,FormsModule],
  
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMessage: string = '';
  errorMessagepassword: string = '';

  registerData: Register = {
    username: '',
    email: '',
    password: '',
    profileImage: null,
    userID: 0
  };
  repeatPassword = '';
  selectedFileName = '';

  constructor(private authService: AuthService) 
  {
    

   }

  onFileSelected(event: any) {
    const file: File | null = event.target.files[0] || null;
    if (file) {
      this.registerData.profileImage = file;
      this.selectedFileName = file ? file.name : '';

    }
  }

  onSubmit() {
    debugger
    if (this.registerData.password !== this.repeatPassword  ) {
      this.errorMessagepassword = 'Passwords do not match!';

      return;
    }

    if (!this.registerData.username.trim() || 
    !this.registerData.email.trim() || 
    !this.registerData.password.trim() || 
    !this.repeatPassword.trim()) {
  this.errorMessage = 'plz fill Required Fields';
  return;
}



    const formData = new FormData();
    formData.append('username', this.registerData.username);
    formData.append('email', this.registerData.email);
    formData.append('password', this.registerData.password);
    if (this.registerData.profileImage) {
      formData.append('profileImage', this.registerData.profileImage);
  }

    this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        // Handle successful registration (e.g., redirect to login)
        window.location.reload(); // This will reload the entire page

      },
      error: (error) => {
        console.error('Registration failed', error);
        // Handle registration error
      }
    });
  }
}
