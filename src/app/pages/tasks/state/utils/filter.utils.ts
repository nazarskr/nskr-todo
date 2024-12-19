import { Task } from '../../interfaces';

export const filterByStatus =
  (filterStatus: string) =>
  (task: Task): boolean =>
    filterStatus === 'all' || task.status === filterStatus;

export const filterBySearchQuery =
  (searchQuery: string) =>
  (task: Task): boolean =>
    !searchQuery ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase());
