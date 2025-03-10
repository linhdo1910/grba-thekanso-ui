import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { PersonalIn4Component } from './personal-in4/personal-in4.component';
import { OderComponent } from './oder/oder.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPassordComponent } from './forgot-passord/forgot-passord.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ReviewComponent } from './review/review.component';
import { RoomShapeComponent } from './room-shape/room-shape.component';
import { RoomDimensionComponent } from './room-dimension/room-dimension.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ CommonModule, RouterModule, PersonalIn4Component, OderComponent, SignInComponent, SignUpComponent, ForgotPassordComponent, ResetPasswordComponent, OrderDetailComponent, ReviewComponent, RoomShapeComponent, RoomDimensionComponent ]  // Đảm bảo thêm vào imports
})
export class AppComponent {
  title = 'Room Designer';
}


