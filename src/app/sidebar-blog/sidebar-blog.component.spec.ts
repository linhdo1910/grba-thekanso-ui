import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBlogComponent } from './sidebar-blog.component';

describe('SidebarBlogComponent', () => {
  let component: SidebarBlogComponent;
  let fixture: ComponentFixture<SidebarBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
