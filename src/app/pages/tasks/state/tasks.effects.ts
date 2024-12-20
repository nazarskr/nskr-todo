import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TasksActions from './tasks.actions';
import { TasksService } from '../services/tasks.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TasksEffects {
  private actions$: Actions = inject(Actions);
  private tasksService: TasksService = inject(TasksService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      mergeMap(() =>
        this.tasksService.getTasksForUser().pipe(
          map((tasks) => TasksActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(TasksActions.loadTasksFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      mergeMap(({ task }) =>
        this.tasksService.createTask(task).pipe(
          map(() => TasksActions.createTaskSuccess({ task })),
          catchError((error) =>
            of(TasksActions.createTaskFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      mergeMap(({ taskId, updatedTask }) =>
        this.tasksService.updateTask(taskId, updatedTask).pipe(
          map(() => TasksActions.updateTaskSuccess({ taskId, updatedTask })),
          catchError((error) =>
            of(TasksActions.updateTaskFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      mergeMap(({ taskId }) =>
        this.tasksService.deleteTask(taskId).pipe(
          map(() => TasksActions.deleteTaskSuccess({ taskId })),
          catchError((error) =>
            of(TasksActions.deleteTaskFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  bulkUpdateTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.bulkUpdateTasks),
      mergeMap(({ taskIds, updatedFields }) =>
        this.tasksService.bulkUpdate(taskIds, updatedFields).pipe(
          map(() =>
            TasksActions.bulkUpdateTasksSuccess({ taskIds, updatedFields }),
          ),
          catchError((error) =>
            of(TasksActions.bulkUpdateTasksFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  reloadTasksAfterActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TasksActions.createTaskSuccess,
        TasksActions.updateTaskSuccess,
        TasksActions.deleteTaskSuccess,
        TasksActions.bulkUpdateTasksSuccess,
      ),
      map(() => TasksActions.loadTasks()),
    ),
  );
}
