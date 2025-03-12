import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-blog',
  standalone: false,
  templateUrl: './sidebar-blog.component.html',
  styleUrl: './sidebar-blog.component.css'
})
export class SidebarBlogComponent {
  categories = ['People', 'Tips', 'Inspiration'];
  recentPosts = [
    { title: 'Going all-in with millennial design', date: '03 Aug 2022', img: 'asset/test.png' },
    { title: 'Exploring new ways of decorating', date: '03 Aug 2022', img: 'asset/test.png' },
    { title: 'Handmade pieces that took time to make', date: '03 Aug 2022', img: 'asset/test.png' },
    { title: 'Modern home in Milan Japan Japan', date: '03 Aug 2022', img: 'asset/test.png'},
    { title: 'Colorful office redesign Japan Japan', date: '03 Aug 2022', img:'asset/test.png' },
  ];
}
