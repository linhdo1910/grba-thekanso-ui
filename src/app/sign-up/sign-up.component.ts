import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

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
      this.isTermsAccepted
    );
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.successMessage = 'Account created successfully! Redirecting to sign-in page...';
      setTimeout(() => {
        this.router.navigate(['/sign-in']); 
      }, 2000);
    }
  }
}

