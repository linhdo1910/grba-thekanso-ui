export interface CartItem {
    productId: string;   
    productName: string; 
    coverImage?: string;  
    productImage?: string;
    price: number;        
    quantity: number;    
    originalPrice: number; 
    discount: number;   
    size: string;
    color:string;
    addedAt?: Date;
  }
  
  export interface Cart {
    _id?: string;
    userId: string;
    items: CartItem[];
    createdAt?: Date;
    updatedAt?: Date;
    totalPrice?: number; 
  }
  