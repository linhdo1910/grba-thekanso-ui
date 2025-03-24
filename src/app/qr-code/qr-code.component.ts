import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../interface/order';

@Component({
  selector: 'app-qr-code',
  standalone: false,
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  orderId: string = '';
  totalAmount: number = 0;
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.queryParamMap.get('orderId') || '';
    if (this.orderId) {
      console.log('Fetching order with ID:', this.orderId);
      this.orderService.getOrderById(this.orderId).subscribe(
        (order: Order) => {
          this.order = order;
          this.totalAmount = order.total || 0; // Gán 0 nếu total không tồn tại
          console.log('Order fetched successfully:', order);
          console.log('Total Amount:', this.totalAmount);
        },
        error => {
          console.error('Error fetching order:', error);
          if (error.status === 401) {
            alert('Session expired. Please log in again.');
            this.router.navigate(['/login']);
          }
        }
      );
    } else {
      console.warn('No orderId provided in query params');
    }
  }

  onPaymentSuccess(): void {
    if (!this.orderId) {
      alert('No order found.');
      return;
    }

    const token = localStorage.getItem('token')|| sessionStorage.getItem('token');
    console.log('Token in onPaymentSuccess:', token);
    if (!token) {
      alert('Please log in to continue.');
      this.router.navigate(['/login']);
      return;
    }

    console.log('Updating order status for ID:', this.orderId);
    this.orderService.updateOrderStatus(this.orderId, { status: 'Processing' }).subscribe(
      (updatedOrder: Order) => {
        console.log('Order status updated:', updatedOrder);
        alert('Payment confirmed! Your order is now processing.');
        this.router.navigate(['/order-success'], { queryParams: { orderId: updatedOrder._id } });
      },
      error => {
        console.error('Error updating order status:', error);
        if (error.status === 401) {
          alert('Session expired. Please log in again.');
          this.router.navigate(['/login']);
        } else {
          alert('An error occurred: ' + (error.error?.message || 'Unknown error'));
        }
      }
    );
  }
}