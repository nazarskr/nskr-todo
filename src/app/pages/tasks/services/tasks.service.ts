import { inject, Injectable } from '@angular/core';
import { Observable, from, of, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  CollectionReference,
} from 'firebase/firestore';
import { Task } from '../interfaces';
import { FIRESTORE } from '../../../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private firestore: Firestore = inject(FIRESTORE);

  getTasksForUser(userId: string): Observable<Task[]> {
    const tasksCollection = collection(
      this.firestore,
      `users/${userId}/tasks`,
    ) as CollectionReference;

    return from(getDocs(tasksCollection)).pipe(
      mergeMap((querySnapshot) => {
        const tasks: Task[] = [];
        querySnapshot.forEach((docSnap) => {
          tasks.push({ ...(docSnap.data() as Task), id: docSnap.id });
        });
        return of(tasks);
      }),
    );
  }

  createTask(userId: string, task: Task): Observable<unknown> {
    const tasksCollection = collection(
      this.firestore,
      `users/${userId}/tasks`,
    ) as CollectionReference;
    return from(addDoc(tasksCollection, task));
  }

  updateTask(
    userId: string,
    taskId: string,
    updatedTask: Partial<Task>,
  ): Observable<void> {
    const taskDoc = doc(this.firestore, `users/${userId}/tasks/${taskId}`);
    return from(updateDoc(taskDoc, updatedTask));
  }

  deleteTask(userId: string, taskId: string): Observable<void> {
    const taskDoc = doc(this.firestore, `users/${userId}/tasks/${taskId}`);
    return from(deleteDoc(taskDoc));
  }

  bulkUpdate(
    userId: string,
    taskIds: string[],
    updatedFields: Partial<Task>,
  ): Observable<void[]> {
    const updateTasks$ = taskIds.map((taskId) =>
      this.updateTask(userId, taskId, updatedFields),
    );

    return forkJoin(updateTasks$);
  }
}
