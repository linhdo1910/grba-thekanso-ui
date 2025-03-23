import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('provinces.open-api.vn')) {
        return next.handle(req);  // Không cần thêm Authorization header
      }
    // Lấy token từ sessionStorage hoặc localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Clone the request and add the authorization header with the token
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Proceed with the cloned request
      return next.handle(clonedRequest);
    }

    return next.handle(req); // If no token, continue without adding header
  }
}
