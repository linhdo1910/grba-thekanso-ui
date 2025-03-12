import { Component } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  originalPrice: number;
  discount: number;  // Added discount property
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
      discount: 0  
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
    alert('Continue shopping clicked!');
  }

  checkout(): void {
    alert('Proceeding to checkout...');
  }

  removeProduct(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
  }
}
