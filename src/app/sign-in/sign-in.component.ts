// sign-in.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  // Biến kiểm soát hiển thị mật khẩu
  hienMatKhau: boolean = false;

  // Biến lưu trữ email và mật khẩu người dùng nhập vào
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  // Hàm chuyển đổi hiển thị mật khẩu
  chuyenDoiMatKhau() {
    this.hienMatKhau = !this.hienMatKhau;
  }

  // Xử lý khi người dùng nhấn nút Login
  onLogin() {
    if (this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      console.log('Remember Me:', this.rememberMe);
      alert('Login successful!');

      // Điều hướng tới trang chính sau khi đăng nhập thành công
      this.router.navigate(['/home']);
    } else {
      alert('Vui lòng nhập email và mật khẩu.');
    }
  }

  // Xử lý khi nhấn vào "Forgot password"
  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  // Xử lý khi nhấn vào "Register"
  onRegister() {
    this.router.navigate(['/register']);
  }
}