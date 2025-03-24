import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-in4',
  standalone: false,
  templateUrl: './personal-in4.component.html',
  styleUrls: ['./personal-in4.component.css']
})
export class PersonalIn4Component {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  profileImage: string = 'asset/banners/anp.png';

  personalInfo = {
    firstName: 'Linh',
    lastName: 'Do',
    email: 'linhdk22411ca@st.uel.edu.vn',
    phoneNumber: '0913854054',
    imageUrl: 'asset/banners/linh.jpg'  
  };

  constructor(private router: Router) {}

  // Navigate to other pages
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Save user information
  saveChanges() {
    console.log('Information saved:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber
    });

    // Hiển thị thông báo sau khi lưu
    alert('Information has been saved!');
  }

  // Clear all user information
  clearAll() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';

    // Hiển thị thông báo khi thông tin được xóa
    alert('All information has been cleared!');
  }
}
