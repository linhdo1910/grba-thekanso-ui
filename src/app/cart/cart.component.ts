import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../interface/cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    // Lấy dữ liệu giỏ hàng từ CartService
    this.cartItems = this.cartService.getCartItems();
  }

  calculateTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  calculateDiscountedTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      const discountAmount = (item.discount / 100) * item.originalPrice;
      const discountedPrice = item.originalPrice - discountAmount;
      total += discountedPrice * item.quantity;
    });
    return total;
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  checkout(): void {
    this.router.navigate(['/payment']);
  }

  removeProduct(productId: string, size: string, color: string): void {
    this.cartService.removeProduct(productId, size, color);
    this.cartItems = this.cartService.getCartItems();
  }
}
