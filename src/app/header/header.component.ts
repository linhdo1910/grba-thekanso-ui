import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchKeyword: string = '';
  cartCount: number = 0;
  private cartSubscription!: Subscription;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  onSearch(): void {
    if (this.searchKeyword.trim()) {
      this.router.navigate(['/products'], { queryParams: { keyword: this.searchKeyword.trim() } });
    }
  }
}
