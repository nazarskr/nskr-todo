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
    let filteredTasks = [...state.tasks];

    filteredTasks.sort((a: Task, b: Task) => {
      const direction = filters.sortDirection === 'asc' ? 1 : -1;

      // TODO fix
      // if (a[filters.sortBy] < b[filters.sortBy]) return -1 * direction;
      // if (a[filters.sortBy] > b[filters.sortBy]) return 1 * direction;
      if (a['creationDate'] < b['creationDate']) return -1 * direction;
      if (a['creationDate'] > b['creationDate']) return 1 * direction;
      return 0;
    });

    if (filters.status !== 'all') {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === filters.status,
      );
    }

    if (filters.searchQuery) {
      filteredTasks = filteredTasks.filter((task) =>
        task.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()),
      );
    }

    return filteredTasks;
  },
);
