import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../models/product.interface';
import { MatButtonModule } from '@angular/material/button';

export interface CartItem {
    product: Product;
    quantity: number;
}


@Component({
  selector: 'app-product-cart',
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule, MatToolbarModule,MatIconModule,MatButtonModule,MatInputModule],
  templateUrl: 'product-cart.component.html',
  styleUrls: ['product-cart.component.scss']
})
export class ProductCartComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  private cartSubscription: Subscription | undefined;

  constructor(
      private router: Router,
      
  ) {}

  ngOnInit(): void {
    this.cartItems = [
        { product: { id: 1, name: 'Alma (Idared)', description: 'Friss, ropogós Idared alma.', origin: 'Magyarország', price: 450, imageUrl: 'images/alma.jpg', category: 'gyumolcs', stock: 50, rating: 1, unit: 'kg' }, quantity: 2 },
        { product: { id: 4, name: 'Fejes Saláta', description: 'Zsenge fejes saláta.', origin: 'Magyarország', price: 350, imageUrl: 'images/fejessalata.jpg', category: 'zoldseg', stock: 25, rating: 1, unit: 'db' }, quantity: 1 }
    ];
    
  }

  ngOnDestroy(): void {
      this.cartSubscription?.unsubscribe();
  }

  decreaseQuantity(item: CartItem): void {
      if (item.quantity > 1) {
          console.log(`Decreasing quantity for ${item.product.name}`);
           
           item.quantity--;
      }
  }

  increaseQuantity(item: CartItem): void {
      if (item.quantity < item.product.stock) {
           console.log(`Increasing quantity for ${item.product.name}`);
           item.quantity++;
      }
  }

  updateQuantity(item: CartItem, event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      let newQuantity = parseInt(inputElement.value, 10);

      if (isNaN(newQuantity) || newQuantity < 1) {
          newQuantity = 1;
      } else if (newQuantity > item.product.stock) {
          newQuantity = item.product.stock;
      }
      
      
      inputElement.value = newQuantity.toString(); 

      
      if(newQuantity !== item.quantity) {
        
        console.log(`Updating quantity for ${item.product.name} to ${newQuantity}`);
         item.quantity = newQuantity;
      }
  }


  removeFromCart(item: CartItem): void {
       console.log(`Removing ${item.product.name} from cart`);
        this.cartItems = this.cartItems.filter(i => i.product.id !== item.product.id);
  }

  getTotalPrice(): number {
      return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  navigateToCheckout(): void {
    this.router.navigate(['/checkout']); 
  }

}