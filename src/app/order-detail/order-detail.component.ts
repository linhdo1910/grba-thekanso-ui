import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Product } from '../interface/product';
import { OrderService } from '../order.service';
import { Order } from '../interface/order';

@Component({
  selector: 'app-order-detail',
  standalone: false,
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Input() orderId: string = '';
  @Output() close = new EventEmitter<void>();

  product: Product | undefined;
  productColors: { name: string, hex: string }[] = [];
  selectedColor: string = '';
  selectedSize: string = '';
  quantity: number = 1;
  currentMainImage: string = '';
  relatedProducts: Product[] = [];
  order: Order | null = null;

  constructor(
    public productService: ProductService, 
    private cartService: CartService, 
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // Nếu có orderId từ @Input, tải đơn hàng
    if (this.orderId) {
      this.loadOrder();
    }
    // Lấy thông tin sản phẩm từ route nếu cần
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productService.getProductById(id).subscribe(
          (product: Product) => {
            this.product = product;
            if (this.product && this.product.color) {
              const colors = this.product.color.split(',').map(c => c.trim());
              this.productColors = colors.map(color => ({
                name: color, 
                hex: this.getColorHex(color)
              }));
            }
            if (this.product && this.product.images && this.product.images.length > 0) {
              this.currentMainImage = this.product.images[0];
            }
            this.selectedColor = this.productColors.length > 0 ? this.productColors[0].name : '';
            this.selectedSize = this.product.size;
            if (this.product && this.product.productSubCategory) {
              this.productService.getProductsBySubCategory(this.product.productSubCategory)
                .subscribe(
                  (related: Product[]) => {
                    this.relatedProducts = related.filter(p => p._id !== this.product?._id).slice(0, 4);
                  },
                  (error: any) => console.error('Error loading related products', error)
                );
            }
          },
          (error: any) => console.error('Error fetching product by ID:', error)
        );
      } else {
        console.error('Product ID is missing in the route.');
      }
    });
  }

  loadOrder(): void {
    // Gọi API lấy đơn hàng theo orderId; headers được OrderService tự thêm
    this.orderService.getOrderById(this.orderId).subscribe(
      (data: Order) => {
        this.order = data;
      },
      (error: any) => {
        console.error('Error loading order:', error);
      }
    );
  }

  parseStatus(status: string): number {
    switch (status.toLowerCase()) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      case 'cancelled': return 5;
      default: return 0;
    }
  }

  cancelOrder(): void {
    if (this.order && this.order._id) {
      this.orderService.cancelOrder(this.order._id).subscribe(
        () => {
          this.loadOrder(); 
        },
        (error: any) => {
          console.error('Error cancelling order:', error);
        }
      );
    }
  }

  writeReview(): void {
    if (this.order && this.order._id) {
      this.router.navigate(['/review', this.order._id]);
    }
  }

  // Hàm lấy mã hex cho màu
  getColorHex(colorName: string): string {
    const colors: { [key: string]: string } = {
      ash: '#B2BEB5',
      bashwood: '#D7D0C1',
      birch: '#D2C5B0',
      cedar: '#AF9B60',
      'marble-oil': '#CBCBC1',
      oak: '#9B7E3A',
      walnut: '#5D3A1A',
      white: '#FFFFFF'
    };

    return colors[colorName.toLowerCase()] || '#FFFFFF'; // Mặc định màu trắng nếu không tìm thấy
  }

  onColorSelect(colorName: string): void {
    this.selectedColor = colorName;
  }

  onImageSelect(sideImage: string): void {
    this.currentMainImage = sideImage;
  }

  changeQuantity(delta: number): void {
    const newQuantity = this.quantity + delta;
    this.quantity = Math.max(1, newQuantity);
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.selectedSize, this.selectedColor);
      alert('Product added to cart!');
    }
  }

  onQuickBuy(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.selectedSize, this.selectedColor);
      this.router.navigate(['/cart']);
      alert('Product added to cart! Redirecting to cart...');
    }
  }

  scrollThumbnails(direction: number): void {
    const container = document.querySelector('.thumbnail-carousel');
    if (container) {
      const scrollAmount = 150;
      container.scrollBy({
        top: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  getDiscountedPrice(): number {
    if (this.product && this.product.discount && this.product.discount > 0) {
      return this.product.productPrice - (this.product.productPrice * this.product.discount / 100);
    }
    return this.product ? this.product.productPrice : 0;
  }

  navigateToProductDetail(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }
}
