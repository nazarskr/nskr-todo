import { Task } from '../../interfaces';
import { Priority, Status } from '../../enums';

export const sortTasks = (
  tasks: Task[],
  sortBy: keyof Task,
  sortDirection: 'asc' | 'desc',
): Task[] => {
  const direction = sortDirection === 'asc' ? 1 : -1;

  return [...tasks].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue == null || bValue == null) return 0; // Безпечна перевірка

    if (aValue < bValue) return -1 * direction;
    if (aValue > bValue) return 1 * direction;
    return 0;
  });
};

export const filterByStatus = (
  tasks: Task[],
  status: Status | 'all',
): Task[] => {
  if (status === 'all') return tasks;
  return tasks.filter((task) => task.status === status);
};

export const filterByPriority = (
  tasks: Task[],
  priority: Priority | 'all',
): Task[] => {
  if (priority === 'all') return tasks;
  return tasks.filter((task) => task.priority === priority);
};

export const filterBySearchQuery = (
  tasks: Task[],
  searchQuery: string,
): Task[] => {
  const lowerCaseQuery = searchQuery.toLowerCase();
  return tasks.filter((task) =>
    task.description.toLowerCase().includes(lowerCaseQuery),
  );
};
