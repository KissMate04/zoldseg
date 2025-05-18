import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  authState,
  UserCredential,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from '@angular/fire/auth';

export interface AuthError {
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  
  currentUser$: Observable<import('firebase/auth').User | null>;

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.currentUser$ = authState(this.auth);
    // Subscribe to Firebase auth state changes
    this.currentUser$.subscribe(user => {
      this.loggedIn.next(!!user);
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        localStorage.removeItem('isLoggedIn');
      }
    });
  }

  // Register a new user
  register(email: string, password: string, displayName?: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(userCredential => {
        // Update profile with display name if provided
        if (displayName && userCredential.user) {
          updateProfile(userCredential.user, { displayName });
        }
        // Send email verification
        if (userCredential.user) {
          sendEmailVerification(userCredential.user);
        }
      }),
      catchError(error => {
        let errorMessage = 'Regisztráció sikertelen';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Ez az email cím már regisztrálva van.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Érvénytelen email cím.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'A jelszó túl gyenge. Legalább 6 karakter szükséges.';
        }
        return throwError(() => ({ code: error.code, message: errorMessage } as AuthError));
      })
    );
  }

  // Login with email and password
  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(error => {
        let errorMessage = 'Bejelentkezés sikertelen';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'Nincs ilyen email címmel regisztrált felhasználó.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Helytelen jelszó.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Érvénytelen email cím.';
        } else if (error.code === 'auth/user-disabled') {
          errorMessage = 'Ez a felhasználói fiók le van tiltva.';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Túl sok sikertelen bejelentkezési kísérlet. Kérjük, próbálja később.';
        }
        return throwError(() => ({ code: error.code, message: errorMessage } as AuthError));
      })
    );
  }

  // Logout the current user
  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        this.router.navigate(['/bejelentkezes']);
      }),
      catchError(error => {
        return throwError(() => ({ code: error.code, message: 'Kijelentkezés sikertelen' } as AuthError));
      })
    );
  }

  // Reset password
  resetPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      catchError(error => {
        let errorMessage = 'Jelszó visszaállítás sikertelen';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'Nincs ilyen email címmel regisztrált felhasználó.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Érvénytelen email cím.';
        }
        return throwError(() => ({ code: error.code, message: errorMessage } as AuthError));
      })
    );
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  // Get current user
  getCurrentUser() {
    return this.auth.currentUser;
  }
}
