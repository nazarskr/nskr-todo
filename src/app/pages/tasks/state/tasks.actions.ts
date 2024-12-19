import { createAction, props } from '@ngrx/store';
import { Task, Filters } from '../interfaces';

export const loadTasks = createAction(
  '[Tasks] Load Tasks',
  props<{ userId: string }>(),
);
export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>(),
);
export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>(),
);

export const createTask = createAction(
  '[Tasks] Create Task',
  props<{ userId: string; task: Task }>(),
);
export const createTaskSuccess = createAction(
  '[Tasks] Create Task Success',
  props<{ task: Task }>(),
);
export const createTaskFailure = createAction(
  '[Tasks] Create Task Failure',
  props<{ error: string }>(),
);

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ userId: string; taskId: string; updatedTask: Partial<Task> }>(),
);
export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ taskId: string; updatedTask: Partial<Task> }>(),
);
export const updateTaskFailure = createAction(
  '[Tasks] Update Task Failure',
  props<{ error: string }>(),
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ userId: string; taskId: string }>(),
);
export const deleteTaskSuccess = createAction(
  '[Tasks] Delete Task Success',
  props<{ taskId: string }>(),
);
export const deleteTaskFailure = createAction(
  '[Tasks] Delete Task Failure',
  props<{ error: string }>(),
);

export const bulkUpdateTasks = createAction(
  '[Tasks] Bulk Update Tasks',
  props<{ userId: string; taskIds: string[]; updatedFields: Partial<Task> }>(),
);
export const bulkUpdateTasksSuccess = createAction(
  '[Tasks] Bulk Update Tasks Success',
  props<{ taskIds: string[]; updatedFields: Partial<Task> }>(),
);
export const bulkUpdateTasksFailure = createAction(
  '[Tasks] Bulk Update Tasks Failure',
  props<{ error: string }>(),
);

export const setFilters = createAction('[Tasks] Set Filters', props<Filters>());

export const clearFilters = createAction('[Tasks] Clear Filters');
