import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../interface/order';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  // Thêm các thuộc tính cần thiết cho điều hướng giữa các phần
  currentSection: string = 'order-history';
  displayedOrders: Order[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];

  showOrderDetail: boolean = false;
  selectedOrderId: string | null = null;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.displayedOrders = orders;
        this.totalPages = Math.ceil(this.displayedOrders.length / 10);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error => console.error('Error fetching orders', error)
    );
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  showSection(section: string): void {
    this.currentSection = section;
    this.showOrderDetail = false;
  }

  viewDetails(orderId: string): void {
    this.selectedOrderId = orderId;
    this.showOrderDetail = true;
  }

  closeOrderDetail(): void {
    this.showOrderDetail = false;
    this.selectedOrderId = null;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
