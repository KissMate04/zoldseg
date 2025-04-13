import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/termekek', pathMatch: 'full' }, 
  { path: 'termekek', component: ProductListComponent, title: 'Termékek' }, 
  { path: 'checkout', component: CheckoutFormComponent, title: 'Pénztár' },
  
];