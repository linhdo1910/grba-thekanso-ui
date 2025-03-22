import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Product } from '../interface/product';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-products',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productsPages: Product[][][] = [];
  paginatedProducts: Product[][] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20; 
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  category: string = 'All Products';

  // Các biến filter options
  categories: string[] = [];       
  subCategories: string[] = [];    
  colors: string[] = [];
  sizes: string[] = [];

  // Các filter được chọn
  selectedCategory: string = '';      
  selectedSubCategory: string = '';  
  selectedColor: string = '';
  selectedSize: string = '';
  sort: string = '';
  priceOrder: string = '';
  keyword: string = ''; 

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute,private cartService: CartService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const kw = params.get('keyword');
      if (kw) {
        this.keyword = kw;
      }
      this.loadProducts();
    });
  }

  loadProducts(): void {
    let filters: any = {};

    if (this.sort) {
      filters.sort = this.sort === 'newest' ? 'New' : (this.sort === 'popular' ? 'Popular' : '');
    }

    // Lọc theo productSubCategory 
    if (this.selectedSubCategory) {
      filters.productSubCategory = this.selectedSubCategory;
    }
    if (this.selectedSize) {
      filters.size = this.selectedSize;
    }
    if (this.selectedColor) {
      filters.color = this.selectedColor;
    }
    if (this.priceOrder) {
      filters.priceOrder = this.priceOrder;
    }
    if (this.keyword) {
      filters.keyword = this.keyword;
    }

    this.productService.getAllProducts(filters).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.extractFilterOptions();
        this.paginateProducts(this.itemsPerPage);
        this.setupPagination();
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }
  onAddToCart(product: Product, selectedSize: string = product.size, selectedColor: string = ''): void {
    this.cartService.addToCart(product, selectedSize, selectedColor);
  }
  extractFilterOptions(): void {
    const categorySet = new Set<string>();
    const subCategorySet = new Set<string>();
    const colorSet = new Set<string>();
    const sizeSet = new Set<string>();

    this.products.forEach(product => {
      if (product.productCategory) {
        categorySet.add(product.productCategory);
      }
      if (product.productSubCategory) {
        subCategorySet.add(product.productSubCategory);
      }
      if (product.color) {
        product.color.split(',').forEach(c => colorSet.add(c.trim()));
      }
      if (product.size) {
        sizeSet.add(product.size);
      }
    });

    this.categories = Array.from(categorySet);
    this.subCategories = Array.from(subCategorySet);
    this.colors = Array.from(colorSet);
    this.sizes = Array.from(sizeSet);
  }

  private paginateProducts(chunkSize: number): void {
    this.productsPages = [];
    if (!this.products || this.products.length === 0 || chunkSize <= 0) {
      return;
    }
    for (let i = 0; i < this.products.length; i += chunkSize) {
      const page = this.products.slice(i, i + chunkSize);
      const rows: Product[][] = [];
      const rowSize = 4;
      for (let j = 0; j < page.length; j += rowSize) {
        rows.push(page.slice(j, j + rowSize));
      }
      this.productsPages.push(rows);
    }
  }

  private setupPagination(): void {
    this.totalPages = this.productsPages.length;
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePagination();
  }

  private updatePagination(): void {
    this.paginatedProducts = this.productsPages[this.currentPage - 1] || [];
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

  navigateToProductDetail(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }
}
