import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule trực tiếp

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],

  imports: [FormsModule] // Import FormsModule trực tiếp
})
export class ResetPasswordComponent {
  password: string = '';
  confirmPassword: string = '';

  onSubmit() {
    if (this.password === this.confirmPassword) {
      alert('Đổi mật khẩu thành công');
    } else {
      alert('2 mật khẩu không giống nhau');
      this.password = '';
      this.confirmPassword = '';
    }
  }
}
