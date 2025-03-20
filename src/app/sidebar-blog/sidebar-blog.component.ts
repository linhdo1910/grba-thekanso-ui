import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../interface/blog';

@Component({
  selector: 'app-sidebar-blog',
  standalone: false,
  templateUrl: './sidebar-blog.component.html',
  styleUrls: ['./sidebar-blog.component.css']
})
export class SidebarBlogComponent implements OnInit {
  categories = ['People', 'Tips', 'Inspiration'];
  @Output() categorySelected = new EventEmitter<string>();
  @Output() recentPostSelected = new EventEmitter<Blog>();

  selectedCategory: string = '';
  recentPosts: Blog[] = [];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe(
      (data: Blog[]) => {
        const sorted = data.sort((a, b) => {
          const dateA = new Date(a.createDate || '').getTime();
          const dateB = new Date(b.createDate || '').getTime();
          return dateB - dateA;
        });
        this.recentPosts = sorted.slice(0, 5);
      },
      error => {
        console.error('Error loading recent posts:', error);
      }
    );
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

  filterByRecentPost(post: Blog): void {
    // Emit event để báo cho component cha (BlogDetailComponent) xử lý điều hướng
    this.recentPostSelected.emit(post);
  }
}
