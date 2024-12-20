import { inject, Injectable } from '@angular/core';
import {
  Observable,
  from,
  of,
  forkJoin,
  tap,
  catchError,
  throwError,
} from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  CollectionReference,
  Timestamp,
} from 'firebase/firestore';
import { Task } from '../interfaces';
import { AuthService } from '@core/services/auth.service';
import { ToasterService } from '@shared/services/toaster.service';
import { FIRESTORE } from '../../../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private firestore = inject(FIRESTORE);
  private authService = inject(AuthService);
  private toasterService = inject(ToasterService);

  getTasksForUser(): Observable<Task[]> {
    return this.withUserId((userId: string) => {
      const tasksCollection = collection(
        this.firestore,
        `users/${userId}/tasks`,
      ) as CollectionReference;

      return from(getDocs(tasksCollection)).pipe(
        mergeMap((querySnapshot) => {
          const tasks: Task[] = [];
          querySnapshot.forEach((docSnap) => {
            const snapshot = docSnap.data() as Task;
            console.log(snapshot.dueDate);
            tasks.push({
              ...snapshot,
              id: docSnap.id,
              checkMark: false,
              creationDate: (snapshot.creationDate as Timestamp).toDate(),
              dueDate: (snapshot.dueDate as Timestamp).toDate(),
              completionDate: snapshot.completionDate
                ? (snapshot.completionDate as Timestamp).toDate()
                : null,
            });
          });
          return of(tasks);
        }),
      );
    });
  }

  createTask(task: Task): Observable<unknown> {
    return this.withUserId((userId: string) => {
      const tasksCollection = collection(
        this.firestore,
        `users/${userId}/tasks`,
      ) as CollectionReference;

      return this.withToast(
        from(addDoc(tasksCollection, task)),
        'Task created',
        'Task creation failed',
      );
    });
  }

  updateTask(taskId: string, updatedTask: Partial<Task>): Observable<void> {
    return this.withUserId((userId: string) => {
      const taskDoc = doc(this.firestore, `users/${userId}/tasks/${taskId}`);
      return this.withToast(
        from(updateDoc(taskDoc, updatedTask)),
        'Task updated',
        'Task update failed',
      );
    });
  }

  deleteTask(taskId: string): Observable<void> {
    return this.withUserId((userId: string) => {
      const taskDoc = doc(this.firestore, `users/${userId}/tasks/${taskId}`);
      return this.withToast(
        from(deleteDoc(taskDoc)),
        'Task deleted',
        'Deleting task failed',
      );
    });
  }

  bulkUpdate(
    taskIds: string[],
    updatedFields: Partial<Task>,
  ): Observable<void[]> {
    return this.withUserId((userId: string) => {
      const updateTasks$ = taskIds.map((taskId) => {
        const taskDoc = doc(this.firestore, `users/${userId}/tasks/${taskId}`);
        return from(updateDoc(taskDoc, updatedFields));
      });
      return this.withToast(
        forkJoin(updateTasks$),
        'Tasks updated',
        'Updating tasks failed',
      );
    });
  }

  private withUserId<T>(
    operation: (userId: string) => Observable<T>,
  ): Observable<T> {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      return throwError(() => new Error('User not authenticated'));
    }

    return operation(currentUser.uid);
  }

  private withToast<T>(
    source$: Observable<T>,
    successMessage: string,
    errorMessage: string,
  ): Observable<T> {
    return source$.pipe(
      tap(() => {
        this.toasterService.showSuccessMessage(successMessage);
      }),
      catchError((error) => {
        this.toasterService.showErrorMessage(errorMessage);
        return throwError(() => error);
      }),
    );
  }
}
