import { Priority } from '../enums/priority.enum';
import { Status } from '../enums/status.enum';

export const priorityColors: Record<Priority, string> = {
  [Priority.LOW]: 'lightgreen',
  [Priority.MEDIUM]: 'lightyellow',
  [Priority.HIGH]: 'lightcoral',
};

export const statusColors: Record<Status, string> = {
  [Status.TODO]: 'lightgray',
  [Status.IN_PROGRESS]: 'lightblue',
  [Status.REVIEW]: 'saddlebrown',
  [Status.DONE]: 'lightgreen',
};

export const DEFAULT_COLOR = 'white';
