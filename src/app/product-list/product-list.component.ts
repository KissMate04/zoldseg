import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.interface'; 
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule, MatToolbarModule,MatIconModule, MatCardModule,
    MatOptionModule,FormsModule,ProductItemComponent,MatSelectModule,MatInputModule],
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  allProducts: Product[] = [];
  filteredAndSortedProducts: Product[] = []; 

  
  selectedCategory: string = 'all';
  maxPrice: number | null = null;
  selectedRating: string = 'all';
  sortBy: string = 'nameAsc';

  
  constructor(
      
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
      this.allProducts = [
          
           { id: 1, name: 'Alma (Idared)', description: 'Friss, ropogós Idared alma.', origin: 'Magyarország', price: 450, imageUrl: 'images/alma.jpg', category: 'gyumolcs', stock: 50, rating: 1, unit: 'kg' },
           { id: 2, name: 'Sárgarépa', description: 'Édes, lédús sárgarépa főzéshez.', origin: 'Magyarország', price: 300, imageUrl: 'images/sargarepa.jpg', category: 'zoldseg', stock: 100, rating: 1, unit: 'kg' },
           { id: 3, name: 'Banán', description: 'Import, érett banán.', origin: 'Ecuador', price: 600, imageUrl: 'images/banan.jpg', category: 'gyumolcs', stock: 30, rating: 1, unit: 'kg' },
           { id: 4, name: 'Fejes Saláta', description: 'Zsenge fejes saláta.', origin: 'Magyarország', price: 350, imageUrl: 'images/fejessalata.jpg', category: 'zoldseg', stock: 25, rating: 1, unit: 'db' },
           { id: 5, name: 'Szőlő (fehér)', description: 'Magyar csemegeszőlő.', origin: 'Magyarország', price: 1200, imageUrl: 'images/feherszolo.jpg', category: 'gyumolcs', stock: 15, rating: 2, unit: 'kg' },
           
      ];
      this.applyFiltersAndSorting();
      
  }

  applyFilters(): void {
      this.applyFiltersAndSorting();
  }

  applySorting(): void {
      this.applyFiltersAndSorting();
  }

  applyFiltersAndSorting(): void {
    let tempProducts = [...this.allProducts];

    // Apply Category Filter
    if (this.selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(p => p.category === this.selectedCategory);
    }

    // Apply Price Filter
    if (this.maxPrice !== null && this.maxPrice > 0) {
        tempProducts = tempProducts.filter(p => p.price <= this.maxPrice!);
    }

    // Apply Rating Filter
    if (this.selectedRating !== 'all') {
        const ratingNum = parseInt(this.selectedRating, 10);
        tempProducts = tempProducts.filter(p => p.rating === ratingNum);
    }

    // Apply Sorting
    switch (this.sortBy) {
        case 'nameAsc':
            tempProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'nameDesc':
            tempProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'priceAsc':
            tempProducts.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            tempProducts.sort((a, b) => b.price - a.price);
            break;
    }

    this.filteredAndSortedProducts = tempProducts;
  }
  handleAddToCart(product: Product): void {
    console.log('Product received in list component:', product.name);
    alert(`${product.name} kosárba helyezve (a listából)!`);
  }
}