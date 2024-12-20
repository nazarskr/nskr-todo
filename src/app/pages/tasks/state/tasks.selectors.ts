import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.state';
import { Task, Filters } from '../interfaces';
import {
  filterByPriority,
  filterBySearchQuery,
  filterByStatus,
  sortTasks,
} from './utils';

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

export const selectFilters = createSelector(
  selectTasksState,
  (state) => state.filters,
);

export const selectFilteredAndSortedTasks = createSelector(
  selectTasks,
  selectFilters,
  (tasks: Task[], filters: Filters) => {
    let filteredTasks: Task[] = [...tasks];

    filteredTasks = sortTasks(
      filteredTasks,
      filters.sortBy,
      filters.sortDirection,
    );
    filteredTasks = filterByStatus(filteredTasks, filters.status);
    filteredTasks = filterByPriority(filteredTasks, filters.priority);
    filteredTasks = filterBySearchQuery(filteredTasks, filters.searchQuery);

    return filteredTasks;
  },
);

export const selectAreAllTasksSelected = createSelector(
  selectFilteredAndSortedTasks,
  (tasks) => tasks.length > 0 && tasks.every((task) => task.checkMark),
);

export const selectAreSomeTasksSelected = createSelector(
  selectFilteredAndSortedTasks,
  (tasks) => {
    const totalTasks = tasks.length;
    const selectedTasks = tasks.filter((task) => task.checkMark).length;
    return selectedTasks > 0 && selectedTasks < totalTasks;
  },
);

export const selectSelectedTasks = createSelector(
  selectFilteredAndSortedTasks,
  (tasks) => tasks.filter((task) => task.checkMark),
);
