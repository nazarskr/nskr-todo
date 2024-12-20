import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { tasksReducer } from './pages/tasks/state/tasks.reducer';
import { TasksEffects } from './pages/tasks/state/tasks.effects';

export const appStore = [
  provideStore({
    tasks: tasksReducer,
  }),
  provideEffects([TasksEffects]),
  provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
];
