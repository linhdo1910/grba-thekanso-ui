import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-details',
  standalone:false,
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
    // Get Product ID from URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const productId = +id;
        this.product = this.productService.getProductById(productId);

        if (this.product) {
          // Set default selected color & size
          if (this.product.colors.length > 0) {
            this.selectedColor = this.product.colors[0];
          }
          this.selectedSize = this.product.sizes;

          // Set default main image
          this.currentMainImage = this.product.mainImage;
        } else {
          console.error('Product not found with ID:', productId);
        }
      } else {
        console.error('Product ID is missing in the route.');
      }
    });
  }

  // Select color
  onColorSelect(colorName: string): void {
    this.selectedColor = colorName;
    // Change main image to color image if exists
    const colorImg = this.productService.getImageUrlByColor(colorName);
    if (colorImg) {
      this.currentMainImage = colorImg;
    }
  }

  // Quantity control
  changeQuantity(delta: number): void {
    const newQuantity = this.quantity + delta;
    this.quantity = newQuantity > 0 ? newQuantity : 1;
  }

  addToCart(): void {
    console.log('Added to cart:', {
      product: this.product,
      selectedColor: this.selectedColor,
      selectedSize: this.selectedSize,
      quantity: this.quantity
    });
  }

  quickBuy(): void {
    console.log('Quick buy:', {
      product: this.product,
      selectedColor: this.selectedColor,
      selectedSize: this.selectedSize,
      quantity: this.quantity
    });
  }
}