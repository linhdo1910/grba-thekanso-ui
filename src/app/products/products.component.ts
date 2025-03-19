import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[][] = [];
  currentPage: number = 1;
  itemsPerPage: number = 12; 
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  category: string = 'All Products';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.products = this.productService.getAllProducts();
    this.setupPagination();
  }

  private setupPagination(): void {
    // Calculate total pages
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    // Paginate products for the current page
    this.updatePagination();
  }

  private updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Slice the products for the current page
    const currentPageProducts = this.products.slice(startIndex, endIndex);

    //20/3
    this.paginatedProducts = [];
    for (let i = 0; i < currentPageProducts.length; i += 4) {
      this.paginatedProducts.push(currentPageProducts.slice(i, i + 4));
    }
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
