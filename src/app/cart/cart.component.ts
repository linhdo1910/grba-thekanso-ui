import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../interface/cart';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { Product } from '../interface/product';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  productIds: string[] = [];
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Lấy các productId từ queryParams trong URL
    this.route.queryParams.subscribe(params => {
      this.productIds = params['productIds'] || [];
      if (this.productIds.length > 0) {
        this.loadProducts(); // Gọi phương thức loadProducts nếu có productIds
      }
    });

    // Lấy dữ liệu giỏ hàng từ CartService
    this.cartItems = this.cartService.getCartItems();
  }

  // Lấy thông tin chi tiết sản phẩm từ backend
  loadProducts() {
    if (this.productIds.length > 0) {
      this.productService.getProductsByIds(this.productIds).subscribe(
        products => {
          this.products = products;
          this.addProductsToCart(products); // Thêm sản phẩm vào giỏ hàng
        },
        error => {
          console.error('Error loading products:', error);
        }
      );
    }
  }

  // Thêm các sản phẩm vào giỏ hàng
  addProductsToCart(products: Product[]) {
    products.forEach(product => {
      this.cartService.addToCart(product, 'default-color', 'default-size', 1); // Mặc định cho size và color
    });
  }

  // Tính tổng giá trị của giỏ hàng (chưa áp dụng giảm giá)
  calculateTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Tính tổng giá trị của giỏ hàng sau khi áp dụng giảm giá
  calculateDiscountedTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      const discountAmount = (item.discount / 100) * item.originalPrice;
      const discountedPrice = item.originalPrice - discountAmount;
      total += discountedPrice * item.quantity;
    });
    return total;
  }

  // Tiếp tục mua sắm
  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  // Tiến hành thanh toán
  checkout(): void {
    this.router.navigate(['/payment']);
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeProduct(productId: string, size: string, color: string): void {
    this.cartService.removeProduct(productId, size, color);
    this.cartItems = this.cartService.getCartItems();
  }
}
