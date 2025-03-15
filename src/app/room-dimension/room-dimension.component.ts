// room-dimension.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-room-dimension',
  templateUrl: './room-dimension.component.html',
  styleUrls: ['./room-dimension.component.css'],

  imports: [FormsModule] // Thêm FormsModule vào imports
})
export class RoomDimensionComponent {
  length: number = 0;
  width: number = 0;
  height: number = 2.5;
  area: number = 0;

  calculateArea(): void {
    this.area = this.length * this.width;
  }
  imageUrl: string = "asset/room-shape/Rectangle 17527 (1).svg";


  onDimensionChange(): void {
    this.calculateArea();
    const roomShape = document.getElementById('room-shape');
    if (roomShape) {
      roomShape.innerHTML = `
        <div class="dimension-label horizontal">${this.length.toFixed(2)} m</div>
        <div class="dimension-label vertical">${this.width.toFixed(2)} m</div>
      `;
    }
  }
  goToNextPage() {
    // Chuyển hướng đến trang tiếp theo, có thể dùng Angular Router
    console.log("Navigating to the next page with room details...");
  }
}

