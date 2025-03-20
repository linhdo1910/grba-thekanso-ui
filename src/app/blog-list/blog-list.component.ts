import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../interface/blog';

@Component({
  selector: 'app-blog-list',
  standalone: false,
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  selectedCategory: string = '';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getAllBlogs().subscribe(
      (data: Blog[]) => {
        this.blogs = data;
        this.filterBlogs(); 
      },
      error => {
        console.error('Error loading blogs:', error);
      }
    );
  }

  // Lọc blog theo selectedCategory
  filterBlogs(): void {
    if (this.selectedCategory) {
      this.filteredBlogs = this.blogs.filter(
        blog => blog.categories === this.selectedCategory
      );
    } else {
      this.filteredBlogs = this.blogs;
    }
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.filterBlogs();
  }

  // Trích dẫn 1 đoạn ngắn từ nội dung
  getExcerpt(content: string, length: number = 100): string {
    const plainText = content.replace(/<[^>]*>/g, ''); 
    return plainText.length > length ? plainText.slice(0, length) + '...' : plainText;
  }
}
