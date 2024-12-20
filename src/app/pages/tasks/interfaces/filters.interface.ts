import { Task } from './task.interface';
import { Priority, SortDirection, Status } from '../enums';

export interface Filters {
  sortBy: keyof Task;
  sortDirection: SortDirection;
  status: 'all' | Status;
  priority: 'all' | Priority;
  searchQuery: string;
}
