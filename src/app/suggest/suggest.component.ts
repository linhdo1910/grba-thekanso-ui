import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'; 

@Component({
  selector: 'app-suggest',
  standalone: false,
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {
  imageUrl: string = 'asset/suggestdemo.svg'; 
  length: number = 10.00;
  width: number = 7.32;

  // Danh sách sản phẩm lấy từ backend
  furnitureList: any[] = [];

  placedFurniture: any[] = []; 
  selectedObject: any = null;  
  offsetX: number = 0;
  offsetY: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Lấy danh sách sản phẩm từ backend
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.furnitureList = products.map(product => ({
          _id: product._id,
          productName: product.productName, 
          coverImage: product.coverImage,   
          imageUrl: product.coverImage      
        }));
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

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
