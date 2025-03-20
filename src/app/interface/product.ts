export interface Product {
    _id: string; 
    productName:string;
    brandName: string;  
    productPrice: number;  
    productDescription: string;  
    productStock: number;  
    productCategory: string;  
    productSubCategory: string; 
    coverImage: string;  
    images: string[];  
    color: string;  
    size: string;  
    materials: string; 
    sort?: string;  
    note?: string;  
    status: number;  
    rating: number;  
    reviews: number;  
    discount?: number;  
    previousPrice?: number;  
    createdAt?: string; 
    updatedAt?: string;  
  }
  
  export interface DiscountCode {
    code: string;
    description: string;
    discountValue: number;
    isActive: boolean;
  }
  