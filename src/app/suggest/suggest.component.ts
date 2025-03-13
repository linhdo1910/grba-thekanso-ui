import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggest',

  imports: [CommonModule], // Thêm CommonModule để dùng *ngIf
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent {
  imageUrl: string = 'asset/suggestdemo.svg'; // Ảnh nền của phòng
  length: number = 10.00;
  width: number = 7.32;

  // Danh sách nội thất lấy từ TypeScript thay vì viết trực tiếp trong HTML
  furnitureList = [
    
    { name: 'Sofa', imageUrl: 'asset/sofa-01.svg' },
    { name: 'Sofa', imageUrl: 'asset/sofa-02.svg' },
    { name: 'Bench', imageUrl: 'asset/sofa-03.svg' },
    { name: 'Table', imageUrl: 'asset/sofa-04.svg' }
  ];

  placedFurniture: any[] = []; // Danh sách các đồ nội thất đã được kéo vào phòng
  selectedObject: any = null;  // Đối tượng đang được điều chỉnh
  offsetX: number = 0;
  offsetY: number = 0;

  // Khi bắt đầu kéo một đồ nội thất
  onDragStart(event: DragEvent, item: any) {
    event.dataTransfer?.setData('item', JSON.stringify(item));
  }

  // Cho phép thả vào khu vực phòng
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Khi thả một đồ nội thất vào phòng
  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('item');
    if (data) {
      const item = JSON.parse(data);
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      this.placedFurniture.push({
        ...item,
        x: event.clientX - rect.left - 25, // Định vị trong phòng
        y: event.clientY - rect.top - 25,
        scale: 1.0 // Mặc định không phóng to/thu nhỏ
      });
    }
  }

  // Khi bắt đầu kéo để di chuyển hoặc điều chỉnh kích thước
  startDragging(event: MouseEvent, obj: any) {
    this.selectedObject = obj;
    this.offsetX = event.clientX - obj.x;
    this.offsetY = event.clientY - obj.y;

    document.addEventListener('mousemove', this.onDragging);
    document.addEventListener('mouseup', this.stopDragging);
  }

  // Xử lý kéo thả di chuyển đối tượng
  onDragging = (event: MouseEvent) => {
    if (this.selectedObject) {
      this.selectedObject.x = event.clientX - this.offsetX;
      this.selectedObject.y = event.clientY - this.offsetY;
    }
  };

  // Khi người dùng thả chuột ra
  stopDragging = () => {
    this.selectedObject = null;
    document.removeEventListener('mousemove', this.onDragging);
    document.removeEventListener('mouseup', this.stopDragging);
  };
  tooltipText: string = '';
  tooltipVisible: boolean = false;
  tooltipX: number = 0;
  tooltipY: number = 0;



  showTooltip(event: MouseEvent, text: string) {
    this.tooltipText = text;
    this.tooltipX = event.pageX + 10;
    this.tooltipY = event.pageY - 20;
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }
}

