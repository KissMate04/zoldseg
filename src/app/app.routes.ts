import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/termekek', pathMatch: 'full' }, 
  { path: 'termekek', component: ProductListComponent, title: 'Termékek' }, 
  { path: 'checkout', component: CheckoutFormComponent, title: 'Pénztár' },
  { path: 'kapcsolat', component: AboutComponent, title: 'Kapcsolat' },
  { path: 'bejelentkezes', component: LoginComponent, title: 'Bejelentkezés' },
  { path: 'fiok', component: AccountComponent, title: 'Fiók' },
  { path: 'regisztracio', component: RegisterComponent, title: 'Regisztráció' },
];