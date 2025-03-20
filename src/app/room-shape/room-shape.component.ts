import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-shape',

  imports: [CommonModule], // Đảm bảo CommonModule được import trực tiếp
  templateUrl: './room-shape.component.html',
  styleUrls: ['./room-shape.component.css']
})
export class RoomShapeComponent {
  roomShapes = [
    { id: 1, name: 'Room 01', src: 'asset/room-shape/room1.png' },
    { id: 2, name: 'Room 02', src: 'asset/room-shape/room2.png' },
    { id: 3, name: 'Room 03', src: 'asset/room-shape/room3.png' },
    { id: 4, name: 'Room 04', src: 'asset/room-shape/room4.png' }
  ];

  constructor(private router: Router) {}

  selectedShape: any = null;

  // Hàm chọn hình ảnh khi click
  selectShape(shape: any) {
    this.selectedShape = shape;
  }

  // Hàm xử lý khi bấm nút NEXT
  nextPage() {
    console.log('Next page triggered');
    this.router.navigate(['/room-dimension']); 
  }
  
}


