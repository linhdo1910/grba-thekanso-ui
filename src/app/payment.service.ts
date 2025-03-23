import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './interface/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:4002/api/orders'; 

  constructor(private http: HttpClient) {}

  createOrder(order: Order, headers: HttpHeaders): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order, { headers });
  }
}
