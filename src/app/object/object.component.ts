import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';  
import { Product } from '../interface/product';

@Component({
  selector: 'app-object',
  standalone: false, 
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css'],
})
export class ObjectComponent implements OnInit {
  imageUrl: string = 'asset/room-shape/room4.png'; 
  length: number = 10.00;
  width: number = 7.32;

  // Danh sách nội thất lấy từ backend
  furnitureList: Product[] = [];
  subcategories: string[] = ['All Categories', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom'];
  selectedSubcategory: string = 'All Categories';

  placedFurniture: any[] = []; 
  selectedObject: any = null;  
  offsetX: number = 0;
  offsetY: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Lấy danh sách sản phẩm từ backend
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.furnitureList = products;
        // Lấy danh sách subcategories duy nhất từ sản phẩm và sắp xếp theo thứ tự alphabet
        const uniqueSubcategories = [...new Set(products.map(p => p.productSubCategory))].sort();
        this.subcategories = ['All Categories', ...uniqueSubcategories];
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  // Tìm kiếm sản phẩm
  searchProducts(query: string) {
    if (!query) {
      this.filterBySubcategory(this.selectedSubcategory);
      return;
    }
    this.furnitureList = this.furnitureList.filter(item => 
      item.productName.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Lọc theo danh mục con
  filterBySubcategory(category: string) {
    this.selectedSubcategory = category;
    if (category === 'All Categories') {
      this.ngOnInit();
      return;
    }
    this.furnitureList = this.furnitureList.filter(item => 
      item.productSubCategory === category
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
}
