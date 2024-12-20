import { Priority } from '../enums';
import { Status } from '../enums';

export const priorityColors: Record<Priority, string> = {
  [Priority.LOW]: '#4caf50',
  [Priority.MEDIUM]: '#ff9800',
  [Priority.HIGH]: '#f44336',
};

export const statusColors: Record<Status, string> = {
  [Status.TODO]: 'lightgray',
  [Status.IN_PROGRESS]: 'lightblue',
  [Status.REVIEW]: 'saddlebrown',
  [Status.DONE]: 'lightgreen',
};

export const DEFAULT_COLOR = 'white';
