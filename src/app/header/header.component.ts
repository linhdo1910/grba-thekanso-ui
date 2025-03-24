import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service'; // Đảm bảo đã import

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchKeyword: string = '';
  cartCount: number = 0;
  isLoggedIn: boolean = false;
  userName: string | null = null; // Biến để lưu tên người dùng
  private cartSubscription!: Subscription;
  private authSubscription!: Subscription; // Subscription cho AuthService

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    // Theo dõi trạng thái đăng nhập từ AuthService
    this.authSubscription = this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        // Nếu đã đăng nhập, lấy thông tin profile
        this.authService.getUserProfile().subscribe({
          next: (user) => {
            this.userName = user?.name ?? null; // Lưu tên người dùng
          },
          error: (err) => {
            console.error('Failed to fetch user profile:', err);
            this.userName = null;
          }
        });
      } else {
        this.userName = null; // Reset tên khi chưa đăng nhập
      }
    });

    // Theo dõi số lượng sản phẩm trong giỏ hàng
    this.cartSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSearch(): void {
    if (this.searchKeyword.trim()) {
      this.router.navigate(['/products'], { queryParams: { keyword: this.searchKeyword.trim() } });
    }
  }

  viewOrder(): void {
    this.router.navigate(['/order']);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.userName = null;
        this.router.navigate(['/homepage']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }
  goToPersonalInfo(): void {
    console.log('Navigating to personal info');
    this.router.navigate(['/order']); // Điều hướng đến personal-in4
  }
}