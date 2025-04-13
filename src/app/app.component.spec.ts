// src/app/app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'; // Import for router-outlet
import { Component } from '@angular/core';

// Create a Stub for HeaderComponent since it's used in AppComponent's template
@Component({ selector: 'app-header', template: '', standalone: true }) 
class MockHeaderComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Import the standalone AppComponent
        RouterTestingModule, // Provides RouterOutlet stub and routing context
        // HeaderComponent // Do NOT import the real HeaderComponent in the test
        MockHeaderComponent // Import the stub/mock instead
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Remove test for title if you removed the property
  // it(`should have the 'your-project-name' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('your-project-name');
  // });

  it('should render the header component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger change detection
    const compiled = fixture.nativeElement as HTMLElement;
    // Check if an element with the selector <app-header> exists
    expect(compiled.querySelector('app-header')).toBeTruthy(); 
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
     // Check if an element with the selector <router-outlet> exists
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

});