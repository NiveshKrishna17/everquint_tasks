import { useSearchParams } from 'react-router-dom';
import type { Task, BoardData, ColumnType } from '../types/board';

export interface UseTaskFiltersReturn {
  columnsWithTasks: { column: ColumnType & { taskIds: string[] }; tasks: Task[] }[];
  totalMatched: number;
  totalTasks: number;
}

export const useTaskFilters = (data: BoardData): UseTaskFiltersReturn => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search')?.toLowerCase();
  const statusFilter = searchParams.get('status')?.split(',') || [];
  const priorityFilter = searchParams.get('priority')?.split(',') || [];
  const sort = searchParams.get('sort'); // Expected format: 'field:dir' (e.g., 'createdAt:desc')

  const isMatch = (task: Task) => {
    if (search && !(task.title.toLowerCase().includes(search) || task.description?.toLowerCase().includes(search))) {
      return false;
    }
    if (statusFilter.length > 0 && !statusFilter.includes(task.status)) {
      return false;
    }
    if (priorityFilter.length > 0 && !priorityFilter.includes(task.priority)) {
      return false;
    }
    return true;
  };

  const totalTasks = Object.keys(data.tasks).length;
  let totalMatched = 0;

  const columnsWithTasks = data.columnOrder.map((columnId) => {
    const column = data.columns[columnId];
    let tasks = column.taskIds.map((taskId) => data.tasks[taskId]).filter(Boolean);
    
    // Filter
    tasks = tasks.filter(task => {
      const match = isMatch(task);
      if (match) totalMatched++;
      return match;
    });
    
    // Sort
    if (sort && tasks.length > 0) {
      tasks.sort((a, b) => {
        const [field, dir] = sort.split(':');
        const aVal = field === 'priority' 
            ? (a.priority === 'high' ? 3 : a.priority === 'medium' ? 2 : 1)
            : new Date(a[field as keyof Task] as string).getTime();
        const bVal = field === 'priority'
            ? (b.priority === 'high' ? 3 : b.priority === 'medium' ? 2 : 1)
            : new Date(b[field as keyof Task] as string).getTime();

        if (dir === 'desc') return bVal - aVal;
        return aVal - bVal;
      });
    }

    return { column, tasks };
  });

  return { columnsWithTasks, totalMatched, totalTasks };
};
