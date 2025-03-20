import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-shape',
  standalone:false, 
  templateUrl: './room-shape.component.html',
  styleUrls: ['./room-shape.component.css']
})
export class RoomShapeComponent {
  roomShapes = [
    { id: 1, name: 'Room 01', src: 'asset/room-shape/HCN 3.svg' },
    { id: 2, name: 'Room 02', src: 'asset/room-shape/HCN 1.svg' },
    { id: 3, name: 'Room 03', src: 'asset/room-shape/HCN 2@3x.svg' },
    { id: 4, name: 'Room 04', src: 'asset/room-shape/Rectangle 17527 (1).svg' }
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


