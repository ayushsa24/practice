import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 px-4">

      <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">

        <div class="text-center mb-8">
          <h1 class="text-3xkl font-bold text-gray-800">Create Your Account</h1>
          <p class="text-gray-500 mt-2">
            Join us and start shopping smarter
          </p>
        </div>

        <form class="space-y-5">

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              class="w-full px-4 py-3 rounded-lg border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              class="w-full px-4 py-3 rounded-lg border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a strong password"
              class="w-full px-4 py-3 rounded-lg border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              class="w-full px-4 py-3 rounded-lg border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div class="flex items-start gap-2 text-sm">
            <input type="checkbox" class="mt-1 rounded text-indigo-600" />
            <p class="text-gray-600">
              I agree to the
              <a href="#" class="text-indigo-600 hover:underline">
                Terms & Conditions
              </a>
              and
              <a href="#" class="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-3 rounded-lg
                   font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Create Account
          </button>

        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <a href="/login" class="text-indigo-600 font-medium hover:underline">
            Sign in
          </a>
        </p>

      </div>
    </div>
  `,
})
export class Register {}
