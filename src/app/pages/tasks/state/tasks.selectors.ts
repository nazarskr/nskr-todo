import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.state';
import { filterBySearchQuery, filterByStatus } from './utils';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectTasks = createSelector(
  selectTasksState,
  (state) => state.tasks,
);

export const selectLoading = createSelector(
  selectTasksState,
  (state) => state.requestStatus.loading,
);

export const selectError = createSelector(
  selectTasksState,
  (state) => state.requestStatus.error,
);

export const selectFilterStatus = createSelector(
  selectTasksState,
  (state) => state.filterStatus,
);

export const selectSearchQuery = createSelector(
  selectTasksState,
  (state) => state.searchQuery,
);

export const selectFilteredAndSearchedTasks = createSelector(
  selectTasks,
  selectFilterStatus,
  selectSearchQuery,
  (tasks, filterStatus, searchQuery) =>
    tasks
      .filter(filterByStatus(filterStatus))
      .filter(filterBySearchQuery(searchQuery)),
);
