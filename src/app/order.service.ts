import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './interface/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:4002/api/orders';

  constructor(private http: HttpClient) {}

  // Lấy danh sách đơn hàng từ API
  getOrders(): Observable<Order[]> {
    return this.http.get<{ data: Order[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  // Lấy đơn hàng theo ID từ API
  getOrderById(_id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${_id}`);
  }


  // Tạo đơn hàng mới qua API
  createOrder(order: Order): Observable<Order> {
    return this.http.post<{ data: Order }>(this.apiUrl, order).pipe(
      map(response => response.data)
    );
  }

  // Huỷ đơn hàng qua API (giả sử endpoint này được định nghĩa trên backend)
  cancelOrder(orderId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}/cancel`, {});
  }

  // Viết review cho đơn hàng (nếu backend có endpoint này)
  writeReview(orderId: string, reviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/review`, reviewData);
  }
  //Chuyển qua preprocessing ở status
  updateOrderStatus(orderId: string, updateData: any): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, updateData);
  }
}
