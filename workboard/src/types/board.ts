export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'backlog' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: {
    name: string;
    avatarUrl?: string;
  };
  tags: string[];
  updatedAt: string; // ISO date string
}

export interface ColumnType {
  id: TaskStatus;
  title: string;
}

export interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<TaskStatus, ColumnType & { taskIds: string[] }>;
  columnOrder: TaskStatus[];
}
