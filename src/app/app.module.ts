import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PaymentComponent } from './payment/payment.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OderComponent } from './oder/oder.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PersonalIn4Component } from './personal-in4/personal-in4.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReviewComponent } from './review/review.component';
import { RoomDimensionComponent } from './room-dimension/room-dimension.component';
import { RoomShapeComponent } from './room-shape/room-shape.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPassordComponent } from './forgot-passord/forgot-passord.component';
import { ObjectComponent } from './object/object.component';
import { SuggestComponent } from './suggest/suggest.component';


const routes: Routes = [
  { path: '', component: OderComponent },
  { path: 'order-history', component: OderComponent },
  { path: 'logout', component: OderComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PaymentComponent,
    QrCodeComponent,
    OrderSuccessComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    OderComponent, 
    OrderDetailComponent,
    PersonalIn4Component,
    ResetPasswordComponent,
    ReviewComponent,
    RoomDimensionComponent,
    RoomShapeComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPassordComponent,
    ObjectComponent,
    SuggestComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
