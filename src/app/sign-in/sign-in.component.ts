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
}