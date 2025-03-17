import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true,
  imports: [CommonModule] // Thêm CommonModule để sử dụng *ngFor và *ngIf
})
export class OrderComponent {
  orders: Order[] = [
    { id: '001', date: '2024-10-01', total: '$150.00', status: 'Shipped' },
    { id: '002', date: '2024-10-05', total: '$200.00', status: 'Processing' },
    { id: '003', date: '2024-10-10', total: '$250.00', status: 'Delivered' }
  ];

  displayedOrders: Order[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private router: Router) {
    this.updateDisplayedOrders();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  updateDisplayedOrders() {
    this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedOrders = this.orders.slice(startIndex, endIndex);
  }

  viewDetails(orderId: string) {
    alert(`View details for order ${orderId}`);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedOrders();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedOrders();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedOrders();
  }
}
