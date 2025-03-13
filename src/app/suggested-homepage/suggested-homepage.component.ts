import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image:string;
}

@Component({
  selector: 'app-suggested-homepage',
   standalone: false,
  templateUrl: './suggested-homepage.component.html',
  styleUrls: ['./suggested-homepage.component.css']
})
export class SuggestedHomepageComponent {
  tooltipX: number = 0;
  tooltipY: number = 0;
  activeProduct: Product | null = null;

  products: { [key: string]: Product } = {
    'product1': {
      id: 1,
      name: 'Box',
      price: 2500000,
      description: 'Comfortable modern box',
      image: 'asset/suggested-homepage/cus3-box.jpg'
    },
    'product2': {
      id: 2,
      name: 'Table',
      price: 3500000,
      description: 'Elegant table with storage',
      image: 'asset/suggested-homepage/cus3-table.jpg'
    },
    'product3': {
      id: 3,
      name: 'Bottle',
      price: 1800000,
      description: 'Beautiful bottle with a unique design',
      image: 'asset/suggested-homepage/cus3-bottle.jpg',
    },
    'product4': {
      id: 4,
      name: 'Glass',
      price: 850000,
      description: 'Elegant glass with modern design',
      image: 'asset/suggested-homepage/cus5-glass.png'
    },
    'product5': {
      id: 5,
      name: 'Plate',
      price: 950000,
      description: 'Beautiful ceramic plate',
      image: 'asset/suggested-homepage/cus5-plate.png'
    },
    'product6': {
      id: 6,
      name: 'Decorative Pillow',
      price: 450000,
      description: 'Soft and stylish decorative pillow',
      image: 'asset/suggested-homepage/cus4-pillow.jpg'
    },
    'product7': {
      id: 7,
      name: 'Cozy Blanket',
      price: 750000,
      description: 'Warm and comfortable blanket',
      image: 'asset/suggested-homepage/cus4-blanket.jpg'
    },
    'product8': {
      id: 8,
      name: 'Modern Cabinet',
      price: 3200000,
      description: 'Contemporary storage cabinet',
      image: 'asset/suggested-homepage/cus4-cabinet.jpg'
    }
  };

  showTooltip(event: MouseEvent, productId: string) {
    this.activeProduct = this.products[productId];
    this.tooltipX = event.pageX + 10;
    this.tooltipY = event.pageY + 10;
  }

  hideTooltip() {
    this.activeProduct = null;
  }
}