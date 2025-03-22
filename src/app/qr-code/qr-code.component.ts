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
    // Lấy orderId từ query parameters (ví dụ: ?orderId=12345)
    this.orderId = this.route.snapshot.queryParamMap.get('orderId') || '';
    if (this.orderId) {
      // Gọi API lấy đơn hàng dựa trên orderId
      this.orderService.getOrderById(this.orderId).subscribe(
        (order: Order) => {
          this.order = order;
          // Giả sử trong Order, tổng tiền được lưu trong trường total
          this.totalAmount = order.total;
        },
        error => {
          console.error('Error fetching order:', error);
        }
      );
    }
  }

  onPaymentSuccess(): void {
    if (!this.orderId) {
      alert('No order found.');
      return;
    }
    this.orderService.updateOrderStatus(this.orderId, { status: 'Processing' }).subscribe(
      (updatedOrder: Order) => {
        alert('Payment confirmed! Your order is now processing.');
        // Điều hướng sang trang Order Success (hoặc trang khác theo logic của bạn)
        this.router.navigate(['/order-success'], { queryParams: { orderId: updatedOrder._id } });
      },
      error => {
        console.error('Error updating order status:', error);
        alert('An error occurred while confirming payment.');
      }
    );
  }
}
