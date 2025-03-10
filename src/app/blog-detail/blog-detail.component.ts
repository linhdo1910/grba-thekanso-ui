import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-detail',
  standalone: false,
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
  categories = ['People', 'Tips', 'Inspiration'];
  blog = {
    image: 'asset/test2.png',
    title: 'Going all-in with millennial design',
    category: this.categories[1], 
    content1: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus.`,
    content2: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit cursus risus at ultrices mi tempus imperdiet.
                Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh lorem ipsum dolor sit amet.`,
    gallery: [
      'asset/test.png',
      'asset/test.png',
      'asset/test.png'
    ],
    content3: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    content4: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    content5: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  };
}
