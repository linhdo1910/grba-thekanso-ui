import { Component } from '@angular/core';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'frontend';
  constructor() {
    this.initializeFormValidation();
  }
//formv alidation
  initializeFormValidation() {
    document.addEventListener('DOMContentLoaded', () => {
      const forms = document.querySelectorAll('.needs-validation');
      
      Array.from(forms).forEach(form => {
        if (form instanceof HTMLFormElement) {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            
            form.classList.add('was-validated');
          }, false);
        }
      });
    });
  }
}
