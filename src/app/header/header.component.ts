import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchKeyword: string = '';

  constructor(private router: Router) {}

  onSearch(): void {
    if(this.searchKeyword.trim()) {
      this.router.navigate(['/products'], { queryParams: { keyword: this.searchKeyword.trim() } });
    }
  }
}
