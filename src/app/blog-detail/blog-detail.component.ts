interface Blog {
  title: string; 
  category: string;
  content1: string;
  content2: string;
  gallery: string[];
  content3: string;
  content4: string;
  content5: string;
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-detail',
  standalone: false,
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
  categories = ['People', 'Tips', 'Inspiration'];

  blogs: Blog [] = [
    {
      title: 'The Power of Personal Stories',
      category: this.categories[0], 
      content1: `Sharing stories of real people helps brands connect emotionally with their audience.`,
      content2: `Feature interviews, testimonials, or case studies that highlight genuine experiences.`,
      gallery: [
        'asset/test.png',
        'asset/test.png',
        'asset/test.png',
      ],
      content3: `Dive deeper into storytelling techniques.`,
      content4: `Ensure visuals support the narrative.`,
      content5: `Always end with a clear call to action.`
    },
    {
      title: 'Top 5 Interior Design Tips You Should Know',
      category: this.categories[1], 
      content1: `Elevate your living space effortlessly.`,
      content2: `Focus on lighting, textures, and palettes.`,
      gallery: [
        'asset/sofa-01.svg',
        'asset/sofa-01.svg',
      ],
      content3: `Mix furniture styles without cluttering.`,
      content4: `Incorporate multi-functional furniture.`,
      content5: `Add personal touches like art pieces.`
    },
    {
      title: 'Inspiration Corner: Minimalist Spaces',
      category: this.categories[2], 
      content1: `Minimalist design is about intentional choices.`,
      content2: `Explore stunning examples of minimalist interiors.`,
      gallery: [
        'asset/sofa-01.svg',
        'asset/sofa-02.svg',
        'asset/sofa-03.svg',
      ],
      content3: `Declutter, neutral tones, purposeful placement.`,
      content4: `Natural elements like wood, plants, stone.`,
      content5: `Create calm, inviting environments.`
    }
  ];

  selectedCategory: string = '';

  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }  
}
