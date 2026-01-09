import { Component, signal } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { form, Field, required, minLength } from '@angular/forms/signals';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, Field],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">

      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p class="text-gray-500 mt-2">Sign in to continue</p>
        </div>

        <form (ngSubmit)="onsubmit($event)" class="space-y-6">

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              [field]="loginForm.username"
              autocomplete="username"
              placeholder="Enter your username"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
          
           @if(!loginForm.username().valid() && loginForm.username().touched()){
             @for(error of loginForm.username().errors(); track error.kind){
              <p class="text-sm text-red-600 mt-1">{{error.message}}</p>
             }
          }

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              [field]="loginForm.password"
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
            
           @if(!loginForm.password().valid() && loginForm.password().touched()){
             @for(error of loginForm.password().errors(); track error.kind){
              <p class="text-sm text-red-600 mt-1">{{error.message}}</p>
             }
          }

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2">
              <input type="checkbox" class="rounded text-indigo-600 cursor-pointer" />
              Remember me
            </label>
            <a href="#" class="text-indigo-600 hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          <button
            type="submit" [disabled]="!loginForm().invalid()"
            class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 cursor-pointer"
          >
            Sign In
          </button>

        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?
          <a href="/register" class="text-indigo-600 font-medium hover:underline">
            Create one
          </a>
        </p>

      </div>
    </div>
  `,
})
export class Login {
  loginModel = signal({
    username: '',
    password: '',
  });

  loginForm = form(this.loginModel, (rootPath)=> {
    required(rootPath.username,{message: 'Username is required'});
    required(rootPath.password,{message: 'Password is required'});
    minLength(rootPath.password, 8, {message: 'Password must be at least 8 characters long'});
  });

  onsubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm().valid()) {
      console.log('Login Data:', this.loginModel());
    } else {
      console.log('Form is invalid');
    }
  }
}
