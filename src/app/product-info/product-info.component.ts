import { Component, Input } from '@angular/core';
import { Product } from '../interface/product';

interface Review {
  name: string;
  date: string;
  rating: number;
  comment: string;
  image: string;
}

@Component({
  selector: 'app-product-info',
  standalone: false,
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent {
  // Nhận sản phẩm từ parent component (ProductDetailsComponent)
  @Input() product: Product | undefined;
}
