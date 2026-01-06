import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">

          <a routerLink="/" class="text-2xl font-bold text-indigo-600">
            Shop<span class="text-gray-800">Ease</span>
          </a>

          <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a routerLink="/products" routerLinkActive="text-indigo-600"
               class="hover:text-indigo-600 transition">
              Products
            </a>
            <a routerLink="/cart" routerLinkActive="text-indigo-600"
               class="hover:text-indigo-600 transition">
              Cart
            </a>
          </nav>

          <div class="flex items-center gap-4">

            <a routerLink="/cart" class="relative">
              <svg class="w-6 h-6 text-gray-700 hover:text-indigo-600 transition"
                   fill="none" stroke="currentColor" stroke-width="2"
                   viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9v9"/>
              </svg>

              <span
                class="absolute -top-2 -right-2 bg-indigo-600 text-white
                       text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </a>

            <div class="hidden sm:flex items-center gap-3">

              <a routerLink="/login"
                 class="text-sm font-medium text-gray-700 hover:text-indigo-600">
                Login
              </a>
              <a routerLink="/register"
                 class="bg-indigo-600 text-white px-4 py-2 rounded-lg
                        text-sm font-semibold hover:bg-indigo-700 transition">
                Register
              </a>

              <a routerLink="/profile"
                 class="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span class="w-8 h-8 rounded-full bg-indigo-100
                             text-indigo-600 flex items-center justify-center">
                  A
                </span>
                Profile
              </a>
             

            </div>

          </div>
        </div>
      </div>
    </header>
  `,
})
export class Header{}
