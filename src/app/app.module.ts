import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PolicyComponent } from './policy/policy.component';
import { HeaderComponent } from './header/header.component';
import { PaymentComponent } from './payment/payment.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PersonalIn4Component } from './personal-in4/personal-in4.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReviewComponent } from './review/review.component';
import { RoomDimensionComponent } from './room-dimension/room-dimension.component';
import { RoomShapeComponent } from './room-shape/room-shape.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ObjectComponent } from './object/object.component';
import { SuggestComponent } from './suggest/suggest.component';
import { SidebarBlogComponent } from './sidebar-blog/sidebar-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SuggestedHomepageComponent } from './suggested-homepage/suggested-homepage.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductService } from './product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: 'order-history', component: OrderComponent },
  { path: 'logout', component: OrderComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AboutUsComponent,
    PolicyComponent,
    HeaderComponent,
    PaymentComponent,
    QrCodeComponent,
    OrderSuccessComponent,
    SidebarBlogComponent,
    BlogListComponent,
    BlogDetailComponent,
    HomepageComponent,
    SuggestedHomepageComponent,
    CartComponent,
    ProductDetailsComponent,
    ProductInfoComponent,
    // Các component khác mà không có standalone: true
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ProductsComponent,
    OrderComponent, 
    OrderDetailComponent,
    PersonalIn4Component,
    ObjectComponent,
    RoomDimensionComponent,
    RoomShapeComponent,
    SuggestComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), 
    ReviewComponent,
    AppRoutingModule,
    FormsModule,
    CommonModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
