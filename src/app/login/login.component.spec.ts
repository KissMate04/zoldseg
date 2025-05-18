import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';

// Mock AuthService
class MockAuthService {
  isLoggedIn$ = of(false);
  login(email: string, pass: string) { 
    if (email === 'test@example.com' && pass === 'password') {
      return true;
    }
    return false; 
  }
  logout() {}
  isAuthenticated() { return false; }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // LoginComponent is standalone and imports its own modules
        // ReactiveFormsModule is imported by LoginComponent
        RouterTestingModule.withRoutes([]), // Provide basic routing setup
        NoopAnimationsModule // For Angular Material animations
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router); // Inject Router
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form with email and password controls', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('email field should be invalid when empty and valid with correct format', () => {
    const emailControl = component.loginForm.get('email');
    expect(emailControl?.invalid).toBeTruthy();
    
    emailControl?.setValue('test');
    expect(emailControl?.hasError('email')).toBeTruthy();
    
    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('password field should be invalid when empty and valid when filled', () => {
    const passwordControl = component.loginForm.get('password');
    expect(passwordControl?.invalid).toBeTruthy();

    passwordControl?.setValue('password123');
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('form should be invalid when fields are empty', () => {
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should call authService.login and navigate on valid form submission', () => {
    spyOn(authService, 'login').and.returnValue(true);
    spyOn(router, 'navigate');

    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(router.navigate).toHaveBeenCalledWith(['/termekek']);
  });

  it('should not call authService.login or navigate on invalid form submission', () => {
    spyOn(authService, 'login');
    spyOn(router, 'navigate');

    component.loginForm.setValue({ email: '', password: '' }); // Invalid form
    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should show alert and not navigate on failed login', () => {
    spyOn(authService, 'login').and.returnValue(false);
    spyOn(router, 'navigate');
    spyOn(window, 'alert'); // Spy on window.alert

    component.loginForm.setValue({ email: 'wrong@example.com', password: 'wrongpassword' });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');
    expect(window.alert).toHaveBeenCalledWith('Hibás email cím vagy jelszó!');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
