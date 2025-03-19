import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  hienMatKhau: boolean = false;

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isPasswordValid: boolean = false;
  isConfirmPasswordValid: boolean = true;
  isEmailValid: boolean = false;
  rememberMe: boolean = false;
  successMessage: string = '';

  constructor(private router: Router) {}

  chuyenDoiMatKhau() {
    this.hienMatKhau = !this.hienMatKhau;
  }

  onLogin() {
    if (this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      console.log('Remember Me:', this.rememberMe);
      alert('Login successful!');

      this.router.navigate(['/homepage']);
    } else {
      alert('Vui lòng nhập email và mật khẩu.');
    }
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  onRegister() {
    this.router.navigate(['/sign-up']);
  }

  checkPasswordLength(): void {
    this.isPasswordValid = this.password.length >= 8;
    this.validateConfirmPassword(); 
  }

  validateConfirmPassword(): void {
    this.isConfirmPasswordValid = this.password === this.confirmPassword;
  }

  validateEmail(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    this.isEmailValid = emailPattern.test(this.email);
  }

  validatePassword(): void {
    this.isPasswordValid = this.password.length >= 8; 
  }

  isFormValid(): boolean {
    return this.isEmailValid && this.isPasswordValid;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      alert('Sign In successful!');
      this.router.navigate(['/homepage']);
    } else {
      alert('Please enter valid credentials.');
    }
  }
}