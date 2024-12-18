import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
// import { todoReducer } from './todo/state/todo.reducer';
// import { TodoEffects } from './todo/state/todo.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export const appStore = [
  provideStore(),
  provideEffects(),
  provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
];
