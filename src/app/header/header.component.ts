import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service'; // Import AuthService
import { Subscription } from 'rxjs'; // Import Subscription
 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule,RouterLink, MatToolbarModule,MatIconModule,ProductCartComponent,MatButtonModule],
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  isUserLoggedIn: boolean = false; 
  cartItemCount: number = 0; 
  isCartOpen: boolean = false;
  private authSubscription!: Subscription; // Declare authSubscription
  
  constructor(
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to login status changes
    this.authSubscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isUserLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  toggleCartDropdown(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  logout(): void {
    this.authService.logout(); // Use AuthService for logout
    // Navigation is handled within authService.logout()
  }
}