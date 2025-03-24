
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, DiscountCode } from '../app/interface/product'; 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:4002/api';

  constructor(private http: HttpClient) {}

  // Lấy danh sách sản phẩm với filter (query parameters)
  getAllProducts(filters?: any): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/products`, { params: filters }).pipe(
      map(res => res.data)
    );
  }

  // Lấy sản phẩm theo _id 
  getProductById(productId: string): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/products/${productId}`).pipe(
      map(res => res.data)
    );
  }
  

  // Lấy danh sách mã giảm giá
  getDiscountCodes(): Observable<DiscountCode[]> {
    return this.http.get<any>(`${this.apiUrl}/discount-codes`).pipe(
      map(res => res.data)
    );
  }
  getProductsByIds(productIds: string[]): Observable<Product[]> {
    return this.http.post<any>(`${this.apiUrl}/products/multiple`, { productIds }).pipe(
      map(res => res.data)
    );
  }
  // Áp dụng mã giảm giá cho sản phẩm cụ thể
  applyDiscountCode(code: string, total: number): Observable<number> {
    return this.http.post<any>(`${this.apiUrl}/apply-discount`, { code, total }).pipe(
      map(res => res.data)
    );
  }
  
  // Thêm sản phẩm vào giỏ hàng
  addToCart(productId: string, selectedColor: string, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cart`, { productId, selectedColor, quantity });
  }
  
  // Lấy sản phẩm theo sort (ví dụ: "New", "Popular")
  getProductsBySort(sort: string): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/products`, { params: { sort } }).pipe(
      map(res => res.data)
    );
  }

  // Lấy sản phẩm theo productSubCategory
  getProductsBySubCategory(subCategory: string): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/products/bySubCategory`, { params: { productSubCategory: subCategory } }).pipe(
      map(res => res.data)
    );
  }
  getFilterOptions(): Observable<{ categories: string[], colors: string[], sizes: string[] }> {
    return this.http.get<any>(`${this.apiUrl}/products/filters`).pipe(
      map(res => res.data)
    );
  }
  
}
