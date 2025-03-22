import { CartItem } from './cart';

export interface BillingAddress {
  firstName: string;
  lastName: string;
  companyName?: string;
  phone: string;
  email: string;
  streetAddress: string;
  province: string;
  district: string;
  ward: string;
}

export interface Order {
  _id?: string;
  userId?: string; 
  billingAddress: BillingAddress;
  shippingMethod: string;
  paymentMethod: string;
  orderNotes?: string;
  items?: CartItem[];
  products: CartItem[];
  subtotal: number;
  discount: number;
  discountPrice?: number;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  date?: Date;
  status?: string; // ví dụ: "Order received", "Processing", "On the way", "Delivered"
}