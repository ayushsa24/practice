import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-gray-900 text-gray-300">
      <div class="max-w-7xl mx-auto px-6 py-12">

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          <div>
            <h2 class="text-2xl font-bold text-white mb-3">
              Shop<span class="text-indigo-500">Ease</span>
            </h2>
            <p class="text-sm text-gray-400 leading-relaxed">
              Your one-stop destination for quality products, fast delivery,
              and secure shopping.
            </p>
          </div>

          <div>
            <h3 class="text-white font-semibold mb-3">Shop</h3>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/products" class="hover:text-white">All Products</a></li>
              <li><a routerLink="/cart" class="hover:text-white">Cart</a></li>
              <li><a routerLink="/profile" class="hover:text-white">My Account</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-semibold mb-3">Company</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white">About Us</a></li>
              <li><a href="#" class="hover:text-white">Careers</a></li>
              <li><a href="#" class="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-semibold mb-3">Support</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white">Help Center</a></li>
              <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

        </div>

        <div class="border-t border-gray-700 my-8"></div>

        <div class="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 gap-4">

          <p>
            © {{ currentYear }} ShopEase. All rights reserved.
          </p>

          <div class="flex items-center gap-4">
            <a href="#" class="hover:text-white transition">Facebook</a>
            <a href="#" class="hover:text-white transition">Instagram</a>
            <a href="#" class="hover:text-white transition">Twitter</a>
          </div>

        </div>

      </div>
    </footer>
  `,
})
export class Footer {
  currentYear = new Date().getFullYear();
}
