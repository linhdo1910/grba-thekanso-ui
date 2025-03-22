import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginResponse {
  token?: string;
  userId?: string;
  role?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4002/api/auth';

  //Lưu trạng thái đăng nhập của người dùng
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Kiểm tra nếu đã có token trong localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Đăng ký người dùng mới
  signup(credentials: LoginResponse): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, credentials);
  }

  // Đăng nhập
  login(credentials: LoginResponse): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Lưu token vào localStorage
        localStorage.setItem('token', response.token);
        this.authStatusSubject.next(true);
      })
    );
  }

  // Đăng xuất: xóa token
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
  

  // Quên mật khẩu
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
  }

  // Reset mật khẩu: Gửi userId và mật khẩu mới lên backend để cập nhật
  resetPassword(userId: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { userId, password: newPassword });
  }
}
