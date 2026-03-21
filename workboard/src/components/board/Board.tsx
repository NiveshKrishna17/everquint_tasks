import React from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useSearchParams } from 'react-router-dom';
import { Empty, Button } from 'antd';
import { Alert } from '../ui/Alert';
import { BoardColumn } from './BoardColumn';
import { useBoardContext } from '../../context/BoardContext';
import { BoardFilters } from './BoardFilters';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import type { TaskStatus, BoardData } from '../../types/board';

export const Board: React.FC = () => {
  const { data, setData, storageError } = useBoardContext();
  const [, setSearchParams] = useSearchParams();

  const { columnsWithTasks, totalMatched, totalTasks } = useTaskFilters(data);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId as keyof BoardData['columns']];
    const finishColumn = data.columns[destination.droppableId as keyof BoardData['columns']];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Moving to a different column
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    // Update task status
    const task = data.tasks[draggableId];
    const updatedTask = {
      ...task,
      status: finishColumn.id as TaskStatus,
      updatedAt: new Date().toISOString(),
    };

    setData({
      ...data,
      tasks: {
        ...data.tasks,
        [updatedTask.id]: updatedTask,
      },
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  const renderBoardContent = () => {
    if (totalTasks === 0) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full pb-20">
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span className="text-gray-500 text-lg">No tasks yet! Create a task to start building your board.</span>}
          />
        </div>
      );
    }

    if (totalMatched === 0) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full pb-20">
          <Empty 
            description={<span className="text-gray-500 text-lg">No tasks match your active filters.</span>}
          >
            <Button onClick={() => setSearchParams(new URLSearchParams())}>Clear Filters</Button>
          </Empty>
        </div>
      );
    }

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        {columnsWithTasks.map(({ column, tasks }) => (
          <BoardColumn key={column.id} column={column} tasks={tasks} />
        ))}
      </DragDropContext>
    );
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {storageError && (
        <Alert
          title="Storage Limits Reached"
          variant="error"
          className="shrink-0 z-50 fixed top-0 w-full left-0 opacity-95 rounded-none border-x-0"
        >
          Local browser storage is currently unavailable or full. Your changes will exclusively operate inside transient memory and will NOT persist across window reloads.
        </Alert>
      )}
      <BoardFilters />
      <div className="flex pt-2 pb-8 overflow-x-auto h-full gap-6">
        {renderBoardContent()}
      </div>
    </div>
  );
};
