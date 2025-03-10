import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-shape',
  standalone: true,
  imports: [CommonModule], // Đảm bảo CommonModule được import trực tiếp
  templateUrl: './room-shape.component.html',
  styleUrls: ['./room-shape.component.css']
})
export class RoomShapeComponent {
  roomShapes = [
    { id: 1, name: 'Square', src: 'assets/room1.png' },
    { id: 2, name: 'L-Shape', src: 'assets/room2.png' },
    { id: 3, name: 'T-Shape', src: 'assets/room3.png' },
    { id: 4, name: 'Polygon', src: 'assets/room4.png' }
  ];

  selectedShape: any = null;

  // Hàm chọn hình ảnh khi click
  selectShape(shape: any) {
    this.selectedShape = shape;
  }

  // Hàm xử lý khi bấm nút NEXT
  nextPage() {
    console.log('Next page triggered');
  }
}


