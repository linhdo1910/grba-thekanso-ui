import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  selectedColor: string = '';
  selectedSize: string = '';
  quantity: number = 1;
  currentMainImage: string = '';

  constructor(
    public productService: ProductService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const productId = +id;
        this.product = this.productService.getProductById(productId);

        if (this.product && this.product.image.length > 0) {
          this.selectedColor = this.product.colors.length > 0 ? this.product.colors[0] : '';
          this.selectedSize = this.product.sizes;

          // Assuming the first image in the array is the default main image
          this.currentMainImage = this.product.image[0];
        } else {
          console.error('Product not found with ID:', productId);
        }
      } else {
        console.error('Product ID is missing in the route.');
      }
    });
  }

  onColorSelect(colorName: string): void {
    this.selectedColor = colorName;
    const colorImg = this.productService.getImageUrlByColor(colorName);
    this.currentMainImage = colorImg ? colorImg : (this.product && this.product.image.length > 0 ? this.product.image[0] : '');
  }

  onImageSelect(sideImage: string): void {
    this.currentMainImage = sideImage;
  }

  changeQuantity(delta: number): void {
    const newQuantity = this.quantity + delta;
    this.quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1 // Ensure quantity is at least 1 // Ensure quantity is at least 1 // Ensure quantity is at least 1
  }

  addToCart(): void {
    if (this.product) {
      console.log('Added to cart:', {
        product: this.product,
        selectedColor: this.selectedColor,
        selectedSize: this.selectedSize,
        quantity: this.quantity
      });
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
//Scroll thumbnails
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
    if (this.product && this.product.discount > 0) {
      return this.product.price - (this.product.price * this.product.discount / 100);
    }
    return 0;
  }
}
