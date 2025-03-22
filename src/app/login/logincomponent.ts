import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../interface/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: false
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  signInError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.signInError = 'Vui lòng nhập đầy đủ email và mật khẩu.';
      return;
    }

    this.authService.login(this.email, this.password, this.rememberMe).subscribe({
      next: (response: LoginResponse) => {
        this.signInError = null;
        // Lưu token, userId, role nếu cần (có thể lưu vào localStorage)
        localStorage.setItem('token', response.token || '');
        localStorage.setItem('userId', response.userId);
        // Chuyển hướng về trang chủ
        this.router.navigate(['/homepage']);
      },
      error: (error: any) => {
        console.error('Đăng nhập thất bại:', error);
        this.signInError = error.error?.message || 'Đăng nhập thất bại, vui lòng thử lại.';
      }
    });
  }
}