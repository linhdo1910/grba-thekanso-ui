import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { CartService } from '../cart.service';
import { Order, BillingAddress } from '../interface/order';
import { CartItem } from '../interface/cart';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  // Sử dụng interface BillingAddress theo định nghĩa của bạn
  billingAddress: BillingAddress = {
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    email: '',
    streetAddress: '',
    province: '',  // Sử dụng province thay vì city
    district: '',
    ward: ''
  };

  shippingMethod: string = 'J&T Express';
  paymentMethod: string = 'bank-transfer';
  orderNotes: string = '';

  discountCode: string = '';
  discountAmount: number = 0;
  subtotal: number = 0;
  total: number = 0;

  // Lấy dữ liệu giỏ hàng từ CartService
  cartProducts: CartItem[] = [];

  // Dữ liệu cho location (tỉnh, huyện, xã)
  locations: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private cartService: CartService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartItems();
    this.calculateTotals();
    this.loadLocations();
  }

  calculateTotals(): void {
    this.subtotal = this.cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.total = this.subtotal - this.discountAmount;
  }

  applyDiscountCode(): void {
    if (!this.discountCode.trim()) {
      alert('Please enter a discount code.');
      this.discountAmount = 0;
      this.calculateTotals();
      return;
    }
    // Ví dụ: nếu mã giảm là "J97" và subtotal >= 3.5 triệu thì giảm 10%
    if (this.discountCode.trim().toUpperCase() === 'J97' && this.subtotal >= 3500000) {
      this.discountAmount = Math.floor(this.subtotal * 0.1);
      this.calculateTotals();
      alert(`Discount applied! You saved ${this.discountAmount.toLocaleString()} VND.`);
    } else {
      alert('Discount code is invalid or order does not meet the minimum requirement.');
      this.discountAmount = 0;
      this.calculateTotals();
    }
  }

  removeProduct(index: number): void {
    this.cartProducts.splice(index, 1);
    this.calculateTotals();
  }

  confirmOrder(): void {
    // Kiểm tra các trường bắt buộc của billingAddress
    if (
      !this.billingAddress.province ||
      !this.billingAddress.district ||
      !this.billingAddress.ward ||
      !this.billingAddress.streetAddress ||
      !this.billingAddress.email ||
      !this.billingAddress.phone
    ) {
      alert('Please fill in all required billing address fields.');
      return;
    }

    const order: Order = {
      // Giả sử userId rỗng cho Guest, bạn có thể cập nhật sau khi có thông tin đăng nhập
      billingAddress: this.billingAddress,
      shippingMethod: this.shippingMethod,
      paymentMethod: this.paymentMethod,
      orderNotes: this.orderNotes,
      items: this.cartProducts,
      products: this.cartProducts,
      subtotal: this.subtotal,
      discount: this.discountAmount,
      total: this.total,
      date: new Date(),
      status: 'Order received'
    };

    this.paymentService.createOrder(order).subscribe(
      (createdOrder: Order) => {
        alert('Order successfully placed!');
        this.cartService.clearCart();
        this.router.navigate(['/qr-code'], { queryParams: { orderId: createdOrder._id } });
      },
      (error: any) => {
        console.error('Error creating order', error);
        alert('An error occurred while placing your order.');
      }
    );
  }

  // Load danh sách địa phương từ API
  loadLocations(): void {
    this.locationService.getLocations().subscribe(
      data => { this.locations = data; },
      error => { console.error('Error loading locations', error); }
    );
  }

  onProvinceChange(provinceName: string): void {
    this.billingAddress.province = provinceName;
    const selectedProvince = this.locations.find(loc => loc.name === provinceName);
    this.districts = selectedProvince ? selectedProvince.districts : [];
    this.billingAddress.district = '';
    this.wards = [];
    this.billingAddress.ward = '';
  }

  onDistrictChange(districtName: string): void {
    this.billingAddress.district = districtName;
    const selectedDistrict = this.districts.find(d => d.name === districtName);
    this.wards = selectedDistrict ? selectedDistrict.wards : [];
    this.billingAddress.ward = '';
  }

  onWardChange(wardName: string): void {
    this.billingAddress.ward = wardName;
  }
}
