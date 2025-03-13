import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  standalone: false,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  blogs = [
    {
      img: 'asset/test.png',
      title: 'Going all-in with millennial design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
      date: '14 Oct 2022',
      category: 'Wood'
    },
    {
      img: 'asset/test.png',
      title: 'Going all-in with millennial design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
      date: '14 Oct 2022',
      category: 'Wood'
    },
    {
      img: 'asset/test.png',
      title: 'Going all-in with millennial design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
      date: '14 Oct 2022',
      category: 'Wood'
    },
    {
      img: 'asset/test.png',
      title: 'Going all-in with millennial design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
      date: '14 Oct 2022',
      category: 'Wood'
    }
  ];
}
