import { Injectable } from "@angular/core";

export interface Product {
  id: number;
  name: string;
  price: number;
  mainImage: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string,
  discount: number;
}

export interface ColorImageMapping {
  colorName: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Sofa living room style Japan',
      price: 5000000,
      mainImage: 'asset/products/main/sofa1.jpg',
      rating: 4.5,
      reviews: 120,
      colors: ['Oak'],
      sizes: 'Small',
      discount: 20,
    },
    {
      id: 2,
      name: 'Sofa living room style Japan',
      price: 1000000,
      mainImage: 'asset/products/main/sofa1.jpg',
      rating: 4.5,
      reviews: 120,
      colors: ['Walnut', 'Ash'],
      sizes: 'Large',
      discount: 20,
    },
    {
      id: 3,
      name: 'Sofa living room style Japan',
      price: 990,
      mainImage: 'asset/products/main/sofa1.jpg',
      rating: 4.5,
      reviews: 120,
      colors: ['Bashwood', 'Cedar', 'Mable'],
      sizes: 'Small',
      discount: 20,
    },
  ];

  private colorImages: ColorImageMapping[] = [
    { colorName: 'Ash', imageUrl: 'asset/colors/ash.jpg' },
    { colorName: 'Bashwood', imageUrl: 'asset/colors/bashwood.jpg' },
    { colorName: 'Cedar', imageUrl: 'asset/colors/cedar.jpg' },
    { colorName: 'Mable', imageUrl: 'asset/colors/mable-oil.jpg' },
    { colorName: 'Oak', imageUrl: 'asset/colors/oak.jpg' },
    { colorName: 'Walnut', imageUrl: 'asset/colors/walnut.jpg' },
    { colorName: 'White', imageUrl: 'asset/colors/white.jpg' },
  ];

  constructor() { }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getImageUrlByColor(colorName: string): string | undefined {
    const color = this.colorImages.find(c => c.colorName === colorName);
    return color ? color.imageUrl : undefined;
  }
}
