import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule,MatInputModule, MatButtonModule],
  templateUrl: 'checkout-form.component.html',
  styleUrls: ['checkout-form.component.scss']
})


export class CheckoutFormComponent implements OnInit {

  checkoutForm!: FormGroup; 
  finalTotal: number = 0;
  expectedDeliveryTime: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadOrderSummary();

     this.checkoutForm.get('address.country')?.valueChanges.subscribe(country => {
        this.calculateDeliveryTime(country);
     });
  }

  createForm(): void {
    this.checkoutForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9 \\-()]{7,}$')]], 
      address: this.fb.group({
        country: ['', Validators.required],
        zipCode: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        houseNumber: ['', Validators.required],
        other: ['']
      })
    });
  }

  loadOrderSummary(): void {
      this.finalTotal = 1250; // Example total
      
      this.calculateDeliveryTime(this.checkoutForm.get('address.country')?.value || '');
  }

  calculateDeliveryTime(country: string): void {
       const countryLower = country?.toLowerCase().trim();
       if (countryLower === 'magyarország' || countryLower === 'hungary') {
           this.expectedDeliveryTime = '2 munkanap';
       } else if (countryLower) { 
           this.expectedDeliveryTime = '3 munkanap';
       } else { 
           this.expectedDeliveryTime = 'Kérjük, adja meg az országot!';
       }
   }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Form Submitted!', this.checkoutForm.value);
      
      const orderData = {
          ...this.checkoutForm.value,
          totalAmount: this.finalTotal,
          
      };

       alert('Rendelés leadva (Placeholder)!');
       this.router.navigate(['/kezdolap']); 
       

    } else {
      console.log('Form is invalid');
      this.checkoutForm.markAllAsTouched(); 
    }
  }
  get phone() { return this.checkoutForm.get('phone'); }
  get addressGroup() { return this.checkoutForm.get('address') as FormGroup; }
  get country() { return this.addressGroup.get('country'); }
  get zipCode() { return this.addressGroup.get('zipCode'); }
  get city() { return this.addressGroup.get('city'); }
  get street() { return this.addressGroup.get('street'); }
  get houseNumber() { return this.addressGroup.get('houseNumber'); }

}