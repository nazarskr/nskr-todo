import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Task } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TasksMediatorService {
  private createTaskSubject = new Subject<Partial<Task>>();
  private updateTaskSubject = new Subject<{
    taskId: string;
    updatedTask: Partial<Task>;
  }>();
  private deleteTaskSubject = new Subject<string>();
  private filterStatusSubject = new Subject<string>();
  private searchQuerySubject = new Subject<string>();

  createTask$: Observable<Partial<Task>> =
    this.createTaskSubject.asObservable();
  updateTask$: Observable<{ taskId: string; updatedTask: Partial<Task> }> =
    this.updateTaskSubject.asObservable();
  deleteTask$: Observable<string> = this.deleteTaskSubject.asObservable();
  filterStatus$: Observable<string> = this.filterStatusSubject.asObservable();
  searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

  createTask(task: Partial<Task>): void {
    this.createTaskSubject.next(task);
  }

  updateTask(taskId: string, updatedTask: Partial<Task>): void {
    this.updateTaskSubject.next({ taskId, updatedTask });
  }

  deleteTask(taskId: string): void {
    this.deleteTaskSubject.next(taskId);
  }

  setFilterStatus(filterStatus: string): void {
    this.filterStatusSubject.next(filterStatus);
  }

  setSearchQuery(searchQuery: string): void {
    this.searchQuerySubject.next(searchQuery);
  }
}
