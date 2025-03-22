import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: false,
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  // Biến để hiển thị Order ID
  orderId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.orderId = params.get('orderId'); 
    });
    
  }

  // VIEW YOUR ORDER
  viewOrder(): void {
    if (this.orderId) {
      this.router.navigate(['/order'], { queryParams: { orderId: this.orderId } });
    } else {
      this.router.navigate(['/order']);
    }
  }
}
