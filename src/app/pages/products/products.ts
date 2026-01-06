import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product',
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="group bg-white border rounded-lg overflow-hidden
             hover:shadow-xl transition duration-300 cursor-pointer"
      [routerLink]="['/products', product.id]"
    >

      <!-- Image -->
      <div class="relative">
        <img
          [src]="product.image"
          class="w-full h-56 object-cover"
          alt=""
        />

        <!-- Hover Overlay -->
        <div
          class="absolute inset-0 bg-black/50 opacity-0
                 group-hover:opacity-100 transition
                 flex items-end p-4"
        >
          <p class="text-white text-sm line-clamp-2">
            {{ product.shortDescription }}
          </p>
        </div>
      </div>

      <!-- Info -->
      <div class="p-4 space-y-2">
        <h3 class="text-sm font-medium text-gray-800 line-clamp-2">
          {{ product.title }}
        </h3>

        <!-- Rating -->
        <div class="flex items-center gap-1 text-sm">
          <span class="text-yellow-500">★★★★☆</span>
          <span class="text-gray-500">({{ product.reviews }})</span>
        </div>

        <!-- Price -->
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold text-gray-900">
            ₹{{ product.price }}
          </span>
          <span class="text-sm text-gray-500 line-through">
            ₹{{ product.mrp }}
          </span>
          <span class="text-green-600 text-sm font-semibold">
            {{ product.discount }}% off
          </span>
        </div>

        <p class="text-xs text-gray-500">
          Free Delivery • Inclusive of taxes
        </p>
      </div>
    </div>
  `,
})
export class Products {
  @Input() product!: any;
}

