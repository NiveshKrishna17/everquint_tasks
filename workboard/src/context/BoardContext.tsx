import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { notification } from 'antd';
import { mockBoardData } from '../data/mockBoard';
import type { BoardData, Task } from '../types/board';

interface PersistedData {
  version: number;
  data: BoardData;
}

const STORAGE_KEY = 'everquint_board_data';
const CURRENT_VERSION = 3;

interface BoardContextType {
  data: BoardData;
  setData: React.Dispatch<React.SetStateAction<BoardData>>;
  addTask: (task: Omit<Task, 'id' | 'updatedAt' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  storageError: boolean;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

const performMigration = (persistedData: PersistedData): BoardData => {
  let { version, data } = persistedData;
  let migrated = false;

  // Run migrations sequentially
  if (version === 1) {
    // Migrate v1 to v2
    // E.g., Ensuring tasks all define priority, tags, and updatedAt
    const migratedTasks: Record<string, Task> = {};
    Object.keys(data.tasks).forEach((taskId) => {
      const task = data.tasks[taskId];
      migratedTasks[taskId] = {
        ...task,
        tags: task.tags || [],
        priority: task.priority || 'medium',
        updatedAt: task.updatedAt || new Date().toISOString(),
      };
    });

    data = { ...data, tasks: migratedTasks };
    version = 2;
    migrated = true;
  }

  if (version === 2) {
    // Migrate v2 to v3
    // Injecting `createdAt` historical timestamps
    const migratedTasks: Record<string, Task> = {};
    Object.keys(data.tasks).forEach((taskId) => {
      const task = data.tasks[taskId];
      migratedTasks[taskId] = {
        ...task,
        createdAt: task.createdAt || task.updatedAt || new Date().toISOString(),
      };
    });

    data = { ...data, tasks: migratedTasks };
    version = 3;
    migrated = true;
  }

  if (migrated) {
    notification.info({
      message: 'Storage Migrated',
      description: `Successfully upgraded local format to v${version}.`,
      placement: 'bottomRight',
      duration: 5,
    });
    
    // Save the upgraded data back immediately
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version, data }));
  }

  return data;
};

const loadInitialData = (): BoardData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Simulate migration logic for testing per user requirement
      const v1Data: PersistedData = {
        version: 1,
        data: mockBoardData,
      };
      
      return performMigration(v1Data);
    }

    const parsedData: PersistedData = JSON.parse(raw);
    if (parsedData.version < CURRENT_VERSION) {
      return performMigration(parsedData);
    }
    
    return parsedData.data;
  } catch (error) {
    console.error('Failed to parse board data from local storage', error);
    return mockBoardData;
  }
};

export const BoardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<BoardData>(() => loadInitialData());
  const [storageError, setStorageError] = useState(false);

  // Save to local storage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: CURRENT_VERSION, data }));
      setStorageError(false);
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      setStorageError(true);
    }
  }, [data]);

  const addTask = (taskInput: Omit<Task, 'id' | 'updatedAt' | 'createdAt'>) => {
    const newId = `task-${Date.now()}`;
    const now = new Date().toISOString();
    const newTask: Task = {
      ...taskInput,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };

    setData((prev) => {
      const targetColumn = prev.columns[newTask.status];
      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [newId]: newTask,
        },
        columns: {
          ...prev.columns,
          [newTask.status]: {
            ...targetColumn,
            taskIds: [...targetColumn.taskIds, newId],
          },
        },
      };
    });
  };

  const updateTask = (updatedTask: Task) => {
    setData((prev) => {
      const oldTask = prev.tasks[updatedTask.id];
      const newState = {
        ...prev,
        tasks: {
          ...prev.tasks,
          [updatedTask.id]: {
            ...updatedTask,
            updatedAt: new Date().toISOString(),
          },
        },
      };

      // If status changed, move it between columns
      if (oldTask.status !== updatedTask.status) {
        const oldCol = prev.columns[oldTask.status];
        const newCol = prev.columns[updatedTask.status];

        newState.columns = {
          ...prev.columns,
          [oldTask.status]: {
            ...oldCol,
            taskIds: oldCol.taskIds.filter(id => id !== updatedTask.id),
          },
          [updatedTask.status]: {
            ...newCol,
            taskIds: [...newCol.taskIds, updatedTask.id],
          },
        };
      }

      return newState;
    });
  };

  return (
    <BoardContext.Provider value={{ data, setData, addTask, updateTask, storageError }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};
