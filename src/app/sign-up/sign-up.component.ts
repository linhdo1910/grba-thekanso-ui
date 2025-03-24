import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isPasswordValid: boolean = false;
  isConfirmPasswordValid: boolean = true;
  isEmailValid: boolean = false;
  isTermsAccepted: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  checkPasswordLength(): void {
    this.isPasswordValid = this.password.length >= 8;
    this.validateConfirmPassword(); 
  }

  validateEmail(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    this.isEmailValid = emailPattern.test(this.email);
  }

  validateConfirmPassword(): void {
    this.isConfirmPasswordValid = this.password === this.confirmPassword;
  }

  isFormValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.isEmailValid &&
      this.isPasswordValid &&
      this.isTermsAccepted &&
      this.password === this.confirmPassword
    );
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.authService.signUp(this.name, this.email, this.password).subscribe({
        next: (response) => {
          console.log('Sign-up successful:', response);
          this.successMessage = 'Account created successfully! Redirecting to sign-in page...';
          setTimeout(() => {
            this.router.navigate(['/sign-in']);
          }, 2000);
        },
        error: (error) => {
          console.error('Sign-up error:', error);
          this.errorMessage = error?.message || 'Sign-up failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
