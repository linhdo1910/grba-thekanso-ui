import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './interface/cart';
import { Product } from './interface/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {}

  // Thêm sản phẩm vào giỏ hàng (dùng trong object.component.ts)
  addToCart(product: Product, selectedSize: string, selectedColor: string, quantity: number = 1): void {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa (tính theo productId, size, color)
    const existingItemIndex = this.cartItems.findIndex(
      (item) =>
        item.productId === product._id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existingItemIndex > -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên
      this.cartItems[existingItemIndex].quantity += quantity;
      this.cartItems[existingItemIndex].addedAt = new Date();
    } else {
      // Nếu sản phẩm chưa có trong giỏ, tạo mới một CartItem và thêm vào giỏ
      const newItem: CartItem = {
        productId: product._id,
        productName: product.productName,
        coverImage: product.coverImage,
        price: product.productPrice,
        originalPrice: product.productPrice,
        discount: product.discount || 0,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        addedAt: new Date(),
      };
      this.cartItems.push(newItem);
    }

    // Cập nhật lại tổng số lượng sản phẩm trong giỏ hàng
    this.updateCartCount();
  }

  // Cập nhật lại tổng số lượng trong giỏ hàng (tính tổng số lượng của tất cả CartItem)
  updateCartCount(): void {
    const totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(totalQuantity);
  }

  // Lấy danh sách các sản phẩm trong giỏ hàng
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Xóa một sản phẩm khỏi giỏ hàng theo productId, size và color
  removeProduct(productId: string, size: string, color: string): void {
    this.cartItems = this.cartItems.filter(
      (item) => !(item.productId === productId && item.size === size && item.color === color)
    );
    this.updateCartCount();
  }

  // Xóa tất cả sản phẩm trong giỏ hàng (sau khi checkout)
  clearCart(): void {
    this.cartItems = [];
    this.cartCountSubject.next(0);
  }
}
