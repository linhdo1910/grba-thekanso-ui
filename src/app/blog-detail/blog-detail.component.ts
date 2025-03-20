import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../interface/blog';

@Component({
  selector: 'app-blog-detail',
  standalone: false,
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router  // Đã thêm Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadBlog(id);
      }
    });
  }

  loadBlog(id: string): void {
    this.blogService.getBlogById(id).subscribe(
      (data: Blog) => {
        this.blog = data;
      },
      error => {
        console.error('Error loading blog detail:', error);
      }
    );
  }

  // Hàm xử lý khi Sidebar emit event chọn danh mục
  onCategorySelected(category: string): void {
    // Điều hướng về Blog List với query param category
    this.router.navigate(['/blog'], { queryParams: { category } });
  }

  // Hàm xử lý khi Sidebar emit event chọn bài recent
  onRecentPostSelected(post: Blog): void {
    this.router.navigate(['/blog-detail', post._id]);
  }
}
