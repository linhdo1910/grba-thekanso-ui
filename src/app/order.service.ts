import { Injectable } from '@angular/core';

// Define the structure of a product in an order
export interface Product {
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image: string;
}

// Define the structure of a billing address
export interface BillingAddress {
  name: string;
  address: string;
  email: string;
  phone: string;
}

// Define the structure of an order
export interface Order {
  date: string; // Order date
  orderId: number; // Order ID
  paymentMethod: string; // Payment method
  subtotal: number; // Subtotal before discount
  discount: number; // Discount percentage
  shipping: string; // Shipping fee
  total: number; // Total payment amount
  status: number; // Order status (1: Order received, 2: Processing, 3: On the way, 4: Delivered)
  billingAddress: BillingAddress; // Billing address
  products: Product[]; // List of products in the order
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  // Example order data
  private orders: Order[] = [
    {
      date: 'April 24, 2021',
      orderId: 4152,
      paymentMethod: 'Paypal',
      subtotal: 2000000,
      discount: 20,
      shipping: 'Free',
      total: 1000000,
      status: 3, // Processing
      billingAddress: {
        name: 'Dainne Russell',
        address: '4140 Parker Rd. Allentown, New Mexico 31134',
        email: 'dainne.ressell@gmail.com',
        phone: '(671) 555-0110',
      },
      products: [
        {
          name: 'Red Capsicum',
          price: 14.0,
          quantity: 5,
          subtotal: 70.0,
          image: 'src/asset/sofa-01.svg',
        },
        {
          name: 'Green Capsicum',
          price: 12.0,
          quantity: 3,
          subtotal: 36.0,
          image: 'path/to/image2.png',
        },
      ],
    },
    {
      date: 'May 10, 2021',
      orderId: 5234,
      paymentMethod: 'Credit Card',
      subtotal: 1500000,
      discount: 10,
      shipping: 'Free',
      total: 1350000,
      status: 4, // Delivered
      billingAddress: {
        name: 'John Doe',
        address: '123 Main St. Springfield, Illinois 62704',
        email: 'john.doe@example.com',
        phone: '(217) 555-0199',
      },
      products: [
        {
          name: 'Blue T-shirt',
          price: 25.0,
          quantity: 2,
          subtotal: 50.0,
          image: 'path/to/image4.png',
        },
        {
          name: 'Black Jeans',
          price: 40.0,
          quantity: 1,
          subtotal: 40.0,
          image: 'path/to/image5.png',
        },
      ],
    },
    {
      date: 'June 15, 2021',
      orderId: 6345,
      paymentMethod: 'Bank Transfer',
      subtotal: 3000000,
      discount: 15,
      shipping: 'Free',
      total: 2550000,
      status: 2, // Processing
      billingAddress: {
        name: 'Jane Smith',
        address: '567 Elm St. Denver, Colorado 80203',
        email: 'jane.smith@example.com',
        phone: '(303) 555-0123',
      },
      products: [
        {
          name: 'Wooden Chair',
          price: 120.0,
          quantity: 2,
          subtotal: 240.0,
          image: 'path/to/image6.png',
        },
        {
          name: 'Dining Table',
          price: 300.0,
          quantity: 1,
          subtotal: 300.0,
          image: 'path/to/image7.png',
        },
      ],
    },
    {
      date: 'July 20, 2021',
      orderId: 7456,
      paymentMethod: 'Cash on Delivery',
      subtotal: 500000,
      discount: 5,
      shipping: '50,000 VND',
      total: 525000,
      status: 1, // Order received
      billingAddress: {
        name: 'Michael Johnson',
        address: '789 Pine St. Seattle, Washington 98101',
        email: 'michael.johnson@example.com',
        phone: '(206) 555-0147',
      },
      products: [
        {
          name: 'Laptop Bag',
          price: 50.0,
          quantity: 1,
          subtotal: 50.0,
          image: 'path/to/image8.png',
        },
        {
          name: 'Wireless Mouse',
          price: 20.0,
          quantity: 2,
          subtotal: 40.0,
          image: 'path/to/image9.png',
        },
      ],
    },
  ];

  // Get all orders
  getOrders(): Order[] {
    return this.orders;
  }

  // Get a specific order by ID
  getOrderById(orderId: number): Order | undefined {
    return this.orders.find((order) => order.orderId === orderId);
  }

  // Cancel an order
  cancelOrder(orderId: number): void {
    const order = this.getOrderById(orderId);
    if (order && order.status < 4) {
      console.log(`Order ${orderId} has been canceled.`);
    } else {
      console.log(`Order ${orderId} cannot be canceled.`);
    }
  }

  // Write a review for an order (only allowed if the order is delivered)
  writeReview(orderId: number): void {
    const order = this.getOrderById(orderId);
    if (order && order.status === 4) {
      console.log(`Redirecting to the review page for order ${orderId}.`);
    } else {
      console.log(`Cannot write a review for order ${orderId}.`);
    }
  }
}
