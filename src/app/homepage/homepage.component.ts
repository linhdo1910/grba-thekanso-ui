import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  newProducts: Product[] = [
    { id: 1, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.5, reviews: 120 },
    { id: 2, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.2, reviews: 90 },
    { id: 3, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.3, reviews: 85 },
    { id: 4, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.6, reviews: 105 }
  ];

  bestSellerProducts: Product[] = [
    { id: 5, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.4, reviews: 110 },
    { id: 6, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.1, reviews: 95 },
    { id: 7, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.2, reviews: 100 },
    { id: 8, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.7, reviews: 130 },
    { id: 9, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.5, reviews: 80 },
    { id: 10, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.3, reviews: 75 },
    { id: 11, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.5, reviews: 80 },
    { id: 12, name: 'Sofa living room style Japan', price: 5000000, image: 'asset/test3.png', rating: 4.3, reviews: 75 }
  ];

  reviews: Review[] = [
    {
      id: 1,
      name: "Mia Le",
      avatar: "asset/review-homepage/cus1.jpg",
      rating: 5,
      comment: "Amazing furniture! The quality exceeded my expectations. Highly recommended! Will definitely buy again.",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "asset/review-homepage/cus2.jpg",
      rating: 4.5,
      comment: "Great service and beautiful pieces. Will definitely shop here again. Highly recommend!",
    },
    {
      id: 3,
      name: "Tyna Mike",
      avatar: "asset/review-homepage/cus3.jpg",
      rating: 5,
      comment: "The furniture is stunning and the delivery was quick. Very satisfied! Staff are very friendly and helpful.",
    },
    {
      id: 4,
      name: "Tom Wilson",
      avatar: "asset/review-homepage/cus4.jpg",
      rating: 5,
      comment: "Excellent quality and customer service. Love my new furniture! Website is easy to navigate.",
    },
    {
      id: 5,
      name: "David Brown",
      avatar: "asset/review-homepage/cus5.jpg",
      rating: 4,
      comment: "Beautiful designs and great prices. Would recommend to everyone. Ship fast and good quality.",
    }
  ];

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private timerInterval: any;

  constructor(private router: Router) {  
    this.startCountdown(new Date('2025-03-31'));
  }

  ngOnInit(): void {
    const targetDate = new Date('2025-03-31');
    this.startCountdown(targetDate);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  navigateToProductDetail(productId: number): void {
    this.router.navigate(['/product-details', productId]);
  }

  private startCountdown(targetDate: Date): void {
    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.timerInterval);
        this.days = this.hours = this.minutes = this.seconds = 0;
      }
    }, 1000);
  }
  
}