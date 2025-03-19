// Cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../Models/Product.model';
import { Cart } from '../Models/Cart.model';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
  })
  export class CartService {

    private cartItemsSubject = new BehaviorSubject<Cart[]>([]);
    cartItems$ = this.cartItemsSubject.asObservable();
  
    constructor(private authService: AuthService) {
      this.initializeCart();
    }
  
    private initializeCart() {
      // Load cart when service initializes
      this.loadCart();
  
      // Watch for auth changes
      this.authService.user$.subscribe(user => {
        if (user) {
          this.loadCart();
        } else {
          this.clearCart();
        }
      });
    }
  

private getCartKey(): string {
  const user = this.authService.getUser();
  return user ? `cart_${user.userID}` : 'temp_cart'; // Corrected from user.id to user.userID
}
  
    private loadCart(): void {
      const key = this.getCartKey();
      const storedCart = localStorage.getItem(key);
      // Clear previous cart before loading new one
      this.cartItemsSubject.next(storedCart ? JSON.parse(storedCart) : []);
    }
  
    private saveCart(): void {
      const key = this.getCartKey();
      localStorage.setItem(key, JSON.stringify(this.cartItemsSubject.value));
    }
  
    // addToCart(product: Product): void {
    //   const currentItems = [...this.cartItemsSubject.value];
    //   const existingItem = currentItems.find(item => item.id === product.productID);
  
    //   if (existingItem) {
    //     existingItem.quantity++;
    //   } else {
    //     currentItems.push({
    //       id: product.productID,
    //       name: product.productName,
    //       price: product.productPrice,
    //       quantity: 1
    //     });
    //   }
  
    //   this.cartItemsSubject.next(currentItems);
    //   this.saveCart();
    // }

    addToCart(product: Product): boolean {
      if (product.productquantity <= 0) {
        return false;
      }
    
      const currentItems = [...this.cartItemsSubject.value];
      const existingItem = currentItems.find(item => item.id === product.productID);
    
      if (existingItem) {
        if (existingItem.quantity + 1 > product.productquantity) {
          return false;
        }
        existingItem.quantity++;
      } else {
        currentItems.push({
          id: product.productID,
          name: product.productName,
          price: product.productPrice,
          quantity: 1,
          stockQuantity: product.productquantity // ✅ Store available stock

        });
      }
    
      this.cartItemsSubject.next(currentItems);
      this.saveCart();
      return true;
    }
  
    removeFromCart(itemId: number): void {
      const filteredItems = this.cartItemsSubject.value.filter(item => item.id !== itemId);
      this.cartItemsSubject.next(filteredItems);
      this.saveCart();
    }
  
    clearCart(): void {
      this.cartItemsSubject.next([]);
      const key = this.getCartKey();
      localStorage.removeItem(key);
    }
  
    getCartItems(): Cart[] {
      return this.cartItemsSubject.value;
    }

    updateQuantity(itemId: number, quantity: number): void {
      const currentItems = this.cartItemsSubject.value.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      });
    
      this.cartItemsSubject.next(currentItems);
      this.saveCart();
    }
    
  }
