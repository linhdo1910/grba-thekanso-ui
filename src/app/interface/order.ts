import { CartItem } from './cart';

export interface ShipTo {
  fullName: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  streetAddress: string;
  email: string;
  phone: string;
  note: string;
  province:string;
}



export interface Order {
  _id?: string;
  userId?: string;
  billingAddress: BillingAddress;
  shipTo: ShipTo; 
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
  status?: string;
}
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
