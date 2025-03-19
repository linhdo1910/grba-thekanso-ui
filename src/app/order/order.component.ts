import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService, Order } from '../order.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  currentSection: string = 'order-history'; 
  displayedOrders: Order[] = []; 
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [1];

  showOrderDetail: boolean = false; 
  selectedOrderId: number | null = null; 

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.displayedOrders = this.orderService.getOrders(); 
    this.totalPages = Math.ceil(this.displayedOrders.length / 10); 
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  showSection(section: string): void {
    this.currentSection = section;
    this.showOrderDetail = false; 
  }

  viewDetails(orderId: number): void {
    this.selectedOrderId = orderId; 
    this.showOrderDetail = true; 
  }

  closeOrderDetail(): void {
    this.showOrderDetail = false; // Hide the Order Detail component
    this.selectedOrderId = 0; // Reset to a valid default number
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
