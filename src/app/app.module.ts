import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PaymentComponent } from './payment/payment.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { SidebarBlogComponent } from './sidebar-blog/sidebar-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SuggestedHomepageComponent } from './suggested-homepage/suggested-homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PaymentComponent,
    QrCodeComponent,
    OrderSuccessComponent,
    SidebarBlogComponent,
    BlogListComponent,
    BlogDetailComponent,
    HomepageComponent,
    SuggestedHomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
