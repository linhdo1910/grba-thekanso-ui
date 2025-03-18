import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  originalPrice: number;
  discount: number;
}

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Kalini Sofa',
      price: 5000000,
      image: 'asset/products/demo1.jpg',
      size: '1m2',
      quantity: 1,
      originalPrice: 10000000,
      discount: 50
    },
    {
      id: 2,
      name: 'Kalini Chair',
      price: 5000000,
      image: 'asset/products/demo1.jpg',
      size: '1m2',
      quantity: 1,
      originalPrice: 10000000,
      discount: 10
    },
    {
      id: 3,
      name: 'Kalini Bed',
      price: 5000000,
      image: 'asset/products/demo1.jpg',
      size: '1m2',
      quantity: 1,
      originalPrice: 10000000,
      discount: 30
    }
  ];

  constructor(private router: Router) {}

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

  removeProduct(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
  }
}
