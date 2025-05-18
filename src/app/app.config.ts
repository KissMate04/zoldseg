import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { provideHttpClient } from '@angular/common/http'; 
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(), provideFirebaseApp(() => initializeApp({ projectId: "zoldseg-17662", appId: "1:698457405340:web:ef8389de531d584f39fa59", storageBucket: "zoldseg-17662.firebasestorage.app", apiKey: "AIzaSyCMMTe9hrxp1qsXcAVkHK-ItiTUY21H6WY", authDomain: "zoldseg-17662.firebaseapp.com", messagingSenderId: "698457405340" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()) 
  ]
};