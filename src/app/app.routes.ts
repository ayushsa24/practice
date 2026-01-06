import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import("./pages/login/login").then((m) => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import("./pages/register/register").then((m) => m.Register)
    },
    {
        path: '',
        loadComponent: () => import('./pages/main-layout').then((m) => m.MainLayout),
        children: [
        
            {
                path: 'products',
                loadComponent: () => import("./pages/products/products").then((m) => m.Products),
            },
            {
                path: 'profile',
                loadComponent: () => import("./pages/profile/profile").then((m) => m.Profile),
            },
            {
                path: 'cart',
                loadComponent: () => import("./pages/cart/cart").then((m) => m.Cart),
            },
        ],
    },

];
