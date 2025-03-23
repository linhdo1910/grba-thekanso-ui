import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../interface/order';

@Component({
  selector: 'app-order-detail',
  standalone: false,
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Input() orderId!: string;
  @Output() close = new EventEmitter<void>();

  order: Order = {
    billingAddress: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      streetAddress: '',
      province: '',
      district: '',
      ward: ''
    },
    shippingMethod: '',
    paymentMethod: '',
    subtotal: 0,
    discount: 0,
    total: 0,
    products: [],
    status: '',
    // Nếu cần thiết, thêm shipTo vào Order
    shipTo: {
      fullName: '',
      phone: '',
      email: '',
      streetAddress: '',
      province: '',
      district: '',
      ward: '',
      city: '',
      address: '',
      note: ''
    },};
 
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrderById(this.orderId).subscribe(
      (order: Order) => {
        this.order = order;
      },
      error => console.error(`Order with ID ${this.orderId} not found.`, error)
    );
  }

  // Các hàm khác, giữ nguyên như cũ
  parseStatus(status?: string): number {
    if (!status) return 0;
    switch (status) {
      case 'Order received': return 1;
      case 'Processing':     return 2;
      case 'On the way':     return 3;
      case 'Delivered':      return 4;
      default:               return 0;
    }
  }

  getDeliveryProgress(status?: string): number {
    const s = this.parseStatus(status);
    switch (s) {
      case 1: return 25;
      case 2: return 50;
      case 3: return 75;
      case 4: return 100;
      default: return 0;
    }
  }

  cancelOrder(): void {
    if (!this.order || !this.order._id || !this.order.status) {
      console.error('Order is undefined or missing required fields');
      return;
    }
    const statusValue = this.parseStatus(this.order.status);
    if (statusValue < 4) {
      this.orderService.cancelOrder(this.order._id).subscribe(
        () => console.log(`Order ${this.order._id} has been canceled.`),
        error => console.error('Error canceling order', error)
      );
    } else {
      console.log(`Order ${this.order._id} cannot be canceled.`);
    }
  }

  writeReview(): void {
    if (this.order && this.order._id && this.order.status === 'Delivered') {
      this.router.navigate(['review', this.order._id]);
    } else {
      console.log(`Cannot write review for order ${this.order?._id}.`);
    }
  }

  closeDetail(): void {
    this.close.emit();
  }
}
