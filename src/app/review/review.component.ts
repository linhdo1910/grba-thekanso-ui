import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone:true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  reviewText: string = '';
  rating: number = 0;             // Số sao đã chọn
  hoverRating: number = 0;         // Số sao khi hover
  selectedFile: File | null = null;
  stars: number[] = [1, 2, 3, 4, 5];
  showSuccessMessage: boolean = false;

  constructor(private router: Router) {}

  updateStars() {
    if (this.rating < 1) {
        this.rating = 1;
    } else if (this.rating > 5) {
        this.rating = 5;
    }
  }

  // Xử lý khi chọn file ảnh
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', file.name);
    }
  }

  // Gửi đánh giá
  submitReview(): void {
    console.log('Review submitted:');
    console.log('Text:', this.reviewText);
    console.log('Rating:', this.rating);
    if (this.selectedFile) {
      console.log('Image:', this.selectedFile.name);
    }

    // Hiển thị thông báo thành công
    this.showSuccessMessage = true;
    this.clearForm();
  }
  

  // Đóng cửa sổ thông báo
  closeModal(): void {
    this.showSuccessMessage = false;
  }

  // Hủy đánh giá và chuyển sang trang khác
  cancelReview(): void {
    console.log('Review cancelled');
    this.clearForm();
    this.router.navigate(['/home']); // Điều hướng về trang chủ hoặc trang khác (đường dẫn /home là ví dụ)
  }

  // Xóa dữ liệu form
  private clearForm(): void {
    this.reviewText = '';
    this.rating = 0;
    this.hoverRating = 0;
    this.selectedFile = null;
  }
}


