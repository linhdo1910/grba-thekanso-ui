import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginError = 'Please fill in all required fields correctly.';
      return;
    }
  
    const { email, password, rememberMe } = this.loginForm.value;
  
    this.authService.login(email, password, rememberMe).subscribe({
      next: (response: LoginResponse) => {
        this.loginError = null;
        console.log('Login response:', response);
        console.log('Token received:', response.token);
        // Kiểm tra token trong storage ngay sau khi đăng nhập
        const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!storedToken) {
          console.error('Token was not stored after login!');
          this.loginError = 'Login succeeded but token was not stored.';
          return;
        }
        console.log('Stored token:', storedToken);
  
        if (this.authService.isAdmin()) {
          console.log('Navigating to admin homepage');
          this.router.navigate(['/homepage']);
        } else {
          console.log('Navigating to user homepage');
          this.router.navigate(['/homepage']);
        }
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        this.loginError = error.message || 'An unknown error occurred';
      }
    });
  }
  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }
  showSignupNotAvailable() {
    this.loginError = 'Sign up feature is not available yet.';
  }
  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

}
