import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { environment } from '../../environment';
@Component({
  selector: 'app-my-account',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent  implements OnInit {
  settingsForm!: FormGroup ;
  profileImage: string;
  selectedFile: File | null = null;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private CD:ChangeDetectorRef
  ) {
    const pathiamge= this.authService.getUser()?.pathURL 
    this.profileImage=this.authService.getUser().pathURL?  `${environment.apiUrl}${pathiamge}`
    : 'default-avatar.png';



  }

  ngOnInit(): void {
    const user = this.authService.getUser();
    
    this.settingsForm = this.fb.group({
      username: [''],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value 
      ? null 
      : { mismatch: true };
  }




  handleImageError() {
    if (!this.profileImage.includes('default-avatar')) {
      this.profileImage = 'default-avatar.png';
      this.CD.detectChanges();
    }
  }

// Update your onFileSelected
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImage = e.target.result || 
        this.getFallbackImage();
    };
    reader.readAsDataURL(file);
  }
}

private getFallbackImage(): string {
  const user = this.authService.getUser();
  return user?.pathURL 
    ? `${environment.apiUrl}${user.pathURL}`
    : 'default-avatar.png';
}


  togglePasswordVisibility(field: string) {
    switch (field) {
      case 'current': this.showCurrentPassword = !this.showCurrentPassword; break;
      case 'new': this.showNewPassword = !this.showNewPassword; break;
      case 'confirm': this.showConfirmPassword = !this.showConfirmPassword; break;
    }
  }

  async onSubmit() {
    debugger;
    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = new FormData();
    let userInfoChanged = false;
    
    // User info update
    if (this.settingsForm.get('username')?.dirty) {
      formData.append('username', this.settingsForm.value.username);
      userInfoChanged = true;
    }
    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
      userInfoChanged = true;
    }

    // Password change
    const passwordData = {
      currentPassword: this.settingsForm.value.currentPassword,
      newPassword: this.settingsForm.value.newPassword
    };
    const passwordChanged = passwordData.currentPassword && passwordData.newPassword;

    // Handle user info update
    if (userInfoChanged) {
      await  this.authService.updateUser(formData).subscribe({
        next: (res) => {
          this.successMessage = 'Profile updated successfully!';
          this.selectedFile = null;
          this.settingsForm.markAsPristine();
        },
        error: (err) => {
          this.errorMessage = 'Profile update failed: ' + (err.error?.message || '');
          this.isSubmitting = false;
        }
      });
    }

    // Handle password change
    if (passwordChanged) {
     await this.authService.changePassword(passwordData).subscribe({
        next: () => {
          this.successMessage += passwordChanged ? ' Password updated!' : '';
          this.settingsForm.get('currentPassword')?.reset();
          this.settingsForm.get('newPassword')?.reset();
          this.settingsForm.get('confirmPassword')?.reset();
        },
        error: (err) => {
          this.errorMessage = 'Password change failed: ' + (err.error?.message || '');
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }

    if (!userInfoChanged || !passwordChanged) {
      this.isSubmitting = false;
    }
  }
}

