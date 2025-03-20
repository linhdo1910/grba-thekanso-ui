import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  cartProducts = [
    {
      image: 'asset/products/demo1.jpg',
      name: 'Kalini',
      discountPrice: 5000000,
      originalPrice: 10000000,
      discountPercent: 50,
      size: 'Large',
      quantity: 1
    },
    {
      image: 'asset/products/demo1.jpg',
      name: 'Kalini',
      discountPrice: 5000000,
      originalPrice: 10000000,
      discountPercent: 50,
      size: 'Small',
      quantity: 1
    }
  ];

  discountCode: string = ''; // Input for discount code
  discountAmount: number = 0; // Discount amount applied
  totalAfterDiscount: number = this.calculateTotal(); // Total after applying discount

  constructor(private productService: ProductService, private router: Router) {}

  // Remove a product from the cart
  removeProduct(index: number): void {
    this.cartProducts.splice(index, 1);
    this.calculateTotalAfterDiscount(); // Recalculate total after removing a product
  }

  // Calculate the total price of the cart
  calculateTotal(): number {
    return this.cartProducts.reduce((total, product) => total + product.discountPrice * product.quantity, 0);
  }

  // Apply a discount code - fixing
  applyDiscountCode(): void {
    if (this.discountCode.trim() === '') {
      alert('Please enter a discount code.');
      this.discountAmount = 0;
      this.totalAfterDiscount = this.calculateTotal();
      return;
    }
  
    const total = this.calculateTotal();
    // Gọi API và subscribe để xử lý giá trị discount trả về
    this.productService.applyDiscountCode(this.discountCode, total).subscribe(
      (discount: number) => {
        // Giả sử API trả về tổng tiền sau khi áp dụng giảm giá
        if (discount < total) {
          this.discountAmount = total - discount;
          this.totalAfterDiscount = discount;
          alert(`Discount applied! You saved ${this.discountAmount.toLocaleString()} VND.`);
        } else if (discount === total) {
          alert('No code exists or the code is invalid.');
          this.discountAmount = 0;
          this.totalAfterDiscount = total;
        }
      },
      error => {
        console.error('Error applying discount code', error);
        alert('An error occurred while applying discount code.');
        this.discountAmount = 0;
        this.totalAfterDiscount = total;
      }
    );
  }
  
  // Calculate the total after applying the discount
  calculateTotalAfterDiscount(): void {
    const total = this.calculateTotal();
    this.totalAfterDiscount = total - this.discountAmount;
  }

  // Confirm the order
  confirmOrder(): void {
    alert('Order successfully placed! Redirecting to the payment page...');
    this.router.navigate(['/qr-code']); // Redirect to the order page
  }
}
