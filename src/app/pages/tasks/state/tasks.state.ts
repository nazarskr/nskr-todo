import { Filters, Task } from '../interfaces';
import { initialRequestStatus, RequestStatus } from './utils';
import { SortDirection } from '../enums';

export interface TasksState {
  tasks: Task[];
  requestStatus: RequestStatus;
  filters: Filters;
}

export const initialTasksState: TasksState = {
  tasks: [],
  requestStatus: initialRequestStatus,
  filters: {
    sortBy: 'creationDate',
    sortDirection: SortDirection.ASC,
    status: 'all',
    priority: 'all',
    searchQuery: '',
  },
};
