import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  standalone: false,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  selectedCategory: string = '';

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
      title: 'Top 5 Interior Design Tips',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
      date: '10 Oct 2022',
      category: 'Tips'
    },
    {
      img: 'asset/test.png',
      title: 'Inspiration Corner: Minimalist Spaces',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
      date: '5 Oct 2022',
      category: 'Inspiration'
    },
    {
      img: 'asset/test.png',
      title: 'Personal Stories: Home Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
      date: '1 Oct 2022',
      category: 'People'
    }
  ];

  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }

  filteredBlogs() {
    return this.selectedCategory
      ? this.blogs.filter(blog => blog.category === this.selectedCategory)
      : this.blogs;
  }
}
