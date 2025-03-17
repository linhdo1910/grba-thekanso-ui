import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  discount: number
}

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
    { id: 1, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/products/demo1.jpg', rating: 4.5, reviews: 120, discount:80 },
    { id: 2, name: 'Table living room style Japan', price: 1500000, image: 'asset/products/demo1.jpg', rating: 4.2, reviews: 90, discount:80 },
    { id: 3, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/products/demo1.jpg', rating: 4.3, reviews: 85, discount:27 },
    { id: 4, name: 'Bed living room style Japan', price: 5000000, image: 'asset/products/demo1.jpg', rating: 4.6, reviews: 105, discount:80 },
    { id: 5, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/products/demo1.jpg', rating: 4.4, reviews: 11, discount: 20 },
    { id: 6, name: 'Table living room style Japan', price: 1500000, image: 'asset/products/demo1.jpg', rating: 4.1, reviews: 95, discount:80 },
    { id: 7, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/products/demo1.jpg', rating: 4.2, reviews: 100, discount:88 },
    { id: 8, name: 'Bed living room style Japan', price: 5000000, image: 'asset/products/demo1.jpg', rating: 4.7, reviews: 130, discount:80 },
    { id: 9, name: 'Chair living room style Japan', price: 2000000, image: 'asset/products/demo1.jpg', rating: 4.5, reviews: 80, discount:99 },
    { id: 10, name: 'Cabinet living room style Japan', price: 3000000, image: 'asset/products/demo1.jpg', rating: 4.3, reviews: 75, discount:80 }
  ];

  productsChunked: Product[][] = [];
  paginatedProducts: Product[][] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.chunkProducts(4);
    this.setupPagination();
  }

  private chunkProducts(chunkSize: number): void {
    this.productsChunked = [];
    for (let i = 0; i < this.products.length; i += chunkSize) {
      this.productsChunked.push(this.products.slice(i, i + chunkSize));
    }
  }

  private setupPagination(): void {
    this.totalPages = Math.ceil(this.productsChunked.length / (this.itemsPerPage / 4)); 
    this.totalPagesArray = Array(this.totalPages).fill(0).map((_, i) => i + 1);
    this.updatePagination();
  }

  private updatePagination(): void {
    const startRow = (this.currentPage - 1) * (this.itemsPerPage / 4);
    this.paginatedProducts = this.productsChunked.slice(startRow, startRow + (this.itemsPerPage / 4));
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  navigateToProductDetail(productId: number): void {
    this.router.navigate(['/product-details', productId]);
  }
}
