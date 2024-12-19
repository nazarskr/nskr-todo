import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TasksActions from './tasks.actions';
import { TasksService } from '../services/tasks.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
  ) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      mergeMap(({ userId }) =>
        this.tasksService.getTasksForUser(userId).pipe(
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
      mergeMap(({ userId, task }) =>
        this.tasksService.createTask(userId, task).pipe(
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
      mergeMap(({ userId, taskId, updatedTask }) =>
        this.tasksService.updateTask(userId, taskId, updatedTask).pipe(
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
      mergeMap(({ userId, taskId }) =>
        this.tasksService.deleteTask(userId, taskId).pipe(
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
      mergeMap(({ userId, taskIds, updatedFields }) =>
        this.tasksService.bulkUpdate(userId, taskIds, updatedFields).pipe(
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
}
