import React, { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { BoardColumn } from './BoardColumn';
import { mockBoardData } from '../../data/mockBoard';
import type { BoardData } from '../../types/board';

export const Board: React.FC = () => {
  const [data, setData] = useState<BoardData>(mockBoardData);

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
      status: finishColumn.id,
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

  return (
    <div className="flex pt-4 pb-8 overflow-x-auto h-full gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return <BoardColumn key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    </div>
  );
};
