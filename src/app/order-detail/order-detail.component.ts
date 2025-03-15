import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';
// Định nghĩa cấu trúc sản phẩm trong đơn hàng
interface Product {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    image: string;
}

// Định nghĩa cấu trúc địa chỉ thanh toán
interface BillingAddress {
    name: string;
    address: string;
    email: string;
    phone: string;
}

// Định nghĩa cấu trúc thông tin đơn hàng
interface Order {
    date: string; // Ngày đặt hàng
    orderId: number; // Mã đơn hàng
    paymentMethod: string; // Phương thức thanh toán
    subtotal: number; // Tổng tiền trước giảm giá
    discount: number; // Phần trăm giảm giá
    shipping: string; // Phí vận chuyển
    total: number; // Tổng số tiền thanh toán
    status: number; // Trạng thái đơn hàng (1: Order received, 2: Processing, 3: On the way, 4: Delivered)
    billingAddress: BillingAddress; // Địa chỉ thanh toán
    products: Product[]; // Danh sách sản phẩm trong đơn hàng
}

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',

    imports: [CommonModule], // Thêm CommonModule vào imports
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {

    constructor(private router: Router) {}

    navigateTo(route: string): void {
      this.router.navigate([route]);
    }
    
    // Thông tin đơn hàng, có thể thay đổi bằng dữ liệu từ API hoặc Input
    order: Order = {
        date: 'April 24, 2021',
        orderId: 4152,
        paymentMethod: 'Paypal',
        subtotal: 2000000,
        discount: 20,
        shipping: 'Free',
        total: 1000000,
        status: 3, // Trạng thái hiện tại (ví dụ: Processing)
        billingAddress: {
            name: 'Dainne Russell',
            address: '4140 Parker Rd. Allentown, New Mexico 31134',
            email: 'dainne.ressell@gmail.com',
            phone: '(671) 555-0110'
        },
        products: [
            {
                name: 'Red Capsicum',
                price: 14.00,
                quantity: 5,
                subtotal: 70.00,
                image: 'src/asset/sofa-01.svg'
            },
            {
                name: 'Red Capsicum',
                price: 14.00,
                quantity: 5,
                subtotal: 70.00,
                image: 'path/to/image2.png'
            },
            {
                name: 'Red Capsicum',
                price: 14.00,
                quantity: 5,
                subtotal: 70.00,
                image: 'path/to/image3.png'
            }
        ]
    };
    

    // Hàm hủy đơn hàng
    cancelOrder() {
        if (this.order.status < 4) {
            console.log('Đơn hàng đã bị hủy.');
        }
    }

    // Hàm viết đánh giá (chỉ cho phép khi đơn hàng đã giao)
    writeReview() {
        if (this.order.status === 4) {
            console.log('Đi tới trang viết đánh giá.');
        }
    }
}
