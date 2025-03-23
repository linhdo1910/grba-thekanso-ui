import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      return true;  // Cho phép truy cập route nếu có token
    } else {
      alert('You must be logged in to access this page.');
      this.router.navigate(['/sign-in']);  // Chuyển hướng đến trang đăng nhập
      return false;  // Không cho phép truy cập route nếu không có token
    }
  }
}
