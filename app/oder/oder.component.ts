import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
}

@Component({
  selector: 'app-oder',
  standalone: true,
  templateUrl: './oder.component.html',
  styleUrls: ['./oder.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class OderComponent {
  constructor(private router: Router) {}
  // Điều hướng tới các trang khác
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  orders: Order[] = [];
  displayedOrders: Order[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];

  ngOnInit() {
    this.generateSampleOrders(25); // Tạo mẫu 25 đơn hàng
    this.updatePagination();
  }

  generateSampleOrders(count: number) {
    for (let i = 1; i <= count; i++) {
      this.orders.push({
        id: `#${3535 + i}`,
        date: '5 Mar, 2021',
        total: '$560.00 (2 Products)',
        status: i % 4 === 0 ? 'Processing' : (i % 3 === 0 ? 'On the way' : 'Completed')
      });
    }
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedOrders = this.orders.slice(startIndex, startIndex + this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  viewDetails(orderId: string) {
    console.log('View details for order:', orderId);
    // Điều hướng tới trang chi tiết đơn hàng, ví dụ sử dụng Angular Router
    // this.router.navigate(['/order-details', orderId]);
  }
}