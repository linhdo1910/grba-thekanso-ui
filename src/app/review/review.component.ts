import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { ReviewService, Review, ReviewResponse } from '../reviews.service';
import { Order } from '../interface/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  orderId: string = '';
  order: Order | null = null;
  rating: number = 5;
  comment: string = '';
  productId: string = '';
  username: string = 'Anonymous';
  showSuccessMessage: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {
    this.username = this.authService.getUsername()|| '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      console.log('OrderId from URL:', this.orderId);
      if (this.orderId) {
        this.loadOrder();
      } else {
        this.errorMessage = 'Order ID is missing';
      }
    });
  }

  loadOrder(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    console.log('Loading order with ID:', this.orderId);
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (data: Order) => {
        console.log('Order data received:', data);
        this.order = data;
        if (this.order && this.order.products && this.order.products.length > 0) {
          this.productId = this.order.products[0].productId;
          console.log('Product ID set:', this.productId);
        } else {
          this.errorMessage = 'No product found in this order';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading order:', error);
        this.errorMessage = 'Failed to load order details. Please try again.';
        this.isLoading = false;
      }
    });
  }

  submitReview(): void {
    if (!this.orderId) {
      this.errorMessage = 'Order ID is missing';
      return;
    }

    if (!this.productId) {
      this.errorMessage = 'Product ID is missing';
      return;
    }

    if (!this.comment || !this.comment.trim()) {
      this.errorMessage = 'Please enter your review comment';
      return;
    }

    if (this.rating < 1 || this.rating > 5) {
      this.errorMessage = 'Rating must be between 1 and 5';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const review: Review = {
      orderId: this.orderId,
      productId: this.productId,
      rating: this.rating,
      reviewText: this.comment.trim(),
      username: this.username,
      date: new Date()
    };

    console.log('Submitting review:', review);

this.reviewService.createReview(review).subscribe({
  next: (response: ReviewResponse) => {
    if (response.success) {
      this.showSuccessMessage = true;
      this.router.navigate(['/homepage']).then(success => {
        console.log('Navigation result:', success);
      });
    } else {
      this.errorMessage = response.message || 'Failed to submit review';
    }
    this.isLoading = false;
  },
  error: (error) => {
    console.error('Error submitting review:', error);
    this.errorMessage = 'Failed to submit review. Please try again.';
    this.isLoading = false;
  }
});
  }

  closeModal(): void {
    this.showSuccessMessage = false;
  }
}
