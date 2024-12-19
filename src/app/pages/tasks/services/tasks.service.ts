import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Task } from '../interfaces';
import { forkJoin, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private firestore = inject(Firestore);

  getTasksForUser(userId: string): Observable<Task[]> {
    const tasksCollection = collection(this.firestore, `users/${userId}/tasks`);
    return collectionData(tasksCollection, { idField: 'id' }) as Observable<
      Task[]
    >;
  }

  createTask(userId: string, task: Task): Observable<void> {
    const taskDoc = doc(collection(this.firestore, `users/${userId}/tasks`));
    return from(setDoc(taskDoc, { ...task, id: taskDoc.id }));
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
      from(this.updateTask(userId, taskId, updatedFields)),
    );

    return forkJoin(updateTasks$);
  }
}
