import { Injectable } from "@angular/core";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string[];
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
      image: [
              'asset/products/nissin/zaisu-t01.jpg',
              'asset/products/nissin/zaisu-d01.jpg', 
              'asset/products/nissin/zaisu-d02.jpg', 
              'asset/products/nissin/zaisu-d03.jpg',
              'asset/products/nissin/zaisu-d06.jpg',
              'asset/products/nissin/zaisu-d07.jpg',
              'asset/products/nissin/zaisu-d11.jpg',
              'asset/products/nissin/zaisu-d12.jpg',
              'asset/products/nissin/zaisu-m02.jpg',
              'asset/products/nissin/zaisu-m03.jpg',
              'asset/products/nissin/zaisu-m04.jpg',
              'asset/products/nissin/zaisu-m05.jpg',
            ],
      rating: 4.5,
      reviews: 120,
      colors: ['Oak','Walnut', 'Ash', 'White'],
      sizes: 'Small',
      discount: 20,
    },
    {
      id: 2,
      name: 'Sofa living room style Japan',
      price: 1000000,
      image: ['asset/sofa-02.svg','asset/sofa-02.svg'],
      rating: 4.5,
      reviews: 120,
      colors: ['Walnut', 'Ash'],
      sizes: 'Large',
      discount: 0,
    },
    {
      id: 3,
      name: 'Sofa living room style Japan',
      price: 990,
      image: ['asset/sofa-03.svg','asset/sofa-04.svg'],
      rating: 4.5,
      reviews: 120,
      colors: ['Bashwood', 'Cedar', 'Mable'],
      sizes: 'Small',
      discount: 20,
    },
  ];

  constructor() { }

  getAllProducts(): Product[] {
    return this.products;
  }

  getImage(image: string): string | undefined {
    for (const product of this.products) {
      const sideImage = product.image.find(img => img === image);
      if (sideImage) {
        return sideImage;
      }
    }
    return undefined;
  }
  
  getAllImages(): string[] {
    return this.products.flatMap(product => product.image);
  }
  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
  private colorImages: ColorImageMapping[] = [
    { colorName: 'Ash', imageUrl: 'asset/colors/ash.jpg' },
    { colorName: 'Bashwood', imageUrl: 'asset/colors/bashwood.jpg' },
    { colorName: 'Cedar', imageUrl: 'asset/colors/cedar.jpg' },
    { colorName: 'Mable', imageUrl: 'asset/colors/mable-oil.jpg' },
    { colorName: 'Oak', imageUrl: 'asset/colors/oak.jpg' },
    { colorName: 'Walnut', imageUrl: 'asset/colors/walnut.jpg' },
    { colorName: 'White', imageUrl: 'asset/colors/white.png' },
  ];
  getImageUrlByColor(colorName: string): string | undefined {
    const color = this.colorImages.find(c => c.colorName === colorName);
    return color ? color.imageUrl : undefined;
  }
}
