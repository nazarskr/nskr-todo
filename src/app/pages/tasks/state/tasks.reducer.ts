import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { startLoading, requestSuccess, requestFailure } from './utils';
import { initialTasksState } from './tasks.state';

export const tasksReducer = createReducer(
  initialTasksState,

  on(TasksActions.loadTasks, (state) => ({
    ...state,
    requestStatus: startLoading(),
  })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    requestStatus: requestSuccess(),
  })),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    requestStatus: requestFailure(error),
  })),

  on(TasksActions.createTask, (state) => ({
    ...state,
    requestStatus: startLoading(),
  })),
  on(TasksActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    requestStatus: requestSuccess(),
  })),
  on(TasksActions.createTaskFailure, (state, { error }) => ({
    ...state,
    requestStatus: requestFailure(error),
  })),

  on(TasksActions.updateTask, (state) => ({
    ...state,
    requestStatus: startLoading(),
  })),
  on(TasksActions.updateTaskSuccess, (state, { taskId, updatedTask }) => ({
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task,
    ),
    requestStatus: requestSuccess(),
  })),
  on(TasksActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    requestStatus: requestFailure(error),
  })),

  on(TasksActions.deleteTask, (state) => ({
    ...state,
    requestStatus: startLoading(),
  })),
  on(TasksActions.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== taskId),
    requestStatus: requestSuccess(),
  })),
  on(TasksActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    requestStatus: requestFailure(error),
  })),

  on(TasksActions.bulkUpdateTasks, (state) => ({
    ...state,
    requestStatus: startLoading(),
  })),
  on(
    TasksActions.bulkUpdateTasksSuccess,
    (state, { taskIds, updatedFields }) => ({
      ...state,
      tasks: state.tasks.map((task) =>
        taskIds.includes(task.id || '') ? { ...task, ...updatedFields } : task,
      ),
      requestStatus: requestSuccess(),
    }),
  ),
  on(TasksActions.bulkUpdateTasksFailure, (state, { error }) => ({
    ...state,
    requestStatus: requestFailure(error),
  })),

  on(
    TasksActions.setFilters,
    (state, { sortBy, sortDirection, status, priority, searchQuery }) => ({
      ...state,
      filters: {
        ...state.filters,
        ...(sortBy !== undefined ? { sortBy } : {}),
        ...(sortDirection !== undefined ? { sortDirection } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(priority !== undefined ? { searchQuery } : {}),
        ...(searchQuery !== undefined ? { searchQuery } : {}),
      },
    }),
  ),

  on(TasksActions.clearFilters, (state) => ({
    ...state,
    filters: initialTasksState.filters,
  })),

  on(TasksActions.selectAllTasks, (state, { selected }) => ({
    ...state,
    tasks: state.tasks.map((task) => ({
      ...task,
      checkMark: selected,
    })),
  })),
);
