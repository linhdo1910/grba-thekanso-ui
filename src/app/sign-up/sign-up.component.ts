import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
 
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreeTerms: boolean = false;

  createAccount() {
    if (this.password.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự!');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (!this.agreeTerms) {
      alert('Bạn cần đồng ý với các điều khoản và chính sách bảo mật!');
      return;
    }
    alert('Tạo tài khoản thành công!');
  }

  login() {
    alert('Chuyển tới trang đăng nhập');
  }

  loginWithGoogle() {
    alert('Đăng nhập bằng tài khoản Google');
  }
}

