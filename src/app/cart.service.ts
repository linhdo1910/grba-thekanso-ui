import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './interface/product';
import { CartItem } from './interface/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {}
  // - Nếu chưa có, thêm mới một CartItem
  addToCart(product: Product, selectedSize: string, selectedColor: string): void {
    // Tìm CartItem trùng với productId, size và color
    const index = this.cartItems.findIndex(
      item =>
        item.productId === product._id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );
    if (index > -1) {
      // Nếu đã tồn tại, tăng số lượng
      this.cartItems[index].quantity += 1;
      this.cartItems[index].addedAt = new Date();
    } else {
      // Tạo mới một CartItem
      const newItem: CartItem = {
        productId: product._id,
        productName: product.productName,
        coverImage: product.coverImage,
        price: product.productPrice,      
        originalPrice: product.productPrice, 
        discount: product.discount || 0,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
        addedAt: new Date()
      };
      this.cartItems.push(newItem);
    }
    // Cập nhật tổng số lượng sản phẩm trong giỏ (tính tổng số lượng của tất cả CartItem)
    const totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(totalQuantity);
  }

  // Lấy danh sách CartItem
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Xóa 1 sản phẩm khỏi giỏ hàng theo productId, size và color
  removeProduct(productId: string, size: string, color: string): void {
    this.cartItems = this.cartItems.filter(
      item => !(item.productId === productId && item.size === size && item.color === color)
    );
    const totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(totalQuantity);
  }

  // Xóa giỏ hàng(sau khi checkout)
  clearCart(): void {
    this.cartItems = [];
    this.cartCountSubject.next(0);
  }
}
