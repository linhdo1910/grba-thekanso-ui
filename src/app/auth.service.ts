import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { LoginResponse, User, SignUpResponse, ForgotPasswordResponse,  ResetPasswordResponse } from './interface/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:4002/api';
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  private logoutEvent = new Subject<void>();
  logoutEvent$ = this.logoutEvent.asObservable();

  constructor(
    private http: HttpClient,
    private injector: Injector,
    private router: Router
  ) {
    this.initializeLoginStatus();
  }

  private initializeLoginStatus(): void {
    const token = this.getToken();
    if (token) {
      this.loggedIn.next(true);
      console.log('User is already logged in');
    } else {
      console.log('No valid session found. User must log in.');
      this.loggedIn.next(false);
    }
  }
  
  private storeSessionData(response: LoginResponse, rememberMe: boolean): void {
    if (!response || !response.userId) {
      console.warn('Invalid login response: Missing userId.');
      return;
    }
  
    if (!response.token) {
      console.warn('Warning: No token received. User might not be authenticated.');
      return;
    }
  
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('isLoggedIn', 'true');
    storage.setItem('userId', response.userId);
    storage.setItem('role', response.role);
    storage.setItem('action', response.action ?? 'just view');
    storage.setItem('token', response.token);
  
    // Kiểm tra ngay sau khi lưu
    const storedToken = storage.getItem('token');
    console.log('Session data stored. Stored token:', storedToken);
    if (storedToken !== response.token) {
      console.error('Token stored does not match response token!');
    }
  }
  
  private clearSessionData(): void {
    ['isLoggedIn', 'userId', 'profileName', 'role', 'action', 'token'].forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }

  login(email: string, password: string, rememberMe: boolean): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      tap(response => {
        console.log('Login API response:', response);
        if (!response || !response.userId || !response.token) {
          throw new Error('Invalid login response: Missing required fields');
        }
        this.storeSessionData(response, rememberMe);
        this.loggedIn.next(true);
        console.log('Logged in status updated to true');
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error?.error?.message || 'Login failed'));
      })
    );
  }
  
  signUp(name: string, email: string, password: string, phoneNumber?: string, address?: string, profilePicture?: string, role: 'user' | 'admin' = 'user'): Observable<SignUpResponse> {
    const body = { name, email, password, phoneNumber, address, profilePicture, role };
    return this.http.post<SignUpResponse>(`${this.baseUrl}/auth/signup`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      tap(response => {
        console.log('Sign-up API response:', response);
        if (!response || !response.userId) {
          throw new Error('Invalid sign-up response: Missing userId');
        }
      }),
      catchError((error) => {
        console.error('Sign-up error:', error);
        return throwError(() => new Error(error?.error?.message || 'Sign-up failed'));
      })
    );
  }

  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    const body = { email };
    return this.http.post<ForgotPasswordResponse>(`${this.baseUrl}/api/users/forgot-password`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      tap(response => console.log('Forgot password API response:', response)),
      catchError(error => {
        console.error('Forgot password API error:', error);
        return throwError(() => new Error(error?.error?.message || 'Failed to send reset password request'));
      })
    );
  }
  
  logout(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.baseUrl}/users/logout`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      tap(() => {
        this.clearSessionData();
        this.loggedIn.next(false);
        this.logoutEvent.next();
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        return throwError(() => new Error(error.error?.message || 'Logout failed'));
      })
    );
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const isLoggedIn = !!token;
    this.loggedIn.next(isLoggedIn); // Đồng bộ BehaviorSubject
    console.log('Checking isLoggedIn. Token:', token, 'LoggedIn value:', isLoggedIn);
    return isLoggedIn;
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role') || sessionStorage.getItem('role');
    console.log('Checking isAdmin. Role:', role);
    return role === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId') || sessionStorage.getItem('userId');
  }

  getUserProfile(): Observable<User | null> {
    const token = this.getToken();
    console.log('Fetching user profile with token:', token);
    return this.http.get<User>(`${this.baseUrl}/users/profile`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(
      tap(user => {
        console.log('User profile fetched:', user);
        localStorage.setItem("profileName", user.name);
        localStorage.setItem("action", user.action ?? 'just view');
      }),
      catchError((error) => {
        console.error('Error fetching user profile:', error);
        return throwError(() => new Error(error.error.message || 'Failed to get user profile'));
      })
    );
  }

  resetPassword(userId: string, password: string): Observable<ResetPasswordResponse> {
    const body = { userId, password };
    console.log('Sending reset password request:', body);
    return this.http.post<ResetPasswordResponse>(`${this.baseUrl}/api/users/reset-password`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      tap(response => console.log('Reset password API response:', response)),
      catchError(error => {
        console.error('Reset password API error:', error);
        return throwError(() => new Error(error?.error?.message || 'Failed to reset password'));
      })
    );
  }

  getAction(): string | null {
    return localStorage.getItem('action') || sessionStorage.getItem('action');
  }

 //Thêm hàm username
  getUsername(): string | null {
    return localStorage.getItem('profileName') || sessionStorage.getItem('profileName');
  }
}
