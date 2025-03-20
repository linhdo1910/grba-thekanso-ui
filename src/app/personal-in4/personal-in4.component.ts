import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-in4',
  standalone:false,
  templateUrl: './personal-in4.component.html',
  styleUrls: ['./personal-in4.component.css']
})
export class PersonalIn4Component {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  profileImage: string = '';

  personalInfo = {
    firstName: 'An',
    lastName: 'Pham',
    email: 'anptt22411ca@st.uel.edu.vn',
    phoneNumber: '0913854054',
    imageUrl: 'asset/banners/anp.png'
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
    alert('Information has been saved!');
  }

  // Clear all user information
  clearAll() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
    this.profileImage = 'https://via.placeholder.com/100';
  }

  // Handle image changes
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

  // Trigger the file input for image selection
  triggerImageInput() {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }
}
