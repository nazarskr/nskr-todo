import { Priority, Status } from '../enums';
import { Timestamp } from 'firebase/firestore';

export interface Task {
  id: string;
  checkMark?: boolean;
  description: string;
  dueDate: Date | Timestamp;
  creationDate: Date | Timestamp;
  status: Status;
  completionDate: Date | Timestamp | null;
  priority: Priority;
}
