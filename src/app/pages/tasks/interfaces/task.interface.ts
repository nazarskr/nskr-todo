import { Priority, Status } from '../enums';

export interface Task {
  id: string;
  description: string;
  dueDate: Date | null;
  creationDate: Date;
  status: Status;
  completionDate: Date | null;
  priority: Priority;
}
