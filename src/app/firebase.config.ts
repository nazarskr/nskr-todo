import { InjectionToken, Provider } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { environment } from '../environments/environment';

export const FIREBASE_APP = new InjectionToken<FirebaseApp>('FirebaseApp');
export const FIREBASE_AUTH = new InjectionToken<Auth>('FirebaseAuth');
export const FIRESTORE = new InjectionToken<Firestore>('Firestore');

export const appFirebaseConfig: Provider[] = [
  {
    provide: FIREBASE_APP,
    useFactory: () => initializeApp(environment.firebaseConfig),
  },
  {
    provide: FIREBASE_AUTH,
    useFactory: (app: FirebaseApp) => getAuth(app),
    deps: [FIREBASE_APP],
  },
  {
    provide: FIRESTORE,
    useFactory: (app: FirebaseApp) => getFirestore(app),
    deps: [FIREBASE_APP],
  },
];
