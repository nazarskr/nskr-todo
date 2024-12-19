import { Task } from '../interfaces';
import { initialRequestStatus, RequestStatus } from './utils';
import { Status } from '../enums';

export interface TasksState {
  tasks: Task[];
  requestStatus: RequestStatus;
  filterStatus: 'all' | Status;
  searchQuery: string;
}

export const initialState: TasksState = {
  tasks: [],
  requestStatus: initialRequestStatus,
  filterStatus: 'all',
  searchQuery: '',
};
