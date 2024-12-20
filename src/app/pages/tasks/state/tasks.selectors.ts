import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.state';
import { Task, Filters } from '../interfaces';

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
  selectTasksState,
  selectFilters,
  (state: TasksState, filters: Filters) => {
    let filteredTasks: Task[] = [...state.tasks];

    filteredTasks.sort((a, b) => {
      const direction = filters.sortDirection === 'asc' ? 1 : -1;

      // @ts-expect-error null or undefined?
      if (a[filters.sortBy] < b[filters.sortBy]) return -1 * direction;
      // @ts-expect-error null or undefined?
      if (a[filters.sortBy] > b[filters.sortBy]) return 1 * direction;
      return 0;
    });

    if (filters.status !== 'all') {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === filters.status,
      );
    }

    if (filters.priority !== 'all') {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === filters.priority,
      );
    }

    filteredTasks = filteredTasks.filter((task) =>
      task.description
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()),
    );

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
