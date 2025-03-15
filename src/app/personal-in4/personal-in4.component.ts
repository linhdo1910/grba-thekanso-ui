import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-personal-in4',

  templateUrl: './personal-in4.component.html',
  styleUrls: ['./personal-in4.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class PersonalIn4Component {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  profileImage: string = 'https://via.placeholder.com/100';

  constructor(private router: Router) {}

  // Điều hướng tới các trang khác
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Lưu thông tin người dùng
  saveChanges() {
    console.log('Thông tin đã được lưu:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber
    });
    alert('Thông tin đã được lưu!');
  }

  // Xóa toàn bộ thông tin người dùng
  clearAll() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
    this.profileImage = 'https://via.placeholder.com/100';
  }

  // Thay đổi hình ảnh đại diện
  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.profileImage = e.target.result as string;
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Mở hộp thoại chọn hình ảnh
  triggerImageInput(event: Event) {
    event.preventDefault();
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput?.click();
  }
}
