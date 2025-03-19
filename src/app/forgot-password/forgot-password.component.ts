import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone:false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  constructor(private router: Router) {}

  onSubmit(): void {
    this.router.navigate(['/reset-password']);
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }

}
