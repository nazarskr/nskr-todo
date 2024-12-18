import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { appStore } from './store';
import { appFirebaseConfig } from './firebase.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ...appStore,
    ...appFirebaseConfig,
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};
