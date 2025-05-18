import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
// Import any other components you have
import { authGuard } from './guards/auth.guard';
// Remove nonAuthGuard if it doesn't exist yet

export const routes: Routes = [
  { path: '', redirectTo: 'termekek', pathMatch: 'full' },
  
  // Routes for non-authenticated users only
  { path: 'bejelentkezes', component: LoginComponent },
  { path: 'regisztracio', component: RegisterComponent },
  
  // Routes for authenticated users only
  { path: 'fiok', loadComponent: () => import('./account/account.component').then(c => c.AccountComponent), canActivate: [authGuard] },
  { path: 'penztar', component: CheckoutFormComponent, canActivate: [authGuard] },
  
  // Public routes without authentication requirements
  { path: 'termekek', loadComponent: () => import('./product-list/product-list.component').then(c => c.ProductListComponent) },
  { path: 'kapcsolat', loadComponent: () => import('./about/about.component').then(c => c.AboutComponent) },
  
  // Wildcard route for 404
  { path: '**', redirectTo: 'termekek' }
];