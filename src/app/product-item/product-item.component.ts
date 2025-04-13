import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.interface'; 
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule, MatToolbarModule,MatIconModule, MatCardModule,MatButtonModule],
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product!: Product; 
  @Output() addToCartClicked = new EventEmitter<Product>();
  
  constructor(
  
  ) {}

  addToCart(product: Product): void {
    console.log('Adding to cart (from item):', product.name); 
    this.addToCartClicked.emit(product);
  }
}