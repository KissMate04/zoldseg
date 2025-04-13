import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { MatButtonModule } from '@angular/material/button';
 

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule, MatToolbarModule,MatIconModule,ProductCartComponent,MatButtonModule],
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  isUserLoggedIn: boolean = false; 
  cartItemCount: number = 0; 
  isCartOpen: boolean = false;
  
  constructor(
    private router: Router,
    
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
  }

  toggleCartDropdown(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  logout(): void {
    this.router.navigate(['/kezdolap']); 
  }
}