import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginCredentials } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  signInError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const credentials: LoginCredentials = {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        sessionStorage.setItem('token', response.token || '');
      console.log('Token saved in sessionStorage:', sessionStorage.getItem('token'));  // Kiểm tra token đã lưu trong sessionStorage
  
        // Tiến hành điều hướng nếu đăng nhập thành công
        this.router.navigate(['/Homepage']); 
      },
      error: (err) => {
        console.error('Login error:', err);
        this.signInError = 'Login failed. Please check your credentials.';
      }
    });
  }
}
