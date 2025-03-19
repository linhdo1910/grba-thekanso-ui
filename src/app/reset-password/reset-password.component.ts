import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password === this.confirmPassword) {
      alert('Password changed successfully');
      this.router.navigate(['/sign-in']); 
    } else {
      alert('Passwords do not match');
      this.password = '';
      this.confirmPassword = '';
    }
  }
}
