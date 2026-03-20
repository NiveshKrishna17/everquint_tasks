import type { BoardData } from '../types/board';

const now = new Date().toISOString();
const yesterday = new Date(Date.now() - 86400000).toISOString();
const twoHoursAgo = new Date(Date.now() - 7200000).toISOString();

export const mockBoardData: BoardData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Design new landing page',
      status: 'backlog',
      priority: 'high',
      assignee: {
        name: 'Alice Designer',
        avatarUrl: 'https://i.pravatar.cc/150?u=alice',
      },
      tags: ['Design', 'UX'],
      updatedAt: yesterday,
    },
    'task-2': {
      id: 'task-2',
      title: 'Integrate Stripe payment gateway',
      status: 'in_progress',
      priority: 'high',
      assignee: {
        name: 'Bob Engineer',
      },
      tags: ['Backend', 'Payments'],
      updatedAt: twoHoursAgo,
    },
    'task-3': {
      id: 'task-3',
      title: 'Update onboarding documentation',
      status: 'backlog',
      priority: 'medium',
      tags: ['Docs'],
      updatedAt: now,
    },
    'task-4': {
      id: 'task-4',
      title: 'Fix navigation menu bug on mobile',
      status: 'done',
      priority: 'low',
      assignee: {
        name: 'Charlie Dev',
        avatarUrl: 'https://i.pravatar.cc/150?u=charlie',
      },
      tags: ['Bug', 'Frontend'],
      updatedAt: yesterday,
    },
  },
  columns: {
    backlog: {
      id: 'backlog',
      title: 'Backlog',
      taskIds: ['task-1', 'task-3'],
    },
    in_progress: {
      id: 'in_progress',
      title: 'In Progress',
      taskIds: ['task-2'],
    },
    done: {
      id: 'done',
      title: 'Done',
      taskIds: ['task-4'],
    },
  },
  columnOrder: ['backlog', 'in_progress', 'done'],
};
