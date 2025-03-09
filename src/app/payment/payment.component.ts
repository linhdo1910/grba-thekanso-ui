import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  cartProducts = [
    {
      image: 'asset/test1.jpg',
      name: 'Kalini',
      discountPrice: 5000000,
      originalPrice: 10000000,
      discountPercent: 50,
      size: '1m2',
      quantity: 1
    },
    {
      image: 'asset/test2.jpg',
      name: 'Kalini',
      discountPrice: 5000000,
      originalPrice: 10000000,
      discountPercent: 50,
      size: '1m2',
      quantity: 1
    }
  ];

  // Xóa sản phẩm khỏi giỏ hàng
  removeProduct(index: number): void {
    this.cartProducts.splice(index, 1);
  }

  // Tính tổng giá trị đơn hàng
  calculateTotal(): number {
    return this.cartProducts.reduce((total, product) => total + product.discountPrice * product.quantity, 0);
  }
}
