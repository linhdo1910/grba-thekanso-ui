import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-blog',
  standalone: false,
  templateUrl: './sidebar-blog.component.html',
  styleUrls: ['./sidebar-blog.component.css']
})
export class SidebarBlogComponent {
  categories = ['People', 'Tips', 'Inspiration'];

  @Output() categorySelected = new EventEmitter<string>();
  @Output() recentPostSelected = new EventEmitter<string>(); // 👈 Add this!

  selectedCategory: string = '';

  recentPosts = [
    { title: 'Going all-in with millennial design', date: '03 Aug 2022', img: 'asset/sofa-01.svg' },
    { title: 'Exploring new ways of decorating', date: '03 Aug 2022', img: 'asset/sofa-02.svg' },
    { title: 'Handmade pieces that took time to make', date: '03 Aug 2022', img: 'asset/sofa-03.svg' },
    { title: 'Colorful office redesign Japan Japan', date: '03 Aug 2022', img:'asset/test.png' },
  ];

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

  filterByRecentPost(post: any) {
    this.recentPostSelected.emit(post.title); 
  }
}
