import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'; // Chỉ giữ HttpClient
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './interface/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:4002/api/orders';

  constructor(private http: HttpClient) {}

  // Tạo options với token trực tiếp
  private getAuthOptions() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage or sessionStorage');
      throw new Error('No token found. Please log in.');
    }
    console.log('Token retrieved for request:', token); // Debug
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  }
  // Lấy danh sách đơn hàng từ API
  getOrders(): Observable<Order[]> {
    return this.http.get<{ data: Order[] }>(this.apiUrl, this.getAuthOptions()).pipe(
      map(response => response.data)
    );
  }

  // Lấy đơn hàng theo ID từ API
  getOrderById(_id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${_id}`, this.getAuthOptions());
  }

  // Tạo đơn hàng mới qua API
  createOrder(order: Order): Observable<Order> {
    return this.http.post<{ data: Order }>(this.apiUrl, order, this.getAuthOptions()).pipe(
      map(response => response.data)
    );
  }

  cancelOrder(orderId: string): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${orderId}/cancel`, {}, { headers });
  }
  

  // Viết review cho đơn hàng
  writeReview(orderId: string, reviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/review`, reviewData, this.getAuthOptions());
  }

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus(orderId: string, updateData: any): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, updateData, this.getAuthOptions());
  }
}