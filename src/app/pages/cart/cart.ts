import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
// OnInit, OnDestroy

// Models
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

// Service
class CartService {
  private cartItems: CartItem[] = [];
  private listeners: ((items: CartItem[]) => void)[] = [];

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const stored = localStorage.getItem('cart');
    if (stored) {
      this.cartItems = JSON.parse(stored);
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.cartItems));
  }

  subscribe(listener: (items: CartItem[]) => void): () => void {
    this.listeners.push(listener);
    listener(this.cartItems);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartSummary(): CartSummary {
    const subtotal = this.cartItems.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
    const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 50) : 0;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  }
}

// Singleton cart service instance
const cartService = new CartService();

@Component({
  selector: "app-Cart",
  template: `
    <div class="cart-container">
      <!-- Header -->
      <div class="cart-header">
        <h1 class="cart-title">
          <svg class="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Shopping Cart
        </h1>
        <p class="cart-subtitle">{{ cartItems.length }} items in your cart</p>
      </div>

      <!-- Empty Cart State -->
      <div *ngIf="cartItems.length === 0" class="empty-cart">
        <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <button class="btn-primary" (click)="continueShopping()">
          Continue Shopping
        </button>
      </div>

      <!-- Cart Content -->
      <div *ngIf="cartItems.length > 0" class="cart-content">
        <!-- Cart Items -->
        <div class="cart-items">
          <div *ngFor="let item of cartItems" class="cart-item">
            <img [src]="item.product.image" [alt]="item.product.name" class="item-image">
            
            <div class="item-details">
              <h3 class="item-name">{{ item.product.name }}</h3>
              <p class="item-category">{{ item.product.category }}</p>
              <p class="item-description">{{ item.product.description }}</p>
            </div>

            <div class="item-actions">
              <div class="quantity-controls">
                <button class="qty-btn" (click)="decreaseQuantity(item.product.id)">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button class="qty-btn" (click)="increaseQuantity(item.product.id)">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>

              <div class="item-price-section">
                <p class="item-price">₹{{ (item.product.price * item.quantity).toFixed(2) }}</p>
                <p class="item-unit-price">₹{{ item.product.price }} each</p>
              </div>

              <button class="btn-remove" (click)="removeItem(item.product.id)">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>

          <button class="btn-clear" (click)="clearCart()">
            Clear Cart
          </button>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <h2 class="summary-title">Order Summary</h2>
          
          <div class="summary-item">
            <span>Subtotal</span>
            <span>₹{{ cartSummary.subtotal.toFixed(2) }}</span>
          </div>
          
          <div class="summary-item">
            <span>Shipping</span>
            <span *ngIf="cartSummary.shipping === 0" class="free-shipping">FREE</span>
            <span *ngIf="cartSummary.shipping > 0">₹{{ cartSummary.shipping.toFixed(2) }}</span>
          </div>
          
          <div class="summary-item">
            <span>Tax (18%)</span>
            <span>₹{{ cartSummary.tax.toFixed(2) }}</span>
          </div>
          
          <div class="summary-divider"></div>
          
          <div class="summary-total">
            <span>Total</span>
            <span>₹{{ cartSummary.total.toFixed(2) }}</span>
          </div>

          <button class="btn-checkout" (click)="proceedToCheckout()">
            Proceed to Checkout
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>

          <button class="btn-continue" (click)="continueShopping()">
            Continue Shopping
          </button>

          <div class="secure-checkout">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
            </svg>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div *ngIf="showCheckoutSuccess" class="success-message">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <span>Proceeding to checkout...</span>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
      padding: 2rem;
    }

    .cart-header {
      text-align: center;
      margin-bottom: 3rem;
      animation: fadeInDown 0.6s ease-out;
    }

    .cart-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      color: white;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .cart-icon {
      width: 3rem;
      height: 3rem;
      color: #818cf8;
    }

    .cart-subtitle {
      color: #c7d2fe;
      font-size: 1.125rem;
    }

    .empty-cart {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.5rem;
      padding: 4rem 2rem;
      text-align: center;
      max-width: 500px;
      margin: 0 auto;
      animation: fadeIn 0.6s ease-out;
    }

    .empty-icon {
      width: 6rem;
      height: 6rem;
      color: #818cf8;
      margin-bottom: 1.5rem;
    }

    .empty-cart h2 {
      color: white;
      font-size: 1.875rem;
      margin-bottom: 0.5rem;
    }

    .empty-cart p {
      color: #c7d2fe;
      margin-bottom: 2rem;
      font-size: 1.125rem;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      animation: fadeIn 0.6s ease-out;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .cart-item {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 120px 1fr auto;
      gap: 1.5rem;
      transition: all 0.3s ease;
      animation: slideInLeft 0.5s ease-out;
    }

    .cart-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
      border-color: rgba(129, 140, 248, 0.3);
    }

    .item-image {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 0.75rem;
      border: 2px solid rgba(129, 140, 248, 0.3);
    }

    .item-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .item-name {
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .item-category {
      color: #818cf8;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .item-description {
      color: #c7d2fe;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .item-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1rem;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.5rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .qty-btn {
      width: 2rem;
      height: 2rem;
      background: rgba(129, 140, 248, 0.2);
      border: 1px solid rgba(129, 140, 248, 0.3);
      border-radius: 0.5rem;
      color: #818cf8;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .qty-btn:hover {
      background: rgba(129, 140, 248, 0.3);
      transform: scale(1.1);
    }

    .qty-btn svg {
      width: 1rem;
      height: 1rem;
    }

    .quantity {
      color: white;
      font-size: 1.125rem;
      font-weight: 600;
      min-width: 2rem;
      text-align: center;
    }

    .item-price-section {
      text-align: right;
    }

    .item-price {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .item-unit-price {
      color: #c7d2fe;
      font-size: 0.875rem;
    }

    .btn-remove {
      width: 2.5rem;
      height: 2.5rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 0.5rem;
      color: #ef4444;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-remove:hover {
      background: rgba(239, 68, 68, 0.2);
      transform: scale(1.1);
    }

    .btn-remove svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .btn-clear {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
      padding: 0.75rem 1.5rem;
      border-radius: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      align-self: flex-start;
    }

    .btn-clear:hover {
      background: rgba(239, 68, 68, 0.2);
      transform: translateY(-2px);
    }

    .cart-summary {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.5rem;
      padding: 2rem;
      height: fit-content;
      position: sticky;
      top: 2rem;
      animation: slideInRight 0.5s ease-out;
    }

    .summary-title {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #c7d2fe;
      margin-bottom: 1rem;
      font-size: 1rem;
    }

    .free-shipping {
      color: #34d399;
      font-weight: 700;
    }

    .summary-divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(129, 140, 248, 0.3), transparent);
      margin: 1.5rem 0;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
    }

    .btn-checkout {
      width: 100%;
      background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 0.75rem;
      font-size: 1.125rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .btn-checkout:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
    }

    .btn-checkout svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .btn-continue {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
      padding: 0.875rem;
      border-radius: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 1.5rem;
    }

    .btn-continue:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    .btn-primary {
      background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.75rem;
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
    }

    .secure-checkout {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: #34d399;
      font-size: 0.875rem;
    }

    .secure-checkout svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .success-message {
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: rgba(52, 211, 153, 0.9);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 600;
      animation: slideInRight 0.3s ease-out;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(52, 211, 153, 0.3);
    }

    .success-message svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @media (max-width: 1024px) {
      .cart-content {
        grid-template-columns: 1fr;
      }
      .cart-summary {
        position: static;
      }
    }

    @media (max-width: 768px) {
      .cart-container {
        padding: 1rem;
      }
      .cart-title {
        font-size: 1.875rem;
      }
      .cart-item {
        grid-template-columns: 80px 1fr;
        gap: 1rem;
      }
      .item-image {
        width: 80px;
        height: 80px;
      }
      .item-actions {
        grid-column: 1 / -1;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .item-price-section {
        text-align: left;
      }
    }
  `]
})
export class Cart implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  cartSummary: CartSummary = {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  };
  showCheckoutSuccess = false;
  private unsubscribe?: () => void;

  ngOnInit(): void {
    this.unsubscribe = cartService.subscribe(items => {
      this.cartItems = items;
      this.cartSummary = cartService.getCartSummary();
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  increaseQuantity(productId: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item && item.quantity > 1) {
      cartService.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeItem(productId: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear the entire cart?')) {
      cartService.clearCart();
    }
  }

  proceedToCheckout(): void {
    this.showCheckoutSuccess = true;
    setTimeout(() => {
      this.showCheckoutSuccess = false;
    }, 3000);
  }

  continueShopping(): void {
    // Navigate to products page
    console.log('Continue shopping clicked');
  }
}

// Export CartService for use in other components
export { cartService as CartService };