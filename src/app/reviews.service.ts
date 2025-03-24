import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environment/environment';

export interface Review {
  orderId: string;
  productId: string;
  rating: number;
  reviewText: string;
  username: string;
  date: Date;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data?: Review;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/review/submit`;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error('Error details:', error);
    return throwError(() => new Error(errorMessage));
  }

  createReview(review: Review): Observable<ReviewResponse> {
    console.log('Sending review to:', this.apiUrl);
    console.log('Review data:', review);
    return this.http.post<ReviewResponse>(this.apiUrl, review)
      .pipe(
        catchError(this.handleError)
      );
  }

  getReviewsByProduct(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/product/${productId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getReviewsByOrder(orderId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/order/${orderId}`)
      .pipe(
        catchError(this.handleError)
      );
  }
} 