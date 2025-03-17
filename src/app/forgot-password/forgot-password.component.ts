import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  constructor(private router: Router) {}

  // Hàm xử lý khi ấn nút Submit
  onSubmit(): void {
    // Điều hướng sang trang đặt lại mật khẩu (ví dụ: /reset-password)
    this.router.navigate(['/reset-password']);
  }

  // Hàm xử lý khi ấn nút Cancel
  onCancel(): void {
    // Điều hướng sang trang khác (ví dụ: /home)
    this.router.navigate(['/home']);
  }

}
