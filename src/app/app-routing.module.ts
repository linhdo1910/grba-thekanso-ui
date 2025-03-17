import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PolicyComponent } from './policy/policy.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'qr-code', component: QrCodeComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/:id', component: OrderDetailComponent },
  { path: 'personal-info', component: PersonalIn4Component },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'room-dimension', component: RoomDimensionComponent },
  { path: 'room-shape', component: RoomShapeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'object', component: ObjectComponent },
  { path: 'suggest', component: SuggestComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:id', component: BlogDetailComponent }, 
  { path: 'sidebar-blog', component: SidebarBlogComponent },
  { path: 'suggested-homepage', component: SuggestedHomepageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent }, 
  { path: '**', redirectTo: 'homepage' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
