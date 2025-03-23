import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service'; 
import { Product } from '../interface/product';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  productColors: string[] = []; 
  selectedColor: string = '';
  selectedSize: string = '';
  quantity: number = 1;
  currentMainImage: string = '';
  relatedProducts: Product[] = []; 

  constructor(
    public productService: ProductService, 
    private cartService: CartService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productService.getProductById(id).subscribe(
          (product: Product) => {
            this.product = product;
            if (this.product && this.product.color) {
              this.productColors = this.product.color.split(',').map(c => c.trim());
            }
            if (this.product && this.product.images && this.product.images.length > 0) {
              this.currentMainImage = this.product.images[0];
            }
            if (this.productColors.length > 0) {
              this.selectedColor = this.productColors[0];
            }
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

  quickBuy(): void {
    if (this.product) {
      console.log('Quick buy:', {
        product: this.product,
        selectedColor: this.selectedColor,
        selectedSize: this.selectedSize,
        quantity: this.quantity
      });
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
