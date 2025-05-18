import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor(private router: Router) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.loggedIn.next(true);
    }
  }

  login(email: string, password: string): boolean {
    // Simulate authentication - replace with actual backend call
    // For demonstration, any non-empty email/password will log in
    if (email && password) {
      this.loggedIn.next(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    // Add specific user checks if needed, e.g.
    // if (email === 'user@example.com' && password === 'password') {
    //   this.loggedIn.next(true);
    //   localStorage.setItem('isLoggedIn', 'true');
    //   return true;
    // }
    return false;
  }

  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/bejelentkezes']); // Navigate to login page after logout
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }
}
