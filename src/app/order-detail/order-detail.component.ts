import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService, Order } from '../order.service';

@Component({
  selector: 'app-order-detail',
standalone: false,
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  @Input() orderId!: number; // Receive the order ID from the parent component
  @Output() close = new EventEmitter<void>(); // Emit an event to close the detail view

  order!: Order | undefined; // Store the order details

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the order details from the service
    this.order = this.orderService.getOrderById(this.orderId);
    if (!this.order) {
      console.error(`Order with ID ${this.orderId} not found.`);
    }
  }

  closeDetail(): void {
    if (this.order) {
      this.router.navigate(['/write-review', this.order.orderId]); // Navigate to the review component with the order ID
    } else {
      console.error('Order not found. Cannot navigate to the review page.');
    }
  }

  cancelOrder(): void {
    if (this.order && this.order.status < 4) {
      this.orderService.cancelOrder(this.order.orderId);
      console.log(`Order ${this.order.orderId} has been canceled.`);
    } else {
      console.log(`Order ${this.order?.orderId} cannot be canceled.`);
    }
  }

  writeReview(): void {
    if (this.order && this.order.status === 4) {
      console.log(`Redirecting to the review page for order ${this.order.orderId}.`);
      this.router.navigate(['review', this.order.orderId]);
    } else {
      console.log(`Cannot write a review for order ${this.order?.orderId}.`);
    }
  }

  getDeliveryProgress(status: number): number {
    switch (status) {
      case 1: // Order received
        return 25;
      case 2: // Processing
        return 50;
      case 3: // On the way
        return 75;
      case 4: // Delivered
        return 100;
      default:
        return 0;
    }
  }

  getDeliveryStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Order Received';
      case 2:
        return 'Processing';
      case 3:
        return 'On the Way';
      case 4:
        return 'Delivered';
      default:
        return 'Unknown Status';
    }
  }
}
